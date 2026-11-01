import Link from "next/link";
import { Container } from "@/components/container";
import { mediaServices } from "@/lib/media";
export function MediaOffering() {
  return <section aria-labelledby="media-offering" className="border-t border-steel bg-graphite"><Container className="py-16 sm:py-24"><p className="agency-eyebrow">SystemArc Media</p><h2 id="media-offering" className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">Get the story right.<br />Get it in front of people.</h2><div className="mt-10 grid gap-x-12 md:grid-cols-2">{mediaServices.map(service=><article key={service.id} className="border-t border-steel py-7"><h3 className="text-2xl font-semibold"><Link href={`/media/${service.id}`} className="hover:text-electric-cobalt">{service.name} ↗</Link></h3><p className="mt-4 leading-7 text-silver">{service.detail}</p></article>)}</div><Link href="/media" className="mt-6 inline-flex min-h-12 items-center border-b border-cobalt text-lg">Explore the media offering ↗</Link></Container></section>;
}
