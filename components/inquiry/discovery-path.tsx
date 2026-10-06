const concepts = ["The business", "The workflow", "The problem", "The desired outcome"];

export function DiscoveryPath() {
  return (
    <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {concepts.map((concept, index) => (
        <li key={concept} className="border border-steel bg-graphite p-5">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[0.68rem] tracking-[0.16em] text-electric-cobalt">
              {String(index + 1).padStart(2, "0")}
            </span>
            {index < concepts.length - 1 ? (
              <span aria-hidden="true" className="hidden h-px flex-1 bg-cobalt/50 lg:block" />
            ) : (
              <span aria-hidden="true" className="size-1.5 bg-cobalt" />
            )}
          </div>
          <p className="mt-4 font-serif text-2xl tracking-[-0.02em] text-warm-white uppercase">
            {concept}
          </p>
        </li>
      ))}
    </ol>
  );
}
