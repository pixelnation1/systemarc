import { Container } from "@/components/container";
import { DiscoveryPath } from "@/components/inquiry/discovery-path";
import { ProjectInquiryForm } from "@/components/inquiry/project-inquiry-form";
import { JsonLd } from "@/components/json-ld";
import { Section, SectionHeading } from "@/components/section";
import { pageGraph } from "@/lib/schema";
import { contactEmail, createMetadata } from "@/lib/site";

const title = "Start a Creative, Media or Technology Project | SystemArc";
const description =
  "Talk to SystemArc about content, social media, advertising, websites, custom software, or a connected creative and technology engagement.";

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
          Start with your ambition.
        </h1>
        <div className="mt-6 max-w-2xl space-y-5 text-base leading-7 text-silver sm:text-lg sm:leading-8">
          <p>You don&apos;t need a finished brief.</p>
          <p>
            Tell us who you want to reach, what you want to change,
            or what your business needs to do next. Content, campaigns,
            websites, and software can all start here.
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
          title="Help us understand the opportunity."
        >
          <p>
            The questions below are designed to give SystemArc enough context
            for an initial conversation. They are not a technical requirements
            document.
          </p>
          <p>
            An inquiry can involve brand strategy, content production, social
            media, paid campaigns, websites, custom software, or automation.
            We will define deliverables, budget, responsibilities, and
            success measures together. Skip optional questions that do not apply.
          </p>
        </SectionHeading>
        <DiscoveryPath />
      </Section>
      <section aria-label="Project inquiry" className="border-t border-border py-16 sm:py-24">
        <Container>
          <div className="mx-auto max-w-3xl">
          <ProjectInquiryForm />
          <p className="mt-8 text-sm leading-6 text-silver">
            For general questions, email{" "}
            <a
              href={`mailto:${contactEmail}`}
              className="text-warm-white underline decoration-steel underline-offset-4 transition-colors hover:text-electric-cobalt hover:decoration-cobalt"
            >
              {contactEmail}
            </a>.
          </p>
        </div>
        </Container>
      </section>
    </>
  );
}
