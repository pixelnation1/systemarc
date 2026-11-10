import Link from "next/link";
import { requireSalesSession } from "@/lib/sales/auth";
import { changeAdminPasswordAction } from "@/app/sales/actions";
import { SalesHeading, Alert, inputClass, labelClass } from "@/components/sales/shell";
export const dynamic="force-dynamic";
export default async function SalesAdminSettings({searchParams}:{searchParams:Promise<{error?:string;saved?:string}>}) {
  await requireSalesSession();
  const params=await searchParams;
  return <><SalesHeading title="Admin settings" description="Change your password without configuring email delivery. This credential controls access to your private SystemArc sales tools."/>
    <div className="mx-auto max-w-3xl px-5 py-10 sm:px-8">
      {params.saved==="1"&&<Alert message="Admin password updated. Other sessions have been revoked." ok/>}
      {params.error&&<Alert message={params.error==="invalid"?"Check your current password. The new password must be at least 16 characters and match its confirmation.":"The password change could not be completed. Try again."}/>}
      <section className="border border-steel bg-graphite p-6 sm:p-9">
        <h2 className="font-serif text-2xl">Change your admin password</h2>
        <p className="mt-3 text-sm leading-7 text-silver">Use a unique password of at least 16 characters. This is the only account that can access the Sales Command Center. Other browser sessions are revoked when it changes.</p>
        <form action={changeAdminPasswordAction} className="mt-7 space-y-6">
          <div><label className={labelClass} htmlFor="admin-current-password">Current password</label><input id="admin-current-password" name="current_password" type="password" autoComplete="current-password" required className={inputClass}/></div>
          <div><label className={labelClass} htmlFor="admin-new-password">New password (16–128 characters)</label><input id="admin-new-password" name="new_password" type="password" autoComplete="new-password" minLength={16} maxLength={128} required className={inputClass}/></div>
          <div><label className={labelClass} htmlFor="admin-confirm-password">Confirm new password</label><input id="admin-confirm-password" name="confirm_password" type="password" autoComplete="new-password" minLength={16} maxLength={128} required className={inputClass}/></div>
          <button type="submit" className="min-h-12 bg-warm-white px-6 font-medium text-carbon hover:bg-electric-cobalt">Update password →</button>
        </form>
      </section>
      <Link href="/sales" className="mt-6 inline-block text-sm text-silver underline underline-offset-4">← Back to Sales Command Center</Link>
    </div>
  </>;
}
