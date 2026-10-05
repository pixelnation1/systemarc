import { Section, SectionHeading } from "@/components/section";

const capabilities = [
  {
    number: "01",
    title: "Custom Software",
    body: "Applications designed around specific business workflows, operations, customers, and teams.",
  },
  {
    number: "02",
    title: "Business Automation",
    body: "Replace repetitive manual processes with reliable automated workflows.",
  },
  {
    number: "03",
    title: "Web Applications",
    body: "Modern customer portals, dashboards, operational tools, platforms, and web-based applications.",
  },
  {
    number: "04",
    title: "AI & Integrations",
    body: "Connect existing systems and intelligently automate work across the tools a company already uses.",
  },
] as const;

export function Capabilities() {
  return (
    <Section id="capabilities" labelledBy="capabilities-heading" className="bg-slate">
      <SectionHeading
        eyebrow="Capabilities"
        title="Technology shaped around the work."
        id="capabilities-heading"
      >
        <p>
          Custom software, automation, web applications, and integrations,
          scoped to the way a company already operates.
        </p>
      </SectionHeading>
      <ul className="mt-14 grid gap-px border border-steel bg-steel sm:grid-cols-2 xl:grid-cols-4">
        {capabilities.map((capability) => (
          <li
            key={capability.title}
            className="group relative bg-carbon p-7 transition-colors duration-150 hover:bg-graphite sm:p-8"
          >
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-px bg-steel transition-colors duration-150 group-hover:bg-cobalt"
            />
            <p className="flex items-center gap-2 font-mono text-xs tracking-[0.16em] text-electric-cobalt">
              <span aria-hidden="true" className="size-1.5 bg-cobalt" />
              {capability.number}
            </p>
            <h3 className="mt-8 font-serif text-2xl leading-tight tracking-[-0.02em] text-foreground">
              {capability.title}
            </h3>
            <p className="mt-4 text-sm leading-6 text-secondary sm:text-base sm:leading-7">
              {capability.body}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
