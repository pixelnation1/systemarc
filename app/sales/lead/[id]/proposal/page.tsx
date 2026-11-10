import Link from "next/link";
import { notFound } from "next/navigation";
import { requireSalesSession } from "@/lib/sales/auth";
import { validUuid } from "@/lib/sales/proposals";
import { createInquirySupabase } from "@/lib/supabase/server";
import type { SalesOpportunity } from "@/lib/sales/model";
import { ProposalEditor } from "@/components/sales/proposal-form";
import { SalesHeading,Alert } from "@/components/sales/shell";
export const dynamic="force-dynamic";
export default async function NewProposal({params,searchParams}:{params:Promise<{id:string}>;searchParams:Promise<{error?:string}>}) {
  await requireSalesSession();
  const {id}=await params;
  if(!validUuid(id))notFound();
  const client=createInquirySupabase();
  if(!client)throw new Error("Database unavailable");
  const {data,error}=await client.from("systemarc_sales_opportunities").select("*").eq("id",id).maybeSingle();
  if(error||!data)notFound();
  const lead=data as SalesOpportunity;
  const query=await searchParams;
  return <><SalesHeading title="Create proposal" description={"Prepare a custom project quote for "+lead.company_name+". Save it privately before you email it."}/>
    <div className="mx-auto max-w-4xl px-5 py-10 sm:px-8"><Link href={"/sales/lead/"+id} className="text-sm text-silver underline underline-offset-4">← Back to opportunity</Link>
      {query.error&&<div className="mt-6"><Alert message={query.error}/></div>}
      <ProposalEditor lead={lead}/>
    </div></>;
}
