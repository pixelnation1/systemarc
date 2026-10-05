import type { Metadata } from "next";

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

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteName,
  url: siteUrl,
  logo: `${siteUrl}/images/logo.png`,
  description: siteDescription,
};

export function createMetadata({
  title,
  description,
  path,
  index = true,
}: {
  title: string;
  description: string;
  path: string;
  index?: boolean;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { url: path },
    robots: index
      ? { index: true, follow: true }
      : { index: false, follow: true },
  };
}
