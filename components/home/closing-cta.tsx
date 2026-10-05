import { ButtonLink } from "@/components/button-link";
import { Section } from "@/components/section";
import { startProjectHref } from "@/lib/site";

export function ClosingCta() {
  return (
    <Section labelledBy="cta-heading" className="bg-graphite">
      <div className="max-w-4xl">
        <div aria-hidden="true" className="mb-8 flex items-center gap-3">
          <span className="size-1.5 bg-cobalt" />
          <span className="h-px w-16 bg-cobalt" />
          <span className="size-1.5 border border-cobalt" />
          <span className="h-px w-10 bg-steel" />
        </div>
        <div className="border-l border-cobalt pl-6 sm:pl-8">
          <h2
            id="cta-heading"
            className="max-w-[16em] font-serif text-3xl leading-[1.12] tracking-[-0.02em] text-balance text-warm-white sm:text-4xl lg:text-5xl"
          >
            What is your business doing manually that software should be doing?
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-7 text-silver sm:text-lg sm:leading-8">
            Start with a workflow that is still manual, systems that do not
            connect, or software that does not exist yet. SystemArc will help you
            see what a system built around that operation could be.
          </p>
          <div className="mt-8">
            <ButtonLink href={startProjectHref}>Start a Project</ButtonLink>
          </div>
        </div>
      </div>
    </Section>
  );
}
