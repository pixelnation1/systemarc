import Link from "next/link";
import { requireSalesSession } from "@/lib/sales/auth";
import { createInquirySupabase } from "@/lib/supabase/server";
import { SalesHeading,Alert } from "@/components/sales/shell";
import {proposalMoney,proposalRef} from "@/lib/sales/proposals";
import {formatDate} from "@/lib/sales/model";
export const dynamic="force-dynamic";
type Row={id:string;number:number;title:string;status:string;subtotal_cents:number;created_at:string;opportunity_id:string;systemarc_sales_opportunities?:{company_name:string}[]|null};
export default async function ProposalsPage(){
  await requireSalesSession();
  const client=createInquirySupabase();
  const {data,error}=client?await client.from("systemarc_sales_proposals")
    .select("id,number,title,status,subtotal_cents,created_at,opportunity_id,systemarc_sales_opportunities(company_name)")
    .order("created_at",{ascending:false}).limit(250):{data:null,error:new Error("Missing database")};
  const proposals=(data??[]) as Row[];
  return <><SalesHeading title="Proposals" description="Create detailed website, software, automation, and media proposals from each lead. Draft privately, review, then explicitly send."/>
    <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
      {error&&<Alert message="Could not load proposals. Check the database connection."/>}
      <h2 className="font-serif text-3xl">Project proposals</h2>
      <p className="mt-3 text-sm text-silver">To create a new proposal, open a lead from the pipeline and select Create proposal.</p>
      <div className="mt-6 overflow-x-auto border border-steel">
        <table className="w-full min-w-[680px] text-left text-sm"><thead className="bg-graphite text-xs uppercase tracking-wider text-silver"><tr><th className="px-5 py-4">Proposal</th><th className="px-5 py-4">Business</th><th className="px-5 py-4">Status</th><th className="px-5 py-4">Amount</th><th className="px-5 py-4">Created</th></tr></thead>
        <tbody className="divide-y divide-steel">{proposals.map(p=><tr key={p.id}><td className="px-5 py-4"><Link className="font-semibold underline underline-offset-4" href={"/sales/proposals/"+p.id}>{proposalRef(p.number)} — {p.title}</Link></td><td className="px-5 py-4 text-silver">{p.systemarc_sales_opportunities?.[0]?.company_name||"Opportunity"}</td><td className="px-5 py-4 capitalize">{p.status}</td><td className="px-5 py-4">{proposalMoney(p.subtotal_cents)}</td><td className="px-5 py-4">{formatDate(p.created_at)}</td></tr>)}</tbody></table>
        {!proposals.length&&<p className="p-7 text-sm text-silver">No proposals yet. Begin with a lead in your sales pipeline.</p>}
      </div>
    </div></>;
}
