import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Container } from "@/components/container";
import { RichText } from "@/components/rich-text";
import { Section, SectionHeading } from "@/components/section";
import { ServiceConversion } from "@/components/services/service-conversion";
import { SolutionFlow } from "@/components/solutions/solution-flow";
import { getProject } from "@/lib/projects";
import { getService } from "@/lib/services";
import {
  getSolution,
  solutionPath,
  type SolutionLayout,
  type SolutionPage,
} from "@/lib/solutions";

const sectionOrder: Record<
  SolutionLayout,
  readonly (
    | "definition"
    | "signs"
    | "includes"
    | "approach"
    | "useCases"
    | "aside"
    | "services"
    | "work"
    | "faq"
    | "related"
  )[]
> = {
  handoff: [
    "definition",
    "signs",
    "aside",
    "includes",
    "approach",
    "useCases",
    "work",
    "services",
    "faq",
    "related",
  ],
  visibility: [
    "definition",
    "aside",
    "signs",
    "includes",
    "approach",
    "useCases",
    "work",
    "services",
    "faq",
    "related",
  ],
  operations: [
    "definition",
    "aside",
    "signs",
    "includes",
    "approach",
    "useCases",
    "work",
    "services",
    "faq",
    "related",
  ],
  movement: [
    "definition",
    "includes",
    "signs",
    "approach",
    "aside",
    "useCases",
    "services",
    "faq",
    "related",
  ],
  constraints: [
    "definition",
    "signs",
    "includes",
    "aside",
    "approach",
    "useCases",
    "services",
    "faq",
    "related",
  ],
  job: [
    "definition",
    "signs",
    "includes",
    "approach",
    "aside",
    "useCases",
    "work",
    "services",
    "faq",
    "related",
  ],
  followup: [
    "definition",
    "aside",
    "signs",
    "includes",
    "approach",
    "useCases",
    "work",
    "services",
    "faq",
    "related",
  ],
  participation: [
    "definition",
    "signs",
    "aside",
    "includes",
    "approach",
    "useCases",
    "work",
    "services",
    "faq",
    "related",
  ],
};

function Definition({ solution }: { solution: SolutionPage }) {
  return (
    <Section labelledBy="solution-definition" className="bg-graphite">
      <SectionHeading
        id="solution-definition"
        eyebrow="Definition"
        title={solution.definition.question}
      >
        <RichText paragraphs={solution.definition.answer} />
      </SectionHeading>
    </Section>
  );
}

function Signs({ solution }: { solution: SolutionPage }) {
  return (
    <Section labelledBy="solution-signs">
      <SectionHeading id="solution-signs" eyebrow="The problem" title={solution.signsHeading} />
      <ol className="mt-12 border-l border-steel">
        {solution.signs.map((sign, index) => (
          <li key={sign.title} className="grid gap-2 py-5 pl-6 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-8">
            <p className="font-mono text-xs tracking-[0.16em] text-electric-cobalt">
              {String(index + 1).padStart(2, "0")}
            </p>
            <div>
              <p className="font-serif text-xl tracking-[-0.02em] text-warm-white">{sign.title}</p>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-silver sm:text-base sm:leading-7">
                {sign.body}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}

function Includes({ solution }: { solution: SolutionPage }) {
  return (
    <Section labelledBy="solution-includes" className="bg-slate">
      <SectionHeading id="solution-includes" eyebrow="The system" title={solution.includesHeading}>
        {solution.includesIntro ? <p>{solution.includesIntro}</p> : null}
      </SectionHeading>
      <ul className="mt-12 grid gap-px border border-steel bg-steel sm:grid-cols-2">
        {solution.includes.map((item) => (
          <li key={item.title} className="bg-carbon px-5 py-5">
            <p className="font-serif text-xl tracking-[-0.02em] text-warm-white">{item.title}</p>
            <p className="mt-2 text-sm leading-6 text-silver">{item.body}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function Approach({ solution }: { solution: SolutionPage }) {
  return (
    <Section labelledBy="solution-approach">
      <SectionHeading id="solution-approach" eyebrow="Approach" title={solution.approachHeading} />
      <ol className="mt-12 grid gap-8 md:grid-cols-2">
        {solution.approach.map((step, index) => (
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

function UseCases({ solution }: { solution: SolutionPage }) {
  return (
    <Section labelledBy="solution-cases" className="bg-graphite">
      <SectionHeading id="solution-cases" eyebrow="Use cases" title={solution.useCasesHeading} />
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {solution.useCases.map((item) => (
          <article key={item.title} className="border border-steel bg-carbon p-5">
            <h3 className="font-serif text-2xl tracking-[-0.02em] text-warm-white">{item.title}</h3>
            <p className="mt-3 text-sm leading-6 text-silver">{item.body}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}

function Aside({ solution }: { solution: SolutionPage }) {
  if (!solution.aside) return null;

  return (
    <Section labelledBy="solution-aside">
      <div
        className={
          solution.aside.columns
            ? "grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start"
            : undefined
        }
      >
        <SectionHeading id="solution-aside" eyebrow="A closer look" title={solution.aside.heading}>
          <RichText paragraphs={solution.aside.body} />
        </SectionHeading>
        {solution.aside.columns ? (
          <div className="grid gap-4">
            {solution.aside.columns.map((column) => (
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

function Services({ solution }: { solution: SolutionPage }) {
  const services = solution.services
    .map((slug) => getService(slug))
    .filter((item) => item !== undefined);

  if (services.length === 0) return null;

  return (
    <Section labelledBy="solution-services" className="bg-slate">
      <SectionHeading
        id="solution-services"
        eyebrow="Services"
        title="The technical work this problem often requires"
      >
        <p>
          The business problem comes first. These are the SystemArc services
          that may be part of the system, alone or together.
        </p>
      </SectionHeading>
      <ul className="mt-12 divide-y divide-steel border-y border-steel">
        {services.map((service) => (
          <li key={service.slug} className="py-6">
            <h3 className="font-serif text-2xl tracking-[-0.02em]">
              <Link
                href={`/services/${service.slug}`}
                className="text-warm-white underline decoration-steel underline-offset-4 hover:text-electric-cobalt hover:decoration-cobalt"
              >
                {service.name}
              </Link>
            </h3>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-silver">{service.hubSummary}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function RelatedWork({ solution }: { solution: SolutionPage }) {
  const projects = solution.relatedWork
    .map((item) => {
      const project = getProject(item.slug);
      return project ? { project, note: item.note } : null;
    })
    .filter((item) => item !== null);

  if (projects.length === 0) return null;

  return (
    <Section labelledBy="solution-work">
      <SectionHeading id="solution-work" eyebrow="SystemArc work" title="Related SystemArc work" />
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

function Faq({ solution }: { solution: SolutionPage }) {
  return (
    <Section labelledBy="solution-faq" className="bg-graphite">
      <SectionHeading id="solution-faq" eyebrow="Questions" title="Questions about this problem" />
      <div className="mt-12 divide-y divide-steel border-y border-steel">
        {solution.faq.map((item) => (
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

function RelatedSolutions({ solution }: { solution: SolutionPage }) {
  const related = solution.relatedSolutions
    .map((slug) => getSolution(slug))
    .filter((item) => item !== undefined);

  if (related.length === 0) return null;

  return (
    <Section labelledBy="solution-related">
      <SectionHeading
        id="solution-related"
        eyebrow="Related"
        title="Problems that often sit beside this one"
      />
      <ul className="mt-12 grid gap-6 lg:grid-cols-3">
        {related.map((item) => (
          <li key={item.slug} className="border border-steel bg-graphite p-5">
            <p className="font-mono text-xs tracking-[0.16em] text-silver">{item.flow.problem}</p>
            <h3 className="mt-3 font-serif text-2xl tracking-[-0.02em]">
              <Link
                href={solutionPath(item.slug)}
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
          href="/solutions"
          className="text-sm text-warm-white underline decoration-steel underline-offset-4 hover:text-electric-cobalt hover:decoration-cobalt"
        >
          All SystemArc solutions
        </Link>
      </p>
    </Section>
  );
}

const sections = {
  definition: Definition,
  signs: Signs,
  includes: Includes,
  approach: Approach,
  useCases: UseCases,
  aside: Aside,
  services: Services,
  work: RelatedWork,
  faq: Faq,
  related: RelatedSolutions,
} as const;

export function SolutionPageView({ solution }: { solution: SolutionPage }) {
  return (
    <article>
      <section aria-labelledby="solution-heading">
        <Container className="pt-10 sm:pt-14">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Solutions", href: "/solutions" },
              { name: solution.name },
            ]}
          />
          <div className="mt-10 grid gap-12 pb-16 lg:grid-cols-[minmax(0,1.15fr)_minmax(16rem,0.85fr)] lg:items-end lg:pb-20">
            <div>
              <p className="font-mono text-xs tracking-[0.18em] text-electric-cobalt uppercase">
                {solution.number} / {solution.eyebrow}
              </p>
              <h1
                id="solution-heading"
                className="mt-4 max-w-[14em] font-serif text-4xl leading-[1.08] tracking-[-0.03em] text-balance text-warm-white sm:text-5xl lg:text-6xl"
              >
                {solution.headline}
              </h1>
              <div className="mt-6 max-w-2xl space-y-4 text-base leading-7 text-secondary sm:text-lg sm:leading-8">
                <RichText paragraphs={solution.intro} />
              </div>
            </div>
            <SolutionFlow
              problem={solution.flow.problem}
              system={solution.flow.system}
              outcome={solution.flow.outcome}
            />
          </div>
        </Container>
      </section>
      {sectionOrder[solution.layout].map((key) => {
        const SectionBlock = sections[key];
        return <SectionBlock key={key} solution={solution} />;
      })}
      <ServiceConversion />
    </article>
  );
}
