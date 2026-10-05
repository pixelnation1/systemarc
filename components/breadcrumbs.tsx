import Link from "next/link";

export function Breadcrumbs({
  items,
}: {
  items: readonly { name: string; href?: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-silver">
        {items.map((item, index) => (
          <li key={`${item.name}-${index}`} className="flex items-center gap-2">
            {index > 0 ? (
              <span aria-hidden="true" className="text-steel">
                /
              </span>
            ) : null}
            {item.href ? (
              <Link
                href={item.href}
                className="underline decoration-steel underline-offset-4 transition-colors hover:text-electric-cobalt hover:decoration-cobalt"
              >
                {item.name}
              </Link>
            ) : (
              <span aria-current="page" className="text-warm-white">
                {item.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
