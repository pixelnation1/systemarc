import "server-only";
import { Resend } from "resend";
import { createInquirySupabase } from "@/lib/supabase/server";
import { businessToday,formatDate } from "@/lib/sales/model";
import { escapeHtml } from "@/lib/sales/proposals";
import { safeFromIdentity } from "@/lib/notifications/resend";

export type DigestResult = "sent"|"empty"|"duplicate"|"unavailable";
function recipient() {
  const email=(process.env.SALES_ADMIN_EMAIL||process.env.INQUIRY_NOTIFICATION_EMAIL||"").trim().toLowerCase();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)?email:null;
}
type Due = {id:string;company_name:string;contact_name:string;service:string;next_follow_up:string;stage:string};
export async function sendDueFollowUps():Promise<DigestResult> {
  const to=recipient(), from=safeFromIdentity(process.env.RESEND_FROM_EMAIL);
  const client=createInquirySupabase();
  if(!to||!from||!process.env.RESEND_API_KEY||!client)return "unavailable";
  const today=businessToday();
  const {data,error,count}=await client.from("systemarc_sales_opportunities")
    .select("id,company_name,contact_name,service,next_follow_up,stage",{count:"exact"})
    .in("stage",["new","contacted","qualified","proposal"]).lte("next_follow_up",today)
    .order("next_follow_up",{ascending:true}).limit(100);
  if(error||!data)return "unavailable";
  if(!data.length)return "empty";
  const leads=data as Due[];
  const total=count??leads.length;
  // Unique date is a durable lock across concurrent serverless invocations.
  const {error:lockError}=await client.from("systemarc_sales_reminder_runs").insert({
    run_day:today,status:"sending",due_count:total
  });
  if(lockError)return lockError.code==="23505"?"duplicate":"unavailable";
  const rows=leads.map(x=>({
    ...x,url:"https://www.systemarchq.com/sales/lead/"+encodeURIComponent(x.id),
    overdue:x.next_follow_up<today,
  }));
  const text=["SYSTEMARC SALES — FOLLOW-UPS",today,total+" opportunities due or overdue.","",
    ...rows.flatMap(x=>[x.overdue?"OVERDUE — "+x.company_name:x.company_name,
      x.contact_name+" / "+x.service+" / Due "+x.next_follow_up,x.url,""]),
    total>rows.length?"Showing first "+rows.length+" of "+total+".":"",
    "Update each opportunity once you follow up.","Open dashboard: https://www.systemarchq.com/sales/follow-ups"].join("\n");
  const html='<div style="font-family:Arial,sans-serif;line-height:1.6;color:#17263b">'+
    '<h1>SystemArc follow-up digest</h1><p>'+escapeHtml(today)+' — <strong>'+total+'</strong> opportunities due or overdue.</p><ul>'+
    rows.map(x=>'<li style="margin-bottom:15px"><strong>'+escapeHtml(x.company_name)+'</strong>'+
      (x.overdue?' <span style="color:#a33">(overdue)</span>':'')+
      '<div>'+escapeHtml(x.contact_name)+' · '+escapeHtml(x.service)+' · Due '+escapeHtml(x.next_follow_up)+'</div>'+
      '<a href="'+x.url+'">Open opportunity</a></li>').join('')+
    '</ul><p><a href="https://www.systemarchq.com/sales/follow-ups">Review all follow-ups</a></p></div>';
  try {
    const {data:receipt,error:sendError}=await new Resend(process.env.RESEND_API_KEY).emails.send({
      from,to,subject:"SystemArc: "+total+" follow-up"+(total===1?"":"s")+" due or overdue",html,text,
    });
    if(sendError||!receipt?.id)throw new Error("digest_rejected");
    const {error:updateError}=await client.from("systemarc_sales_reminder_runs")
      .update({status:"sent",provider_id:receipt.id,sent_at:new Date().toISOString()})
      .eq("run_day",today).eq("status","sending");
    if(updateError)console.error("sales_digest_record_failed");
    return "sent";
  } catch {
    await client.from("systemarc_sales_reminder_runs").update({status:"failed"})
      .eq("run_day",today).eq("status","sending");
    console.error("sales_digest_delivery_failed");
    return "unavailable";
  }
}
