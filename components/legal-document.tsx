import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Container } from "@/components/container";
import { PageSchema } from "@/components/json-ld";

export function LegalDocument({
  path,
  title,
  description,
  breadcrumb,
  updated,
  children,
}: {
  path: string;
  title: string;
  description: string;
  breadcrumb: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <>
      <PageSchema
        path={path}
        name={`${title} | SystemArc`}
        description={description}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: breadcrumb, path },
        ]}
      />
      <article>
        <header>
          <Container className="py-16 sm:py-20">
            <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: breadcrumb }]} />
            <div className="mt-10 max-w-2xl">
              <p className="font-mono text-xs tracking-[0.18em] text-electric-cobalt uppercase">
                Legal
              </p>
              <h1 className="mt-5 font-serif text-4xl leading-[1.08] tracking-[-0.02em] text-balance text-warm-white sm:text-5xl">
                {title}
              </h1>
              <p className="mt-6 text-sm leading-6 text-silver">Last updated: {updated}</p>
            </div>
          </Container>
        </header>
        <div className="border-t border-steel">{children}</div>
      </article>
    </>
  );
}

export function LegalSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section aria-labelledby={id} className="border-b border-steel">
      <Container className="py-12 sm:py-16">
        <div className="max-w-2xl">
          <h2
            id={id}
            className="font-serif text-2xl leading-tight tracking-[-0.02em] text-warm-white sm:text-3xl"
          >
            {title}
          </h2>
          <div className="mt-5 space-y-4 text-base leading-7 text-silver">{children}</div>
        </div>
      </Container>
    </section>
  );
}

export function LegalList({ items }: { items: readonly string[] }) {
  return (
    <ul className="grid gap-3">
      {items.map((item) => (
        <li key={item} className="flex min-w-0 gap-3">
          <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 bg-cobalt" />
          <span className="min-w-0">{item}</span>
        </li>
      ))}
    </ul>
  );
}
