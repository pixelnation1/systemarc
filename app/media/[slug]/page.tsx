import Link from "next/link";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";
import { PageSchema } from "@/components/json-ld";
import { mediaDetails, mediaBriefHref } from "@/lib/media-detail";
import { createMetadata } from "@/lib/site";

export const dynamicParams = false;
export function generateStaticParams() {
  return mediaDetails.map(({ id }) => ({ slug: id }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = mediaDetails.find(item => item.id === slug);
  if (!service) notFound();
  return createMetadata({ title: service.title, description: service.intro, path: `/media/${slug}`, index: true });
}
export default async function MediaServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = mediaDetails.find(item => item.id === slug);
  if (!service) notFound();
  return <>
    <PageSchema path={`/media/${slug}`} name={service.title} description={service.intro} breadcrumbs={[{ name: "Home", path: "/" }, { name: "Media", path: "/media" }, { name: service.title, path: `/media/${slug}` }]} />
    <section className="agency-hero">
      <Container className="py-16 sm:py-24">
        <Link href="/media" className="inline-flex min-h-11 items-center text-sm underline underline-offset-4">← SystemArc Media</Link>
        <p className="mt-8 font-mono text-xs uppercase tracking-widest">{service.title}</p>
        <h1 className="mt-6 max-w-5xl text-5xl font-bold leading-[1.02] tracking-[-0.045em] sm:text-7xl lg:text-8xl">{service.headline}</h1>
        <p className="mt-8 max-w-2xl text-xl leading-8">{service.intro}</p>
        <ButtonLink href={mediaBriefHref(service.id)} className="mt-8">Tell Us About Your Project ↗</ButtonLink>
      </Container>
    </section>
    <Container className="grid gap-8 py-16 lg:grid-cols-[1fr_2fr]">
      <p className="agency-eyebrow">Where this fits</p><p className="max-w-3xl text-2xl leading-9">{service.fit}</p>
    </Container>
    <section className="border-y border-steel" aria-labelledby="deliverables">
      <Container className="py-16 sm:py-24">
        <p className="agency-eyebrow">The scope</p><h2 id="deliverables" className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">What the work can include.</h2>
        <p className="mt-5 max-w-2xl leading-7 text-silver">We agree on the deliverables, volume, channels, and review schedule in your proposal.</p>
        <div className="mt-12 grid gap-x-12 md:grid-cols-2">{service.outputs.map(([title, body], i) => <article key={title} className="border-t border-steel py-8"><span className="font-mono text-xs text-electric-cobalt">0{i + 1}</span><h3 className="mt-4 text-2xl font-semibold">{title}</h3><p className="mt-4 leading-7 text-silver">{body}</p></article>)}</div>
      </Container>
    </section>
    <section className="agency-paper" aria-labelledby="example">
      <Container className="grid gap-10 py-16 sm:py-24 lg:grid-cols-2"><div><p className="font-mono text-xs uppercase tracking-widest">Illustrative engagement / Not a client case study</p><h2 id="example" className="mt-5 text-4xl font-semibold leading-tight tracking-tight">{service.example[0]}</h2></div><p className="text-xl leading-9">{service.example[1]}</p></Container>
    </section>
    <Container className="grid gap-12 py-16 sm:py-24 md:grid-cols-2"><section><h2 className="text-3xl font-semibold">What we need from you.</h2><p className="mt-5 leading-8 text-silver">{service.inputs}</p></section><section><h2 className="text-3xl font-semibold">How we evaluate the work.</h2><p className="mt-5 leading-8 text-silver">{service.measures}</p></section></Container>
    <section className="border-t border-steel"><Container className="py-16"><p className="agency-eyebrow">Connected capabilities</p><div className="mt-6 flex flex-wrap gap-x-8 gap-y-3">{mediaDetails.filter(item => item.id !== slug).map(item => <Link key={item.id} href={`/media/${item.id}`} className="inline-flex min-h-11 items-center underline underline-offset-8 hover:text-electric-cobalt">{item.title} ↗</Link>)}</div></Container></section>
    <section className="bg-cobalt"><Container className="py-16 sm:py-24"><h2 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">Let&apos;s turn the brief into a plan.</h2><div className="mt-8 flex flex-wrap gap-4"><ButtonLink href={mediaBriefHref(service.id)}>Start a Media Conversation ↗</ButtonLink><Link href="/media/approach" className="inline-flex min-h-12 items-center px-3 underline underline-offset-8">See How Engagements Work</Link></div></Container></section>
  </>;
}
