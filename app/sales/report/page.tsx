import Link from "next/link";
import { requireSalesSession } from "@/lib/sales/auth";
import { createInquirySupabase } from "@/lib/supabase/server";
import { SalesHeading,Alert } from "@/components/sales/shell";

export const dynamic="force-dynamic";
const events=[
  ["page_view","Page views"],
  ["cta_click","Quote / project link clicks"],
  ["website_quote_started","Website form starts"],
  ["website_quote_submitted","Website inquiries delivered"],
  ["software_inquiry_started","Software form starts"],
  ["software_inquiry_submitted","Software inquiries delivered"],
] as const;
type ConversionRow = {event_name:string;traffic_source:string;campaign:string|null;page_path:string;occurred_at:string};
export default async function SalesReport() {
  await requireSalesSession();
  const client=createInquirySupabase();
  const since=new Date(Date.now()-30*24*3600*1000).toISOString();
  const {data,error}=client?await client.from("systemarc_conversion_events").select("event_name,traffic_source,campaign,page_path,occurred_at")
    .gte("occurred_at",since).order("occurred_at",{ascending:false}).limit(5000):{data:null,error:new Error("Missing database")};
  const rows=(data??[]) as ConversionRow[];
  const byEvent=Object.fromEntries(events.map(([key])=>[key,rows.filter(e=>e.event_name===key).length])) as Record<string,number>;
  const buckets=new Map<string,{source:string;campaign:string;views:number;clicks:number;leads:number}>();
  for (const row of rows) {
    const key=(row.traffic_source||"direct")+"|"+(row.campaign||"");
    if(!buckets.has(key)) buckets.set(key,{source:row.traffic_source||"direct",campaign:row.campaign||"—",views:0,clicks:0,leads:0});
    const item=buckets.get(key)!;
    if(row.event_name==="page_view") item.views++;
    if(row.event_name==="cta_click") item.clicks++;
    if(["website_quote_submitted","software_inquiry_submitted"].includes(row.event_name)) item.leads++;
  }
  const sources=[...buckets.values()].sort((a,b)=>b.leads-a.leads || b.clicks-a.clicks || b.views-a.views);
  return <>
    <SalesHeading title="Conversion Report" description="See which pages and campaigns create interest and delivered inquiries. This report uses first-party, privacy-conscious event tracking."/>
    <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
      {error&&<Alert message="Conversion data is temporarily unavailable. Check the analytics database connection."/>}
      <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="font-mono text-xs uppercase tracking-widest text-electric-cobalt">Last 30 days</p><h2 className="mt-2 font-serif text-3xl">Your website funnel</h2></div><Link href="/sales" className="text-sm underline underline-offset-4">View sales pipeline →</Link></div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{events.map(([key,label])=><article key={key} className="border border-steel bg-graphite p-6"><p className="text-sm text-silver">{label}</p><p className="mt-4 text-4xl font-semibold">{byEvent[key]??0}</p></article>)}</div>
      <h2 className="mt-14 font-serif text-3xl">Campaign sources</h2>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-silver">Tagged links let us measure Facebook, LinkedIn, outreach, and other traffic separately. No tagged campaign means a visit may appear as direct or referral.</p>
      <div className="mt-6 overflow-x-auto border border-steel"><table className="w-full min-w-[620px] text-left text-sm"><thead className="bg-graphite text-xs uppercase tracking-wider text-silver"><tr><th className="px-5 py-4">Source</th><th className="px-5 py-4">Campaign</th><th className="px-5 py-4">Page views</th><th className="px-5 py-4">Inquiry clicks</th><th className="px-5 py-4">Delivered leads</th></tr></thead><tbody className="divide-y divide-steel">{sources.map((x,i)=><tr key={x.source+x.campaign+i}><td className="px-5 py-4">{x.source}</td><td className="px-5 py-4 text-silver">{x.campaign}</td><td className="px-5 py-4">{x.views}</td><td className="px-5 py-4">{x.clicks}</td><td className="px-5 py-4">{x.leads}</td></tr>)}</tbody></table>{!sources.length&&<p className="p-6 text-sm text-silver">No events yet in this reporting window.</p>}</div>
      <p className="mt-6 text-sm leading-7 text-silver">These are event counts, not unique visitors. The lead figure counts confirmed website submissions; it is not a visitor conversion rate. Sales stages and contract values come from the separate pipeline. {rows.length>=5000?"This view shows the latest 5,000 events only.":""}</p>
    </div>
  </>;
}
