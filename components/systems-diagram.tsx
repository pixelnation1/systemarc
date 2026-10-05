const businessNodes = ["Customers", "Team", "Operations"] as const;
const softwareNodes = [
  "CRM",
  "Payments",
  "Scheduling",
  "Inventory",
  "Communications",
] as const;

function NodeList({ items }: { items: readonly string[] }) {
  return (
    <ul className="flex min-w-0 flex-1 flex-col gap-2">
      {items.map((item) => (
        <li
          key={item}
          className="flex min-h-10 items-center gap-2.5 border border-steel bg-carbon px-2.5 text-sm text-warm-white"
        >
          <span aria-hidden="true" className="size-1.5 shrink-0 bg-cobalt" />
          <span className="min-w-0">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Column({
  kicker,
  items,
  edge,
}: {
  kicker: string;
  items: readonly string[];
  edge: "left" | "right";
}) {
  return (
    <div>
      <p className="mb-3 font-mono text-[0.68rem] tracking-[0.18em] text-electric-cobalt uppercase">
        {kicker}
      </p>
      <div
        className={`flex items-stretch gap-3 ${
          edge === "right" ? "md:flex-row-reverse" : ""
        }`}
      >
        <div
          aria-hidden="true"
          className={`hidden w-3 shrink-0 self-stretch border-steel md:block ${
            edge === "left" ? "border-y border-l" : "border-y border-r"
          }`}
        />
        <NodeList items={items} />
      </div>
    </div>
  );
}

function Hub() {
  return (
    <div className="border border-cobalt bg-carbon px-4 py-5 text-center">
      <p className="flex items-center justify-center gap-2 font-mono text-[0.68rem] tracking-[0.18em] text-electric-cobalt uppercase">
        <span aria-hidden="true" className="size-1.5 bg-cobalt" />
        System
      </p>
      <p className="mt-2 font-serif text-xl leading-tight tracking-[-0.02em] text-balance text-warm-white">
        Custom System
      </p>
    </div>
  );
}

function HorizontalRail({ delayed = false }: { delayed?: boolean }) {
  return (
    <div aria-hidden="true" className="relative hidden h-px w-10 bg-cobalt md:block">
      <span
        className={`signal-x absolute top-1/2 left-0 size-1.5 bg-electric-cobalt ${
          delayed ? "signal-delayed" : ""
        }`}
      />
    </div>
  );
}

function VerticalRail({ delayed = false }: { delayed?: boolean }) {
  return (
    <div aria-hidden="true" className="relative mx-auto h-12 w-px bg-cobalt md:hidden">
      <span
        className={`signal-y absolute top-0 left-1/2 size-1.5 bg-electric-cobalt ${
          delayed ? "signal-delayed" : ""
        }`}
      />
    </div>
  );
}

function CornerMarks() {
  const mark = "pointer-events-none absolute size-2.5 border-cobalt";

  return (
    <>
      <span aria-hidden="true" className={`${mark} top-3 left-3 border-t border-l`} />
      <span aria-hidden="true" className={`${mark} top-3 right-3 border-t border-r`} />
      <span aria-hidden="true" className={`${mark} bottom-3 left-3 border-b border-l`} />
      <span aria-hidden="true" className={`${mark} right-3 bottom-3 border-r border-b`} />
    </>
  );
}

export function SystemsDiagram() {
  return (
    <figure className="border border-steel bg-graphite">
      <div className="relative px-4 py-6 sm:px-5 sm:py-7">
        <CornerMarks />
        <div className="grid items-center gap-4 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,0.82fr)_auto_minmax(0,1fr)] md:gap-x-2 md:gap-y-0">
          <Column kicker="Business" items={businessNodes} edge="left" />
          <VerticalRail />
          <HorizontalRail />
          <Hub />
          <VerticalRail delayed />
          <HorizontalRail delayed />
          <Column kicker="Connected software" items={softwareNodes} edge="right" />
        </div>
      </div>
      <figcaption className="border-t border-steel px-5 py-4 text-sm leading-6 text-silver sm:px-8">
        The business — customers, team, and operations — connects through a
        custom system to CRM, payments, scheduling, inventory, and
        communications.
      </figcaption>
    </figure>
  );
}
