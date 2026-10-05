import Link from "next/link";
import { Container } from "@/components/container";
import { JsonLd } from "@/components/json-ld";
import { OperationRail } from "@/components/industries/operation-rail";
import { Section, SectionHeading } from "@/components/section";
import { ServiceConversion } from "@/components/services/service-conversion";
import { industries, industryPath } from "@/lib/industries";
import { getProject } from "@/lib/projects";
import { pageGraph, type SchemaNode } from "@/lib/schema";
import { createMetadata, siteUrl } from "@/lib/site";

const title = "Industries | Custom Business Software | SystemArc";
const description =
  "Explore how SystemArc approaches software, automation, integrations, and operational systems for repair businesses, gaming and hobby retail, retail operations, and local service businesses.";

const contexts = [
  {
    title: "Terminology",
    body: "The words the business uses for a job, a visit, a part, or a product state.",
  },
  {
    title: "Common workflows",
    body: "The path work usually takes, before the exceptions.",
  },
  {
    title: "Customer interactions",
    body: "What the customer expects to see, ask, or receive.",
  },
  {
    title: "Operational constraints",
    body: "Staff, locations, capacity, and the rules that are not optional.",
  },
  {
    title: "Existing software",
    body: "The tools that should stay, and the gaps between them.",
  },
  {
    title: "Industry-specific exceptions",
    body: "The cases a generic product keeps pushing into a side note.",
  },
] as const;

const linkClass =
  "text-warm-white underline decoration-steel underline-offset-4 transition-colors hover:text-electric-cobalt hover:decoration-cobalt";

export const metadata = createMetadata({
  title,
  description,
  path: "/industries",
  absoluteTitle: true,
  index: true,
});

function industriesListNode(): SchemaNode {
  return {
    "@type": "ItemList",
    "@id": `${siteUrl}/industries#list`,
    name: "SystemArc industries",
    itemListElement: industries.map((industry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: industry.name,
      item: `${siteUrl}${industryPath(industry.slug)}`,
    })),
  };
}

export default function IndustriesPage() {
  return (
    <>
      <JsonLd
        data={pageGraph({
          path: "/industries",
          name: title,
          description,
          breadcrumbs: [
            { name: "Home", path: "/" },
            { name: "Industries", path: "/industries" },
          ],
          extra: [industriesListNode()],
        })}
      />
      <article>
        <section aria-labelledby="industries-heading">
          <Container className="py-16 sm:py-20 xl:py-24">
            <p className="font-mono text-xs tracking-[0.18em] text-electric-cobalt uppercase">
              Industries
            </p>
            <h1
              id="industries-heading"
              className="mt-5 max-w-[16em] font-serif text-4xl leading-[1.08] tracking-[-0.02em] text-balance text-warm-white sm:text-5xl lg:text-6xl"
            >
              Software should understand the business it runs inside.
            </h1>
            <div className="mt-6 max-w-2xl space-y-4 text-base leading-7 text-silver sm:text-lg sm:leading-8">
              <p>Two businesses can need similar technology and still operate completely differently.</p>
              <p>
                Industry terminology, workflows, customer expectations, inventory, scheduling, staff
                responsibilities, and exceptions all shape what a useful system needs to do.
              </p>
              <p>SystemArc starts with those operational realities.</p>
            </div>
          </Container>
        </section>

        <Section labelledBy="domain-knowledge" className="bg-graphite">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
            <SectionHeading
              id="domain-knowledge"
              eyebrow="Domain knowledge"
              title="The workflow matters more than the category."
            >
              <p>SystemArc does not assume every company in an industry operates the same way.</p>
              <p>Industry knowledge gives us context. Discovery gives us the actual system.</p>
            </SectionHeading>
            <div>
              <p className="font-mono text-xs tracking-[0.16em] text-electric-cobalt uppercase">
                We use both to understand
              </p>
              <ol className="mt-4 border-l border-cobalt">
                {contexts.map((item, index) => (
                  <li key={item.title} className="py-4 pl-5">
                    <p className="font-mono text-[0.68rem] tracking-[0.16em] text-silver">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-1 font-serif text-2xl tracking-[-0.02em] text-warm-white">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-silver">{item.body}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <p className="mt-10 max-w-2xl text-base leading-7 text-silver sm:text-lg sm:leading-8">
            Then we design around the individual business.
          </p>
        </Section>

        <Section labelledBy="industry-studies">
          <SectionHeading
            id="industry-studies"
            eyebrow="Where there is context"
            title="Four operations, described from the work."
          >
            <p>
              These pages exist where SystemArc has operational context. They describe how the
              work tends to move. They do not assume every company in the category works the same
              way.
            </p>
          </SectionHeading>
          <div className="mt-16 space-y-20">
            {industries.map((industry) => {
              const project = industry.relatedWork
                .map((item) => getProject(item.slug))
                .find((item) => item !== undefined);

              return (
                <article key={industry.slug} className="border-t border-steel pt-10">
                  <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
                    <div className="lg:col-span-5">
                      <p className="font-mono text-xs tracking-[0.16em] text-electric-cobalt">
                        {industry.number} / {industry.eyebrow}
                      </p>
                      <h3 className="mt-3 font-serif text-3xl tracking-[-0.02em] text-warm-white sm:text-4xl">
                        <Link href={industryPath(industry.slug)} className={linkClass}>
                          {industry.name}
                        </Link>
                      </h3>
                      <p className="mt-4 text-base leading-7 text-silver">{industry.hubReality}</p>
                      <p className="mt-4 text-base leading-7 text-warm-white">
                        {industry.hubCapability}
                      </p>
                      {project ? (
                        <p className="mt-4 text-sm leading-6 text-silver">
                          Related work:{" "}
                          <Link href={project.href} className={linkClass}>
                            {project.name}
                          </Link>
                        </p>
                      ) : null}
                    </div>
                    <div className="lg:col-span-7">
                      <OperationRail
                        caption="Operational reality"
                        stages={industry.hubStages}
                        columns={industry.hubStages.length > 4 ? 5 : 4}
                      />
                      <div className="mt-8 grid gap-8 sm:grid-cols-2">
                        <div>
                          <p className="font-mono text-xs tracking-[0.16em] text-electric-cobalt uppercase">
                            Common pressure
                          </p>
                          <ul className="mt-3 space-y-3">
                            {industry.hubGaps.map((gap) => (
                              <li key={gap} className="flex gap-3 text-sm leading-6 text-silver">
                                <span
                                  aria-hidden="true"
                                  className="mt-2 size-1.5 shrink-0 bg-cobalt"
                                />
                                <span>{gap}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="font-mono text-xs tracking-[0.16em] text-electric-cobalt uppercase">
                            Relevant systems
                          </p>
                          <ul className="mt-3 space-y-3">
                            {industry.hubSystems.map((system) => (
                              <li key={system} className="text-sm leading-6 text-warm-white">
                                {system}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </Section>

        <ServiceConversion />
      </article>
    </>
  );
}
