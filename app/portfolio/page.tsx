import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/container";
import { JsonLd } from "@/components/json-ld";
import { WorkConversion } from "@/components/work/work-conversion";
import { portfolioProjects } from "@/lib/portfolio";
import { pageGraph } from "@/lib/schema";
import { createMetadata, siteUrl } from "@/lib/site";

const title = "Website & Software Portfolio";
const description = "Explore six websites and software products built by SystemArc: RepairForge, ReviewForge, TCGKingdoms, Flint Hills Outdoor Co., Monique A Wish, and Midwest PixelFest.";
export const metadata = createMetadata({ title, description, path: "/portfolio", index: true });

export default function PortfolioPage() {
  return (
    <>
      <JsonLd data={pageGraph({ path: "/portfolio", name: title, description,
        breadcrumbs: [{ name: "Home", path: "/" }, { name: "Portfolio", path: "/portfolio" }],
        extra: [{ "@type": "ItemList", "@id": `${siteUrl}/portfolio#projects`, name: "SystemArc portfolio", itemListElement: portfolioProjects.map((project, index) => ({ "@type": "ListItem", position: index + 1, name: project.name, url: project.url })) }],
      })} />
      <Container className="py-20 sm:py-28">
        <p className="font-mono text-xs tracking-[0.18em] text-electric-cobalt uppercase">The SystemArc portfolio</p>
        <h1 className="mt-5 max-w-4xl font-serif text-5xl leading-[1.05] tracking-[-0.03em] text-balance text-warm-white sm:text-7xl">Built to be used.<br />Made to stand out.</h1>
        <p className="mt-7 max-w-2xl text-lg leading-8 text-silver">Business software. Online marketplaces. Websites with a purpose. Explore a selection of projects we&apos;ve built, then see them for yourself.</p>
        <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-steel pt-6 font-mono text-xs tracking-[0.12em] text-silver uppercase">
          <span>06 featured projects</span><span>Software & websites</span><span>Real website previews</span>
        </div>
      </Container>
      <Container className="pb-20 sm:pb-28">
        <div className="grid gap-x-8 gap-y-16 lg:grid-cols-2 lg:gap-y-20">
          {portfolioProjects.map((project, index) => (
            <article id={project.slug} key={project.slug} className="group min-w-0 scroll-mt-24">
              <a href={project.url} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${project.name} (opens in a new tab)`} className="block overflow-hidden border border-steel bg-graphite transition-colors hover:border-cobalt">
                <div aria-hidden="true" className="flex items-center gap-2 border-b border-steel px-4 py-3">
                  <span className="size-1.5 rounded-full bg-silver/50" /><span className="size-1.5 rounded-full bg-silver/50" /><span className="size-1.5 rounded-full bg-silver/50" />
                  <span className="ml-3 truncate font-mono text-[0.65rem] text-silver">{new URL(project.url).hostname}</span>
                  <span className="ml-auto text-silver">↗</span>
                </div>
                <div className="relative aspect-[36/25] overflow-hidden bg-graphite">
                  <Image src={`/images/work/${project.slug}/hero.webp`} alt={`${project.name} homepage screenshot`} fill sizes="(min-width: 1024px) 50vw, 100vw" priority={index < 2} className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.015] motion-reduce:transform-none" />
                </div>
              </a>
              <div className="mt-6 flex items-center justify-between gap-4 font-mono text-[0.68rem] tracking-[0.14em] text-electric-cobalt uppercase"><span>{project.category}</span><span>{String(index + 1).padStart(2, "0")}</span></div>
              <h2 className="mt-3 font-serif text-3xl tracking-[-0.02em] text-warm-white sm:text-4xl">{project.name}</h2>
              <p className="mt-3 text-lg leading-7 text-warm-white">{project.headline}</p>
              <p className="mt-3 text-base leading-7 text-silver">{project.description}</p>
              <ul aria-label={`${project.name} project focus`} className="mt-5 flex flex-wrap gap-2">{project.tags.map(tag => <li key={tag} className="border border-steel px-2.5 py-1.5 text-xs text-silver">{tag}</li>)}</ul>
              <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
                <a href={project.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 text-sm text-warm-white underline decoration-cobalt underline-offset-8 hover:text-electric-cobalt">Visit website <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a>
                {project.caseStudy && <Link href={project.caseStudy} className="inline-flex min-h-11 items-center text-sm text-silver hover:text-electric-cobalt">Explore the case study →</Link>}
              </div>
            </article>
          ))}
        </div>
        <div className="mt-20 border-t border-steel pt-8 text-silver"><p>Go deeper into the systems behind the work.</p><Link href="/work" className="mt-2 inline-flex min-h-11 items-center gap-2 text-sm text-warm-white hover:text-electric-cobalt">Read our software case studies →</Link></div>
      </Container>
      <WorkConversion />
    </>
  );
}
