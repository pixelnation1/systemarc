import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";
import { portfolioProjects } from "@/lib/portfolio";

const work = [portfolioProjects[3], portfolioProjects[0], portfolioProjects[5]];
const capabilities = [
  { number: "01", title: "Creative that connects.", text: "Brand strategy, short-form video, social content, and stories that give people a reason to pay attention.", href: "/media#creative", link: "Explore creative & content" },
  { number: "02", title: "Media with a purpose.", text: "Social publishing, paid campaigns, and creative testing built around the audience you need to reach and the action you want them to take.", href: "/media#paid-media", link: "Explore social & media" },
  { number: "03", title: "Technology that delivers.", text: "Websites, commerce, custom software, and automation that connect the first click to the work happening inside your business.", href: "/services#service-overview", link: "Explore technology" },
];

export function AgencyHome() {
  return <>
    <section className="agency-hero" aria-labelledby="agency-title">
      <Container className="relative py-16 sm:py-24 lg:py-28">
        <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs uppercase tracking-[0.16em]">
          <p>Independent thinking. Connected execution.</p><p className="opacity-75">Creative / Media / Technology</p>
        </div>
        <h1 id="agency-title" className="agency-display mt-12">Get attention.<br />Build what&apos;s<br /><span className="agency-outline">next.</span></h1>
        <div className="mt-12 grid gap-8 border-t border-white/30 pt-8 lg:grid-cols-2 lg:items-end">
          <p className="max-w-xl text-lg leading-8 sm:text-xl">SystemArc brings content, media, websites, and custom software together to help ambitious businesses move forward.</p>
          <div className="flex flex-wrap gap-3 lg:justify-end"><ButtonLink href="/start-a-project">Let&apos;s Talk <span aria-hidden="true" className="ml-5">↗</span></ButtonLink><Link href="#selected-work" className="inline-flex min-h-12 items-center border border-white/60 px-5 text-sm hover:bg-white/10">Explore Our Work ↓</Link></div>
        </div>
      </Container>
    </section>
    <section className="border-b border-steel" aria-label="Our perspective"><Container className="grid gap-6 py-16 lg:grid-cols-[1fr_2fr]"><p className="agency-eyebrow">One connected partner</p><div><h2 className="text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">Your marketing and your technology should move together.</h2><p className="mt-6 max-w-2xl text-lg leading-8 text-silver">A great story needs somewhere to send people. A great website needs people to find it. We connect the creative, the distribution, and the systems behind the next step.</p></div></Container></section>
    <section aria-labelledby="capabilities-title"><Container className="py-16 sm:py-24"><p className="agency-eyebrow">What we do</p><h2 id="capabilities-title" className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">From first impression<br />to what happens next.</h2><div className="mt-12 grid lg:grid-cols-3">{capabilities.map(item=><article key={item.number} className="border-t border-steel py-8 lg:pr-10"><span className="font-mono text-sm text-electric-cobalt">/{item.number}</span><h3 className="mt-8 text-3xl font-semibold tracking-tight">{item.title}</h3><p className="mt-5 text-base leading-7 text-silver">{item.text}</p><Link href={item.href} className="mt-7 inline-flex min-h-11 items-center gap-3 text-sm underline underline-offset-8 hover:text-electric-cobalt">{item.link} <span aria-hidden="true">↗</span></Link></article>)}</div></Container></section>
    <section id="selected-work" aria-labelledby="agency-work" className="agency-paper"><Container className="py-16 sm:py-24"><div className="flex flex-wrap items-end justify-between gap-6"><div><p className="font-mono text-xs uppercase tracking-widest">Selected work / Websites & software</p><h2 id="agency-work" className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">Built for the real world.</h2></div><Link href="/portfolio" className="inline-flex min-h-11 items-center underline underline-offset-8">Full portfolio ↗</Link></div><div className="mt-12 grid gap-9 md:grid-cols-3">{work.map(project=><Link key={project.slug} href={`/portfolio#${project.slug}`} className="group"><div className="relative aspect-[4/3] overflow-hidden bg-carbon"><Image src={`/images/work/${project.slug}/hero.webp`} alt={`${project.name} website designed by SystemArc`} fill sizes="(max-width: 767px) 100vw, 33vw" className="object-cover object-top transition-transform duration-300 group-hover:scale-105 motion-reduce:transform-none" /></div><p className="mt-5 font-mono text-xs uppercase tracking-wider">{project.category}</p><h3 className="mt-2 text-2xl font-semibold">{project.name} ↗</h3><p className="mt-3 leading-7">{project.headline}</p></Link>)}</div><p className="mt-10 max-w-2xl text-sm leading-6">Our existing work demonstrates our website and software capabilities. Media engagements are scoped around your audience, channels, and goals.</p></Container></section>
    <section aria-labelledby="approach-title"><Container className="grid gap-12 py-16 sm:py-24 lg:grid-cols-2"><div><p className="agency-eyebrow">How we work</p><h2 id="approach-title" className="mt-4 text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">Understand.<br />Create.<br />Learn. Repeat.</h2><p className="mt-6 max-w-lg text-lg leading-8 text-silver">Start with the business problem. Put the right work into the world. Use what happens to make the next decision.</p></div><ol className="divide-y divide-steel border-y border-steel">{[
      ["Find the real opportunity", "We align on your audience, business goals, current channels, and what success should look like."],
      ["Build the right team and scope", "We define deliverables, responsibilities, timelines, approvals, and budget before work begins."],
      ["Launch, measure, improve", "We review the work against agreed goals, share what we learn, and prioritize the next round of improvements."],
    ].map(([title,body],i)=><li key={title} className="py-8"><p className="font-mono text-xs text-electric-cobalt">0{i+1}</p><h3 className="mt-3 text-2xl font-semibold">{title}</h3><p className="mt-3 leading-7 text-silver">{body}</p></li>)}</ol></Container></section>
    <section className="bg-cobalt" aria-labelledby="agency-cta"><Container className="py-16 sm:py-24"><p className="font-mono text-xs uppercase tracking-widest">Built in Kansas. Ready for your next chapter.</p><h2 id="agency-cta" className="mt-6 max-w-4xl text-5xl font-bold leading-[1.02] tracking-[-0.04em] sm:text-7xl">Big ambitions?<br />Let&apos;s get to work.</h2><p className="mt-6 max-w-xl text-lg leading-8">Bring us the challenge. We&apos;ll help define the creative, media, and technology needed to move it forward.</p><ButtonLink href="/start-a-project" className="mt-8">Start the Conversation ↗</ButtonLink></Container></section>
  </>;
}
