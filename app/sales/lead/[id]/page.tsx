import Link from "next/link";
import { notFound } from "next/navigation";
import { requireSalesSession } from "@/lib/sales/auth";
import { createInquirySupabase } from "@/lib/supabase/server";
import { formatDate,formatExactMoney,stageLabels,type SalesOpportunity } from "@/lib/sales/model";
import { updateSalesLeadAction } from "@/app/sales/actions";
import { SalesHeading,Alert,inputClass,labelClass } from "@/components/sales/shell";
import {proposalMoney,proposalRef} from "@/lib/sales/proposals";

export const dynamic="force-dynamic";
export default async function LeadPage({params,searchParams}:{params:Promise<{id:string}>;searchParams:Promise<{error?:string;saved?:string}>}) {
  await requireSalesSession();
  const route=await params;
  if (!/^[0-9a-f-]{36}$/i.test(route.id)) notFound();
  const query=await searchParams;
  const client=createInquirySupabase();
  if(!client) throw new Error("Sales database unavailable");
  const {data,error}=await client.from("systemarc_sales_opportunities").select("*").eq("id",route.id).maybeSingle();
  if(error||!data) notFound();
  const lead=data as SalesOpportunity;
  const {data:proposals}=await client.from("systemarc_sales_proposals").select("id,number,title,status,subtotal_cents").eq("opportunity_id",lead.id).order("created_at",{ascending:false}).limit(20);
  return <>
    <SalesHeading title={lead.company_name} description={"Opportunity / "+lead.service+" / "+stageLabels[lead.stage]}/>
    <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
      <Link href="/sales" className="text-sm text-silver underline underline-offset-4">← Back to pipeline</Link>
      <section className="mt-7 border border-steel bg-graphite p-6"><div className="flex flex-wrap items-center justify-between gap-4"><div><h2 className="font-serif text-2xl">Client proposals</h2><p className="mt-2 text-sm text-silver">Keep each quote tied to its lead and stage. Nothing sends without your approval.</p></div><Link className="inline-flex min-h-11 items-center bg-warm-white px-5 text-sm font-semibold text-carbon" href={"/sales/lead/"+lead.id+"/proposal"}>Create proposal →</Link></div>
        {(proposals||[]).length>0?<div className="mt-5 space-y-3">{(proposals||[]).map(p=><div key={p.id} className="flex flex-wrap items-center justify-between gap-3 border-t border-steel pt-3"><Link className="underline underline-offset-4" href={"/sales/proposals/"+p.id}>{proposalRef(p.number)} — {p.title}</Link><span className="text-sm capitalize text-silver">{p.status} · {proposalMoney(p.subtotal_cents)}</span></div>)}</div>:<p className="mt-5 text-sm text-silver">No proposals created for this lead yet.</p>}</section>
      <div className="mt-7 grid items-start gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <aside className="border border-steel bg-graphite p-6"><h2 className="font-serif text-2xl">Contact and project</h2>
          <dl className="mt-6 space-y-5 text-sm">
            <div><dt className="text-silver">Contact</dt><dd className="mt-1 text-warm-white">{lead.contact_name}</dd></div>
            <div><dt className="text-silver">Email</dt><dd className="mt-1">{lead.contact_email?<a className="underline underline-offset-4" href={"mailto:"+lead.contact_email}>{lead.contact_email}</a>:"Not provided"}</dd></div>
            <div><dt className="text-silver">Phone</dt><dd className="mt-1">{lead.contact_phone?<a className="underline underline-offset-4" href={"tel:"+lead.contact_phone}>{lead.contact_phone}</a>:"Not provided"}</dd></div>
            <div><dt className="text-silver">Lead source</dt><dd className="mt-1">{lead.source.replaceAll("_"," ")}</dd></div>
            <div><dt className="text-silver">Received</dt><dd className="mt-1">{formatDate(lead.created_at)}</dd></div>
          </dl>
          <h3 className="mt-8 text-lg font-semibold">Project context</h3><p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-silver">{lead.summary||"No description yet."}</p>
          {lead.inquiry_id&&<p className="mt-6 text-xs text-silver">Created automatically from a SystemArc project inquiry.</p>}
        </aside>
        <section className="border border-steel bg-graphite p-6 sm:p-8"><h2 className="font-serif text-2xl">Update this opportunity</h2><p className="mt-3 text-sm text-silver">Keep the next action visible so no lead is forgotten.</p>
          {query.saved==="1"&&<div className="mt-5"><Alert ok message="Opportunity saved."/></div>}
          {query.error&&<div className="mt-5"><Alert message="Could not save the changes. Check the fields and try again."/></div>}
          <form action={updateSalesLeadAction} className="mt-7 space-y-6">
            <div><label className={labelClass} htmlFor="lead-company">Business name</label><input id="lead-company" name="company_name" className={inputClass} required maxLength={160} defaultValue={lead.company_name}/></div>
            <div><label className={labelClass} htmlFor="lead-contact">Contact name</label><input id="lead-contact" name="contact_name" className={inputClass} required maxLength={120} defaultValue={lead.contact_name}/></div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div><label className={labelClass} htmlFor="lead-email">Client email</label><input id="lead-email" name="contact_email" type="email" className={inputClass} maxLength={254} defaultValue={lead.contact_email}/></div>
              <div><label className={labelClass} htmlFor="lead-phone">Phone</label><input id="lead-phone" name="contact_phone" type="tel" className={inputClass} maxLength={40} defaultValue={lead.contact_phone}/></div>
            </div>
            <input type="hidden" name="id" value={lead.id}/>
            <div><label className={labelClass} htmlFor="lead-stage">Sales stage</label><select id="lead-stage" name="stage" defaultValue={lead.stage} className={inputClass}>{Object.entries(stageLabels).map(([value,label])=><option key={value} value={value}>{label}</option>)}</select></div>
            <div><label className={labelClass} htmlFor="lead-value">Estimated deal value (USD)</label><input className={inputClass} id="lead-value" name="value" inputMode="decimal" defaultValue={formatExactMoney(lead.estimated_value_cents)} placeholder="1499.00"/></div>
            <div><label className={labelClass} htmlFor="lead-next">Next follow-up date</label><input className={inputClass} type="date" id="lead-next" name="next_follow_up" defaultValue={lead.next_follow_up??""}/></div>
            <div><label className={labelClass} htmlFor="lead-notes">Internal notes / next action</label><textarea className={inputClass} id="lead-notes" name="notes" maxLength={4000} rows={7} defaultValue={lead.notes} placeholder="Next step, proposal sent, customer feedback, or follow-up details"/></div>
            <button type="submit" className="min-h-12 w-full bg-warm-white px-5 font-medium text-carbon hover:bg-electric-cobalt">Save opportunity →</button>
          </form>
        </section>
      </div>
    </div>
  </>;
}
