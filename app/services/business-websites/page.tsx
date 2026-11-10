import Link from "next/link";
import { Container } from "@/components/container";
import { createMetadata } from "@/lib/site";

export const metadata = createMetadata({
  title: "Business Website Design & Development",
  description: "Professional business websites from $999. Explore SystemArc's Launch and Business Pro packages, ongoing support, and an easy website quote request.",
  path: "/services/business-websites",
  index: true,
});

const packages = [
  { id: "launch", name: "Launch", price: "$999", intro: "A clear, credible website that helps people understand your business and get in touch.", features: ["Up to five core pages", "Responsive mobile-first layout", "Contact form and clear calls to action", "Basic search optimization", "Launch and handoff"] },
  { id: "business-pro", name: "Business Pro", price: "$1,999", intro: "For a growing business that needs more services, stronger lead capture, or connected tools.", features: ["Up to ten pages", "Lead capture or booking setup", "Analytics configuration", "Selected integrations, subject to provider access", "Launch and handoff"] },
] as const;

export default function BusinessWebsitesPage() {
  return <main>
    <section className="border-b border-steel bg-graphite"><Container className="py-16 sm:py-24">
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-electric-cobalt">Business website development</p>
      <h1 className="mt-5 max-w-4xl font-serif text-4xl leading-tight tracking-tight text-warm-white sm:text-6xl">A better website. A clearer path to your next customer.</h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-silver">Your website should quickly explain what you do, build confidence, and make it easy to call, request a quote, or book a service. SystemArc designs and builds business websites with that goal in mind.</p>
      <div className="mt-9 flex flex-wrap items-center gap-4"><Link href="/website-quote" className="inline-flex min-h-12 items-center justify-center rounded-md bg-warm-white px-6 font-medium text-carbon hover:bg-electric-cobalt">Get a website quote →</Link><Link href="/portfolio" className="inline-flex min-h-12 items-center text-warm-white underline underline-offset-8">See our work ↗</Link></div>
      <p className="mt-6 text-sm text-silver">Built in Kansas. Available to businesses nationwide.</p>
    </Container></section>
    <section className="border-b border-steel"><Container className="py-16 sm:py-20">
      <div className="max-w-3xl"><p className="font-mono text-xs uppercase tracking-widest text-electric-cobalt">Clear starting points</p><h2 className="mt-4 font-serif text-3xl text-warm-white sm:text-4xl">Website packages without the guesswork.</h2><p className="mt-4 text-silver">We agree on deliverables and price before work begins. These are starting prices; extra functionality, content, subscriptions, and integrations may change the quote.</p></div>
      <div className="mt-9 grid gap-6 md:grid-cols-2">{packages.map(plan=><article key={plan.id} className="flex flex-col border border-steel bg-graphite p-7 sm:p-9"><p className="font-mono text-xs uppercase tracking-widest text-electric-cobalt">{plan.name}</p><p className="mt-3 text-sm text-silver">Starting at</p><p className="mt-1 text-4xl font-semibold text-warm-white">{plan.price}</p><p className="mt-5 text-silver">{plan.intro}</p><ul className="mt-7 mb-8 flex-1 space-y-3 text-sm text-warm-white">{plan.features.map(feature=><li key={feature} className="flex gap-3"><span aria-hidden="true" className="text-electric-cobalt">✓</span>{feature}</li>)}</ul><Link href={`/website-quote?package=${plan.id}`} className="inline-flex min-h-12 items-center justify-center bg-warm-white px-5 font-medium text-carbon hover:bg-electric-cobalt">Get a {plan.name} quote →</Link></article>)}</div>
      <p className="mt-6 text-sm text-silver">Need ecommerce, member accounts, a portal, or custom functionality? <Link className="text-warm-white underline underline-offset-4" href="/start-a-project">Tell us about the project</Link> for a tailored scope.</p>
    </Container></section>
    <section><Container className="py-16 sm:py-20"><p className="font-mono text-xs uppercase tracking-widest text-electric-cobalt">Our approach</p><h2 className="mt-4 font-serif text-3xl text-warm-white sm:text-4xl">Simple process. Clear expectations.</h2><div className="mt-9 grid gap-6 md:grid-cols-3">{[["01 / Understand", "We learn your services, customers, content, and what a successful website needs to do."],["02 / Build & review", "We agree on scope and timing, build in reviewable stages, and test across screen sizes."],["03 / Launch & support", "We launch, confirm forms and links work, and offer a separately scoped maintenance plan."]].map(([heading,body])=><div key={heading} className="border-t border-steel pt-6"><h3 className="text-lg font-semibold text-warm-white">{heading}</h3><p className="mt-3 text-sm leading-7 text-silver">{body}</p></div>)}</div></Container></section>
    <section className="border-y border-steel bg-graphite"><Container className="py-16 sm:py-20"><h2 className="font-serif text-3xl text-warm-white sm:text-4xl">Need help after launch?</h2><p className="mt-4 max-w-2xl text-silver">Ask about ongoing updates, maintenance, support, and site improvements. Monthly coverage and response times are defined in your agreement so there are no surprises.</p><Link href="/website-quote?package=unsure" className="mt-7 inline-flex min-h-12 items-center justify-center bg-warm-white px-6 font-medium text-carbon hover:bg-electric-cobalt">Let's talk about your website →</Link></Container></section>
    <section><Container className="py-16 sm:py-20"><h2 className="font-serif text-3xl text-warm-white">See what we've built.</h2><p className="mt-4 max-w-2xl text-silver">From local service businesses to nonprofit organizations, our portfolio shows the kinds of digital experiences we build.</p><div className="mt-6 flex flex-wrap gap-5"><Link href="/portfolio" className="text-warm-white underline underline-offset-8">Explore our portfolio →</Link><Link href="/website-quote" className="text-warm-white underline underline-offset-8">Get a website quote →</Link></div></Container></section>
  </main>;
}
