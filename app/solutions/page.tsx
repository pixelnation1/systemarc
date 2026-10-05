import Link from "next/link";
import { Container } from "@/components/container";
import { JsonLd } from "@/components/json-ld";
import { Section, SectionHeading } from "@/components/section";
import { ServiceConversion } from "@/components/services/service-conversion";
import { SolutionFlow } from "@/components/solutions/solution-flow";
import { SystemPath } from "@/components/solutions/system-path";
import { pageGraph, type SchemaNode } from "@/lib/schema";
import { solutionPath, solutions } from "@/lib/solutions";
import { createMetadata, siteUrl } from "@/lib/site";

const title = "Business Software Solutions | SystemArc";
const description =
  "Explore SystemArc solutions for workflow automation, customer portals, dashboards, inventory, scheduling, repair operations, reputation workflows, and community systems.";

const symptoms = [
  "We enter the same information more than once.",
  "Customers keep calling for status updates.",
  "Our spreadsheet has become the real system.",
  "Our software doesn't talk to each other.",
  "Scheduling depends on someone knowing everything.",
  "We can't see what is happening without asking people.",
  "Our process lives in email and messages.",
  "Our software works — except for the part that matters to us.",
] as const;

const crossings = [
  {
    text: "a customer portal",
    href: "/services/customer-portal-development",
  },
  {
    text: "an integration with the existing CRM",
    href: "/services/software-integrations",
  },
  {
    text: "automated notifications",
    href: "/services/business-process-automation",
  },
  {
    text: "an internal dashboard",
    href: "/services/internal-tools-development",
  },
  {
    text: "changes to the underlying workflow",
    href: "/solutions/workflow-automation",
  },
] as const;

export const metadata = createMetadata({
  title,
  description,
  path: "/solutions",
  absoluteTitle: true,
  index: true,
});

function solutionsListNode(): SchemaNode {
  return {
    "@type": "ItemList",
    "@id": `${siteUrl}/solutions#list`,
    name: "SystemArc solutions",
    itemListElement: solutions.map((solution, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: solution.name,
      item: `${siteUrl}${solutionPath(solution.slug)}`,
    })),
  };
}

export default function SolutionsPage() {
  return (
    <>
      <JsonLd
        data={pageGraph({
          path: "/solutions",
          name: title,
          description,
          breadcrumbs: [
            { name: "Home", path: "/" },
            { name: "Solutions", path: "/solutions" },
          ],
          extra: [solutionsListNode()],
        })}
      />
      <article>
        <section aria-labelledby="solutions-heading">
          <Container className="py-16 sm:py-20 xl:py-24">
            <p className="font-mono text-xs tracking-[0.18em] text-electric-cobalt uppercase">
              Solutions
            </p>
            <h1
              id="solutions-heading"
              className="mt-5 max-w-[14em] font-serif text-4xl leading-[1.08] tracking-[-0.02em] text-balance text-warm-white sm:text-5xl lg:text-6xl"
            >
              Start with what&apos;s slowing the business down.
            </h1>
            <div className="mt-6 max-w-2xl space-y-4 text-base leading-7 text-silver sm:text-lg sm:leading-8">
              <p>You do not need to know what kind of software you need.</p>
              <p>
                Start with the workflow that is still manual, the information
                that keeps getting lost, the systems that do not communicate, or
                the process your current software cannot handle.
              </p>
              <p>
                SystemArc works backward from the problem to determine what the
                system should actually do.
              </p>
            </div>
          </Container>
        </section>

        <Section labelledBy="solution-set" className="bg-graphite">
          <SectionHeading
            id="solution-set"
            eyebrow="Primary solutions"
            title="Eight problems SystemArc designs systems around."
          />
          <ol className="mt-14 grid gap-6 lg:grid-cols-2">
            {solutions.map((solution) => (
              <li key={solution.slug} className="border border-steel bg-carbon p-5 sm:p-6">
                <p className="font-mono text-xs tracking-[0.16em] text-electric-cobalt">
                  {solution.number}
                </p>
                <h3 className="mt-3 font-serif text-2xl tracking-[-0.02em] sm:text-3xl">
                  <Link
                    href={solutionPath(solution.slug)}
                    className="text-warm-white underline decoration-steel underline-offset-4 hover:text-electric-cobalt hover:decoration-cobalt"
                  >
                    {solution.name}
                  </Link>
                </h3>
                <p className="mt-3 text-sm leading-6 text-silver sm:text-base sm:leading-7">
                  {solution.hubSummary}
                </p>
                <div className="mt-6">
                  <SolutionFlow
                    problem={solution.flow.problem}
                    system={solution.flow.system}
                    outcome={solution.flow.outcome}
                  />
                </div>
              </li>
            ))}
          </ol>
        </Section>

        <Section labelledBy="failure-point">
          <SectionHeading
            id="failure-point"
            eyebrow="Start with the operation"
            title="Where does the work break down?"
          >
            <p>
              If one of these is familiar, that is the place to start. You do
              not need to know which kind of software would fix it.
            </p>
          </SectionHeading>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2">
            {symptoms.map((symptom) => (
              <li key={symptom} className="border border-steel bg-graphite px-5 py-5">
                <p className="text-base leading-7 text-warm-white">{symptom}</p>
              </li>
            ))}
          </ul>
        </Section>

        <Section labelledBy="system-thinking" className="bg-slate">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
            <SectionHeading
              id="system-thinking"
              eyebrow="System thinking"
              title="The answer may not be one product."
            >
              <p>
                A customer-status problem may involve{" "}
                {crossings.map((item, index) => (
                  <span key={item.href}>
                    {index > 0 ? (index === crossings.length - 1 ? ", and " : ", ") : null}
                    <Link
                      href={item.href}
                      className="text-warm-white underline decoration-steel underline-offset-4 hover:text-electric-cobalt hover:decoration-cobalt"
                    >
                      {item.text}
                    </Link>
                  </span>
                ))}
                .
              </p>
              <p>
                SystemArc designs the system around the operation rather than
                forcing every problem into one service category.
              </p>
            </SectionHeading>
            <SystemPath />
          </div>
        </Section>

        <ServiceConversion />
      </article>
    </>
  );
}
