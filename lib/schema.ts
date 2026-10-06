import { siteDescription, siteName, siteUrl } from "@/lib/site";

export const organizationId = `${siteUrl}/#organization`;
export const websiteId = `${siteUrl}/#website`;

export type SchemaNode = {
  "@type": string;
  [key: string]: unknown;
};

export type Breadcrumb = {
  name: string;
  path: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

function absoluteUrl(path: string) {
  if (path === "/") return siteUrl;
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function organizationNode(): SchemaNode {
  return {
    "@type": "Organization",
    "@id": organizationId,
    name: siteName,
    url: siteUrl,
    logo: `${siteUrl}/images/icon-512.png`,
    description: siteDescription,
    slogan: "Software built around your business.",
  };
}

export function websiteNode(): SchemaNode {
  return {
    "@type": "WebSite",
    "@id": websiteId,
    name: siteName,
    url: siteUrl,
    description: siteDescription,
    publisher: { "@id": organizationId },
    inLanguage: "en",
  };
}

export function siteGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [organizationNode(), websiteNode()],
  };
}

export function pageGraph({
  path,
  name,
  description,
  breadcrumbs,
  extra = [],
  mainEntityId,
}: {
  path: string;
  name: string;
  description: string;
  breadcrumbs: readonly Breadcrumb[];
  extra?: readonly SchemaNode[];
  mainEntityId?: string;
}) {
  const url = absoluteUrl(path);
  const pageId = `${url}#webpage`;
  const breadcrumbId = `${url}#breadcrumb`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": pageId,
        url,
        name,
        description,
        isPartOf: { "@id": websiteId },
        about: { "@id": organizationId },
        breadcrumb: { "@id": breadcrumbId },
        inLanguage: "en",
        ...(mainEntityId ? { mainEntity: { "@id": mainEntityId } } : {}),
      },
      {
        "@type": "BreadcrumbList",
        "@id": breadcrumbId,
        itemListElement: breadcrumbs.map((crumb, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: crumb.name,
          item: absoluteUrl(crumb.path),
        })),
      },
      ...extra,
    ],
  };
}

/** Use only when the service is visibly described on the page. */
export function serviceNode({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}): SchemaNode {
  return {
    "@type": "Service",
    "@id": `${url}#service`,
    name,
    description,
    url,
    provider: { "@id": organizationId },
  };
}

/** Use only for a finished software case study, with fields we actually know. */
export function softwareApplicationNode({
  name,
  description,
  url,
  applicationCategory,
}: {
  name: string;
  description: string;
  url: string;
  applicationCategory: string;
}): SchemaNode {
  return {
    "@type": "SoftwareApplication",
    "@id": `${url}#software`,
    name,
    description,
    url,
    applicationCategory,
    provider: { "@id": organizationId },
  };
}

/** Use only for a published article whose body is on the page. */
export function articleNode({
  headline,
  description,
  url,
}: {
  headline: string;
  description: string;
  url: string;
}): SchemaNode {
  return {
    "@type": "Article",
    "@id": `${url}#article`,
    headline,
    description,
    url,
    author: { "@id": organizationId },
    publisher: { "@id": organizationId },
    inLanguage: "en",
  };
}

/** Use only for questions and answers that are visible on the same page. */
export function faqPageNode({
  url,
  items,
}: {
  url: string;
  items: readonly FaqItem[];
}): SchemaNode {
  return {
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    url,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

/** Use only with a real person's confirmed name, role, and biography. */
export function personNode({
  name,
  jobTitle,
  description,
  url,
  image,
  sameAs,
}: {
  name: string;
  jobTitle: string;
  description: string;
  url?: string;
  image?: string;
  sameAs?: readonly string[];
}): SchemaNode {
  return {
    "@type": "Person",
    ...(url ? { "@id": `${url}#person`, url } : {}),
    name,
    jobTitle,
    description,
    worksFor: { "@id": organizationId },
    ...(image ? { image } : {}),
    ...(sameAs && sameAs.length > 0 ? { sameAs: [...sameAs] } : {}),
  };
}
