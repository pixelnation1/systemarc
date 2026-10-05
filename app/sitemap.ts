import type { MetadataRoute } from "next";
import { getPublished, pageCanonicalPath } from "@/lib/content";
import { indexableStaticPaths } from "@/lib/indexing";
import { siteUrl } from "@/lib/site";

function absoluteUrl(path: string) {
  return path === "/" ? siteUrl : `${siteUrl}${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    ...indexableStaticPaths(),
    ...getPublished().map((page) => pageCanonicalPath(page)),
  ];

  return [...new Set(paths)].map((path) => ({
    url: absoluteUrl(path),
  }));
}
