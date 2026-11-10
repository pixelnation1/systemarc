import Link from "next/link";
import { requireSalesSession } from "@/lib/sales/auth";
import { createInquirySupabase } from "@/lib/supabase/server";
import { businessToday, formatDate, formatMoney, stageLabels, type SalesOpportunity } from "@/lib/sales/model";
import { SalesHeading, Alert } from "@/components/sales/shell";

export const dynamic="force-dynamic";

export default async function SalesDashboard({searchParams}:{searchParams:Promise<{stage?:string;created?:string}>}) {
  await requireSalesSession();
  const params=await searchParams;
  const stage=typeof params.stage==="string" && Object.hasOwn(stageLabels,params.stage)?params.stage:"all";
  const client=createInquirySupabase();
  const {data,error}=client?await client.from("systemarc_sales_opportunities")
    .select("*").order("created_at",{ascending:false}).limit(250):{data:null,error:new Error("Missing database")};
  const all=(data??[]) as SalesOpportunity[];
  const shown=stage==="all"?all:all.filter(x=>x.stage===stage);
  const active=all.filter(x=>!["won","lost"].includes(x.stage));
  const contracted=all.filter(x=>x.stage==="won");
  const today=businessToday();
  const overdue=active.filter(x=>x.next_follow_up && x.next_follow_up<today);
  const dueToday=active.filter(x=>x.next_follow_up===today);
  const value=active.reduce((sum,x)=>sum+x.estimated_value_cents,0);
  const wonValue=contracted.reduce((sum,x)=>sum+x.estimated_value_cents,0);
  const sections=[{label:"Open opportunities",value:String(active.length),note:"Excludes won and lost"},
    {label:"Potential pipeline value",value:formatMoney(value),note:"Estimated, not revenue"},
    {label:"Won contract value",value:formatMoney(wonValue),note:"Entered deal values"},
    {label:"Due / overdue",value:String(dueToday.length+overdue.length),note:"Follow-ups to act on"}];
  return <>
    <SalesHeading title="Sales Command Center" description="Move every conversation toward a decision. Track new website leads, software opportunities, next steps, and what your marketing is producing."/>
    <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
      {params.created==="1"&&<Alert ok message="New prospect added to your sales pipeline."/>}
      {error&&<Alert message="Could not load the pipeline. Check the SystemArc database connection."/>}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{sections.map(s=><div key={s.label} className="border border-steel bg-graphite p-5"><p className="text-xs text-silver">{s.label}</p><p className="mt-3 text-3xl font-semibold tracking-tight">{s.value}</p><p className="mt-2 text-xs text-silver">{s.note}</p></div>)}</div>
      {(overdue.length>0||dueToday.length>0)&&<div className="mt-8 border-l-2 border-electric-cobalt bg-graphite px-5 py-5"><h2 className="text-lg font-semibold">Follow-ups need attention</h2><p className="mt-2 text-sm text-silver">{overdue.length} overdue and {dueToday.length} due today. Reach out and update the next follow-up date.</p><div className="mt-3 flex flex-wrap gap-4">{[...overdue,...dueToday].slice(0,5).map(x=><Link href={"/sales/lead/"+x.id} key={x.id} className="text-sm underline underline-offset-4">{x.company_name} →</Link>)}</div></div>}
      <div className="mt-12 flex flex-wrap items-end justify-between gap-5"><div><p className="font-mono text-xs uppercase tracking-wider text-electric-cobalt">Pipeline</p><h2 className="mt-2 font-serif text-3xl">Your opportunities</h2><p className="mt-2 text-sm text-silver">Leads from the website appear automatically. Add manual prospects for outreach.</p></div><Link href="/sales/new" className="inline-flex min-h-11 items-center bg-warm-white px-5 text-sm font-medium text-carbon">Add prospect →</Link></div>
      <div className="mt-6 flex flex-wrap gap-2">{["all",...Object.keys(stageLabels)].map(s=><Link key={s} href={s==="all"?"/sales":"/sales?stage="+s} aria-current={stage===s?"page":undefined} className={"border px-3 py-2 text-sm "+(stage===s?"border-electric-cobalt text-warm-white":"border-steel text-silver hover:text-warm-white")}>{s==="all"?"All":stageLabels[s as keyof typeof stageLabels]}</Link>)}</div>
      <div className="mt-6 overflow-x-auto border border-steel">
        <table className="w-full min-w-[800px] text-left text-sm">
          <thead className="bg-graphite text-xs uppercase tracking-wide text-silver"><tr><th className="px-5 py-4">Business</th><th className="px-5 py-4">Service</th><th className="px-5 py-4">Stage</th><th className="px-5 py-4">Deal value</th><th className="px-5 py-4">Next follow-up</th><th className="px-5 py-4">Received</th></tr></thead>
          <tbody className="divide-y divide-steel">{shown.map(x=><tr key={x.id} className="hover:bg-graphite"><td className="px-5 py-4"><Link href={"/sales/lead/"+x.id} className="font-semibold text-warm-white underline decoration-steel underline-offset-4 hover:decoration-electric-cobalt">{x.company_name}</Link><p className="mt-1 text-xs text-silver">{x.contact_name}</p></td><td className="px-5 py-4 text-silver">{x.service}</td><td className="px-5 py-4">{stageLabels[x.stage]}</td><td className="px-5 py-4 text-silver">{formatMoney(x.estimated_value_cents)}</td><td className="px-5 py-4 text-silver">{x.next_follow_up?formatDate(x.next_follow_up):"Not set"}</td><td className="px-5 py-4 text-silver">{formatDate(x.created_at)}</td></tr>)}</tbody>
        </table>
        {!shown.length&&<p className="p-8 text-sm text-silver">No opportunities in this stage yet.</p>}
      </div>
      {all.length>=250&&<p className="mt-3 text-xs text-silver">Showing the latest 250 opportunities. Pagination will be added as volume grows.</p>}
      <p className="mt-8 text-xs text-silver">Contract values are manually entered estimates, not verified payments. Conversion event reporting is available under Conversion Report.</p>
    </div>
  </>;
}
