import Link from "next/link";
import { confirmSignInAction, requestSignInAction } from "@/app/sales/actions";
import { isSalesLoginConfigured } from "@/lib/sales/auth";

type Params = { token?:string|string[]; sent?:string|string[]; error?:string|string[] };
export default async function SalesLoginPage({searchParams}:{searchParams:Promise<Params>}) {
  const params=await searchParams;
  const token=typeof params.token==="string" && /^[a-f0-9]{64}$/.test(params.token)?params.token:null;
  const sent=params.sent==="1";
  const error=typeof params.error==="string"?params.error:"";
  const ready=isSalesLoginConfigured();
  const message=error==="limit"?"Too many sign-in requests. Try again in an hour.":error==="expired"?"That link expired or has already been used. Request a fresh one.":error?"Sign-in isn't available right now. Please try again later.":"";
  return <section className="mx-auto max-w-xl px-5 py-20 sm:py-28">
    <p className="font-mono text-xs uppercase tracking-[0.16em] text-electric-cobalt">SystemArc / Authorized access</p>
    <h1 className="mt-5 font-serif text-4xl leading-tight sm:text-5xl">Sales Command Center</h1>
    <p className="mt-5 text-base leading-8 text-silver">Your private workspace for incoming client inquiries, prospects, follow-ups, quotes, and conversion reporting.</p>
    <div className="mt-9 border border-steel bg-graphite p-6 sm:p-9">
      {message&&<p role="alert" className="mb-5 border border-amber-700/50 p-3 text-sm text-warm-white">{message}</p>}
      {token ? <>
        <h2 className="text-xl font-semibold">Finish signing in</h2>
        <p className="mt-3 text-sm leading-7 text-silver">Use the confirmation button to complete your one-time sign-in. This link can only be used once.</p>
        <form action={confirmSignInAction} className="mt-6">
          <input type="hidden" name="token" value={token}/>
          <button type="submit" className="min-h-12 w-full bg-warm-white px-5 font-medium text-carbon hover:bg-electric-cobalt">Confirm sign-in →</button>
        </form>
      </> : sent ? <>
        <h2 className="text-xl font-semibold">Check your inbox</h2>
        <p className="mt-3 text-sm leading-7 text-silver">Your one-time login link was sent to info@systemarchq.com through Spacemail. Check the inbox and spam folder. It expires after 15 minutes.</p>
        <form action={requestSignInAction} className="mt-5"><button className="text-sm underline underline-offset-4">Request another link</button></form>
      </> : ready ? <>
        <h2 className="text-xl font-semibold">Sign in securely</h2>
        <p className="mt-3 text-sm leading-7 text-silver">We'll email a one-time access link through Spacemail to info@systemarchq.com. No password to remember.</p>
        <form action={requestSignInAction} className="mt-6">
          <button type="submit" className="min-h-12 w-full bg-warm-white px-5 font-medium text-carbon hover:bg-electric-cobalt">Email my sign-in link →</button>
        </form>
      </> : <>
        <h2 className="text-xl font-semibold">Access is not configured yet</h2>
        <p className="mt-3 text-sm text-silver">SystemArc's Spacemail connection is not configured yet. Add the SPACEMAIL_SMTP_PASSWORD secret in Vercel's SystemArc production environment. Never share your mailbox password in chat.</p>
      </>}
    </div>
    <Link href="/" className="mt-7 inline-block text-sm text-silver underline underline-offset-4">← Return to SystemArc</Link>
  </section>;
}
