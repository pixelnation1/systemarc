import Link from "next/link";
import { ButtonLink } from "@/components/button-link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Container } from "@/components/container";
import { PageSchema } from "@/components/json-ld";
import {
  ArchitectureMap,
  DashboardExample,
  DiscoveryPath,
  ProcessSequence,
} from "@/components/process/diagrams";
import { Section, SectionHeading } from "@/components/section";
import { createMetadata, startProjectHref } from "@/lib/site";

const processTitle = "Our Software Development Process | SystemArc";
const processDescription =
  "Learn how SystemArc approaches custom software projects through discovery, architecture, phased development, launch, and ongoing support.";

export const metadata = createMetadata({
  title: processTitle,
  description: processDescription,
  path: "/process",
  absoluteTitle: true,
  index: true,
});

const textLink =
  "text-warm-white underline decoration-steel underline-offset-4 transition-colors hover:text-electric-cobalt hover:decoration-cobalt";

const discoveryTopics = [
  "The business objective",
  "Current workflow",
  "People and roles involved",
  "Customers or users affected",
  "Existing software",
  "Manual processes",
  "Data movement",
  "Integrations",
  "Bottlenecks",
  "Exceptions",
  "Security considerations",
  "Desired outcome",
  "Future requirements",
] as const;

const discoveryOutputs = [
  "Problem definition",
  "Users and roles",
  "Workflow",
  "Functional requirements",
  "System boundaries",
  "Integrations",
  "Data requirements",
  "Technical constraints",
  "Security considerations",
  "Project phases",
  "Architecture direction",
  "Implementation priorities",
  "Risks and unknowns",
] as const;

const architectureTopics = [
  "Application structure",
  "Data model",
  "User roles",
  "Permissions",
  "APIs",
  "Integrations",
  "Automation",
  "System boundaries",
  "Existing platforms",
  "Infrastructure",
  "Security",
  "Implementation phases",
] as const;

const buildTopics = [
  "Interface development",
  "Application development",
  "Database implementation",
  "Integrations",
  "Automation",
  "Authentication",
  "Permissions",
  "Testing",
  "Data migration",
  "Deployment infrastructure",
] as const;

const launchNeeds = [
  "Monitoring",
  "Maintenance",
  "Bug fixes",
  "Platform updates",
  "Integration maintenance",
  "Security updates",
  "Workflow improvements",
  "Additional capabilities",
  "Performance work",
  "User feedback changes",
] as const;

const notRequired = [
  "Technical architecture",
  "Database design",
  "Programming language",
  "Complete feature specification",
  "Finished wireframes",
  "API knowledge",
] as const;

const helpful = [
  "Understanding of your business",
  "Examples of the current workflow",
  "The problem you are experiencing",
  "Systems you currently use",
  "People affected",
  "What a better outcome would look like",
] as const;

const faqs = [
  {
    question: "Do I need a complete software specification before contacting SystemArc?",
    answer:
      "No. SystemArc starts with the business problem and current workflow. Discovery helps determine what the system should actually do.",
  },
  {
    question: "Can SystemArc work with software we already use?",
    answer:
      "Yes, when the existing platforms support the required integration or workflow. SystemArc's approach is to connect or extend working systems when that makes more sense than replacing them.",
  },
  {
    question: "How long does custom software development take?",
    answer:
      "It depends on the scope, complexity, integrations, data, security requirements, and implementation phases. SystemArc determines a realistic project structure after understanding the requirements.",
  },
  {
    question: "Does every project require Discovery?",
    answer:
      "The amount of discovery depends on the project. A straightforward integration and a complex operational platform do not require the same level of investigation. SystemArc uses enough discovery to understand the problem before committing to the solution.",
  },
  {
    question: "What happens after software launches?",
    answer:
      "Post-launch needs vary by project. They may include monitoring, maintenance, support, improvements, integration updates, or additional development. Ongoing arrangements are defined based on the system and engagement.",
  },
] as const;

function IndexList({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-10 grid gap-px border border-steel bg-steel sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => (
        <li key={item} className="flex min-w-0 gap-3 bg-carbon px-4 py-3">
          <span className="font-mono text-[0.68rem] tracking-[0.14em] text-electric-cobalt">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="min-w-0 text-sm leading-6 text-warm-white">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function MarkerList({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-6 grid gap-3">
      {items.map((item) => (
        <li key={item} className="flex min-w-0 gap-3 text-sm leading-6 text-silver sm:text-base">
          <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 bg-cobalt" />
          <span className="min-w-0">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function ProcessPage() {
  return (
    <>
      <PageSchema
        path="/process"
        name={processTitle}
        description={processDescription}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Process", path: "/process" },
        ]}
      />
      <article>
        <section aria-labelledby="process-heading">
          <Container className="py-16 sm:py-20 xl:py-24">
            <Breadcrumbs
              items={[
                { name: "Home", href: "/" },
                { name: "Process" },
              ]}
            />
            <div className="mt-10 max-w-3xl">
              <p className="font-mono text-xs tracking-[0.18em] text-electric-cobalt uppercase">
                Our process
              </p>
              <h1
                id="process-heading"
                className="mt-5 max-w-[14em] font-serif text-4xl leading-[1.08] tracking-[-0.02em] text-balance text-warm-white sm:text-5xl lg:text-6xl"
              >
                Understand the business before building the software.
              </h1>
              <div className="mt-6 max-w-2xl space-y-4 text-base leading-7 text-silver sm:text-lg sm:leading-8">
                <p>Good software does not start with code.</p>
                <p>
                  It starts with understanding the operation, the people using
                  it, the systems already in place, and the problem the
                  technology needs to solve.
                </p>
                <p>
                  SystemArc moves from discovery to architecture to development
                  with that understanding intact.
                </p>
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={startProjectHref} className="w-full sm:w-auto">
                  Start a Project
                </ButtonLink>
                <ButtonLink href="/work" variant="secondary" className="w-full sm:w-auto">
                  Explore Our Work
                </ButtonLink>
              </div>
            </div>
          </Container>
        </section>

        <Section labelledBy="overview-heading" className="bg-graphite">
          <SectionHeading
            id="overview-heading"
            eyebrow="The path"
            title="Discovery, architecture, build, then launch and support."
          />
          <div className="mt-12">
            <ProcessSequence
              label="SystemArc process"
              caption="Discovery, then architecture, then build, then launch and support."
              steps={[
                { kicker: "01", title: "Discovery" },
                { kicker: "02", title: "Architecture" },
                { kicker: "03", title: "Build" },
                { kicker: "04", title: "Launch & Support" },
              ]}
            />
          </div>
        </Section>

        <Section id="discovery" labelledBy="discovery-heading">
          <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
            <div>
              <SectionHeading
                id="discovery-heading"
                eyebrow="01 — Discovery"
                title="Before we decide what to build, we understand what is happening."
              >
                <p>
                  Software discovery is where SystemArc learns how the business
                  actually operates.
                </p>
                <p>
                  We look beyond the requested feature or software idea and
                  understand the workflow surrounding it.
                </p>
                <p>
                  A prospect does not need to arrive with a technical
                  specification. SystemArc&apos;s job during Discovery is to
                  help turn the business problem into a clear system problem.
                </p>
              </SectionHeading>
            </div>
            <DiscoveryPath />
          </div>
          <IndexList items={discoveryTopics} />
        </Section>

        <Section labelledBy="why-discovery-heading" className="bg-graphite">
          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionHeading
                id="why-discovery-heading"
                eyebrow="Why discovery matters"
                title="The feature someone asks for is not always the problem that needs solving."
              >
                <p>
                  A business might ask for a dashboard. Discovery may reveal
                  that the real problem is that information exists across three
                  systems and employees manually assemble it.
                </p>
                <p>
                  The solution may still include a dashboard. The actual system
                  may also require integrations, automation, data
                  normalization, or workflow changes.
                </p>
                <p>
                  This is why SystemArc does not treat complex software as a
                  list of requested screens.
                </p>
              </SectionHeading>
            </div>
            <DashboardExample />
          </div>
        </Section>

        <Section labelledBy="discovery-output-heading">
          <SectionHeading
            id="discovery-output-heading"
            eyebrow="Discovery output"
            title="What comes out of Discovery?"
          >
            <p>Depending on the project, Discovery may establish the items below.</p>
          </SectionHeading>
          <IndexList items={discoveryOutputs} />
        </Section>

        <Section id="architecture" labelledBy="architecture-heading" className="bg-graphite">
          <SectionHeading
            id="architecture-heading"
            eyebrow="02 — Architecture"
            title="Turn the operation into a system."
          >
            <p>
              Once the problem is understood, software architecture is how
              SystemArc determines how the pieces should work together.
            </p>
            <p>
              SystemArc does not replace working software unnecessarily.
              Sometimes the best architecture combines{" "}
              <Link href="/services/custom-software-development" className={textLink}>
                custom software
              </Link>{" "}
              with the{" "}
              <Link href="/services/software-integrations" className={textLink}>
                systems a business already uses
              </Link>
              .
            </p>
          </SectionHeading>
          <IndexList items={architectureTopics} />
          <div className="mt-12">
            <ArchitectureMap />
          </div>
        </Section>

        <Section id="build" labelledBy="build-heading">
          <SectionHeading
            id="build-heading"
            eyebrow="03 — Build"
            title="Build in measurable phases."
          >
            <p>
              SystemArc develops custom software in phases the business can
              review. Large software projects should not disappear into
              development for months before the business sees what is being
              built.
            </p>
            <p>
              Depending on the project, this can include the work below,
              including{" "}
              <Link href="/services/software-integrations" className={textLink}>
                integrations
              </Link>{" "}
              and{" "}
              <Link href="/services/business-process-automation" className={textLink}>
                automation
              </Link>
              . The work is reviewed and validated as it proceeds.
            </p>
          </SectionHeading>
          <IndexList items={buildTopics} />
        </Section>

        <Section labelledBy="phases-heading" className="bg-graphite">
          <SectionHeading
            id="phases-heading"
            eyebrow="Example project structure"
            title="Actual phases depend on the project."
          >
            <p>
              Phased development allows important capabilities to be validated
              before every possible feature is built. The phases below are an
              example, not a template every engagement follows.
            </p>
          </SectionHeading>
          <div className="mt-12">
            <ProcessSequence
              label="Example project structure"
              caption="One possible sequence: foundation, core workflow, integrations, then expansion. The phases of a real project follow that project's scope."
              steps={[
                { kicker: "Phase 01", title: "Foundation" },
                { kicker: "Phase 02", title: "Core workflow" },
                { kicker: "Phase 03", title: "Integrations" },
                { kicker: "Phase 04", title: "Expansion" },
              ]}
            />
          </div>
        </Section>

        <Section labelledBy="change-heading">
          <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
            <SectionHeading
              id="change-heading"
              eyebrow="Change"
              title="Software projects evolve."
            >
              <p>
                Discovery reduces uncertainty. It does not eliminate every
                unknown.
              </p>
              <p>
                As software is built and real workflows become visible, new
                information can emerge. SystemArc handles meaningful changes
                deliberately. The goal is controlled evolution rather than
                uncontrolled scope.
              </p>
            </SectionHeading>
            <ProcessSequence
              label="A meaningful change"
              caption="Understand the new information, assess what it changes, decide, then build."
              steps={[
                { title: "Understand" },
                { title: "Assess" },
                { title: "Decide" },
                { title: "Build" },
              ]}
            />
          </div>
        </Section>

        <Section id="launch" labelledBy="launch-heading" className="bg-graphite">
          <SectionHeading
            id="launch-heading"
            eyebrow="04 — Launch & Support"
            title="Deployment is a milestone, not the end of the system."
          >
            <p>
              Before launch, SystemArc validates the application, integrations,
              permissions, workflows, and production environment appropriate to
              the project.
            </p>
            <p>
              After custom software launches, the system may still need
              attention. What that includes, and whether it continues, depends
              on the project and the engagement. Launch does not include
              unlimited support, and ongoing support is not automatic.
            </p>
          </SectionHeading>
          <IndexList items={launchNeeds} />
        </Section>

        <Section labelledBy="lifecycle-heading">
          <SectionHeading
            id="lifecycle-heading"
            eyebrow="The complete system"
            title="The system gets better as the business learns."
          >
            <p>
              The strongest software is not designed around a frozen picture of
              a business. It is built with enough structure to evolve as the
              operation, users, and requirements change.
            </p>
          </SectionHeading>
          <div className="mt-12">
            <ProcessSequence
              compact
              label="After launch, the path continues"
              caption="Discover, architect, build, launch, learn, and improve."
              steps={[
                { title: "Discover" },
                { title: "Architect" },
                { title: "Build" },
                { title: "Launch" },
                { title: "Learn" },
                { title: "Improve" },
              ]}
            />
          </div>
        </Section>

        <Section labelledBy="bring-heading" className="bg-graphite">
          <SectionHeading
            id="bring-heading"
            eyebrow="Starting a project"
            title="You don't need to show up with the answers."
          />
          <div className="mt-12 grid gap-px border border-steel bg-steel lg:grid-cols-2">
            <div className="min-w-0 bg-carbon p-6 sm:p-8">
              <h3 className="font-serif text-2xl tracking-[-0.02em] text-warm-white">
                You do not need
              </h3>
              <MarkerList items={notRequired} />
            </div>
            <div className="min-w-0 bg-graphite p-6 sm:p-8">
              <h3 className="font-serif text-2xl tracking-[-0.02em] text-warm-white">
                What helps
              </h3>
              <MarkerList items={helpful} />
            </div>
          </div>
          <p className="mt-8 max-w-2xl border-l border-cobalt py-1 pl-5 text-base leading-7 text-warm-white sm:text-lg">
            Bring the problem. We&apos;ll work through the system.
          </p>
        </Section>

        <Section labelledBy="process-faq">
          <SectionHeading id="process-faq" eyebrow="Questions" title="Questions about the process" />
          <div className="mt-12 divide-y divide-steel border-y border-steel">
            {faqs.map((item) => (
              <article
                key={item.question}
                className="grid gap-3 py-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-10"
              >
                <h3 className="font-serif text-2xl tracking-[-0.02em] text-balance text-warm-white">
                  {item.question}
                </h3>
                <p className="text-base leading-7 text-silver">{item.answer}</p>
              </article>
            ))}
          </div>
        </Section>

        <Section labelledBy="process-cta" className="bg-carbon">
          <div className="border border-steel bg-graphite">
            <div className="border-l border-cobalt px-6 py-10 sm:px-10 sm:py-14">
              <div aria-hidden="true" className="mb-8 flex items-center gap-3">
                <span className="size-1.5 bg-cobalt" />
                <span className="h-px w-16 bg-cobalt" />
                <span className="size-1.5 border border-cobalt" />
                <span className="h-px w-10 bg-steel" />
              </div>
              <p className="font-mono text-xs tracking-[0.18em] text-electric-cobalt uppercase">
                Start with discovery
              </p>
              <h2
                id="process-cta"
                className="mt-4 max-w-[14em] font-serif text-3xl leading-[1.12] tracking-[-0.02em] text-balance text-warm-white sm:text-4xl lg:text-5xl"
              >
                Tell us how the business works today.
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-7 text-silver sm:text-lg sm:leading-8">
                You don&apos;t need to know what should be built. Show us the
                workflow, the bottleneck, the systems involved, and what you
                wish worked differently.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <ButtonLink href={startProjectHref} className="w-full sm:w-auto">
                  Start a Project
                </ButtonLink>
                <ButtonLink href="/work" variant="secondary" className="w-full sm:w-auto">
                  See Our Work
                </ButtonLink>
              </div>
            </div>
          </div>
        </Section>
      </article>
    </>
  );
}
