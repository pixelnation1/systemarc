import Link from "next/link";
import { notFound } from "next/navigation";
import { requireSalesSession } from "@/lib/sales/auth";
import { validUuid,type SalesProposal } from "@/lib/sales/proposals";
import { createInquirySupabase } from "@/lib/supabase/server";
import type { SalesOpportunity } from "@/lib/sales/model";
import { ProposalEditor } from "@/components/sales/proposal-form";
import { SalesHeading,Alert } from "@/components/sales/shell";
export const dynamic="force-dynamic";
export default async function EditProposal({params,searchParams}:{params:Promise<{id:string}>;searchParams:Promise<{error?:string}>}) {
  await requireSalesSession();
  const {id}=await params;
  if(!validUuid(id))notFound();
  const client=createInquirySupabase();
  if(!client)throw new Error("Database unavailable");
  const {data,error}=await client.from("systemarc_sales_proposals").select("*").eq("id",id).maybeSingle();
  if(error||!data)notFound();
  const proposal=data as SalesProposal;
  if(proposal.status!=="draft")return <><SalesHeading title="Proposal locked" description="Sent proposals cannot be edited. Create a new proposal for revised terms."/>
    <div className="mx-auto max-w-3xl px-5 py-12"><Link href={"/sales/proposals/"+id} className="underline">View proposal →</Link></div></>;
  const {data:lead,error:leadError}=await client.from("systemarc_sales_opportunities").select("*").eq("id",proposal.opportunity_id).maybeSingle();
  if(leadError||!lead)notFound();
  const query=await searchParams;
  return <><SalesHeading title="Edit draft proposal" description={"Update project scope and pricing for "+lead.company_name+" before sending."}/>
    <div className="mx-auto max-w-4xl px-5 py-10 sm:px-8"><Link href={"/sales/proposals/"+id} className="text-sm text-silver underline underline-offset-4">← Preview proposal</Link>
      {query.error&&<div className="mt-6"><Alert message={query.error}/></div>}
      <ProposalEditor lead={lead as SalesOpportunity} proposal={proposal}/>
    </div></>;
}
