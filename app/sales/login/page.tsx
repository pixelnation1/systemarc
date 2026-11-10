import Link from "next/link";
import { signInWithPasswordAction } from "@/app/sales/actions";
import { isSalesLoginConfigured, hasSalesSession } from "@/lib/sales/auth";
import { redirect } from "next/navigation";
export const dynamic="force-dynamic";
export default async function SalesLoginPage({searchParams}:{searchParams:Promise<{error?:string|string[]}>}) {
  if(await hasSalesSession())redirect("/sales");
  const params=await searchParams;
  const ready=isSalesLoginConfigured();
  return <section className="mx-auto max-w-xl px-5 py-20 sm:py-28">
    <p className="font-mono text-xs uppercase tracking-[0.16em] text-electric-cobalt">SystemArc / Private admin</p>
    <h1 className="mt-5 font-serif text-4xl leading-tight sm:text-5xl">Admin Command Center</h1>
    <p className="mt-5 text-base leading-8 text-silver">One private password. No emailed codes or sign-in links. Your sales pipeline, proposals, follow-ups, and reporting remain restricted to your session.</p>
    <div className="mt-9 border border-steel bg-graphite p-6 sm:p-9">
      {params.error&&<p role="alert" className="mb-5 border border-amber-700/50 p-3 text-sm text-warm-white">Unable to sign in. Check the password or try again after 15 minutes if there have been multiple attempts.</p>}
      {ready? <>
        <h2 className="text-xl font-semibold">Admin sign-in</h2>
        <form action={signInWithPasswordAction} className="mt-5">
          <label className="block text-sm text-warm-white" htmlFor="sales-password">Admin password</label>
          <input id="sales-password" name="password" type="password" required minLength={1} maxLength={256} autoComplete="current-password" className="mt-2 block min-h-12 w-full rounded-md border border-steel bg-carbon px-4 text-warm-white focus:border-electric-cobalt focus:outline-none"/>
          <button type="submit" className="mt-5 min-h-12 w-full bg-warm-white px-5 font-medium text-carbon hover:bg-electric-cobalt">Sign in to admin →</button>
        </form>
        <p className="mt-5 text-xs leading-6 text-silver">Private access only. There is no self-registration or password recovery by email. You can change your password after signing in.</p>
      </>:<p className="text-sm leading-7 text-silver">Admin storage isn't configured. The owner account must be initialized before login is available.</p>}
    </div>
    <Link href="/" className="mt-7 inline-block text-sm text-silver underline underline-offset-4">← Return to SystemArc</Link>
  </section>;
}
