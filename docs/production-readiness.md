# Production readiness

Audit date: 2026-10-06. Canonical host: `https://www.systemarchq.com`.

The marketing site can be deployed. It is not ready to accept production leads, and the legal pages are not final. Do not treat a successful form submission in development as proof that a lead was delivered.

## READY

- Homepage, About, Services and seven service pages, Solutions and eight solution pages, Industries and four industry pages, Work and three case studies, and `/start-a-project` are substantive and indexable.
- Each of those pages has a unique title, description, canonical path, Open Graph title, description, URL, site name, and image, plus a large Twitter card. `metadataBase` is `https://www.systemarchq.com`.
- `/sitemap.xml` lists those indexable URLs only, on the www host. It does not list `/privacy`, `/terms`, `/process`, locations, or API routes.
- `/robots.txt` allows all user agents to crawl `/` and points at `https://www.systemarchq.com/sitemap.xml`.
- JSON-LD is Organization, WebSite, WebPage, BreadcrumbList, ItemList, Service, and SoftwareApplication. SoftwareApplication is used only for ReviewForge and RepairForge. There are no ratings, prices, addresses, phones, founding dates, awards, or social profiles.
- FAQ content stays in the HTML. `FAQPage` schema is not emitted, because that rich result is limited and the visible questions already answer the page.
- The default social image is the official lockup: SYSTEMARC and “Software built around your business.” Icons are resized from the existing mark. The 1.2 MB master files are no longer linked from the document head or the header.
- `/start-a-project` validates on the server, limits field length and enums, checks email format, uses a honeypot, and has an in-memory rate-limit structure. Secrets stay on the server. Analytics events do not include form contents.
- Unknown URLs use the branded 404. Rendering failures use `error.tsx` and `global-error.tsx` without showing a stack trace.
- Case-study product frames stay within the page width. Placeholder frames use their aspect ratio without a minimum height that previously pushed them past a 320px viewport.
- `X-Powered-By` is disabled. Responses send `nosniff`, a strict referrer policy, `DENY` framing, a permissions policy, and a narrow content security policy (`base-uri`, `object-src`, `frame-ancestors`, `form-action`). Production responses also send HSTS.
- Search Console and Bing verification tags are supported and stay absent until a real token exists.

## NEEDS EXTERNAL CONFIGURATION

### Project inquiry delivery

What it is: `/start-a-project` has no production destination. Without `INQUIRY_WEBHOOK_URL`, a production submission is rejected and the success screen is not shown. The visitor is told the inquiry was not sent. Development, or `INQUIRY_LOG_SINK=true`, writes an id, source page, company type, and area count to the server log. That log is not a mailbox and does not store the inquiry.

Why it matters: a lead can be lost, or a local test can be mistaken for a delivered lead.

What must happen next: set `INQUIRY_WEBHOOK_URL` to an `https` endpoint that stores the JSON and notifies a person, or add another `InquiryDestination` in `lib/inquiry/submit.ts` for email, a database, or a CRM. Leave `INQUIRY_LOG_SINK` unset in production. Confirm one real submission arrives before launch. Options are documented in `docs/project-inquiry-system.md`. No vendor is selected.

### Shared rate limit

What it is: the inquiry rate limit is an in-memory map, 20 attempts per 15 minutes per IP, inside one process.

Why it matters: two server instances do not share the count, and a restart clears it.

What must happen next: if more than one instance will serve the form, put the limiter in a shared store before relying on it.

### Domain and HTTPS

What it is: the app always canonicalizes to `https://www.systemarchq.com`. It does not configure DNS, Cloudflare, or Vercel.

Why it matters: `systemarchq.com`, `http://www.systemarchq.com`, and any preview host must not become indexed duplicates. `systemarc.com` is not the production domain and is not used in the app.

What must happen next, in Vercel and DNS:

- Serve the site on `www.systemarchq.com` over HTTPS.
- Redirect `systemarchq.com` and `http://www.systemarchq.com` to `https://www.systemarchq.com`.
- Do not attach `systemarc.com` unless that domain is actually owned and redirected the same way.
- Confirm the live response includes the security headers and does not include `X-Powered-By`.
- HSTS is `max-age=63072000; includeSubDomains` and does not include `preload`. Add preload only after the apex host also serves HTTPS and the redirect is confirmed.

### Search Console and Bing

What it is: `GOOGLE_SITE_VERIFICATION` and `BING_SITE_VERIFICATION` are read at build time. Empty values emit nothing. No verification code is invented.

Why it matters: the properties cannot be verified until the tokens exist in the production build.

What must happen next:

1. Add the www property in Google Search Console and Bing Webmaster Tools.
2. Choose the HTML meta-tag method.
3. Set the tokens in the host’s environment and rebuild. Pages are static, so a runtime-only variable will not appear.
4. Submit `https://www.systemarchq.com/sitemap.xml`.

### Analytics provider

What it is: `lib/analytics.ts` can emit `project_form_started`, `project_form_step_completed`, `project_form_submitted`, `start_project_clicked`, `case_study_viewed`, and `service_cta_clicked`. Nothing is listening, and no SDK is installed.

Why it matters: those events are not recorded anywhere.

What must happen next: choose a provider, then call `subscribeToAnalytics` from one client module and store that provider’s key in an environment variable. Do not send form field values.

### Content security policy, later stage

What it is: script, style, image, and connect sources are not locked. A nonce policy would require dynamic rendering, and the allowed hosts for analytics or the inquiry webhook are not known yet.

Why it matters: the current policy stops framing and plugin content. It does not yet restrict scripts.

What must happen next: after the webhook host and any analytics host are chosen, add a nonce-based policy from the Next.js content security guide. Do not guess those domains.

## NEEDS BUSINESS/LEGAL DECISION

### Privacy and terms

What it is: `/privacy` and `/terms` say the policy and terms are not published yet. Both are `noindex` and are absent from the sitemap. The inquiry form links to `/privacy` and says the same thing. No legal text was written for this audit.

Why it matters: the site collects a name, email, optional phone, and business details once delivery is turned on. The public pages do not yet say how that information is kept.

What must happen next: write the policy and terms from the actual practices, publish them, remove the “not published yet” sentences, then set `/privacy` and `/terms` to indexable in `lib/indexing.ts` only after that text is real.

### Process page

What it is: Process is in the primary navigation and is still a preparation page. It is `noindex` and is not in the sitemap.

Why it matters: a main navigation item currently opens a page that says the process will be expanded later.

What must happen next: either publish the process page, or accept the preparation page until that copy exists. The navigation was not changed in this audit.

### Company facts that are intentionally absent

No street address, phone number, team size, office, founding year, credential, or social profile is published, because none of those facts are established in the project. Do not add them until they are verified.

## OPTIONAL IMPROVEMENT

- Case-study screenshot directories are empty. The pages use architectural placeholders. Replace them with real screenshots and alt text that describes the actual image.
- The original `public/images/favicon.png` and `public/images/logo.png` files are still about 1.2 MB each. Pages no longer request them. They can stay as masters.
- Custom Open Graph images for a service, solution, industry, or case study can be passed through `createMetadata({ image })` when artwork exists.
- `app/locations/[slug]` is reserved and publishes nothing. Leave it unused until a location page has its own content.
- A shared rate-limit store is listed above as required only when more than one instance serves the form.

## Crawler policy

`app/robots.ts` allows every crawler, including Googlebot and Bingbot. If SystemArc later wants a different rule for a named crawler, add that user-agent in `app/robots.ts`. Do not add AI-crawler rules from an assumption.
