import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Container } from "@/components/container";
import { RichText } from "@/components/rich-text";
import { Section, SectionHeading } from "@/components/section";
import { ServiceConversion } from "@/components/services/service-conversion";
import { ServiceFigure } from "@/components/services/service-figure";
import { getProject } from "@/lib/projects";
import {
  getService,
  servicePath,
  type ServiceLayout,
  type ServicePage,
} from "@/lib/services";

const sectionOrder: Record<
  ServiceLayout,
  readonly (
    | "definition"
    | "problems"
    | "builds"
    | "approach"
    | "useCases"
    | "aside"
    | "work"
    | "faq"
    | "related"
  )[]
> = {
  stack: [
    "definition",
    "problems",
    "builds",
    "approach",
    "useCases",
    "aside",
    "work",
    "faq",
    "related",
  ],
  caution: [
    "definition",
    "aside",
    "problems",
    "builds",
    "approach",
    "useCases",
    "work",
    "faq",
    "related",
  ],
  contrast: [
    "definition",
    "aside",
    "problems",
    "builds",
    "approach",
    "useCases",
    "work",
    "faq",
    "related",
  ],
  connect: [
    "definition",
    "problems",
    "builds",
    "approach",
    "aside",
    "useCases",
    "work",
    "faq",
    "related",
  ],
  review: [
    "definition",
    "aside",
    "problems",
    "builds",
    "approach",
    "useCases",
    "faq",
    "related",
  ],
  path: [
    "definition",
    "builds",
    "problems",
    "approach",
    "useCases",
    "aside",
    "work",
    "faq",
    "related",
  ],
  operations: [
    "definition",
    "problems",
    "builds",
    "aside",
    "approach",
    "useCases",
    "work",
    "faq",
    "related",
  ],
};

function ItemList({
  items,
  columns = false,
}: {
  items: readonly { title: string; body: string }[];
  columns?: boolean;
}) {
  return (
    <ul
      className={
        columns
          ? "mt-12 grid gap-px border border-steel bg-steel sm:grid-cols-2"
          : "mt-12 divide-y divide-steel border-y border-steel"
      }
    >
      {items.map((item) => (
        <li key={item.title} className="bg-carbon px-0 py-6 sm:px-2">
          <p className="font-serif text-xl tracking-[-0.02em] text-warm-white">
            {item.title}
          </p>
          <p className="mt-2 max-w-xl text-sm leading-6 text-silver sm:text-base sm:leading-7">
            {item.body}
          </p>
        </li>
      ))}
    </ul>
  );
}

function Definition({ service }: { service: ServicePage }) {
  return (
    <Section labelledBy="service-definition" className="bg-graphite">
      <SectionHeading
        id="service-definition"
        eyebrow="Definition"
        title={service.definition.question}
      >
        <RichText paragraphs={service.definition.answer} />
      </SectionHeading>
    </Section>
  );
}

function Problems({ service }: { service: ServicePage }) {
  return (
    <Section labelledBy="service-problems">
      <SectionHeading id="service-problems" eyebrow="Problems" title={service.problemsHeading} />
      <ItemList items={service.problems} />
    </Section>
  );
}

function Builds({ service }: { service: ServicePage }) {
  return (
    <Section labelledBy="service-builds" className="bg-slate">
      <SectionHeading id="service-builds" eyebrow="What we build" title={service.buildsHeading}>
        {service.buildsIntro ? <p>{service.buildsIntro}</p> : null}
      </SectionHeading>
      <ItemList items={service.builds} columns />
    </Section>
  );
}

function Approach({ service }: { service: ServicePage }) {
  return (
    <Section labelledBy="service-approach">
      <SectionHeading id="service-approach" eyebrow="Approach" title={service.approachHeading} />
      <ol className="mt-12 grid gap-8 lg:grid-cols-4">
        {service.approach.map((step, index) => (
          <li key={step.title} className="border-t border-cobalt pt-5">
            <p className="font-mono text-xs tracking-[0.16em] text-electric-cobalt">
              {String(index + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-3 font-serif text-2xl tracking-[-0.02em] text-warm-white">
              {step.title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-silver">{step.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

function UseCases({ service }: { service: ServicePage }) {
  return (
    <Section labelledBy="service-use-cases" className="bg-graphite">
      <SectionHeading id="service-use-cases" eyebrow="Use cases" title={service.useCasesHeading} />
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {service.useCases.map((item) => (
          <article key={item.title} className="border border-steel bg-carbon p-5">
            <h3 className="font-serif text-2xl tracking-[-0.02em] text-warm-white">
              {item.title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-silver">{item.body}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}

function Aside({ service }: { service: ServicePage }) {
  if (!service.aside) return null;

  return (
    <Section labelledBy="service-aside">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start">
        <SectionHeading id="service-aside" eyebrow="A closer look" title={service.aside.heading}>
          <RichText paragraphs={service.aside.body} />
        </SectionHeading>
        {service.aside.columns ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {service.aside.columns.map((column) => (
              <div key={column.title} className="border border-steel bg-graphite p-5">
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

function RelatedWork({ service }: { service: ServicePage }) {
  const projects = service.relatedWork
    .map((item) => {
      const project = getProject(item.slug);
      return project ? { project, note: item.note } : null;
    })
    .filter((item) => item !== null);

  if (projects.length === 0) return null;

  return (
    <Section labelledBy="service-work" className="bg-slate">
      <SectionHeading id="service-work" eyebrow="SystemArc work" title="Related SystemArc work" />
      <ul className="mt-12 space-y-8">
        {projects.map(({ project, note }) => (
          <li key={project.slug} className="max-w-3xl border-t border-steel pt-6">
            <p className="text-base leading-7 text-secondary sm:text-lg sm:leading-8">
              <Link
                href={project.href}
                className="text-warm-white underline decoration-steel underline-offset-4 hover:text-electric-cobalt hover:decoration-cobalt"
              >
                {project.name}
              </Link>{" "}
              {note}
            </p>
            <p className="mt-3 font-mono text-xs tracking-[0.14em] text-silver uppercase">
              {project.category}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function Faq({ service }: { service: ServicePage }) {
  return (
    <Section labelledBy="service-faq">
      <SectionHeading id="service-faq" eyebrow="Questions" title="Questions about this service" />
      <div className="mt-12 divide-y divide-steel border-y border-steel">
        {service.faq.map((item) => (
          <article key={item.question} className="grid gap-3 py-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-10">
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

function RelatedServices({ service }: { service: ServicePage }) {
  const related = service.relatedServices
    .map((slug) => getService(slug))
    .filter((item) => item !== undefined);

  if (related.length === 0) return null;

  return (
    <Section labelledBy="service-related" className="bg-graphite">
      <SectionHeading id="service-related" eyebrow="Related" title="Services that often sit beside this one" />
      <ul className="mt-12 grid gap-6 lg:grid-cols-3">
        {related.map((item) => (
          <li key={item.slug} className="border border-steel bg-carbon p-5">
            <p className="font-mono text-xs tracking-[0.16em] text-electric-cobalt">
              {item.number}
            </p>
            <h3 className="mt-3 font-serif text-2xl tracking-[-0.02em]">
              <Link
                href={servicePath(item.slug)}
                className="text-warm-white underline decoration-steel underline-offset-4 hover:text-electric-cobalt hover:decoration-cobalt"
              >
                {item.name}
              </Link>
            </h3>
            <p className="mt-3 text-sm leading-6 text-silver">{item.hubSummary}</p>
          </li>
        ))}
      </ul>
      <p className="mt-8">
        <Link
          href="/services"
          className="text-sm text-warm-white underline decoration-steel underline-offset-4 hover:text-electric-cobalt hover:decoration-cobalt"
        >
          All SystemArc services
        </Link>
      </p>
    </Section>
  );
}

const sections = {
  definition: Definition,
  problems: Problems,
  builds: Builds,
  approach: Approach,
  useCases: UseCases,
  aside: Aside,
  work: RelatedWork,
  faq: Faq,
  related: RelatedServices,
} as const;

export function ServicePageView({ service }: { service: ServicePage }) {
  return (
    <article>
      <section aria-labelledby="service-heading">
      <Container className="pt-10 sm:pt-14">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Services", href: "/services" },
            { name: service.name },
          ]}
        />
        <div className="mt-10 grid gap-12 pb-16 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)] lg:items-end lg:pb-20">
          <div>
            <p className="font-mono text-xs tracking-[0.18em] text-electric-cobalt uppercase">
              {service.number} / {service.eyebrow}
            </p>
            <h1
              id="service-heading"
              className="mt-4 max-w-[14em] font-serif text-4xl leading-[1.08] tracking-[-0.03em] text-balance text-warm-white sm:text-5xl lg:text-6xl"
            >
              {service.headline}
            </h1>
            <div className="mt-6 max-w-2xl space-y-4 text-base leading-7 text-secondary sm:text-lg sm:leading-8">
              <RichText paragraphs={service.intro} />
            </div>
          </div>
          <ServiceFigure layout={service.layout} />
        </div>
      </Container>
      </section>
      {sectionOrder[service.layout].map((key) => {
        const SectionBlock = sections[key];
        return <SectionBlock key={key} service={service} />;
      })}
      <ServiceConversion />
    </article>
  );
}
