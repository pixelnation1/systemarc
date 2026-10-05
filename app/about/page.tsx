import Link from "next/link";
import { ApproachModel } from "@/components/about/approach-model";
import { SystemLayers } from "@/components/about/system-layers";
import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";
import { PageSchema } from "@/components/json-ld";
import { Section, SectionHeading } from "@/components/section";
import { TeamRoster } from "@/components/team-roster";
import { getProject } from "@/lib/projects";
import { teamMembers } from "@/lib/team";
import { createMetadata, siteName, startProjectHref } from "@/lib/site";

const aboutTitle = `About ${siteName} | Custom Software & Business Systems`;
const aboutDescription =
  "Learn how SystemArc approaches custom software, automation, integrations, and business systems by understanding how a company actually operates before building the technology.";

export const metadata = createMetadata({
  title: aboutTitle,
  description: aboutDescription,
  path: "/about",
  absoluteTitle: true,
  index: true,
});

const principles = [
  {
    number: "01",
    title: "Start with the workflow",
    body: "Understand what actually happens inside the business before deciding what software should exist.",
  },
  {
    number: "02",
    title: "Build around reality",
    body: "Software should reflect how people actually work, not how a generic platform assumes they work.",
  },
  {
    number: "03",
    title: "Connect before replacing",
    body: "Sometimes the right answer is new software. Sometimes it is connecting the systems a company already uses.",
  },
  {
    number: "04",
    title: "Build for what comes next",
    body: "Systems should be designed so the business can evolve without rebuilding everything every time the operation changes.",
  },
] as const;

const capabilities = [
  {
    title: "Custom Software",
    body: "Purpose-built applications around specific operations and workflows.",
  },
  {
    title: "Business Automation",
    body: "Systems that remove repetitive administrative work and unnecessary handoffs.",
  },
  {
    title: "Web Applications",
    body: "Customer portals, dashboards, platforms, internal tools, and operational applications.",
  },
  {
    title: "Integrations",
    body: "Connections between software, APIs, data sources, and existing business systems.",
  },
  {
    title: "AI-Assisted Workflows",
    body: "Practical AI implementations where AI can meaningfully improve an existing workflow.",
  },
] as const;

const projectNotes = [
  {
    slug: "reviewforge",
    summary: "Reputation & customer engagement platform",
  },
  {
    slug: "repairforge",
    summary: "Repair business workflow and customer communication platform",
  },
  {
    slug: "pixelnation-systems",
    summary:
      "Community engagement, customer check-in, loyalty, event, and operational systems",
  },
] as const;

export default function AboutPage() {
  const projects = projectNotes.flatMap((note) => {
    const project = getProject(note.slug);
    return project ? [{ ...note, project }] : [];
  });

  return (
    <>
      <PageSchema
        path="/about"
        name={aboutTitle}
        description={aboutDescription}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]}
      />
      <article>
        <section aria-labelledby="about-heading">
          <Container className="py-16 sm:py-20 xl:py-24">
            <div className="lg:grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-12 xl:gap-16">
              <div className="max-w-xl">
                <p className="font-mono text-xs tracking-[0.18em] text-electric-cobalt uppercase">
                  About SystemArc
                </p>
                <h1
                  id="about-heading"
                  className="mt-5 max-w-[14em] font-serif text-4xl leading-[1.08] tracking-[-0.02em] text-balance text-warm-white sm:text-5xl lg:text-6xl"
                >
                  We build software around how businesses actually work.
                </h1>
                <div className="mt-6 max-w-xl space-y-4 text-base leading-7 text-silver sm:text-lg sm:leading-8">
                  <p>
                    SystemArc exists to solve the gap between how a business
                    operates and what off-the-shelf software allows it to do.
                  </p>
                  <p>
                    We study the workflow, identify where technology can remove
                    friction, and build systems around the operation instead of
                    forcing the operation around the software.
                  </p>
                </div>
              </div>
              <div className="mt-14 lg:mt-0">
                <ApproachModel />
              </div>
            </div>
          </Container>
        </section>

        <Section labelledBy="why-heading" className="bg-graphite">
          <SectionHeading
            id="why-heading"
            eyebrow="Why SystemArc"
            title={
              <>
                Most businesses don&apos;t have a software problem.
                <span className="mt-2 block">They have a systems problem.</span>
              </>
            }
          >
            <p>
              A company may have a CRM, accounting software, scheduling tools,
              spreadsheets, email, messaging platforms, and industry-specific
              applications — and still have people manually moving information
              between all of them.
            </p>
            <p>The individual tools may work. The system does not.</p>
            <p>
              SystemArc focuses on what happens between those tools: the
              workflow, handoffs, decisions, information, and repetitive work
              that keep the business operating.
            </p>
            <p>
              Then we determine what should be connected, automated, replaced,
              or built.
            </p>
          </SectionHeading>
          <SystemLayers />
        </Section>

        <Section labelledBy="approach-heading" className="bg-slate">
          <SectionHeading
            id="approach-heading"
            eyebrow="How we think"
            title="Understand the operation before designing the technology."
          />
          <ol className="mt-14 grid gap-px border border-steel bg-steel md:grid-cols-2">
            {principles.map((principle) => (
              <li key={principle.number} className="bg-carbon p-7 sm:p-8">
                <div className="flex items-center gap-3">
                  <p className="font-mono text-sm tracking-[0.16em] text-electric-cobalt">
                    {principle.number}
                  </p>
                  <span aria-hidden="true" className="h-px flex-1 bg-steel" />
                </div>
                <h3 className="mt-8 font-serif text-2xl leading-tight tracking-[-0.02em] text-warm-white">
                  {principle.title}
                </h3>
                <p className="mt-4 text-sm leading-6 text-silver sm:text-base sm:leading-7">
                  {principle.body}
                </p>
              </li>
            ))}
          </ol>
        </Section>

        <Section labelledBy="capabilities-heading" className="bg-graphite">
          <SectionHeading
            id="capabilities-heading"
            eyebrow="What we build"
            title="Custom software, automation, and the connections between them."
          />
          <ul className="mt-12 border-b border-steel">
            {capabilities.map((capability) => (
              <li
                key={capability.title}
                className="grid gap-2 border-t border-steel py-6 sm:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] sm:gap-10 sm:py-7"
              >
                <h3 className="font-serif text-2xl tracking-[-0.02em] text-warm-white">
                  {capability.title}
                </h3>
                <p className="max-w-xl text-base leading-7 text-silver">
                  {capability.body}
                </p>
              </li>
            ))}
          </ul>
        </Section>

        <Section labelledBy="built-heading" className="bg-carbon">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              id="built-heading"
              eyebrow="Built in the real world"
              title={
              <>
                Our ideas don&apos;t start with features.
                <span className="mt-2 block">They start with problems.</span>
              </>
            }
            >
              <p>
                SystemArc develops systems from real operational needs.
                ReviewForge, RepairForge, and PixelNation Systems were built
                around those needs. That experience is how SystemArc approaches
                other businesses: understand the operation first, then decide
                what the software should do.
              </p>
            </SectionHeading>
            <Link
              href="/work"
              className="group/link inline-flex min-h-11 shrink-0 items-center gap-2 text-sm text-warm-white"
            >
              View Our Work
              <span
                aria-hidden="true"
                className="transition-transform duration-150 group-hover/link:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover/link:translate-x-0"
              >
                →
              </span>
            </Link>
          </div>
          <ul className="mt-12 border-t border-steel">
            {projects.map(({ project, summary }) => (
              <li key={project.slug} className="border-b border-steel py-6">
                <h3 className="font-serif text-2xl tracking-[-0.02em] text-warm-white">
                  <Link
                    href={project.href}
                    className="transition-colors duration-150 hover:text-electric-cobalt"
                  >
                    {project.name}
                  </Link>
                </h3>
                <p className="mt-2 text-sm leading-6 text-silver sm:text-base">
                  {summary}
                </p>
              </li>
            ))}
          </ul>
        </Section>

        <Section labelledBy="people-heading" className="bg-slate">
          <div className="max-w-3xl border-l border-cobalt pl-6 sm:pl-8">
            <h2
              id="people-heading"
              className="max-w-[16em] font-serif text-3xl leading-[1.12] tracking-[-0.02em] text-balance text-warm-white sm:text-4xl"
            >
              Built by people who understand operations, not just code.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-7 text-silver sm:text-lg sm:leading-8">
              SystemArc combines software development with firsthand experience
              building and operating businesses. That perspective shapes how we
              approach every system: understand the business first, then
              determine what technology should do.
            </p>
          </div>
          <TeamRoster members={teamMembers} />
        </Section>

        <Section labelledBy="about-cta-heading" className="bg-graphite">
          <div className="max-w-3xl">
            <div aria-hidden="true" className="mb-8 flex items-center gap-3">
              <span className="size-1.5 bg-cobalt" />
              <span className="h-px w-16 bg-cobalt" />
              <span className="size-1.5 border border-cobalt" />
            </div>
            <h2
              id="about-cta-heading"
              className="max-w-[14em] font-serif text-3xl leading-[1.12] tracking-[-0.02em] text-balance text-warm-white sm:text-4xl lg:text-5xl"
            >
              Tell us what isn&apos;t working.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-7 text-silver sm:text-lg sm:leading-8">
              If your team is relying on spreadsheets, repetitive data entry,
              disconnected software, manual follow-up, or a system that almost
              fits the way your business operates, start there.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={startProjectHref}>Start a Project</ButtonLink>
              <ButtonLink href="/work" variant="secondary">
                Explore Our Work
              </ButtonLink>
            </div>
          </div>
        </Section>
      </article>
    </>
  );
}
