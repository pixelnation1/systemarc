import type { Metadata } from "next";
import { routeIndex } from "@/lib/indexing";

export const siteUrl = "https://www.systemarchq.com";

export const siteName = "SystemArc";

export const siteDescription =
  "SystemArc designs and builds custom software, automation, web applications, integrations, and digital systems around the way businesses actually operate.";

export const siteTitle = "SystemArc | Custom Software & Business Systems";

export const navItems = [
  { href: "/services", label: "Services" },
  { href: "/solutions", label: "Solutions" },
  { href: "/work", label: "Work" },
  { href: "/process", label: "Process" },
  { href: "/about", label: "About" },
] as const;

export const footerItems = [
  { href: "/services", label: "Services" },
  { href: "/solutions", label: "Solutions" },
  { href: "/industries", label: "Industries" },
  { href: "/work", label: "Work" },
  { href: "/process", label: "Process" },
  { href: "/about", label: "About" },
  { href: "/start-a-project", label: "Start a Project" },
] as const;

export const legalItems = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
] as const;

export const startProjectHref = "/start-a-project";

function resolveIndex(path: string, requested: boolean | undefined) {
  if (Object.prototype.hasOwnProperty.call(routeIndex, path)) {
    return routeIndex[path as keyof typeof routeIndex];
  }

  return requested ?? false;
}

export function createMetadata({
  title,
  description,
  path,
  index,
  absoluteTitle = false,
}: {
  title: string;
  description: string;
  path: string;
  /** Used only when the path is not listed in the indexing registry. */
  index?: boolean;
  /** Use the title as written, without the site title template. */
  absoluteTitle?: boolean;
}): Metadata {
  const indexed = resolveIndex(path, index);
  const documentTitle = absoluteTitle ? title : `${title} | ${siteName}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: documentTitle,
      description,
      url: path,
      siteName,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: documentTitle,
      description,
    },
    robots: {
      index: indexed,
      follow: true,
    },
  };
}
