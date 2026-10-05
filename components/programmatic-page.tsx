import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { Container } from "@/components/container";
import { ButtonLink } from "@/components/button-link";
import {
  breadcrumbFor,
  familyLabel,
  pageCanonicalPath,
  relatedLinks,
  type ProgrammaticPage,
} from "@/lib/content";
import {
  faqPageNode,
  pageGraph,
  serviceNode,
  type SchemaNode,
} from "@/lib/schema";
import { siteUrl, startProjectHref } from "@/lib/site";

export function ProgrammaticPageView({ page }: { page: ProgrammaticPage }) {
  const path = pageCanonicalPath(page);
  const url = `${siteUrl}${path === "/" ? "" : path}`;
  const documentTitle = page.metaTitle ?? `${page.title} | SystemArc`;
  const links = relatedLinks(page);
  const visibleFaq = page.faq?.filter(
    (item) => item.question.trim() && item.answer.trim(),
  );
  const extra: SchemaNode[] = [];

  if (page.schema === "Service" || page.family === "services") {
    extra.push(
      serviceNode({
        name: page.title,
        description: page.metaDescription,
        url,
      }),
    );
  }

  if (visibleFaq && visibleFaq.length > 0) {
    extra.push(faqPageNode({ url, items: visibleFaq }));
  }

  return (
    <>
      <JsonLd
        data={pageGraph({
          path,
          name: documentTitle,
          description: page.metaDescription,
          breadcrumbs: breadcrumbFor(page),
          extra,
        })}
      />
      <Container className="py-20 sm:py-28">
        <article>
          <p className="font-mono text-xs tracking-[0.18em] text-electric-cobalt uppercase">
            {page.eyebrow ?? familyLabel(page.family)}
          </p>
          <h1 className="mt-4 max-w-[16em] font-serif text-4xl leading-[1.1] tracking-[-0.02em] text-balance text-warm-white sm:text-5xl">
            {page.headline}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-silver sm:text-lg sm:leading-8">
            {page.intro}
          </p>

          {page.problem ? (
            <section className="mt-14 max-w-2xl" aria-labelledby="problem-heading">
              <h2
                id="problem-heading"
                className="font-serif text-3xl tracking-[-0.02em] text-warm-white"
              >
                The problem
              </h2>
              <p className="mt-4 text-base leading-7 text-silver">{page.problem}</p>
            </section>
          ) : null}

          {page.solution ? (
            <section className="mt-12 max-w-2xl" aria-labelledby="solution-heading">
              <h2
                id="solution-heading"
                className="font-serif text-3xl tracking-[-0.02em] text-warm-white"
              >
                How SystemArc approaches it
              </h2>
              <p className="mt-4 text-base leading-7 text-silver">{page.solution}</p>
            </section>
          ) : null}

          {page.capabilities && page.capabilities.length > 0 ? (
            <section className="mt-12" aria-labelledby="capabilities-heading">
              <h2
                id="capabilities-heading"
                className="font-serif text-3xl tracking-[-0.02em] text-warm-white"
              >
                What this includes
              </h2>
              <ul className="mt-6 max-w-2xl space-y-3">
                {page.capabilities.map((capability) => (
                  <li key={capability} className="border-t border-steel pt-3 text-silver">
                    {capability}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {page.useCases && page.useCases.length > 0 ? (
            <section className="mt-12" aria-labelledby="uses-heading">
              <h2
                id="uses-heading"
                className="font-serif text-3xl tracking-[-0.02em] text-warm-white"
              >
                Where it applies
              </h2>
              <ul className="mt-6 max-w-2xl space-y-3">
                {page.useCases.map((useCase) => (
                  <li key={useCase} className="text-base leading-7 text-silver">
                    {useCase}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {visibleFaq && visibleFaq.length > 0 ? (
            <section className="mt-14 max-w-2xl" aria-labelledby="questions-heading">
              <h2
                id="questions-heading"
                className="font-serif text-3xl tracking-[-0.02em] text-warm-white"
              >
                Questions
              </h2>
              <dl className="mt-6 space-y-8">
                {visibleFaq.map((item) => (
                  <div key={item.question}>
                    <dt className="font-serif text-xl text-warm-white">{item.question}</dt>
                    <dd className="mt-2 text-base leading-7 text-silver">{item.answer}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ) : null}

          {links.length > 0 ? (
            <nav className="mt-14" aria-label="Related pages">
              <h2 className="font-serif text-2xl tracking-[-0.02em] text-warm-white">
                Related pages
              </h2>
              <ul className="mt-4 space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-flex min-h-11 items-center text-sm text-warm-white underline decoration-steel underline-offset-4 hover:text-electric-cobalt hover:decoration-cobalt"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}

          <div className="mt-12">
            <ButtonLink href={startProjectHref}>Start a Project</ButtonLink>
          </div>
        </article>
      </Container>
    </>
  );
}
