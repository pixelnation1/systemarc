import type { ReactNode } from "react";

function intensity(index: number, total: number) {
  if (total <= 1 || index === total - 1) return "bg-cobalt";
  if (index === 0) return "bg-carbon";
  if (index / (total - 1) < 0.5) return "bg-cobalt/40";
  return "bg-cobalt/70";
}

function GridField({ children }: { children: ReactNode }) {
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-steel) 1px, transparent 1px), linear-gradient(to bottom, var(--color-steel) 1px, transparent 1px)",
          backgroundSize: "3.5rem 3.5rem",
          maskImage: "linear-gradient(to bottom, black, transparent 92%)",
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}

function DownRail() {
  return (
    <div aria-hidden="true" className="flex h-6 justify-center">
      <span className="h-full w-px bg-cobalt" />
    </div>
  );
}

function Node({
  children,
  hub = false,
}: {
  children: ReactNode;
  hub?: boolean;
}) {
  return (
    <div
      className={`min-w-0 border px-3 py-3 ${
        hub ? "border-cobalt bg-carbon" : "border-steel bg-slate"
      }`}
    >
      <p className="font-mono text-[0.68rem] leading-5 tracking-[0.12em] text-warm-white uppercase">
        {children}
      </p>
    </div>
  );
}

export function ProcessSequence({
  label,
  caption,
  steps,
  compact = false,
}: {
  label: string;
  caption: string;
  steps: readonly { kicker?: string; title: string }[];
  compact?: boolean;
}) {
  return (
    <figure className="min-w-0 border border-steel bg-graphite">
      <div className="flex items-center justify-between gap-4 border-b border-steel px-5 py-4">
        <p className="font-mono text-[0.68rem] tracking-[0.16em] text-electric-cobalt uppercase">
          {label}
        </p>
        <p className="font-mono text-[0.68rem] tracking-[0.16em] text-silver">
          {String(steps.length).padStart(2, "0")}
        </p>
      </div>
      <ol className="flex min-w-0 flex-col px-4 py-6 sm:px-5 lg:flex-row lg:items-stretch lg:px-6">
        {steps.map((step, index) => (
          <li
            key={`${step.title}-${index}`}
            className="flex min-w-0 flex-col lg:flex-1 lg:flex-row lg:items-stretch"
          >
            <div className="min-w-0 flex-1 border border-steel bg-carbon px-4 py-4">
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className={`size-2.5 shrink-0 border border-cobalt ${intensity(index, steps.length)}`}
                />
                {step.kicker ? (
                  <p className="font-mono text-[0.68rem] tracking-[0.14em] text-electric-cobalt uppercase">
                    {step.kicker}
                  </p>
                ) : null}
              </div>
              <p
                className={`mt-3 font-serif leading-tight tracking-[-0.02em] text-warm-white uppercase ${
                  compact ? "text-lg" : "text-xl sm:text-2xl"
                }`}
              >
                {step.title}
              </p>
            </div>
            {index < steps.length - 1 ? (
              <div
                aria-hidden="true"
                className="flex h-6 items-center justify-center lg:h-auto lg:w-6"
              >
                <span className="h-6 w-px bg-cobalt lg:h-px lg:w-6" />
              </div>
            ) : null}
          </li>
        ))}
      </ol>
      <figcaption className="border-t border-steel px-5 py-4 text-sm leading-6 text-silver">
        {caption}
      </figcaption>
    </figure>
  );
}

const discoveryLayers = ["People", "Process", "Data", "Software"] as const;

export function DiscoveryPath() {
  const tail = ["Problem", "Requirements", "System direction"] as const;

  return (
    <figure className="min-w-0 border border-steel bg-graphite">
      <div className="border-b border-steel px-5 py-4">
        <p className="font-mono text-[0.68rem] tracking-[0.16em] text-electric-cobalt uppercase">
          Discovery path
        </p>
      </div>
      <GridField>
        <div className="px-4 py-6 sm:px-5">
          <Node>Business</Node>
          <DownRail />
          <ul className="grid min-w-0 gap-2 border-l border-cobalt pl-4 sm:grid-cols-2 sm:border-t sm:border-l-0 sm:pt-4 sm:pl-0">
            {discoveryLayers.map((layer) => (
              <li key={layer} className="min-w-0">
                <span
                  aria-hidden="true"
                  className="mx-auto mb-2 hidden h-4 w-px bg-cobalt sm:block"
                />
                <Node>{layer}</Node>
              </li>
            ))}
          </ul>
          {tail.map((step, index) => (
            <div key={step}>
              <DownRail />
              <Node hub={index === tail.length - 1}>{step}</Node>
            </div>
          ))}
        </div>
      </GridField>
      <figcaption className="border-t border-steel px-5 py-4 text-sm leading-6 text-silver">
        Discovery moves from the business through people, process, data, and
        software, then into the problem, the requirements, and a system
        direction.
      </figcaption>
    </figure>
  );
}

const architectureBranches = [
  "Custom software",
  "Existing software",
  "APIs",
  "Automation",
  "Data",
] as const;

export function ArchitectureMap() {
  return (
    <figure className="min-w-0 border border-steel bg-graphite">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-steel px-5 py-4">
        <p className="font-mono text-[0.68rem] tracking-[0.16em] text-electric-cobalt uppercase">
          System map
        </p>
        <p className="min-w-0 font-mono text-[0.68rem] tracking-[0.14em] text-silver uppercase">
          Connect before replacing
        </p>
      </div>
      <GridField>
        <div className="px-4 py-6 sm:px-5">
          <div className="mx-auto min-w-0 max-w-md">
            <Node>Business workflow</Node>
            <DownRail />
            <Node hub>SystemArc system</Node>
          </div>
          <DownRail />
          <ul className="grid min-w-0 gap-2 border-l border-cobalt pl-4 sm:grid-cols-2 sm:border-t sm:border-l-0 sm:pt-4 sm:pl-0 lg:grid-cols-5">
            {architectureBranches.map((branch) => (
              <li key={branch} className="min-w-0">
                <span
                  aria-hidden="true"
                  className="mx-auto mb-2 hidden h-4 w-px bg-cobalt sm:block"
                />
                <Node>{branch}</Node>
                <span
                  aria-hidden="true"
                  className="mx-auto mt-2 hidden h-4 w-px bg-cobalt sm:block"
                />
              </li>
            ))}
          </ul>
          <div aria-hidden="true" className="mx-6 hidden h-px bg-cobalt sm:block" />
          <DownRail />
          <div className="mx-auto min-w-0 max-w-md">
            <Node hub>Operation</Node>
          </div>
        </div>
      </GridField>
      <figcaption className="border-t border-steel px-5 py-4 text-sm leading-6 text-silver">
        A business workflow enters a SystemArc system that can combine custom
        software, existing software, APIs, automation, and data, then returns
        to the operation. Connect before replacing.
      </figcaption>
    </figure>
  );
}

export function DashboardExample() {
  const found = [
    "Information across three systems",
    "Employees assemble it by hand",
  ] as const;
  const included = [
    "Dashboard",
    "Integrations",
    "Automation",
    "Data normalization",
    "Workflow changes",
  ] as const;

  return (
    <figure className="min-w-0 border border-steel bg-graphite">
      <div className="border-b border-steel px-5 py-4">
        <p className="font-mono text-[0.68rem] tracking-[0.16em] text-electric-cobalt uppercase">
          Hypothetical
        </p>
      </div>
      <div className="px-4 py-6 sm:px-5">
        <p className="font-mono text-[0.68rem] tracking-[0.14em] text-silver uppercase">
          Requested
        </p>
        <div className="mt-3">
          <Node>Dashboard</Node>
        </div>
        <DownRail />
        <p className="font-mono text-[0.68rem] tracking-[0.14em] text-silver uppercase">
          Found
        </p>
        <ul className="mt-3 grid min-w-0 gap-2">
          {found.map((item) => (
            <li key={item}>
              <Node>{item}</Node>
            </li>
          ))}
        </ul>
        <DownRail />
        <p className="font-mono text-[0.68rem] tracking-[0.14em] text-silver uppercase">
          The system may include
        </p>
        <ul className="mt-3 grid min-w-0 gap-2 sm:grid-cols-2">
          {included.map((item, index) => (
            <li key={item}>
              <Node hub={index === 0}>{item}</Node>
            </li>
          ))}
        </ul>
      </div>
      <figcaption className="border-t border-steel px-5 py-4 text-sm leading-6 text-silver">
        An example of a requested dashboard that turns out to be a system
        problem. This is not a client project.
      </figcaption>
    </figure>
  );
}
