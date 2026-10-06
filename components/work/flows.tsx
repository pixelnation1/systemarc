const flowSteps = {
  feedback: [
    "Customer interaction",
    "Feedback workflow",
    "Review / internal feedback path",
    "Follow-up",
    "Business visibility",
  ],
  checkin: [
    "Customer",
    "Store check-in",
    "Community",
    "Participation",
    "Support points",
    "Community standing / engagement",
  ],
} as const;

export function StepFlow({ variant }: { variant: "feedback" | "checkin" }) {
  const steps = flowSteps[variant];

  return (
    <ol className="max-w-3xl">
      {steps.map((step, index) => (
        <li key={step}>
          <div className="border border-steel bg-graphite px-5 py-5 sm:px-6">
            <p className="font-mono text-[0.68rem] tracking-[0.16em] text-electric-cobalt">
              {String(index + 1).padStart(2, "0")}
            </p>
            <p className="mt-2 font-serif text-2xl tracking-[-0.02em] text-warm-white uppercase sm:text-3xl">
              {step}
            </p>
          </div>
          {index < steps.length - 1 ? (
            <div aria-hidden="true" className="flex h-8 items-center pl-8">
              <span className="h-full w-px bg-cobalt" />
            </div>
          ) : null}
        </li>
      ))}
    </ol>
  );
}

const repairStages = [
  "Intake",
  "Diagnosis",
  "Approval",
  "Service",
  "Testing",
  "Completion",
] as const;

export function RepairFlow() {
  return (
    <div>
      <p className="font-mono text-[0.68rem] tracking-[0.18em] text-electric-cobalt uppercase">
        Same repair
      </p>
      <div className="mt-6 grid items-stretch gap-4 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <aside className="flex flex-col border border-steel bg-graphite p-6">
          <p className="font-mono text-[0.68rem] tracking-[0.18em] text-electric-cobalt uppercase">
            Customer visibility
          </p>
          <p className="mt-4 font-serif text-2xl tracking-[-0.02em] text-warm-white sm:text-3xl">
            What the customer follows
          </p>
          <p className="mt-4 text-sm leading-6 text-silver">
            Status and service communication for the repair in progress. A view
            of the job, running alongside the workflow.
          </p>
          <div aria-hidden="true" className="mt-8 flex items-center gap-3 lg:mt-auto lg:pt-10">
            <span className="size-1.5 bg-cobalt" />
            <span className="h-px flex-1 bg-cobalt/50" />
          </div>
        </aside>
        <ol aria-label="Repair workflow" className="border border-steel bg-carbon">
          {repairStages.map((stage, index) => (
            <li
              key={stage}
              className="flex items-center gap-4 border-b border-steel px-5 py-4 last:border-b-0"
            >
              <span className="w-8 font-mono text-[0.68rem] tracking-[0.14em] text-electric-cobalt">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span aria-hidden="true" className="h-px w-6 bg-cobalt" />
              <span className="font-serif text-xl tracking-[-0.02em] text-warm-white uppercase sm:text-2xl">
                {stage}
              </span>
            </li>
          ))}
        </ol>
        <aside className="flex flex-col border border-steel bg-graphite p-6">
          <p className="font-mono text-[0.68rem] tracking-[0.18em] text-electric-cobalt uppercase">
            Shop operations
          </p>
          <p className="mt-4 font-serif text-2xl tracking-[-0.02em] text-warm-white sm:text-3xl">
            What the shop runs
          </p>
          <p className="mt-4 text-sm leading-6 text-silver">
            Intake, notes, approvals, parts, and the next action. The
            operational view of the same repair.
          </p>
          <div aria-hidden="true" className="mt-8 flex items-center gap-3 lg:mt-auto lg:pt-10">
            <span className="size-1.5 border border-cobalt" />
            <span className="h-px flex-1 bg-steel" />
          </div>
        </aside>
      </div>
    </div>
  );
}
