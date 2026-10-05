export function OperationRail({
  caption,
  stages,
  columns = 4,
}: {
  caption: string;
  stages: readonly { label: string; detail?: string }[];
  columns?: 4 | 5;
}) {
  const columnClass =
    columns === 5 ? "sm:grid-cols-2 lg:grid-cols-5" : "sm:grid-cols-2 lg:grid-cols-4";

  return (
    <figure>
      <figcaption className="font-mono text-xs tracking-[0.16em] text-electric-cobalt uppercase">
        {caption}
      </figcaption>
      <ol className={`mt-4 grid gap-px border border-steel bg-steel ${columnClass}`}>
        {stages.map((stage, index) => (
          <li key={stage.label} className="bg-slate px-4 py-4">
            <p className="font-mono text-[0.68rem] tracking-[0.16em] text-electric-cobalt">
              {String(index + 1).padStart(2, "0")}
            </p>
            <p className="mt-2 font-serif text-lg tracking-[-0.02em] text-warm-white">
              {stage.label}
            </p>
            {stage.detail ? (
              <p className="mt-2 text-sm leading-6 text-silver">{stage.detail}</p>
            ) : null}
          </li>
        ))}
      </ol>
    </figure>
  );
}
