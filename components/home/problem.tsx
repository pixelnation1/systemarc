import { Section } from "@/components/section";

const conditions = [
  {
    title: "Disconnected tools",
    body: "Products bought at different times, none of them responsible for the whole workflow.",
  },
  {
    title: "Spreadsheets as systems",
    body: "Critical steps live in files because no application matches the process.",
  },
  {
    title: "Repetitive data entry",
    body: "The same customer, job, or order is typed into more than one place.",
  },
  {
    title: "Manual coordination",
    body: "Handoffs depend on inboxes, messages, memory, and follow-up.",
  },
  {
    title: "Software that almost fits",
    body: "The product is close enough to buy and wrong enough that people work around it.",
  },
] as const;

export function Problem() {
  return (
    <Section id="problem" labelledBy="problem-heading" className="bg-graphite">
      <p className="font-mono text-xs tracking-[0.18em] text-electric-cobalt uppercase">
        The problem
      </p>
      <div className="mt-4 grid gap-8 lg:grid-cols-12 lg:gap-16">
        <h2
          id="problem-heading"
          className="max-w-[12em] font-serif text-3xl leading-[1.12] tracking-[-0.02em] text-balance text-foreground sm:text-4xl lg:col-span-6 lg:text-[2.75rem]"
        >
          Your business shouldn&apos;t have to work around its software.
        </h2>
        <div className="max-w-xl space-y-5 text-base leading-7 text-secondary sm:text-lg sm:leading-8 lg:col-span-6">
          <p>
            Companies collect tools that never quite become a system.
            Spreadsheets cover the gaps. Email carries work that should have a
            home. People enter the same information more than once. The
            software is close, and the business changes its process to fit it.
          </p>
          <p>
            SystemArc approaches the problem from the operation. We learn how
            work actually moves through the company, then design and build the
            technology around that workflow.
          </p>
        </div>
      </div>
      <ul className="mt-14 border-t border-border">
        {conditions.map((condition) => (
          <li
            key={condition.title}
            className="grid gap-2 border-b border-border py-6 md:grid-cols-12 md:items-baseline md:gap-8 md:py-7"
          >
            <h3 className="text-base font-medium text-foreground md:col-span-4">
              {condition.title}
            </h3>
            <p className="text-base leading-7 text-secondary md:col-span-8">
              {condition.body}
            </p>
          </li>
        ))}
      </ul>
      <p className="mt-12 max-w-3xl font-serif text-2xl leading-snug tracking-[-0.02em] text-foreground sm:text-3xl">
        Understand the workflow first. Build the technology around it.
      </p>
    </Section>
  );
}
