# Production readiness

Audit date: 2026-10-06. Canonical host: `https://www.systemarchq.com`.

The marketing site can be deployed. Production lead delivery stores a confirmed inquiry in the existing SystemArc Supabase project. The privacy policy and website terms are published drafts and still need owner review. Do not treat a successful form submission in development as proof that a lead was stored.

## READY

- Homepage, About, Services and seven service pages, Solutions and eight solution pages, Industries and four industry pages, Work and three case studies, Process, and `/start-a-project` are substantive and indexable.
- Each of those pages has a unique title, description, canonical path, Open Graph title, description, URL, site name, and image, plus a large Twitter card. `metadataBase` is `https://www.systemarchq.com`.
- `/sitemap.xml` lists those indexable URLs, plus `/privacy` and `/terms`, on the www host. It does not list locations or API routes.
- `/robots.txt` allows all user agents to crawl `/` and points at `https://www.systemarchq.com/sitemap.xml`.
- JSON-LD is Organization, WebSite, WebPage, BreadcrumbList, ItemList, Service, and SoftwareApplication. SoftwareApplication is used only for ReviewForge and RepairForge. Organization includes the public email `support@systemarchq.com`. There are no ratings, prices, addresses, phones, founding dates, awards, or social profiles.
- FAQ content stays in the HTML. `FAQPage` schema is not emitted, because that rich result is limited and the visible questions already answer the page.
- The default social image is the official lockup: SYSTEMARC and “Software built around your business.” Icons are resized from the existing mark. The 1.2 MB master files are no longer linked from the document head or the header.
- `/start-a-project` validates on the server, limits field length and enums, checks email format, uses a honeypot, and has an in-memory rate-limit structure. Secrets stay on the server. Analytics events do not include form contents.
- Unknown URLs use the branded 404. Rendering failures use `error.tsx` and `global-error.tsx` without showing a stack trace.
- Case-study product frames stay within the page width. Placeholder frames use their aspect ratio without a minimum height that previously pushed them past a 320px viewport.
- `X-Powered-By` is disabled. Responses send `nosniff`, a strict referrer policy, `DENY` framing, a permissions policy, and a narrow content security policy (`base-uri`, `object-src`, `frame-ancestors`, `form-action`). Production responses also send HSTS.
- Search Console and Bing verification tags are supported and stay absent until a real token exists.

## NEEDS EXTERNAL CONFIGURATION

### Project inquiry delivery

Status: READY

What it is: the existing form validates an inquiry and POSTs version `1.0` to `INQUIRY_WEBHOOK_URL`. `POST /api/inquiries/webhook` checks a bearer secret, validates the payload again, and inserts it into Supabase `project_inquiries`. The success screen appears only after that insert is confirmed with HTTP 2xx. A missing URL, a rejected webhook, or a database error keeps the failure screen. `INQUIRY_LOG_SINK` is ignored in production.

Production uses the existing Supabase project `systemarc` (`mvuxmjxutzafkhbxswkg`, `us-west-2`). The migration is applied. Row level security is enabled and there are no public policies. The Vercel project `natejobe2003-7298s-projects/systemarc` has the production sender, receiver, and Supabase variables. One synthetic end-to-end submission is stored with status `new`.

Why it matters: a visitor success screen on production now means the inquiry row exists.

What remains outside delivery: the published privacy policy and website terms are drafts and still need owner review. The storage contract is in `docs/lead-storage.md` and `docs/project-inquiry-system.md`.

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

What it is: `lib/analytics.ts` can emit `project_form_started`, `project_form_step_completed`, `project_form_submitted`, `start_project_clicked`, `case_study_viewed`, and `service_cta_clicked`. `project_form_submitted` fires only after the inquiry webhook returns 2xx. Nothing is listening, and no SDK is installed.

Why it matters: those events are not recorded anywhere.

What must happen next: choose a provider, then call `subscribeToAnalytics` from one client module and store that provider’s key in an environment variable. Do not send form field values.

### Content security policy, later stage

What it is: script, style, image, and connect sources are not locked. A nonce policy would require dynamic rendering, and the allowed hosts for analytics or the inquiry webhook are not known yet.

Why it matters: the current policy stops framing and plugin content. It does not yet restrict scripts.

What must happen next: after the webhook host and any analytics host are chosen, add a nonce-based policy from the Next.js content security guide. Do not guess those domains.

## NEEDS BUSINESS/LEGAL DECISION

### Privacy policy

Status: DRAFT PUBLISHED / OWNER REVIEW RECOMMENDED

What it is: `/privacy` describes the website’s current collection, use, storage, and sharing practices in plain language. It is indexable and listed in the sitemap. The inquiry form links to it. The page has not been marked attorney approved.

### Website terms

Status: DRAFT PUBLISHED / OWNER REVIEW RECOMMENDED

What it is: `/terms` governs use of the public website. It states that client work is controlled by a separate proposal, statement of work, services agreement, or other written agreement. It is indexable and listed in the sitemap. The page has not been marked attorney approved.

Why it matters: the site collects a name, work email, optional phone, and business details through Start a Project. The public pages now describe those practices as implemented. They are drafts based on the known website behavior.

Revisit both documents if any of the following change:

- Analytics or a similar technology is introduced.
- Marketing email is introduced.
- Accounts are introduced.
- Payments are introduced.
- Data practices change.
- A new infrastructure provider materially affects how information is processed.
- SystemArc’s legal entity is finalized.

### Company facts

Official SystemArc public contact email: `support@systemarchq.com`. It is stored in `lib/site.ts` as `contactEmail`.

No street address, phone number, team size, office, founding year, credential, or social profile is published, because none of those facts are established in the project. Do not add them until they are verified.

## OPTIONAL IMPROVEMENT

- Case-study screenshot directories are empty. The pages use architectural placeholders. Replace them with real screenshots and alt text that describes the actual image.
- The original `public/images/favicon.png` and `public/images/logo.png` files are still about 1.2 MB each. Pages no longer request them. They can stay as masters.
- Custom Open Graph images for a service, solution, industry, or case study can be passed through `createMetadata({ image })` when artwork exists.
- `app/locations/[slug]` is reserved and publishes nothing. Leave it unused until a location page has its own content.
- A shared rate-limit store is listed above as required only when more than one instance serves the form.

## Crawler policy

`app/robots.ts` allows every crawler, including Googlebot and Bingbot. If SystemArc later wants a different rule for a named crawler, add that user-agent in `app/robots.ts`. Do not add AI-crawler rules from an assumption.
