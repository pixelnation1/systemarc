# SystemArc

The public website for SystemArc, a custom software and business systems company. The production host is [https://www.systemarchq.com](https://www.systemarchq.com).

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS v4

There is no analytics SDK, CRM SDK, or form vendor in the project. Project inquiries can be stored in Supabase from the server. The browser does not receive a Supabase key.

## Local development

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env.local` when you need form delivery or search-engine verification tags. Leave the values empty until they are real. The site runs without them. In development, a project inquiry is written to the server log and is not stored for follow-up.

## Production build

```bash
npm run lint
npm run build
npm start
```

Canonical URLs, the sitemap, and JSON-LD always use `https://www.systemarchq.com`. They are not taken from the local host.

## Environment variables

| Name | Purpose |
| --- | --- |
| `INQUIRY_WEBHOOK_URL` | Sending side. Production `https` endpoint. Use `https://www.systemarchq.com/api/inquiries/webhook`. |
| `INQUIRY_WEBHOOK_SECRET` | Sending side. Bearer token sent only from the server. Same value as the receiver secret. |
| `INQUIRY_LOG_SINK` | Development-only diagnostic log. Ignored in production. Leave unset there. |
| `INQUIRY_RECEIVER_SECRET` | Receiving side. Required bearer token for the inquiry webhook. Server-only. |
| `SUPABASE_URL` | Server-only Supabase project URL. Not a `NEXT_PUBLIC_` variable. |
| `SUPABASE_SECRET_KEY` | Privileged Supabase secret key. Server-only. Bypasses row level security. |
| `GOOGLE_SITE_VERIFICATION` | Google Search Console token. Omitted from the HTML until set. Must be present at build time. |
| `BING_SITE_VERIFICATION` | Bing Webmaster Tools token (`msvalidate.01`). Omitted until set. Must be present at build time. |

Do not commit `.env.local` or real secrets. `.env.example` lists names only.

## Project structure

- `app/` — routes, metadata, sitemap, robots, error pages
- `components/` — page sections and the project inquiry form
- `lib/` — content, schema, indexing, and the inquiry service
- `public/images/` — brand mark, lockup, and generated icon sizes
- `docs/` — architecture and production notes

## Deployment

The site is a Next.js app with a server action for `/start-a-project` and a server route at `/api/inquiries/webhook`. Deploy it behind HTTPS on `www.systemarchq.com`. Point the apex host at that same HTTPS host. Lead storage setup is in [docs/lead-storage.md](docs/lead-storage.md). Release notes are in [docs/production-readiness.md](docs/production-readiness.md).

## Documentation

- [docs/README.md](docs/README.md) — index
- [docs/seo-content-architecture.md](docs/seo-content-architecture.md) — SEO, AEO, and GEO
- [docs/project-inquiry-system.md](docs/project-inquiry-system.md) — discovery form
- [docs/lead-storage.md](docs/lead-storage.md) — inquiry receiver and Supabase
- [docs/production-readiness.md](docs/production-readiness.md) — release audit
