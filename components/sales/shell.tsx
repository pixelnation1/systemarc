import Link from "next/link";
import { signOutAction } from "@/app/sales/actions";

export function SalesHeading({title,description}:{title:string;description:string}) {
  return <div className="border-b border-steel bg-graphite"><div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-10">
    <p className="font-mono text-xs uppercase tracking-[0.16em] text-electric-cobalt">Private workspace / SystemArc</p>
    <h1 className="mt-3 font-serif text-3xl leading-tight sm:text-5xl">{title}</h1>
    <p className="mt-3 max-w-2xl text-sm leading-7 text-silver">{description}</p>
    <div className="mt-7 flex flex-wrap items-center gap-3">
      <Link href="/sales" className="inline-flex min-h-10 items-center border border-steel px-4 text-sm hover:border-cobalt">Pipeline</Link>
      <Link href="/sales/proposals" className="inline-flex min-h-10 items-center border border-steel px-4 text-sm hover:border-cobalt">Proposals</Link>
      <Link href="/sales/follow-ups" className="inline-flex min-h-10 items-center border border-steel px-4 text-sm hover:border-cobalt">Follow-ups</Link>
      <Link href="/sales/report" className="inline-flex min-h-10 items-center border border-steel px-4 text-sm hover:border-cobalt">Conversion Report</Link>
      <Link href="/sales/new" className="inline-flex min-h-10 items-center bg-warm-white px-4 text-sm font-medium text-carbon hover:bg-electric-cobalt">+ Add prospect</Link>
      <form action={signOutAction} className="ml-auto"><button type="submit" className="min-h-10 px-2 text-sm text-silver underline underline-offset-4">Sign out</button></form>
    </div>
  </div></div>;
}
export const inputClass = "mt-2 block min-h-11 w-full rounded-md border border-steel bg-carbon px-3 py-3 text-warm-white placeholder:text-silver/70 focus:border-electric-cobalt focus:outline-none";
export const labelClass = "block text-sm font-medium text-warm-white";
export function Alert({message,ok=false}:{message:string;ok?:boolean}) {
  return <p role="status" className={"mb-6 border px-4 py-3 text-sm " + (ok?"border-emerald-700/50 bg-emerald-900/20":"border-amber-700/50 bg-amber-900/20")}>{message}</p>;
}
