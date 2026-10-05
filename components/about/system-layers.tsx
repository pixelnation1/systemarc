const layers = ["People", "Process", "Software", "Data"] as const;

export function SystemLayers() {
  return (
    <figure className="mt-14">
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {layers.map((layer) => (
          <li key={layer} className="border border-steel bg-carbon px-4 py-5">
            <span aria-hidden="true" className="mb-5 block size-1.5 bg-cobalt" />
            <p className="font-mono text-xs tracking-[0.16em] text-warm-white uppercase">
              {layer}
            </p>
          </li>
        ))}
      </ul>
      <div aria-hidden="true" className="flex justify-center">
        <span className="h-8 w-px bg-cobalt" />
      </div>
      <div className="mx-auto flex w-full max-w-xs items-center justify-center gap-3 border border-cobalt bg-carbon px-6 py-4">
        <span aria-hidden="true" className="size-1.5 bg-cobalt" />
        <p className="font-mono text-xs tracking-[0.18em] text-warm-white uppercase">
          System
        </p>
      </div>
      <figcaption className="mt-6 max-w-2xl text-sm leading-6 text-silver">
        People, process, software, and data connect into the system that keeps
        the business operating.
      </figcaption>
    </figure>
  );
}
