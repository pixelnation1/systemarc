import Link from "next/link";
import { requireSalesSession } from "@/lib/sales/auth";
import { createInquirySupabase } from "@/lib/supabase/server";
import { businessToday,formatDate,stageLabels,type SalesOpportunity } from "@/lib/sales/model";
import { sendFollowUpDigestNowAction } from "@/app/sales/follow-ups/actions";
import { SalesHeading,Alert } from "@/components/sales/shell";

export const dynamic="force-dynamic";
type Run={run_day:string;status:string;due_count:number;sent_at:string|null};
export default async function FollowUpsPage({searchParams}:{searchParams:Promise<{digest?:string}>}) {
  await requireSalesSession();
  const query=await searchParams;
  const client=createInquirySupabase();
  const [opportunities,runs]=client?await Promise.all([
    client.from("systemarc_sales_opportunities").select("*").in("stage",["new","contacted","qualified","proposal"])
      .not("next_follow_up","is",null).order("next_follow_up",{ascending:true}).limit(250),
    client.from("systemarc_sales_reminder_runs").select("run_day,status,due_count,sent_at")
      .order("run_day",{ascending:false}).limit(7),
  ]):[{data:null,error:new Error("Missing database")},{data:null,error:new Error("Missing database")}];
  const leads=(opportunities.data||[]) as SalesOpportunity[], today=businessToday();
  const overdue=leads.filter(x=>!!x.next_follow_up && x.next_follow_up<today);
  const due=leads.filter(x=>x.next_follow_up===today);
  const upcoming=leads.filter(x=>!!x.next_follow_up && x.next_follow_up>today);
  const digest=typeof query.digest==="string"?query.digest:"";
  const msg=digest==="sent"?"Reminder email accepted by our email provider.":digest==="duplicate"?"Today's reminder digest was already attempted; it won't send twice.":digest==="empty"?"Nothing due or overdue today. No email sent.":digest==="unavailable"?"The reminder couldn't be sent. Check the server's reminder settings and logs.":"";
  const last=(runs.data||[])[0] as Run|undefined;
  return <><SalesHeading title="Follow-ups" description="A clean list of who needs attention and when. SystemArc emails one private reminder digest daily when there are due or overdue opportunities."/>
    <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
      {msg&&<Alert message={msg} ok={digest==="sent"||digest==="empty"}/>}
      {(opportunities.error||runs.error)&&<Alert message="Could not load reminders. Check the database connection."/>}
      <div className="grid gap-3 md:grid-cols-3">
        {[["Overdue",overdue.length],["Due today",due.length],["Upcoming",upcoming.length]].map(([label,count])=><div key={label} className="border border-steel bg-graphite p-5"><p className="text-sm text-silver">{label}</p><p className="mt-2 text-3xl font-semibold">{count}</p></div>)}
      </div>
      <div className="mt-8 border border-steel bg-graphite p-6">
        <h2 className="font-serif text-2xl">Owner email reminders</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-silver">The system checks daily at 14:00 UTC (8 a.m. CST / 9 a.m. CDT). It sends one email only when leads are due or overdue. Notifications go to the private SystemArc sales/lead inbox, never to customers.</p>
        <p className="mt-3 text-sm text-silver">Last recorded digest: {last?(formatDate(last.run_day)+" · "+last.status+" · "+last.due_count+" due"):"None yet"}</p>
        <form action={sendFollowUpDigestNowAction} className="mt-5"><button type="submit" className="min-h-11 bg-warm-white px-5 text-sm font-medium text-carbon hover:bg-electric-cobalt">Email my current reminders →</button></form>
        <p className="mt-3 text-xs text-silver">This uses the same once-per-day safeguard as the scheduled email. Test it with a due follow-up before relying on automatic delivery.</p>
      </div>
      <h2 className="mt-12 font-serif text-3xl">Your next actions</h2>
      <div className="mt-6 overflow-x-auto border border-steel"><table className="w-full min-w-[700px] text-left text-sm">
        <thead className="bg-graphite text-xs uppercase tracking-wider text-silver"><tr><th className="px-5 py-4">Business</th><th className="px-5 py-4">Stage</th><th className="px-5 py-4">Follow-up date</th><th className="px-5 py-4">Status</th></tr></thead>
        <tbody className="divide-y divide-steel">{[...overdue,...due,...upcoming].map(x=><tr key={x.id}><td className="px-5 py-4"><Link className="underline underline-offset-4" href={"/sales/lead/"+x.id}>{x.company_name}</Link><p className="mt-1 text-xs text-silver">{x.contact_name} · {x.service}</p></td><td className="px-5 py-4">{stageLabels[x.stage]}</td><td className="px-5 py-4">{x.next_follow_up&&formatDate(x.next_follow_up)}</td><td className="px-5 py-4">{x.next_follow_up&&x.next_follow_up<today?"Overdue":x.next_follow_up===today?"Due today":"Upcoming"}</td></tr>)}</tbody>
      </table>{!leads.length&&<p className="p-7 text-sm text-silver">No follow-up dates assigned yet. Open an opportunity to set its next action.</p>}</div>
      <p className="mt-5 text-xs text-silver">The list shows up to 250 dated opportunities. Update the date after contacting a lead so overdue notifications stop.</p>
    </div></>;
}
