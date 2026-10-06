import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Container } from "@/components/container";
import { ProjectVisual } from "@/components/project-visual";
import { Section, SectionHeading } from "@/components/section";
import { RepairFlow, StepFlow } from "@/components/work/flows";
import {
  ProductShot,
  ShotGallery,
  shotAlt,
  shotCaption,
} from "@/components/work/product-shot";
import { WorkConversion } from "@/components/work/work-conversion";
import type { CaseStudy, StudyLink, StudySection } from "@/lib/case-studies";
import { getIndustry } from "@/lib/industries";
import { getProject } from "@/lib/projects";
import { shotsByRole, type ProjectShot } from "@/lib/project-shots";
import { getService } from "@/lib/services";
import { getSolution } from "@/lib/solutions";

function Prose({
  section,
  className = "",
}: {
  section: Extract<StudySection, { kind: "prose" | "demonstrates" }>;
  className?: string;
}) {
  return (
    <Section labelledBy={section.id} className={className}>
      <SectionHeading id={section.id} eyebrow={section.eyebrow} title={section.title} />
      <div className="mt-8 max-w-3xl space-y-5 text-base leading-7 text-silver sm:text-lg sm:leading-8">
        {section.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </Section>
  );
}

function Capabilities({
  section,
}: {
  section: Extract<StudySection, { kind: "capabilities" }>;
}) {
  return (
    <Section labelledBy={section.id}>
      <SectionHeading id={section.id} eyebrow={section.eyebrow} title={section.title}>
        <p>{section.intro}</p>
      </SectionHeading>
      <ol className="mt-12 grid gap-px border border-steel bg-steel sm:grid-cols-2">
        {section.items.map((item, index) => (
          <li
            key={item.title}
            className={`bg-carbon p-6 sm:p-8 ${
              index === section.items.length - 1 && section.items.length % 2 === 1
                ? "sm:col-span-2"
                : ""
            }`}
          >
            <p className="font-mono text-[0.68rem] tracking-[0.16em] text-electric-cobalt">
              {String(index + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-3 font-serif text-2xl tracking-[-0.02em] text-warm-white">
              {item.title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-silver sm:text-base sm:leading-7">
              {item.text}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

function Diagram({
  section,
}: {
  section: Extract<StudySection, { kind: "diagram" }>;
}) {
  return (
    <Section labelledBy={section.id} className="bg-slate">
      <SectionHeading id={section.id} eyebrow={section.eyebrow} title={section.title}>
        <p>{section.intro}</p>
      </SectionHeading>
      <div className="mt-12">
        {section.variant === "repair" ? (
          <RepairFlow />
        ) : (
          <StepFlow variant={section.variant} />
        )}
      </div>
      <p className="mt-8 max-w-2xl text-sm leading-6 text-silver">{section.caption}</p>
    </Section>
  );
}

function Gallery({
  section,
  shots,
  name,
}: {
  section: Extract<StudySection, { kind: "gallery" }>;
  shots: readonly ProjectShot[];
  name: string;
}) {
  return (
    <Section labelledBy={section.id} className="bg-graphite">
      <SectionHeading id={section.id} eyebrow={section.eyebrow} title={section.title}>
        <p>{section.intro}</p>
      </SectionHeading>
      <ShotGallery shots={shots} name={name} />
    </Section>
  );
}

function Industry({
  section,
}: {
  section: Extract<StudySection, { kind: "industry" }>;
}) {
  const industry = getIndustry(section.slug);
  if (!industry) return null;

  return (
    <Section labelledBy={section.id} className="bg-slate">
      <SectionHeading id={section.id} eyebrow={section.eyebrow} title={section.title} />
      <div className="mt-8 max-w-3xl space-y-5 text-base leading-7 text-silver sm:text-lg sm:leading-8">
        {section.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <p className="mt-8">
        <Link
          href={`/industries/${industry.slug}`}
          className="group inline-flex min-h-11 items-center gap-3 font-serif text-2xl tracking-[-0.02em] text-warm-white sm:text-3xl"
        >
          {section.anchor}
          <span
            aria-hidden="true"
            className="text-cobalt transition-transform duration-150 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
          >
            →
          </span>
        </Link>
      </p>
    </Section>
  );
}

function LinkList({
  items,
  resolve,
}: {
  items: readonly StudyLink[];
  resolve: (slug: string) => { href: string; name: string } | null;
}) {
  const links = items.flatMap((item) => {
    const target = resolve(item.slug);
    return target ? [{ ...target, note: item.note, slug: item.slug }] : [];
  });

  if (links.length === 0) return null;

  return (
    <ul className="mt-8 divide-y divide-steel border-y border-steel">
      {links.map((link) => (
        <li key={link.slug} className="py-6">
          <h3 className="font-serif text-2xl tracking-[-0.02em]">
            <Link
              href={link.href}
              className="text-warm-white underline decoration-steel underline-offset-4 hover:text-electric-cobalt hover:decoration-cobalt"
            >
              {link.name}
            </Link>
          </h3>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-silver sm:text-base sm:leading-7">
            {link.note}
          </p>
        </li>
      ))}
    </ul>
  );
}

function Related({ section }: { section: Extract<StudySection, { kind: "related" }> }) {
  return (
    <>
      <Section labelledBy="related-services">
        <SectionHeading
          id="related-services"
          eyebrow="Services"
          title="Related SystemArc services"
        >
          <p>The services that sit behind this kind of system.</p>
        </SectionHeading>
        <LinkList
          items={section.services}
          resolve={(slug) => {
            const service = getService(slug);
            return service ? { href: `/services/${service.slug}`, name: service.name } : null;
          }}
        />
      </Section>
      <Section labelledBy="related-solutions" className="bg-graphite">
        <SectionHeading
          id="related-solutions"
          eyebrow="Solutions"
          title="Related solutions"
        >
          <p>The business problems this system is built around.</p>
        </SectionHeading>
        <LinkList
          items={section.solutions}
          resolve={(slug) => {
            const solution = getSolution(slug);
            return solution
              ? { href: `/solutions/${solution.slug}`, name: solution.name }
              : null;
          }}
        />
      </Section>
    </>
  );
}

function StudyBody({
  section,
  shots,
  name,
}: {
  section: StudySection;
  shots: readonly ProjectShot[];
  name: string;
}) {
  switch (section.kind) {
    case "prose":
    case "demonstrates":
      return (
        <Prose
          section={section}
          className={section.kind === "demonstrates" ? "bg-slate" : ""}
        />
      );
    case "capabilities":
      return <Capabilities section={section} />;
    case "diagram":
      return <Diagram section={section} />;
    case "gallery":
      return <Gallery section={section} shots={shots} name={name} />;
    case "industry":
      return <Industry section={section} />;
    case "related":
      return <Related section={section} />;
    default:
      return null;
  }
}

export function CaseStudyView({
  study,
  shots,
}: {
  study: CaseStudy;
  shots: readonly ProjectShot[];
}) {
  const project = getProject(study.slug);
  const hero = shotsByRole(shots, "hero")[0];

  return (
    <>
      <Container className="py-16 sm:py-24">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Work", href: "/work" },
            { name: study.name },
          ]}
        />
        <div className="mt-10 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <p className="font-mono text-sm tracking-[0.16em] text-electric-cobalt">
                {study.number}
              </p>
              <span aria-hidden="true" className="h-px w-10 bg-cobalt" />
              <p className="font-mono text-[0.68rem] tracking-[0.16em] text-silver uppercase">
                SystemArc system
              </p>
            </div>
            <p className="mt-6 max-w-xl text-sm leading-6 text-silver sm:text-base">
              {study.category}
            </p>
            <h1 className="mt-4 max-w-[12em] font-serif text-4xl leading-[1.08] tracking-[-0.03em] text-balance text-warm-white sm:text-5xl lg:text-6xl">
              {study.headline}
            </h1>
            <div className="mt-8 max-w-xl space-y-5 text-base leading-7 text-silver sm:text-lg sm:leading-8">
              {study.overview.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="min-w-0">
            {hero ? (
              <ProductShot
                src={hero.src}
                alt={shotAlt(study.name, "hero")}
                caption={shotCaption("hero")}
                ratio="16 / 10"
                priority
                sizes="(min-width: 1024px) 36rem, 100vw"
              />
            ) : project ? (
              <ProjectVisual project={project} number={study.number} />
            ) : (
              <ProductShot
                alt={shotAlt(study.name, "hero")}
                caption={shotCaption("hero")}
                ratio="16 / 10"
              />
            )}
          </div>
        </div>
        <div className="mt-14 max-w-3xl border border-steel bg-graphite">
          <div className="border-l border-cobalt px-6 py-6 sm:px-8 sm:py-8">
            <h2 className="font-serif text-2xl tracking-[-0.02em] text-warm-white sm:text-3xl">
              {study.question}
            </h2>
            <p className="mt-4 text-base leading-7 text-silver sm:text-lg sm:leading-8">
              {study.answer}
            </p>
          </div>
        </div>
      </Container>
      {study.sections.map((section) => (
        <StudyBody
          key={section.kind === "related" ? "related" : section.id}
          section={section}
          shots={shots}
          name={study.name}
        />
      ))}
      <WorkConversion />
    </>
  );
}
