import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/services",
    "/solutions",
    "/work",
    "/process",
    "/about",
    "/start-a-project",
    "/privacy",
    "/terms",
    ...projects.map((project) => `/work/${project.slug}`),
  ];

  return paths.map((path) => ({
    url: `${siteUrl}${path}`,
  }));
}
