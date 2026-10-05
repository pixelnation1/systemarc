# SystemArc SEO and content architecture

This document is the rule set for search, answer engines, and future landing pages. The goal is a site that describes SystemArc accurately. It is not a system for manufacturing pages.

Production origin: `https://www.systemarchq.com`

Do not put `localhost` or `vercel.app` URLs in production metadata, canonicals, sitemaps, or JSON-LD.

## 1. SEO strategy

SystemArc is a custom software and business systems company. The positioning is: software built around your business.

Search pages should explain a real problem, the way SystemArc approaches it, and what the company actually builds. The homepage, the About page, the Work index, the Services index, the seven published service pages, the Solutions index, and the eight published solution pages are indexable because they contain that substance.

Metadata is generated with `createMetadata` in `lib/site.ts`. `metadataBase` is the production origin, so a path such as `/about` becomes `https://www.systemarchq.com/about`.

Every indexable page sets:

- a unique title
- a unique meta description
- a canonical URL
- Open Graph title, description, URL, and site name
- Twitter card title and description

The title template is `%s | SystemArc`. Pass `absoluteTitle: true` when the title must be used exactly, as on the homepage and About page.

Unknown paths are not indexable unless the caller explicitly opts in. Paths listed in `lib/indexing.ts` use that registry, even if a page file passes a different `index` flag.

## 2. Programmatic SEO principles

Future families may live at:

- `/services/[slug]` for a service with its own content in `lib/services.ts`
- `/solutions/[slug]` for a solution with its own content in `lib/solutions.ts`
- `/industries/[slug]`
- `/locations/[slug]`

The seven service pages are published from `lib/services.ts`. The eight solution pages are published from `lib/solutions.ts`. They are not thin drafts, and they are not the same pages with the nouns swapped. Industries and locations still publish nothing until a page is added to `draftPages` in `lib/content.ts` and passes `isPublishable`.

Do not publish a solution for every combination of service, industry, and city. A combination page exists only when it has substantial content of its own.

`/services/custom-software-development` and the other six service URLs are live. Do not create a second URL for the same service.

A publishable page needs:

- a lowercase, hyphen-separated slug
- a meta description of at least 50 characters
- a headline
- an introduction of at least 180 characters
- a problem, a solution, or at least two capabilities
- `index` not set to `false`

Reserved slugs in `reservedTopics` are a planning list. They are not URLs. Do not generate a page because a slug was reserved.

Do not combine every service, industry, and city. A page exists only when its search intent is distinct and the content is useful on its own. One thin template with the nouns swapped is not a page.

Do not create city pages, office pages, or location pages unless SystemArc actually serves that place and the page says something that is not true of a generic service page.

## 3. AEO content principles

Write so a person can understand the section without the surrounding marketing.

- One H1 per page.
- H2 and H3 headings that say what the section is about.
- Short paragraphs that state the point directly.
- Semantic HTML: `article`, `section`, `nav`, lists, and definition lists where they match the content.
- Descriptive link text. Do not use "click here" or "learn more" alone.
- The important answer in server-rendered HTML, not behind a click, tab, or animation.

Do not add a FAQ block to create FAQ schema. Add questions only when a reader of that page would actually ask them, and show the answers on the page.

Do not stuff keywords into headings.

## 4. GEO content principles

Use the same description of SystemArc across the site:

SystemArc designs and builds custom software, automation, web applications, integrations, and digital systems around the way businesses actually operate.

Keep these facts consistent wherever they appear:

- what SystemArc does
- which services it provides
- which systems it has built: ReviewForge, RepairForge, and PixelNation Systems
- the problem it solves: businesses should not have to reshape the operation to fit generic software

Those three systems are SystemArc projects. Do not describe them as outside client work. Do not invent customers, counts, revenue, timelines, or performance results.

Case studies should become evidence pages when they have real narrative. Until then they stay out of the index.

Do not hide the company description, services, or project names in client-side state.

## 5. URL architecture

URLs are lowercase, readable, and hyphen-separated. They stay stable once published.

Examples:

- `/about`
- `/work`
- `/work/reviewforge`
- `/services/custom-software-development`

Do not create a second URL for the same page with a query string, trailing variant, or synonym slug. Set one canonical path.

`/industries` and `/locations` do not have index pages. Do not add an empty directory page just to have a parent URL.

## 6. Content model

`ProgrammaticPage` in `lib/content.ts` is the shape for a future landing page. Published services in `lib/services.ts` and published solutions in `lib/solutions.ts` are mapped into that shape so the sitemap and related links stay in one place. Those pages render from their own records, not from the generic landing-page view.

Fields:

- `slug`
- `title`
- `metaTitle`
- `metaDescription`
- `canonical`
- `eyebrow`
- `headline`
- `intro`
- `problem`
- `solution`
- `capabilities`
- `useCases`
- `relatedServices`
- `relatedIndustries`
- `relatedWork`
- `faq`
- `schema`

Leave a field out when the page does not need it. `metaTitle`, when present, is the full document title and skips the site template.

`schema` may be `WebPage` or `Service`. Service schema is added for service-family pages because the page itself is the service description. Do not set it on a page that does not describe a service.

## 7. Internal linking

Link by name.

- Services, solutions, and industries link to one another only when the target is published.
- Work references use the project name and the project URL, for example "ReviewForge".
- Calls to action use "Start a Project", "View Our Work", or "Explore Our Work".
- `relatedLinks` drops any slug that is not a published page or a known project, so reserved topics never become broken links.

The header and footer already link the main sections. Body copy should add a link when it helps the reader continue, not to pass equity to a placeholder.

## 8. Structured data

JSON-LD is server-rendered. `lib/schema.ts` builds it. `components/json-ld.tsx` prints it and escapes `<`.

The root layout emits:

- `Organization` with name, URL, logo, description, and the slogan "Software built around your business."
- `WebSite` linked to that organization

Indexable pages emit:

- `WebPage`
- `BreadcrumbList`

Builders exist, and must stay unused until the matching content is real and visible:

- `Service`
- `SoftwareApplication` for a finished case study
- `Article`
- `FAQPage` only for questions visible on that page, and only when current search guidelines make a FAQ rich result appropriate. The service pages show their questions in HTML and do not emit `FAQPage`, because that rich result is limited to government and health sites.
- `Person` only with a confirmed name, role, and biography

Do not add address, phone, employee count, founding date, awards, social profiles, ratings, or reviews. Those facts are not established.

Do not add schema that the page does not show.

Team profiles live in `lib/team.ts`. The array is empty until a real profile exists. The About page renders profiles only from that array.

## 9. Sitemap behavior

`app/sitemap.ts` builds `/sitemap.xml`.

It includes:

- static paths marked indexable in `lib/indexing.ts`
- programmatic pages that pass `isPublishable`

It excludes placeholder routes, legal placeholders, unfinished case studies, and reserved topics. A future page appears automatically when it becomes publishable. No manual sitemap edit is required for that.

`lastmod` is omitted. A generated timestamp would claim the page changed when it did not.

## 10. Robots

`app/robots.ts` allows `/` for all crawlers and points to `https://www.systemarchq.com/sitemap.xml`.

Placeholder pages are not blocked in `robots.txt`. They use `noindex, follow` so crawlers can still follow links to indexable pages. Blocking them in robots would hide those links.

## 11. Thin and duplicate content

Do not publish a page that could be produced by filling blanks in a template.

Do not publish the same explanation under several URLs.

Do not create doorway pages, city pages for places SystemArc does not serve, or pages aimed at a keyword SystemArc does not actually discuss.

If a route is only a placeholder or "coming soon", set it `noindex, follow` and leave it out of the sitemap. The homepage, the completed About page, the Work index, `/services`, the seven completed service pages, `/solutions`, and the eight completed solution pages stay indexable. Individual case studies stay `noindex` until they are written.

When a placeholder gains a full page, change its entry in `lib/indexing.ts` to `true`. The metadata helper and the sitemap both follow that flag.
