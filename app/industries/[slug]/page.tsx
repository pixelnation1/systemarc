import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { IndustryPageView } from "@/components/industries/industry-page-view";
import { getIndustry, industries, industryPath } from "@/lib/industries";
import { pageGraph } from "@/lib/schema";
import { createMetadata } from "@/lib/site";

type IndustryPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({
  params,
}: IndustryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustry(slug);

  if (!industry) {
    return { title: "Industries", robots: { index: false, follow: true } };
  }

  return createMetadata({
    title: industry.metaTitle,
    description: industry.metaDescription,
    path: industryPath(industry.slug),
    absoluteTitle: true,
    index: true,
  });
}

export default async function IndustryDetailPage({ params }: IndustryPageProps) {
  const { slug } = await params;
  const industry = getIndustry(slug);

  if (!industry) notFound();

  const path = industryPath(industry.slug);

  return (
    <>
      <JsonLd
        data={pageGraph({
          path,
          name: industry.metaTitle,
          description: industry.metaDescription,
          breadcrumbs: [
            { name: "Home", path: "/" },
            { name: "Industries", path: "/industries" },
            { name: industry.name, path },
          ],
        })}
      />
      <IndustryPageView industry={industry} />
    </>
  );
}
