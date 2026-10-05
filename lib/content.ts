import { industries } from "@/lib/industries";
import { getProject } from "@/lib/projects";
import { services } from "@/lib/services";
import { solutions } from "@/lib/solutions";
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
export const reservedTopics: readonly ReservedTopic[] = [];

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

function publishedServices(): ProgrammaticPage[] {
  return services.map((service) => ({
    family: "services" as const,
    slug: service.slug,
    title: service.name,
    metaTitle: service.metaTitle,
    metaDescription: service.metaDescription,
    headline: service.headline,
    intro: service.intro
      .map((paragraph) =>
        paragraph
          .map((part) => (typeof part === "string" ? part : part.text))
          .join(""),
      )
      .join(" "),
    problem: service.problems.map((item) => item.body).join(" "),
    capabilities: service.builds.map((item) => item.title),
    relatedServices: service.relatedServices,
    relatedWork: service.relatedWork.map((item) => item.slug),
    faq: service.faq,
    schema: "Service" as const,
    index: true,
  }));
}

function publishedSolutions(): ProgrammaticPage[] {
  return solutions.map((solution) => ({
    family: "solutions" as const,
    slug: solution.slug,
    title: solution.name,
    metaTitle: solution.metaTitle,
    metaDescription: solution.metaDescription,
    headline: solution.headline,
    intro: solution.intro
      .map((paragraph) =>
        paragraph
          .map((part) => (typeof part === "string" ? part : part.text))
          .join(""),
      )
      .join(" "),
    problem: solution.signs.map((item) => item.body).join(" "),
    solution: solution.definition.answer
      .map((paragraph) =>
        paragraph
          .map((part) => (typeof part === "string" ? part : part.text))
          .join(""),
      )
      .join(" "),
    capabilities: solution.includes.map((item) => item.title),
    relatedServices: solution.services,
    relatedWork: solution.relatedWork.map((item) => item.slug),
    faq: solution.faq,
    schema: "Service" as const,
    index: true,
  }));
}

function publishedIndustries(): ProgrammaticPage[] {
  return industries.map((industry) => ({
    family: "industries" as const,
    slug: industry.slug,
    title: industry.name,
    metaTitle: industry.metaTitle,
    metaDescription: industry.metaDescription,
    headline: industry.headline,
    intro: industry.intro
      .map((paragraph) =>
        paragraph
          .map((part) => (typeof part === "string" ? part : part.text))
          .join(""),
      )
      .join(" "),
    problem: industry.problems.map((item) => item.body).join(" "),
    solution: industry.relevance.answer
      .map((paragraph) =>
        paragraph
          .map((part) => (typeof part === "string" ? part : part.text))
          .join(""),
      )
      .join(" "),
    capabilities: industry.systems.map((item) => item.title),
    relatedServices: industry.services.map((item) => item.slug),
    relatedIndustries: industry.relatedIndustries.map((item) => item.slug),
    relatedWork: industry.relatedWork.map((item) => item.slug),
    faq: industry.faq,
    schema: "WebPage" as const,
    index: true,
  }));
}

export function getPublished(family?: ContentFamily) {
  return [
    ...publishedServices(),
    ...publishedSolutions(),
    ...publishedIndustries(),
    ...draftPages,
  ].filter((page) => isPublishable(page) && (family === undefined || page.family === family));
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
  industries: "/industries",
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
