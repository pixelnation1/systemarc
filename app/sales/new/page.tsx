import Link from "next/link";
import { requireSalesSession } from "@/lib/sales/auth";
import { createSalesLeadAction } from "@/app/sales/actions";
import { SalesHeading,Alert,inputClass,labelClass } from "@/components/sales/shell";

export const dynamic="force-dynamic";
export default async function NewSalesLead({searchParams}:{searchParams:Promise<{error?:string}>}) {
  await requireSalesSession();
  const query=await searchParams;
  return <>
    <SalesHeading title="Add a prospect" description="Add a business you met, found through outreach, or spoke with directly. All details stay in the private sales workspace."/>
    <div className="mx-auto max-w-2xl px-5 py-10 sm:px-8">
      <Link href="/sales" className="text-sm text-silver underline underline-offset-4">← Back to pipeline</Link>
      {query.error&&<div className="mt-5"><Alert message="Could not save the lead. Enter a business and contact name, at least one contact method, and valid price/date fields."/></div>}
      <form action={createSalesLeadAction} className="mt-7 space-y-5 border border-steel bg-graphite p-6 sm:p-8">
        <div><label className={labelClass} htmlFor="new-company">Business *</label><input id="new-company" name="company" className={inputClass} required maxLength={160}/></div>
        <div><label className={labelClass} htmlFor="new-name">Contact name *</label><input id="new-name" name="name" className={inputClass} required maxLength={120}/></div>
        <div className="grid gap-5 sm:grid-cols-2"><div><label className={labelClass} htmlFor="new-email">Email</label><input id="new-email" name="email" type="email" className={inputClass} maxLength={254}/></div><div><label className={labelClass} htmlFor="new-phone">Phone</label><input id="new-phone" name="phone" type="tel" className={inputClass} maxLength={40}/></div></div>
        <p className="text-xs text-silver">Provide an email or phone number so you can follow up.</p>
        <div><label className={labelClass} htmlFor="new-service">Interested service</label><select id="new-service" name="service" defaultValue="Website" className={inputClass}>{["Website","Software","Automation","Media","Other"].map(s=><option value={s} key={s}>{s}</option>)}</select></div>
        <div><label className={labelClass} htmlFor="new-source">How did you connect?</label><select id="new-source" name="source" defaultValue="outreach" className={inputClass}><option value="outreach">Business outreach</option><option value="referral">Referral</option><option value="in_person">In person</option><option value="manual">Other</option></select></div>
        <div><label className={labelClass} htmlFor="new-summary">Opportunity or business need</label><textarea id="new-summary" name="summary" className={inputClass} rows={4} maxLength={2000} placeholder="What could SystemArc help them accomplish?"/></div>
        <div className="grid gap-5 sm:grid-cols-2"><div><label className={labelClass} htmlFor="new-value">Estimated value (USD)</label><input id="new-value" name="value" className={inputClass} inputMode="decimal" placeholder="1499.00"/></div><div><label className={labelClass} htmlFor="new-date">Follow up on</label><input id="new-date" name="next_follow_up" type="date" className={inputClass}/></div></div>
        <button type="submit" className="mt-4 min-h-12 w-full bg-warm-white px-5 font-medium text-carbon hover:bg-electric-cobalt">Add to pipeline →</button>
      </form>
    </div>
  </>;
}
