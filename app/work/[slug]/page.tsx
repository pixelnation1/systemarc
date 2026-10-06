import { notFound } from "next/navigation";
import { TrackCaseStudyView } from "@/components/analytics/track-case-study";
import { CaseStudyView } from "@/components/work/case-study-view";
import { JsonLd } from "@/components/json-ld";
import { caseStudies, getCaseStudy } from "@/lib/case-studies";
import { listProjectShots } from "@/lib/project-shots";
import { pageGraph, softwareApplicationNode } from "@/lib/schema";
import { createMetadata, siteUrl } from "@/lib/site";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) {
    return { title: "Work", robots: { index: false, follow: true } };
  }

  return createMetadata({
    title: study.seoTitle,
    description: study.description,
    path: study.href,
    index: true,
    absoluteTitle: true,
  });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) {
    notFound();
  }

  const url = `${siteUrl}${study.href}`;
  const software = study.softwareApplication
    ? softwareApplicationNode({
        name: study.name,
        description: study.answer,
        url,
        applicationCategory: study.category,
      })
    : null;

  return (
    <>
      <JsonLd
        data={pageGraph({
          path: study.href,
          name: study.seoTitle,
          description: study.description,
          breadcrumbs: [
            { name: "Home", path: "/" },
            { name: "Work", path: "/work" },
            { name: study.name, path: study.href },
          ],
          extra: software ? [software] : [],
          mainEntityId: software ? `${url}#software` : undefined,
        })}
      />
      <TrackCaseStudyView slug={study.slug} />
      <CaseStudyView study={study} shots={listProjectShots(study.imageDir)} />
    </>
  );
}
