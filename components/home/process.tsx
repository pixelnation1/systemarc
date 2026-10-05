import { Section, SectionHeading } from "@/components/section";

const stages = [
  {
    number: "01",
    title: "Discovery",
    body: "Understand the business, the workflow, the people who use the system, the bottlenecks, and the outcome the software needs to produce.",
  },
  {
    number: "02",
    title: "Architecture",
    body: "Define requirements, system architecture, integrations, data structure, scope, and a project roadmap.",
  },
  {
    number: "03",
    title: "Build",
    body: "Design and develop the system in measurable phases, with regular review against the operation.",
  },
  {
    number: "04",
    title: "Launch & Support",
    body: "Deploy the system, watch how it behaves in real use, improve it, and keep supporting it after launch.",
  },
] as const;

export function Process() {
  return (
    <Section id="process" labelledBy="process-heading" className="bg-carbon">
      <SectionHeading
        eyebrow="Process"
        title="We understand the business before we build the software."
        id="process-heading"
      />
      <ol className="mt-14 grid gap-px border border-steel bg-steel md:grid-cols-2 xl:grid-cols-4">
        {stages.map((stage) => (
          <li
            key={stage.number}
            className={`group p-7 transition-colors duration-150 sm:p-8 ${
              stage.number === "01"
                ? "bg-graphite shadow-[inset_2px_0_0_0_var(--color-cobalt)]"
                : "bg-carbon hover:bg-graphite"
            }`}
          >
            <div className="flex items-center gap-3">
              <p className="font-serif text-3xl tracking-[-0.03em] text-electric-cobalt">
                {stage.number}
              </p>
              <span
                aria-hidden="true"
                className="h-px flex-1 bg-steel transition-colors duration-150 group-hover:bg-cobalt"
              />
            </div>
            <h3 className="mt-8 font-serif text-2xl leading-tight tracking-[-0.02em] text-foreground">
              {stage.title}
            </h3>
            <p className="mt-4 text-sm leading-6 text-secondary sm:text-base sm:leading-7">
              {stage.body}
            </p>
          </li>
        ))}
      </ol>
      <p className="mt-8 max-w-3xl border-l border-cobalt py-1 pl-5 text-base leading-7 text-silver">
        Discovery is where a SystemArc project starts. We do not scope complex
        software from a short contact form. The business, the workflow, and the
        constraints have to be understood before the system is defined.
      </p>
    </Section>
  );
}
