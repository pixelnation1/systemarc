export function SolutionFlow({
  problem,
  system,
  outcome,
}: {
  problem: string;
  system: string;
  outcome: string;
}) {
  const steps = [
    { kicker: "The problem", value: problem },
    { kicker: "The system", value: system, emphasis: true },
    { kicker: "The outcome", value: outcome },
  ];

  return (
    <ol className="grid gap-3">
      {steps.map((step, index) => (
        <li key={step.kicker} className="grid gap-3">
          {index > 0 ? (
            <span aria-hidden="true" className="mx-auto h-4 w-px bg-cobalt" />
          ) : null}
          <div
            className={`border px-4 py-3 ${step.emphasis ? "border-cobalt bg-carbon" : "border-steel bg-slate"}`}
          >
            <p className="font-mono text-[0.68rem] tracking-[0.16em] text-electric-cobalt uppercase">
              {step.kicker}
            </p>
            <p className="mt-1 text-sm leading-6 text-warm-white">{step.value}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
