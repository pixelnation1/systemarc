import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { SolutionPageView } from "@/components/solutions/solution-page-view";
import { pageGraph, serviceNode } from "@/lib/schema";
import { getSolution, solutionPath, solutions } from "@/lib/solutions";
import { createMetadata, siteUrl } from "@/lib/site";

type SolutionPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return solutions.map((solution) => ({ slug: solution.slug }));
}

export async function generateMetadata({
  params,
}: SolutionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolution(slug);

  if (!solution) {
    return { title: "Solutions", robots: { index: false, follow: true } };
  }

  return createMetadata({
    title: solution.metaTitle,
    description: solution.metaDescription,
    path: solutionPath(solution.slug),
    absoluteTitle: true,
    index: true,
  });
}

export default async function SolutionDetailPage({ params }: SolutionPageProps) {
  const { slug } = await params;
  const solution = getSolution(slug);

  if (!solution) notFound();

  const path = solutionPath(solution.slug);
  const url = `${siteUrl}${path}`;

  return (
    <>
      <JsonLd
        data={pageGraph({
          path,
          name: solution.metaTitle,
          description: solution.metaDescription,
          breadcrumbs: [
            { name: "Home", path: "/" },
            { name: "Solutions", path: "/solutions" },
            { name: solution.name, path },
          ],
          mainEntityId: `${url}#service`,
          extra: [
            serviceNode({
              name: solution.name,
              description: solution.metaDescription,
              url,
            }),
          ],
        })}
      />
      <SolutionPageView solution={solution} />
    </>
  );
}
