import { Section, SectionHeading } from "@/components/section";

const offerings = [
  {
    name: "Customer portals",
    description:
      "Places for customers to check status, make requests, and see the information that belongs to them.",
  },
  {
    name: "Internal dashboards",
    description: "Operational views for the people running the work day to day.",
  },
  {
    name: "Workflow systems",
    description:
      "Software that follows a real sequence of tasks, handoffs, and approvals.",
  },
  {
    name: "Scheduling platforms",
    description:
      "Booking and capacity tools shaped around how appointments actually run.",
  },
  {
    name: "CRM extensions",
    description:
      "Additions to customer records when an off-the-shelf CRM stops short of the workflow.",
  },
  {
    name: "Inventory systems",
    description:
      "Tracking for parts, products, or materials tied to daily operations.",
  },
  {
    name: "Review & reputation platforms",
    description:
      "Systems for requesting, organizing, and responding around customer feedback.",
  },
  {
    name: "Repair/service management systems",
    description:
      "Job, communication, and status tools for service businesses.",
  },
  {
    name: "Community platforms",
    description:
      "Spaces for members, participants, or customers to stay connected to a business.",
  },
  {
    name: "Data dashboards",
    description: "Clear readings of operational data a company already produces.",
  },
  {
    name: "API integrations",
    description:
      "Connections that move information between the systems a company uses.",
  },
  {
    name: "AI-assisted workflows",
    description:
      "Practical assistance inside a defined workflow, where the business keeps the decision.",
  },
] as const;

export function WhatWeBuild() {
  return (
    <Section
      id="what-we-build"
      labelledBy="what-we-build-heading"
      className="bg-graphite"
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              eyebrow="What we build"
              title="Infrastructure for how the company operates."
              id="what-we-build-heading"
            >
              <p>
                Portals, internal tools, workflow systems, and connections
                between the software a company already uses.
              </p>
            </SectionHeading>
          </div>
        </div>
        <ul className="grid gap-px border border-steel bg-steel sm:grid-cols-2 lg:col-span-8">
          {offerings.map((offering, index) => (
            <li
              key={offering.name}
              className="group bg-carbon p-6 transition-colors duration-150 hover:bg-slate sm:p-7"
            >
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-lg leading-snug text-warm-white">
                  {offering.name}
                </h3>
                <p className="font-mono text-xs tracking-[0.16em] text-electric-cobalt">
                  {String(index + 1).padStart(2, "0")}
                </p>
              </div>
              <div className="mt-4 flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="mt-2.5 h-px w-4 shrink-0 bg-steel transition-colors duration-150 group-hover:bg-cobalt"
                />
                <p className="text-sm leading-6 text-silver">{offering.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
