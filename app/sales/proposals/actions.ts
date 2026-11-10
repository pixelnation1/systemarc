"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Resend } from "resend";
import { requireSalesSession } from "@/lib/sales/auth";
import { createInquirySupabase } from "@/lib/supabase/server";
import { parseProposalForm, proposalEmail, validUuid, type SalesProposal } from "@/lib/sales/proposals";
import { safeFromIdentity } from "@/lib/notifications/resend";
import type { SalesOpportunity } from "@/lib/sales/model";

function field(form:FormData,key:string,max:number) {
  const value=form.get(key);
  return typeof value==="string" && value.length<=max ? value.trim() : null;
}
function fail(path:string,reason:string):never {
  redirect(path+"?error="+encodeURIComponent(reason));
}
export async function saveProposalAction(form:FormData) {
  await requireSalesSession();
  const leadId=field(form,"lead_id",36)||"";
  const proposalId=field(form,"proposal_id",36)||"";
  const valid=validUuid(leadId)&&(!proposalId||validUuid(proposalId));
  if (!valid) redirect("/sales");
  const returnPath=proposalId?"/sales/proposals/"+proposalId+"/edit":"/sales/lead/"+leadId+"/proposal";
  const parsed=parseProposalForm(form);
  if (!parsed) fail(returnPath,"Check the title, pricing, items, deposit, and dates.");
  const client=createInquirySupabase();
  if(!client) fail(returnPath,"Database is unavailable.");
  const {data:lead,error:leadError}=await client.from("systemarc_sales_opportunities").select("id").eq("id",leadId).maybeSingle();
  if(leadError||!lead) fail(returnPath,"Opportunity could not be found.");
  if(proposalId){
    const {data,error}=await client.from("systemarc_sales_proposals")
      .update({...parsed,updated_at:new Date().toISOString()})
      .eq("id",proposalId).eq("opportunity_id",leadId).eq("status","draft").select("id").maybeSingle();
    if(error||!data) fail(returnPath,"Only draft proposals can be edited.");
    revalidatePath("/sales/proposals");revalidatePath("/sales/proposals/"+proposalId);
    redirect("/sales/proposals/"+proposalId+"?saved=1");
  }
  const {data,error}=await client.from("systemarc_sales_proposals")
    .insert({...parsed,opportunity_id:leadId,status:"draft"})
    .select("id").single();
  if(error||!data) fail(returnPath,"Unable to save this draft.");
  revalidatePath("/sales/proposals");revalidatePath("/sales/lead/"+leadId);
  redirect("/sales/proposals/"+data.id+"?created=1");
}

export async function sendProposalAction(form:FormData) {
  await requireSalesSession();
  const id=field(form,"proposal_id",36)||"";
  if(!validUuid(id))redirect("/sales/proposals");
  const path="/sales/proposals/"+id;
  const client=createInquirySupabase();
  if(!client)fail(path,"Database unavailable.");
  const {data:raw,error}=await client.from("systemarc_sales_proposals").select("*").eq("id",id).maybeSingle();
  if(error||!raw||raw.status!=="draft")fail(path,"Only unsent draft proposals can be emailed.");
  const proposal=raw as SalesProposal;
  const {data:found,error:leadErr}=await client.from("systemarc_sales_opportunities")
    .select("*").eq("id",proposal.opportunity_id).maybeSingle();
  if(leadErr||!found)fail(path,"Related lead not found.");
  const lead=found as SalesOpportunity;
  if(!lead.contact_email||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.contact_email))
    fail(path,"Add a valid contact email to the lead before emailing a proposal.");
  const from=safeFromIdentity(process.env.RESEND_FROM_EMAIL);
  if(!from||!process.env.RESEND_API_KEY)fail(path,"Proposal email is not configured.");

  // Atomic draft -> sending transition prevents duplicate clicks from sending twice.
  const {data:claimed,error:claimError}=await client.from("systemarc_sales_proposals")
    .update({status:"sending",updated_at:new Date().toISOString()})
    .eq("id",id).eq("status","draft").select("id").maybeSingle();
  if(claimError||!claimed)fail(path,"This proposal is already being sent.");
  const mail=proposalEmail(proposal,lead);
  try {
    const {data:receipt,error:sendError}=await new Resend(process.env.RESEND_API_KEY).emails.send({
      from,to:lead.contact_email,subject:mail.subject,html:mail.html,text:mail.text,
      replyTo:"support@systemarchq.com",
    });
    if(sendError||!receipt?.id)throw new Error("provider_rejected");
  } catch {
    // Unknown provider outcomes should not trigger automatic retries.
    await client.from("systemarc_sales_proposals").update({status:"draft",updated_at:new Date().toISOString()})
      .eq("id",id).eq("status","sending");
    fail(path,"Email was not confirmed delivered. Check the email provider before retrying.");
  }
  const now=new Date().toISOString();
  const {error:recordError}=await client.from("systemarc_sales_proposals")
    .update({status:"sent",sent_at:now,sent_to:lead.contact_email,updated_at:now})
    .eq("id",id).eq("status","sending");
  if(recordError) {
    console.error("proposal_sent_status_update_failed");
    fail(path,"Email accepted but status could not be updated. Do not resend before checking.");
  }
  // Don't overwrite a custom follow-up date.
  const followup = new Date(Date.now()+5*86400000).toISOString().slice(0,10);
  const {error:leadUpdateError}=await client.from("systemarc_sales_opportunities").update({
    stage:"proposal",next_follow_up:lead.next_follow_up||followup,updated_at:now
  }).eq("id",lead.id).not("stage","in",'("won","lost")');
  if(leadUpdateError)console.error("proposal_lead_status_update_failed");
  revalidatePath(path);revalidatePath("/sales");revalidatePath("/sales/proposals");
  redirect(path+"?sent=1");
}

export async function recordProposalOutcomeAction(form:FormData) {
  await requireSalesSession();
  const id=field(form,"proposal_id",36)||"";
  const status=field(form,"status",16);
  if(!validUuid(id)||!["accepted","declined"].includes(status||""))redirect("/sales/proposals");
  const path="/sales/proposals/"+id;
  const client=createInquirySupabase();
  if(!client)fail(path,"Database unavailable.");
  const {data,error}=await client.from("systemarc_sales_proposals")
    .update({status,updated_at:new Date().toISOString()})
    .eq("id",id).eq("status","sent").select("id").maybeSingle();
  if(error||!data)fail(path,"Only sent proposals can be marked accepted or declined.");
  revalidatePath(path);revalidatePath("/sales/proposals");
  redirect(path+"?recorded=1");
}
