import { ButtonLink } from "@/components/button-link";
import { Section } from "@/components/section";
import { startProjectHref } from "@/lib/site";

export function WorkConversion() {
  return (
    <Section labelledBy="work-conversion" className="bg-carbon">
      <div className="border border-steel bg-graphite">
        <div className="border-l border-cobalt px-6 py-10 sm:px-10 sm:py-14">
          <div aria-hidden="true" className="mb-8 flex items-center gap-3">
            <span className="size-1.5 bg-cobalt" />
            <span className="h-px w-16 bg-cobalt" />
            <span className="size-1.5 border border-cobalt" />
            <span className="h-px w-10 bg-steel" />
          </div>
          <p className="font-mono text-xs tracking-[0.18em] text-electric-cobalt uppercase">
            Start a project
          </p>
          <h2
            id="work-conversion"
            className="mt-4 max-w-[14em] font-serif text-3xl leading-[1.12] tracking-[-0.02em] text-balance text-warm-white sm:text-4xl lg:text-5xl"
          >
            What could your operation do with the right system?
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-7 text-silver sm:text-lg sm:leading-8">
            You do not need to know what the software should look like. Start
            with the workflow, the bottleneck, or the capability your current
            systems are missing.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink href={startProjectHref}>Start a Project</ButtonLink>
            <ButtonLink href="/services" variant="secondary">
              Explore Services
            </ButtonLink>
          </div>
        </div>
      </div>
    </Section>
  );
}
