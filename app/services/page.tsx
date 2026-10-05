import Link from "next/link";
import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";
import { JsonLd } from "@/components/json-ld";
import { Section, SectionHeading } from "@/components/section";
import { pageGraph, type SchemaNode } from "@/lib/schema";
import { servicePath, services } from "@/lib/services";
import { createMetadata, siteUrl, startProjectHref } from "@/lib/site";

const title = "Software Development Services | SystemArc";
const description =
  "Explore SystemArc custom software development, business automation, web application development, integrations, AI automation, customer portals, and internal business systems.";

const decisions = [
  {
    title: "A custom application",
    body: "Sometimes the right solution is a custom application.",
    href: "/services/custom-software-development",
  },
  {
    title: "Automation",
    body: "Sometimes it is automation between existing tools.",
    href: "/services/business-process-automation",
  },
  {
    title: "An API integration",
    body: "Sometimes an API integration removes the problem entirely.",
    href: "/services/software-integrations",
  },
  {
    title: "Change the process first",
    body: "Sometimes the existing process needs to change before technology should be introduced.",
  },
] as const;

export const metadata = createMetadata({
  title,
  description,
  path: "/services",
  absoluteTitle: true,
  index: true,
});

function servicesListNode(): SchemaNode {
  return {
    "@type": "ItemList",
    "@id": `${siteUrl}/services#list`,
    name: "SystemArc services",
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: service.name,
      item: `${siteUrl}${servicePath(service.slug)}`,
    })),
  };
}

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={pageGraph({
          path: "/services",
          name: title,
          description,
          breadcrumbs: [
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
          ],
          extra: [servicesListNode()],
        })}
      />
      <article>
        <section aria-labelledby="services-heading">
          <Container className="py-16 sm:py-20 xl:py-24">
            <p className="font-mono text-xs tracking-[0.18em] text-electric-cobalt uppercase">
              Services
            </p>
            <h1
              id="services-heading"
              className="mt-5 max-w-[16em] font-serif text-4xl leading-[1.08] tracking-[-0.02em] text-balance text-warm-white sm:text-5xl lg:text-6xl"
            >
              Technology built around the way your business works.
            </h1>
            <div className="mt-6 max-w-2xl space-y-4 text-base leading-7 text-silver sm:text-lg sm:leading-8">
              <p>
                SystemArc designs and builds software, automation, integrations,
                and digital systems around real business operations.
              </p>
              <p>
                Sometimes that means building something new. Sometimes it means
                connecting what already exists. The goal is not more software.
                The goal is a better system.
              </p>
            </div>
          </Container>
        </section>

        <Section labelledBy="service-overview" className="bg-graphite">
          <SectionHeading
            id="service-overview"
            eyebrow="Overview"
            title="Seven ways SystemArc works on an operation."
          />
          <ol className="mt-14 divide-y divide-steel border-y border-steel">
            {services.map((service) => (
              <li key={service.slug}>
                <article className="grid gap-4 py-8 sm:grid-cols-[4.5rem_minmax(0,1fr)] sm:gap-8 sm:py-10">
                  <p className="font-mono text-sm tracking-[0.16em] text-electric-cobalt">
                    {service.number}
                  </p>
                  <div className="max-w-3xl">
                    <h3 className="font-serif text-2xl tracking-[-0.02em] sm:text-3xl">
                      <Link
                        href={servicePath(service.slug)}
                        className="text-warm-white underline decoration-steel underline-offset-4 hover:text-electric-cobalt hover:decoration-cobalt"
                      >
                        {service.name}
                      </Link>
                    </h3>
                    <p className="mt-3 text-base leading-7 text-silver">
                      {service.hubSummary}
                    </p>
                  </div>
                </article>
              </li>
            ))}
          </ol>
        </Section>

        <Section labelledBy="system-first">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
            <SectionHeading
              id="system-first"
              eyebrow="The system comes first"
              title="Not every problem needs new software."
            >
              <p>SystemArc begins with the operation.</p>
              <p>
                Our job is to understand the problem well enough to determine
                what technology should actually do.
              </p>
            </SectionHeading>
            <ol className="border border-steel">
              {decisions.map((decision, index) => (
                <li
                  key={decision.title}
                  className="grid gap-3 border-b border-steel p-5 last:border-b-0 sm:grid-cols-[4rem_minmax(0,1fr)] sm:gap-6"
                >
                  <p className="font-mono text-xs tracking-[0.16em] text-electric-cobalt">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <div>
                    <h3 className="font-serif text-2xl tracking-[-0.02em] text-warm-white">
                      {"href" in decision ? (
                        <Link
                          href={decision.href}
                          className="underline decoration-steel underline-offset-4 hover:text-electric-cobalt hover:decoration-cobalt"
                        >
                          {decision.title}
                        </Link>
                      ) : (
                        decision.title
                      )}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-silver sm:text-base sm:leading-7">
                      {decision.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Section>

        <Section labelledBy="services-cta" className="bg-graphite">
          <div className="max-w-4xl">
            <div aria-hidden="true" className="mb-8 flex items-center gap-3">
              <span className="size-1.5 bg-cobalt" />
              <span className="h-px w-16 bg-cobalt" />
              <span className="size-1.5 border border-cobalt" />
            </div>
            <h2
              id="services-cta"
              className="max-w-[14em] font-serif text-3xl leading-[1.12] tracking-[-0.02em] text-balance text-warm-white sm:text-4xl lg:text-5xl"
            >
              Start with the problem, not the product.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-7 text-silver sm:text-lg sm:leading-8">
              Tell us what your team is doing manually, where information gets
              stuck, which systems do not communicate, or what you wish your
              current software could do.
            </p>
            <div className="mt-8">
              <ButtonLink href={startProjectHref}>Start a Project</ButtonLink>
            </div>
          </div>
        </Section>
      </article>
    </>
  );
}
