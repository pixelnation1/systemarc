import { Container } from "@/components/container";
import { DiscoveryPath } from "@/components/inquiry/discovery-path";
import { ProjectInquiryForm } from "@/components/inquiry/project-inquiry-form";
import { JsonLd } from "@/components/json-ld";
import { Section, SectionHeading } from "@/components/section";
import { pageGraph } from "@/lib/schema";
import { createMetadata } from "@/lib/site";

const title = "Start a Software Project | SystemArc";
const description =
  "Tell SystemArc what is not working in your business. Start a conversation about custom software, automation, integrations, customer portals, internal systems, or operational technology.";

export const metadata = createMetadata({
  title,
  description,
  path: "/start-a-project",
  index: true,
  absoluteTitle: true,
});

export default function StartProjectPage() {
  return (
    <>
      <JsonLd
        data={pageGraph({
          path: "/start-a-project",
          name: title,
          description,
          breadcrumbs: [
            { name: "Home", path: "/" },
            { name: "Start a Project", path: "/start-a-project" },
          ],
        })}
      />
      <Container className="py-16 sm:py-24">
        <p className="font-mono text-xs tracking-[0.18em] text-electric-cobalt uppercase">
          Start a project
        </p>
        <h1 className="mt-4 max-w-[12em] font-serif text-4xl leading-[1.08] tracking-[-0.03em] text-balance text-warm-white sm:text-6xl">
          Start with what isn&apos;t working.
        </h1>
        <div className="mt-6 max-w-2xl space-y-5 text-base leading-7 text-silver sm:text-lg sm:leading-8">
          <p>You don&apos;t need a technical specification.</p>
          <p>
            Tell us how the business works today, where the process breaks down,
            what your team is doing manually, or what you wish your current
            systems could do.
          </p>
          <p>We&apos;ll start there.</p>
        </div>
        <p className="mt-8 inline-flex items-center gap-3 font-mono text-[0.68rem] tracking-[0.16em] text-electric-cobalt uppercase">
          <span aria-hidden="true" className="size-1.5 bg-cobalt" />
          No technical knowledge required
        </p>
      </Container>
      <Section labelledBy="discovery-intro">
        <SectionHeading
          id="discovery-intro"
          eyebrow="Discovery"
          title="Help us understand the operation."
        >
          <p>
            The questions below are designed to give SystemArc enough context
            for an initial conversation. They are not a technical requirements
            document.
          </p>
          <p>
            SystemArc determines the technical approach during discovery. An
            inquiry can involve custom software, business automation, web
            applications, customer portals, internal systems, software
            integrations, or AI-assisted workflows. You do not need to know
            which of those you need.
          </p>
        </SectionHeading>
        <DiscoveryPath />
      </Section>
      <section aria-label="Project inquiry" className="border-t border-border py-16 sm:py-24">
        <Container>
          <div className="mx-auto max-w-3xl">
          <ProjectInquiryForm />
        </div>
        </Container>
      </section>
    </>
  );
}
