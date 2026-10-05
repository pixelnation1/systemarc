import Link from "next/link";

const layers = [
  {
    title: "Business problem",
    detail: "The work that is slow, lost, or stuck",
  },
  {
    title: "Workflow",
    detail: "How that work actually moves today",
  },
  {
    title: "System design",
    detail: "What technology should do, and what it should not",
  },
] as const;

const outputs = [
  {
    title: "Custom software",
    href: "/services/custom-software-development",
  },
  {
    title: "Automation",
    href: "/services/business-process-automation",
  },
  {
    title: "Integrations",
    href: "/services/software-integrations",
  },
  {
    title: "Existing tools",
    href: null,
  },
] as const;

export function SystemPath() {
  return (
    <figure className="border border-steel bg-carbon px-5 py-6 sm:px-8 sm:py-8">
      <p className="font-mono text-[0.68rem] tracking-[0.18em] text-electric-cobalt uppercase">
        From problem to system
      </p>
      <ol className="mt-6 grid gap-0">
        {layers.map((layer, index) => (
          <li key={layer.title}>
            {index > 0 ? (
              <span aria-hidden="true" className="mx-auto block h-5 w-px bg-cobalt" />
            ) : null}
            <div className="border border-steel bg-graphite px-4 py-4">
              <p className="font-serif text-2xl tracking-[-0.02em] text-warm-white">
                {layer.title}
              </p>
              <p className="mt-1 text-sm leading-6 text-silver">{layer.detail}</p>
            </div>
          </li>
        ))}
      </ol>
      <span aria-hidden="true" className="mx-auto mt-0 block h-5 w-px bg-cobalt" />
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {outputs.map((output) => (
          <li key={output.title} className="border border-cobalt bg-graphite px-3 py-3">
            <p className="font-mono text-[0.68rem] tracking-[0.14em] text-electric-cobalt uppercase">
              May include
            </p>
            {output.href ? (
              <Link
                href={output.href}
                className="mt-2 block font-serif text-xl tracking-[-0.02em] text-warm-white underline decoration-steel underline-offset-4 hover:text-electric-cobalt hover:decoration-cobalt"
              >
                {output.title}
              </Link>
            ) : (
              <p className="mt-2 font-serif text-xl tracking-[-0.02em] text-warm-white">
                {output.title}
              </p>
            )}
          </li>
        ))}
      </ul>
      <figcaption className="mt-6 border-t border-steel pt-4 text-sm leading-6 text-silver">
        One business problem can need custom software, automation, integrations,
        and the tools a company already uses. SystemArc decides that after the
        workflow is understood.
      </figcaption>
    </figure>
  );
}
