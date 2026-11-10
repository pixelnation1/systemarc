import type { Metadata } from "next";
import { routeIndex } from "@/lib/indexing";

export const siteUrl = "https://www.systemarchq.com";

export const siteName = "SystemArc";

export const contactEmail = "support@systemarchq.com";

export const siteDescription =
  "SystemArc builds professional business websites, custom software, and automation to help businesses win more inquiries, save time, and grow.";

export const siteTitle = "SystemArc | Business Websites, Software & Automation";

export const navItems = [
  { href: "/services/business-websites", label: "Websites" },
  { href: "/services/custom-software-development", label: "Software & Automation" },
  { href: "/portfolio", label: "Our Work" },
  { href: "/media", label: "Media" },
  { href: "/about", label: "About" },
] as const;

export const footerItems = [
  { href: "/services", label: "Services" },
  { href: "/media", label: "Media" },
  { href: "/industries", label: "Industries" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/process", label: "Process" },
  { href: "/about", label: "About" },
  { href: "/start-a-project", label: "Start a Project" },
] as const;

export const legalItems = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
] as const;

export const startProjectHref = "/website-quote";

export const defaultSocialImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "SystemArc. Your next big move. Built together.",
} as const;

export type SocialImage = {
  url: string;
  width: number;
  height: number;
  alt: string;
};

/** Present only when a real verification value is set at build time. */
export function siteVerification() {
  const google = process.env.GOOGLE_SITE_VERIFICATION?.trim();
  const bing = process.env.BING_SITE_VERIFICATION?.trim();

  if (!google && !bing) return undefined;

  return {
    ...(google ? { google } : {}),
    ...(bing ? { other: { "msvalidate.01": bing } } : {}),
  };
}

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
  image = defaultSocialImage,
}: {
  title: string;
  description: string;
  path: string;
  /** Used only when the path is not listed in the indexing registry. */
  index?: boolean;
  /** Use the title as written, without the site title template. */
  absoluteTitle?: boolean;
  /** Replaces the default social image for this page. */
  image?: SocialImage;
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
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: documentTitle,
      description,
      images: [image.url],
    },
    robots: {
      index: indexed,
      follow: true,
    },
  };
}
