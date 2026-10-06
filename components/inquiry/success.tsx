import type { Ref } from "react";
import { ButtonLink } from "@/components/button-link";

const nextSteps = [
  {
    number: "01",
    title: "Review",
    text: "We review the information you've provided.",
  },
  {
    number: "02",
    title: "Initial conversation",
    text: "We talk through the operation and clarify the problem.",
  },
  {
    number: "03",
    title: "Discovery",
    text: "If the project is a fit, we move into deeper discovery and determine what the system should actually do.",
  },
];

export function SubmissionSuccess({
  headingRef,
  delivery,
}: {
  headingRef?: Ref<HTMLHeadingElement>;
  delivery: "webhook" | "log" | "discarded";
}) {
  return (
    <div className="border border-steel bg-graphite">
      <div className="border-l border-cobalt px-6 py-10 sm:px-10 sm:py-14">
        <p className="font-mono text-xs tracking-[0.18em] text-electric-cobalt uppercase">
          Request received
        </p>
        <h2
          ref={headingRef}
          tabIndex={-1}
          className="mt-4 max-w-[12em] font-serif text-4xl leading-[1.08] tracking-[-0.03em] text-balance text-warm-white sm:text-5xl"
        >
          Now we understand where to start.
        </h2>
        <div className="mt-6 max-w-2xl space-y-4 text-base leading-7 text-silver sm:text-lg sm:leading-8">
          <p>Thanks for giving us some context.</p>
          <p>
            We&apos;ll review the business, workflow, problem, and systems
            you&apos;ve described before continuing the conversation.
          </p>
        </div>
        {delivery === "log" ? (
          <p className="mt-6 max-w-2xl border border-steel bg-carbon px-4 py-3 text-sm leading-6 text-silver">
            This environment recorded the inquiry on the server only. It is not
            stored for follow-up until a delivery destination is configured.
          </p>
        ) : null}
        <ol className="mt-10 grid gap-px border border-steel bg-steel">
          {nextSteps.map((step) => (
            <li key={step.number} className="bg-carbon px-5 py-5">
              <p className="font-mono text-[0.68rem] tracking-[0.16em] text-electric-cobalt">
                {step.number}
              </p>
              <h3 className="mt-2 font-serif text-2xl tracking-[-0.02em] text-warm-white">
                {step.title}
              </h3>
              <p className="mt-2 max-w-xl text-sm leading-6 text-silver">{step.text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/work">Explore Our Work</ButtonLink>
          <ButtonLink href="/" variant="secondary">
            Return Home
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
