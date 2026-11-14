import { getBuildScenario } from "@/lib/build-scenarios";
import Link from "next/link";
import { MediaBriefForm } from "@/components/inquiry/media-brief-form";
import { Container } from "@/components/container";
import { DiscoveryPath } from "@/components/inquiry/discovery-path";
import { ProjectInquiryForm } from "@/components/inquiry/project-inquiry-form";
import { JsonLd } from "@/components/json-ld";
import { Section, SectionHeading } from "@/components/section";
import { pageGraph } from "@/lib/schema";
import { contactEmail, createMetadata } from "@/lib/site";

const title = "Start a Website, Software, Media or Security Project | SystemArc";
const description =
  "Talk to SystemArc about websites, software, automation, content, media, or a scoped cybersecurity assessment.";

export const metadata = createMetadata({
  title,
  description,
  path: "/start-a-project",
  index: true,
  absoluteTitle: true,
});

export default async function StartProjectPage({ searchParams }: { searchParams: Promise<{ type?: string | string[]; service?: string | string[]; scenario?: string | string[] }> }) {
  const query = await searchParams;
  if (query.type === "media") {
    return <Container className="py-16 sm:py-24">
      <Link href="/media" className="inline-flex min-h-11 items-center text-sm text-silver underline underline-offset-4">← SystemArc Media</Link>
      <div className="mt-8 grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div><p className="agency-eyebrow">Start a media conversation</p><h1 className="mt-5 text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl">Your next chapter starts here.</h1><p className="mt-6 text-lg leading-8 text-silver">Tell us about the audience, the opportunity, and what you want to change. We will help turn it into a practical brief.</p><h2 className="mt-10 text-xl font-semibold">What happens next</h2><ol className="mt-5 space-y-4 text-silver"><li>01 / We review your goals and current channels.</li><li>02 / We follow up to discuss fit and scope.</li><li>03 / We outline deliverables, responsibilities, and fees.</li></ol><p className="mt-8 text-sm leading-7 text-silver">Prefer email? <a href={`mailto:${contactEmail}`} className="underline underline-offset-4">{contactEmail}</a></p><Link href="/start-a-project" className="mt-6 inline-flex min-h-11 items-center text-sm underline underline-offset-4">Planning a software project? Use our discovery form.</Link></div>
        <MediaBriefForm service={typeof query.service === "string" ? query.service : undefined} />
      </div>
    </Container>;
  }
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
          <p>You don&apos;t need a finished brief.</p><p><Link href="/cybersecurity#security-inquiry" className="underline underline-offset-4">Looking for personal or business cybersecurity help? Use our focused security inquiry form.</Link></p><p><Link href="/start-a-project?type=media" className="underline underline-offset-4">Looking for content, social, or advertising? Use our shorter media brief ↗</Link></p>
          <p>
            Tell us who you want to reach, what you want to change,
            or what your business needs to do next. Content, campaigns,
            websites, software, and digital protection can all start here.
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
            media, paid campaigns, websites, custom software, automation, or cybersecurity.
            We will define deliverables, budget, responsibilities, and
            success measures together. Skip optional questions that do not apply.
          </p>
        </SectionHeading>
        <DiscoveryPath />
      </Section>
      <section aria-label="Project inquiry" className="border-t border-border py-16 sm:py-24">
        <Container>
          <div className="mx-auto max-w-3xl">
          {getBuildScenario(query.scenario) && <p className="mb-6 rounded-lg border border-steel bg-graphite p-5 text-sm text-silver">Your selected direction: <strong className="text-warm-white">{getBuildScenario(query.scenario)?.solution}</strong>. We have added this starting point to the problem and outcome fields. You can edit it before submitting.</p>}
          <ProjectInquiryForm key={typeof query.scenario === "string" ? query.scenario : "general"} scenarioId={typeof query.scenario === "string" ? query.scenario : undefined} />
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
