import { getProject } from "@/lib/projects";
import { siteUrl } from "@/lib/site";

export type ContentFamily =
  | "services"
  | "solutions"
  | "industries"
  | "locations";

export type PageFaq = {
  question: string;
  answer: string;
};

/**
 * Fields a future landing page can define.
 * Unused fields stay optional. A page is not published until it passes
 * `isPublishable`.
 */
export type ProgrammaticPage = {
  family: ContentFamily;
  slug: string;
  title: string;
  /** Full document title. When set, the site title template is not applied. */
  metaTitle?: string;
  metaDescription: string;
  /** Path or absolute production URL. Defaults to /{family}/{slug}. */
  canonical?: string;
  eyebrow?: string;
  headline: string;
  intro: string;
  problem?: string;
  solution?: string;
  capabilities?: readonly string[];
  useCases?: readonly string[];
  relatedServices?: readonly string[];
  relatedIndustries?: readonly string[];
  relatedWork?: readonly string[];
  faq?: readonly PageFaq[];
  schema?: "WebPage" | "Service";
  index?: boolean;
};

export type ReservedTopic = {
  family: ContentFamily;
  slug: string;
  label: string;
};

export type InternalLink = {
  href: string;
  label: string;
};

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/**
 * Reserved topics are not routes. Add a matching entry to `draftPages`
 * only after the page has its own useful content.
 */
export const reservedTopics: readonly ReservedTopic[] = [
  { family: "services", slug: "custom-software-development", label: "Custom software development" },
  { family: "services", slug: "business-process-automation", label: "Business process automation" },
  { family: "services", slug: "web-application-development", label: "Web application development" },
  { family: "services", slug: "software-integrations", label: "Software integrations" },
  { family: "services", slug: "ai-automation", label: "AI automation" },
  { family: "services", slug: "customer-portal-development", label: "Customer portal development" },
  { family: "services", slug: "internal-tools-development", label: "Internal tools development" },
  { family: "solutions", slug: "customer-portals", label: "Customer portals" },
  { family: "solutions", slug: "workflow-automation", label: "Workflow automation" },
  { family: "solutions", slug: "inventory-systems", label: "Inventory systems" },
  { family: "solutions", slug: "scheduling-systems", label: "Scheduling systems" },
  { family: "solutions", slug: "reputation-management", label: "Reputation management" },
  { family: "solutions", slug: "repair-management", label: "Repair management" },
  { family: "solutions", slug: "community-platforms", label: "Community platforms" },
  { family: "solutions", slug: "business-dashboards", label: "Business dashboards" },
  { family: "industries", slug: "repair-shops", label: "Repair shops" },
  { family: "industries", slug: "retail", label: "Retail" },
  { family: "industries", slug: "game-stores", label: "Game stores" },
  { family: "industries", slug: "professional-services", label: "Professional services" },
  { family: "industries", slug: "local-service-businesses", label: "Local service businesses" },
];

/**
 * Pages ready for review. They stay unpublished until `isPublishable`
 * accepts them. Leave this empty rather than adding thin drafts.
 */
export const draftPages: readonly ProgrammaticPage[] = [];

export function pagePath(page: Pick<ProgrammaticPage, "family" | "slug">) {
  return `/${page.family}/${page.slug}`;
}

export function pageCanonicalPath(page: ProgrammaticPage) {
  if (!page.canonical) return pagePath(page);
  if (page.canonical.startsWith(siteUrl)) {
    const path = page.canonical.slice(siteUrl.length);
    return path === "" ? "/" : path;
  }
  if (page.canonical.startsWith("/")) return page.canonical;
  return pagePath(page);
}

export function isPublishable(page: ProgrammaticPage) {
  if (page.index === false) return false;
  if (!slugPattern.test(page.slug)) return false;
  if (page.metaDescription.trim().length < 50) return false;
  if (page.headline.trim().length < 12) return false;
  if (page.intro.trim().length < 180) return false;

  const capabilityCount = page.capabilities?.filter((item) => item.trim()).length ?? 0;
  return Boolean(
    page.problem?.trim() || page.solution?.trim() || capabilityCount >= 2,
  );
}

export function getPublished(family?: ContentFamily) {
  return draftPages.filter(
    (page) => isPublishable(page) && (family === undefined || page.family === family),
  );
}

export function getPublishedPage(family: ContentFamily, slug: string) {
  return getPublished(family).find((page) => page.slug === slug);
}

const familyLabels: Record<ContentFamily, string> = {
  services: "Services",
  solutions: "Solutions",
  industries: "Industries",
  locations: "Locations",
};

const familyParents: Partial<Record<ContentFamily, string>> = {
  services: "/services",
  solutions: "/solutions",
};

export function familyLabel(family: ContentFamily) {
  return familyLabels[family];
}

export function breadcrumbFor(page: ProgrammaticPage) {
  const crumbs = [{ name: "Home", path: "/" }];
  const parent = familyParents[page.family];

  if (parent) {
    crumbs.push({ name: familyLabels[page.family], path: parent });
  }

  crumbs.push({ name: page.title, path: pagePath(page) });
  return crumbs;
}

export function relatedLinks(page: ProgrammaticPage): InternalLink[] {
  const links: InternalLink[] = [];
  const seen = new Set<string>();

  function add(link: InternalLink | undefined) {
    if (!link || seen.has(link.href)) return;
    seen.add(link.href);
    links.push(link);
  }

  for (const slug of page.relatedServices ?? []) {
    const match = getPublished("services").find((item) => item.slug === slug);
    if (match) add({ href: pagePath(match), label: match.title });
  }

  for (const slug of page.relatedIndustries ?? []) {
    const match = getPublished("industries").find((item) => item.slug === slug);
    if (match) add({ href: pagePath(match), label: match.title });
  }

  for (const slug of page.relatedWork ?? []) {
    const project = getProject(slug);
    if (project) add({ href: project.href, label: project.name });
  }

  return links;
}
