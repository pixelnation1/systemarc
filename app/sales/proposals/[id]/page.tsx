import Link from "next/link";
import { notFound } from "next/navigation";
import { requireSalesSession } from "@/lib/sales/auth";
import { createInquirySupabase } from "@/lib/supabase/server";
import { formatDate,type SalesOpportunity } from "@/lib/sales/model";
import { proposalDeposit,proposalMoney,proposalRef,validUuid,type SalesProposal } from "@/lib/sales/proposals";
import { recordProposalOutcomeAction,sendProposalAction } from "@/app/sales/proposals/actions";
import { PrintProposalButton } from "@/components/sales/print-proposal";
import { SendProposalButton } from "@/components/sales/send-proposal-button";
import { SalesHeading,Alert } from "@/components/sales/shell";
export const dynamic="force-dynamic";
export default async function ProposalPreview({params,searchParams}:{params:Promise<{id:string}>;searchParams:Promise<{saved?:string;created?:string;sent?:string;recorded?:string;error?:string}>}) {
  await requireSalesSession();
  const {id}=await params;if(!validUuid(id))notFound();
  const client=createInquirySupabase();if(!client)throw new Error("Database unavailable");
  const {data,error}=await client.from("systemarc_sales_proposals").select("*").eq("id",id).maybeSingle();
  if(error||!data)notFound();
  const proposal=data as SalesProposal;
  const {data:rawLead,error:leadErr}=await client.from("systemarc_sales_opportunities").select("*").eq("id",proposal.opportunity_id).maybeSingle();
  if(leadErr||!rawLead)notFound();
  const lead=rawLead as SalesOpportunity;
  const query=await searchParams;
  const emailOk=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.contact_email);
  const subt=proposal.subtotal_cents;
  return <><div className="sales-proposal-nav"><SalesHeading title={"Proposal "+proposalRef(proposal.number)} description={"Private preview for "+lead.company_name+". Review carefully before you share it."}/></div>
    <div className="mx-auto max-w-5xl px-5 py-10 sm:px-8">
      <nav className="sales-proposal-nav flex flex-wrap items-center gap-4 text-sm"><Link href={"/sales/lead/"+lead.id} className="text-silver underline underline-offset-4">← Opportunity</Link><Link href="/sales/proposals" className="text-silver underline underline-offset-4">All proposals</Link>
        {proposal.status==="draft"&&<Link href={"/sales/proposals/"+id+"/edit"} className="text-silver underline underline-offset-4">Edit this draft</Link>}</nav>
      <div className="sales-proposal-nav mt-6">
        {query.error&&<Alert message={query.error}/>}
        {(query.sent||query.saved||query.created||query.recorded)&&<Alert ok message={query.sent?"Proposal email accepted by provider. Mark any final acceptance yourself.":query.recorded?"Proposal outcome recorded.":query.saved?"Draft saved.":"Private proposal draft created."}/>}
      </div>
      <div className="sales-proposal-nav mt-5 flex flex-wrap items-center gap-3">
        <PrintProposalButton/>
        {proposal.status==="draft"&&emailOk&&<form action={sendProposalAction}><input type="hidden" name="proposal_id" value={id}/><SendProposalButton recipient={lead.contact_email}/></form>}
        {proposal.status==="draft"&&!emailOk&&<p className="text-sm text-amber-300">This lead has no valid email. Add one before sending a proposal.</p>}
        {proposal.status==="sent"&&<form action={recordProposalOutcomeAction} className="flex flex-wrap gap-2">
          <input type="hidden" name="proposal_id" value={id}/>
          <button name="status" value="accepted" className="min-h-11 border border-emerald-600 px-4 text-sm">Record client acceptance</button>
          <button name="status" value="declined" className="min-h-11 border border-steel px-4 text-sm">Record decline</button>
        </form>}
        {proposal.status==="sending"&&<p className="text-sm text-silver">Email delivery in progress. Do not retry.</p>}
      </div>
      <article id="sales-proposal" className="sales-printable mx-auto mt-8 max-w-[850px] bg-white p-7 text-[#17253c] shadow-xl sm:p-12">
        <div className="flex flex-wrap items-start justify-between gap-6 border-b border-slate-200 pb-8">
          <div><p className="text-xs font-semibold tracking-[0.22em] text-[#3965a3]">SYSTEMARC / PROJECT PROPOSAL</p><h2 className="mt-3 text-3xl font-bold text-[#182944]">SystemArc</h2><p className="text-sm text-slate-500">Websites · Software · Automation · Media</p></div>
          <div className="text-right text-sm"><p className="font-semibold">{proposalRef(proposal.number)}</p><p className="mt-2 capitalize">{proposal.status}</p><p>Created {formatDate(proposal.created_at)}</p>{proposal.valid_until&&<p>Valid through {formatDate(proposal.valid_until)}</p>}</div>
        </div>
        <div className="mt-9 grid gap-6 sm:grid-cols-2"><div><p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Prepared for</p><p className="mt-2 text-lg font-semibold">{lead.company_name}</p><p>{lead.contact_name}</p>{lead.contact_email&&<p className="break-all">{lead.contact_email}</p>}</div><div><p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Project</p><h3 className="mt-2 text-2xl font-semibold">{proposal.title}</h3></div></div>
        {[["Project overview",proposal.overview],["Scope & deliverables",proposal.deliverables],["Estimated timeline",proposal.timeline]].filter(x=>x[1]).map(([heading,body])=><section key={heading} className="mt-9"><h3 className="text-lg font-semibold">{heading}</h3><p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-700">{body}</p></section>)}
        <section className="mt-10"><h3 className="text-lg font-semibold">Project investment</h3><div className="mt-4 overflow-x-auto"><table className="w-full min-w-[420px] border-collapse text-sm"><thead><tr className="border-b border-slate-300 text-left"><th className="py-3">Deliverable / service</th><th className="py-3 text-right">Qty</th><th className="py-3 text-right">Unit price</th><th className="py-3 text-right">Amount</th></tr></thead><tbody>{proposal.line_items.map((item,i)=><tr key={i} className="border-b border-slate-200"><td className="py-3 pr-4">{item.description}</td><td className="py-3 text-right">{item.quantity}</td><td className="py-3 text-right">{proposalMoney(item.unit_cents)}</td><td className="py-3 text-right">{proposalMoney(item.unit_cents*item.quantity)}</td></tr>)}</tbody></table></div>
          <div className="mt-6 ml-auto max-w-xs space-y-3 text-sm"><div className="flex justify-between"><span>Total project estimate</span><strong>{proposalMoney(subt)}</strong></div><div className="flex justify-between"><span>Deposit ({proposal.deposit_percent}%)</span><strong>{proposalMoney(proposalDeposit(subt,proposal.deposit_percent))}</strong></div><div className="flex justify-between"><span>Remaining balance</span><strong>{proposalMoney(subt-proposalDeposit(subt,proposal.deposit_percent))}</strong></div></div></section>
        {[["Exclusions & responsibilities",proposal.exclusions],["Project terms",proposal.terms]].filter(x=>x[1]).map(([heading,body])=><section key={heading} className="mt-8"><h3 className="text-lg font-semibold">{heading}</h3><p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-700">{body}</p></section>)}
        <div className="mt-12 border-t border-slate-200 pt-5 text-xs leading-6 text-slate-500">SystemArc · support@systemarchq.com · www.systemarchq.com<br/>This document is a proposal for review, not a signed contract or proof of payment. Scope, pricing, and work begin only after final mutual agreement.</div>
      </article>
      <div className="sales-proposal-nav mx-auto mt-6 max-w-[850px] text-sm text-silver">
        {proposal.status==="sent"&&<p>Sent to {proposal.sent_to||lead.contact_email} on {proposal.sent_at?formatDate(proposal.sent_at):"the recorded date"}. Customer acceptance is entered manually.</p>}
        {proposal.status==="accepted"&&<p>The client acceptance has been recorded internally. Verify an executed agreement before marking the opportunity won.</p>}
        {proposal.status==="declined"&&<p>This proposal was recorded as declined. You can create a new proposal for revised scope.</p>}
        <p className="mt-3">To export a PDF, choose Print / Save as PDF and select your browser's PDF destination. No PDF attachment is sent automatically with the email.</p>
      </div>
    </div></>;
}
