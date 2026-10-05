import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Container } from "@/components/container";
import { OperationRail } from "@/components/industries/operation-rail";
import { RichText } from "@/components/rich-text";
import { Section, SectionHeading } from "@/components/section";
import { ServiceConversion } from "@/components/services/service-conversion";
import {
  getIndustry,
  industryPath,
  type IndustryLayout,
  type IndustryPage,
  type IndustryReference,
} from "@/lib/industries";
import { getProject } from "@/lib/projects";
import { getService, servicePath } from "@/lib/services";
import { getSolution, solutionPath } from "@/lib/solutions";

const linkClass =
  "text-warm-white underline decoration-steel underline-offset-4 transition-colors hover:text-electric-cobalt hover:decoration-cobalt";

const sectionOrder: Record<
  IndustryLayout,
  readonly (
    | "relevance"
    | "positioning"
    | "operation"
    | "problems"
    | "systems"
    | "work"
    | "solutions"
    | "services"
    | "faq"
    | "related"
  )[]
> = {
  job: [
    "relevance",
    "operation",
    "problems",
    "systems",
    "work",
    "solutions",
    "services",
    "faq",
    "related",
  ],
  participation: [
    "relevance",
    "positioning",
    "operation",
    "problems",
    "systems",
    "work",
    "solutions",
    "services",
    "faq",
    "related",
  ],
  extension: [
    "relevance",
    "positioning",
    "operation",
    "problems",
    "systems",
    "solutions",
    "services",
    "faq",
    "related",
  ],
  coordination: [
    "relevance",
    "problems",
    "operation",
    "systems",
    "solutions",
    "services",
    "faq",
    "related",
  ],
};

function Relevance({ industry }: { industry: IndustryPage }) {
  return (
    <Section labelledBy="industry-relevance" className="bg-graphite">
      <SectionHeading
        id="industry-relevance"
        eyebrow="Why this is a SystemArc page"
        title={industry.relevance.question}
      >
        <RichText paragraphs={industry.relevance.answer} />
      </SectionHeading>
    </Section>
  );
}

function Positioning({ industry }: { industry: IndustryPage }) {
  if (!industry.positioning) return null;
  const columns = industry.positioning.columns;

  return (
    <Section labelledBy="industry-position">
      <div
        className={
          columns
            ? "grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start"
            : undefined
        }
      >
        <SectionHeading
          id="industry-position"
          eyebrow="Context"
          title={industry.positioning.heading}
        >
          <RichText paragraphs={industry.positioning.body} />
        </SectionHeading>
        {columns ? (
          <div className="grid gap-4">
            {columns.map((column, index) => (
              <div
                key={column.title}
                className={`border p-5 ${index === 1 ? "border-cobalt bg-carbon" : "border-steel bg-graphite"}`}
              >
                <h3 className="font-serif text-2xl tracking-[-0.02em] text-warm-white">
                  {column.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {column.points.map((point) => (
                    <li key={point} className="flex gap-3 text-sm leading-6 text-silver">
                      <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 bg-cobalt" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </Section>
  );
}

function Operation({ industry }: { industry: IndustryPage }) {
  return (
    <Section labelledBy="industry-operation" className="bg-slate">
      <SectionHeading
        id="industry-operation"
        eyebrow="How the operation works"
        title={industry.operationHeading}
      >
        <RichText paragraphs={industry.operationIntro} />
      </SectionHeading>
      <div className="mt-12">
        <OperationRail
          caption="The operation"
          stages={industry.stages}
          columns={industry.stages.length > 4 ? 5 : 4}
        />
      </div>
    </Section>
  );
}

function Problems({ industry }: { industry: IndustryPage }) {
  const cards = industry.layout === "job" || industry.layout === "extension";

  return (
    <Section labelledBy="industry-problems">
      <SectionHeading
        id="industry-problems"
        eyebrow="The operation"
        title={industry.problemsHeading}
      >
        {industry.problemsIntro ? <p>{industry.problemsIntro}</p> : null}
      </SectionHeading>
      {cards ? (
        <ul className="mt-12 grid gap-px border border-steel bg-steel sm:grid-cols-2">
          {industry.problems.map((item) => (
            <li key={item.title} className="bg-carbon px-5 py-5">
              <p className="font-mono text-[0.68rem] tracking-[0.16em] text-electric-cobalt uppercase">
                {item.title}
              </p>
              <p className="mt-2 text-sm leading-6 text-silver sm:text-base sm:leading-7">
                {item.body}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <ol className="mt-12 border-l border-cobalt">
          {industry.problems.map((item, index) => (
            <li
              key={item.title}
              className="grid gap-2 py-5 pl-6 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-8"
            >
              <p className="font-mono text-xs tracking-[0.16em] text-electric-cobalt">
                {String(index + 1).padStart(2, "0")}
              </p>
              <div>
                <p className="font-serif text-xl tracking-[-0.02em] text-warm-white">
                  {item.title}
                </p>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-silver sm:text-base sm:leading-7">
                  {item.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      )}
    </Section>
  );
}

function Systems({ industry }: { industry: IndustryPage }) {
  return (
    <Section labelledBy="industry-systems" className="bg-graphite">
      <SectionHeading id="industry-systems" eyebrow="Systems" title={industry.systemsHeading}>
        {industry.systemsIntro ? <p>{industry.systemsIntro}</p> : null}
      </SectionHeading>
      <ul className="mt-12 grid gap-px border border-steel bg-steel sm:grid-cols-2">
        {industry.systems.map((item) => (
          <li key={item.title} className="bg-carbon px-5 py-5">
            <h3 className="font-serif text-xl tracking-[-0.02em] text-warm-white">{item.title}</h3>
            <p className="mt-2 text-sm leading-6 text-silver">{item.body}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function References({
  id,
  eyebrow,
  title,
  intro,
  items,
  hrefFor,
  labelFor,
}: {
  id: string;
  eyebrow: string;
  title: string;
  intro: string;
  items: readonly IndustryReference[];
  hrefFor: (slug: string) => string | undefined;
  labelFor: (slug: string) => string | undefined;
}) {
  const rows = items
    .map((item) => {
      const href = hrefFor(item.slug);
      const label = labelFor(item.slug);
      if (!href || !label) return null;
      return { ...item, href, label };
    })
    .filter((item) => item !== null);

  if (rows.length === 0) return null;

  return (
    <Section labelledBy={id}>
      <SectionHeading id={id} eyebrow={eyebrow} title={title}>
        <p>{intro}</p>
      </SectionHeading>
      <ul className="mt-12 divide-y divide-steel border-y border-steel">
        {rows.map((item) => (
          <li key={item.slug} className="py-6">
            <h3 className="font-serif text-2xl tracking-[-0.02em]">
              <Link href={item.href} className={linkClass}>
                {item.label}
              </Link>
            </h3>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-silver">{item.note}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function Solutions({ industry }: { industry: IndustryPage }) {
  return (
    <References
      id="industry-solutions"
      eyebrow="Solutions"
      title="Solutions that start from this operation"
      intro="A solution names the business problem. It may take more than one kind of software to address it."
      items={industry.solutions}
      hrefFor={(slug) => (getSolution(slug) ? solutionPath(slug) : undefined)}
      labelFor={(slug) => getSolution(slug)?.name}
    />
  );
}

function Services({ industry }: { industry: IndustryPage }) {
  return (
    <References
      id="industry-services"
      eyebrow="Services"
      title="Services this operation may require"
      intro="These are the SystemArc services that may carry the work, alone or together."
      items={industry.services}
      hrefFor={(slug) => (getService(slug) ? servicePath(slug) : undefined)}
      labelFor={(slug) => getService(slug)?.name}
    />
  );
}

function Work({ industry }: { industry: IndustryPage }) {
  const projects = industry.relatedWork
    .map((item) => {
      const project = getProject(item.slug);
      return project ? { project, note: item.note } : null;
    })
    .filter((item) => item !== null);

  if (projects.length === 0) return null;

  return (
    <Section labelledBy="industry-work" className="bg-slate">
      <SectionHeading id="industry-work" eyebrow="SystemArc work" title="Related SystemArc work" />
      <ul className="mt-12 space-y-8">
        {projects.map(({ project, note }) => (
          <li key={project.slug} className="max-w-3xl border border-steel bg-carbon p-6 sm:p-8">
            <p className="font-mono text-xs tracking-[0.16em] text-electric-cobalt uppercase">
              {project.category}
            </p>
            <p className="mt-4 text-base leading-7 text-silver sm:text-lg sm:leading-8">
              <Link href={project.href} className={linkClass}>
                {project.name}
              </Link>{" "}
              {note}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function Faq({ industry }: { industry: IndustryPage }) {
  return (
    <Section labelledBy="industry-faq" className="bg-graphite">
      <SectionHeading
        id="industry-faq"
        eyebrow="Questions"
        title="Questions about this operation"
      />
      <div className="mt-12 divide-y divide-steel border-y border-steel">
        {industry.faq.map((item) => (
          <article
            key={item.question}
            className="grid gap-3 py-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-10"
          >
            <h3 className="font-serif text-2xl tracking-[-0.02em] text-warm-white">
              {item.question}
            </h3>
            <p className="text-base leading-7 text-silver">{item.answer}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}

function Related({ industry }: { industry: IndustryPage }) {
  const related = industry.relatedIndustries
    .map((item) => {
      const match = getIndustry(item.slug);
      return match ? { match, note: item.note } : null;
    })
    .filter((item) => item !== null);

  if (related.length === 0) return null;

  return (
    <Section labelledBy="industry-related">
      <SectionHeading id="industry-related" eyebrow="Related" title="A nearby operation" />
      <ul className="mt-12 grid gap-6">
        {related.map(({ match, note }) => (
          <li key={match.slug} className="border border-steel bg-graphite p-5 sm:p-6">
            <p className="font-mono text-xs tracking-[0.16em] text-electric-cobalt">
              {match.number}
            </p>
            <h3 className="mt-3 font-serif text-2xl tracking-[-0.02em]">
              <Link href={industryPath(match.slug)} className={linkClass}>
                {match.name}
              </Link>
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-silver sm:text-base sm:leading-7">
              {note}
            </p>
          </li>
        ))}
      </ul>
      <p className="mt-8">
        <Link href="/industries" className="text-sm text-warm-white underline decoration-steel underline-offset-4 hover:text-electric-cobalt hover:decoration-cobalt">
          All SystemArc industries
        </Link>
      </p>
    </Section>
  );
}

const sections = {
  relevance: Relevance,
  positioning: Positioning,
  operation: Operation,
  problems: Problems,
  systems: Systems,
  work: Work,
  solutions: Solutions,
  services: Services,
  faq: Faq,
  related: Related,
} as const;

export function IndustryPageView({ industry }: { industry: IndustryPage }) {
  return (
    <article>
      <section aria-labelledby="industry-heading">
        <Container className="pt-10 sm:pt-14">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Industries", href: "/industries" },
              { name: industry.name },
            ]}
          />
          <div className="mt-10 grid gap-12 pb-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-end lg:pb-20">
            <div>
              <p className="font-mono text-xs tracking-[0.18em] text-electric-cobalt uppercase">
                {industry.number} / {industry.eyebrow}
              </p>
              <h1
                id="industry-heading"
                className="mt-4 max-w-[14em] font-serif text-4xl leading-[1.08] tracking-[-0.03em] text-balance text-warm-white sm:text-5xl lg:text-6xl"
              >
                {industry.headline}
              </h1>
              <div className="mt-6 max-w-2xl space-y-4 text-base leading-7 text-secondary sm:text-lg sm:leading-8">
                <RichText paragraphs={industry.intro} />
              </div>
            </div>
            <OperationRail
              caption="Operational path"
              stages={industry.hubStages}
              columns={industry.hubStages.length > 4 ? 5 : 4}
            />
          </div>
        </Container>
      </section>
      {sectionOrder[industry.layout].map((key) => {
        const SectionBlock = sections[key];
        return <SectionBlock key={key} industry={industry} />;
      })}
      <ServiceConversion />
    </article>
  );
}
