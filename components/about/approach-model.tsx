const stages = [
  {
    number: "01",
    label: "Operation",
    detail: "How the business actually works",
  },
  {
    number: "02",
    label: "Friction",
    detail: "Where work is manual or disconnected",
  },
  {
    number: "03",
    label: "System",
    detail: "Software built around that operation",
  },
] as const;

export function ApproachModel() {
  return (
    <figure className="relative border border-steel bg-graphite px-5 py-6 sm:px-6 sm:py-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-steel) 1px, transparent 1px), linear-gradient(to bottom, var(--color-steel) 1px, transparent 1px)",
          backgroundSize: "3.5rem 3.5rem",
          maskImage: "linear-gradient(to bottom, black, transparent 85%)",
        }}
      />
      <div className="relative">
        <div className="flex items-center justify-between gap-4">
          <p className="font-mono text-[0.68rem] tracking-[0.18em] text-electric-cobalt uppercase">
            System model
          </p>
          <p className="font-mono text-[0.68rem] tracking-[0.16em] text-silver">
            01—03
          </p>
        </div>
        <ol className="mt-8">
          {stages.map((stage, index) => (
            <li key={stage.number} className="relative flex gap-4 pb-7 last:pb-0">
              {index < stages.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="absolute top-7 left-[0.4375rem] h-[calc(100%-0.75rem)] w-px bg-steel"
                />
              ) : null}
              <span
                aria-hidden="true"
                className="relative z-10 mt-1 size-3.5 shrink-0 border border-cobalt bg-carbon"
              />
              <div>
                <p className="font-mono text-[0.68rem] tracking-[0.16em] text-electric-cobalt">
                  {stage.number}
                </p>
                <p className="mt-1 font-serif text-2xl tracking-[-0.02em] text-warm-white">
                  {stage.label}
                </p>
                <p className="mt-1 text-sm leading-6 text-silver">{stage.detail}</p>
              </div>
            </li>
          ))}
        </ol>
        <figcaption className="mt-8 border-t border-steel pt-4 text-sm leading-6 text-silver">
          SystemArc studies the operation, finds where work breaks down, and
          builds the system around it.
        </figcaption>
      </div>
    </figure>
  );
}
