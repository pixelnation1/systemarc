import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProgrammaticPageView } from "@/components/programmatic-page";
import {
  getPublished,
  getPublishedPage,
  pageCanonicalPath,
  type ContentFamily,
} from "@/lib/content";
import { createMetadata } from "@/lib/site";

type RouteParams = {
  params: Promise<{ slug: string }>;
};

export function contentRoute(family: ContentFamily) {
  return {
    generateStaticParams() {
      return getPublished(family).map((page) => ({ slug: page.slug }));
    },
    async generateMetadata({ params }: RouteParams): Promise<Metadata> {
      const { slug } = await params;
      const page = getPublishedPage(family, slug);

      if (!page) {
        return { robots: { index: false, follow: true } };
      }

      return createMetadata({
        title: page.metaTitle ?? page.title,
        description: page.metaDescription,
        path: pageCanonicalPath(page),
        absoluteTitle: Boolean(page.metaTitle),
        index: true,
      });
    },
    async Page({ params }: RouteParams) {
      const { slug } = await params;
      const page = getPublishedPage(family, slug);

      if (!page) notFound();

      return <ProgrammaticPageView page={page} />;
    },
  };
}
