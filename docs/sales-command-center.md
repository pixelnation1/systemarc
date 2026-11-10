# SystemArc Sales Command Center

Private workspace URL: https://www.systemarchq.com/sales

## Sign in

The sales login page sends a single-use email link to SALES_ADMIN_EMAIL when configured; otherwise it uses the existing INQUIRY_NOTIFICATION_EMAIL production setting. Only the server decides the recipient. The public login page never asks visitors to choose an email.

- Link validity: 15 minutes, single use
- Session: 7 days, revocable by Sign out
- Login requests: per-network and global rolling-hour limits in the database
- Sessions and login links: random tokens; only SHA-256 token hashes are stored
- Session cookie: HTTP-only, Secure in production, SameSite=Lax, scoped to /sales
- Reporting routes: server-side authorization before any database read
- Website conversion tracking excludes all /sales pages
- Private pages are marked noindex, no-store, no-referrer

Access requires production secrets SUPABASE_URL, SUPABASE_SECRET_KEY, RESEND_API_KEY, RESEND_FROM_EMAIL, INQUIRY_RECEIVER_SECRET, and an authorized inbox via SALES_ADMIN_EMAIL or INQUIRY_NOTIFICATION_EMAIL.

Do not expose any secret with a NEXT_PUBLIC_ prefix. The public website continues to use its existing inquiry webhook.

## Pipeline

Lead stages: New → Contacted → Qualified → Proposal Sent → Won / Lost.

All existing project_inquiries are imported once, and a trigger adds future submissions. The CRM stores separate stage, notes, estimated deal value, and follow-up date without changing the original incoming inquiry record.

Manual leads can be added from /sales/new with a contact name, business name, and email or phone. Media stays available as an independent service choice alongside Website, Software and Automation.

Potential pipeline value means sum of amounts manually assigned to open opportunities; Won contract value means amounts manually marked Won. Neither measure is cash collected. There is no payment or proposal integration yet.

## Conversion reporting

/sales/report shows 30-day first-party event counts and grouped campaign performance. Counts are events and may include repeat visits, not unique visitors. The reporting view currently uses the most recent 5,000 rows in that range, with a visible cap warning. Campaign events are aggregated separately from CRM records; it does not claim individual visitor attribution.

## Verification checklist

- Confirm the migration is applied to the SystemArc Supabase project
- Verify RLS and direct table privileges block anonymous and authenticated roles
- Verify unauthenticated /sales, /sales/report, /sales/new and /sales/lead/:id go to sign-in
- Verify login link arrives in the internal authorized inbox; confirm once and confirm it cannot be reused
- Verify a manual lead can be created, edited, and filtered without appearing on the public website
- Verify incoming website inquiry is automatically visible in the CRM (use a clearly marked internal test record, then clean it up)
- Verify report queries and campaign source counts
- Verify /sales does not emit visitor analytics events
- Inspect production runtime logs and avoid placing personal details in logs

## Ongoing improvements

Add a calendar booking link, proposal/contract statuses, automatic follow-up reminders, customer testimonials and portfolio case studies. Consider scheduled cleanup of expired login links and sessions, plus pagination when lead volume exceeds 250. Do not begin broad outreach until inquiry deliveries and internal notifications have been verified end-to-end.


## Proposals (new)

The owner can create a proposal directly from a lead or review all proposals at /sales/proposals. Each private draft contains:

- Up to eight service line items with quantities, prices, calculated subtotal, deposit percentage, and optional expiration date
- Overview, scope/deliverables, timeline, exclusions, and editable payment terms
- A branded preview and browser Print / Save as PDF option
- A deliberate Send proposal by email action that sends the details through the existing Resend sender to the email stored on that lead only

A proposal is never emailed just because a draft is saved. A sent proposal cannot be edited (create a replacement draft for revisions). Email is a project proposal, not a signed contract or a payment request; client acceptance is recorded manually. There is no public approval portal or e-signature mechanism.

When the provider confirms a proposal email, the corresponding open lead moves to Proposal Sent and gets a five-day follow-up date if none was assigned. Closed leads are not reopened automatically.

## Follow-up reminders (new)

At /sales/follow-ups, the owner can see due, overdue and upcoming leads and trigger today's internal digest on demand. A production Vercel Cron invokes /api/sales/follow-up-reminders daily at 14:00 UTC (8 AM CST / 9 AM CDT). It sends to the configured SALES_ADMIN_EMAIL or INQUIRY_NOTIFICATION_EMAIL only when at least one open lead is due or overdue.

The Cron route requires a server-side CRON_SECRET and does not expose contacts in the response. The run ledger prevents a second email for the same local day. A failed provider call is logged and not automatically retried that same day; it can be reviewed in the server logs. Scheduled digests do not email customers and are not sales outreach.

**Deployment QA:** After first production deploy, confirm login with the owner inbox, create a test draft with no recipient send, test the PDF print layout, and set a test due date before manually requesting one digest. The first automated digest only fires at the next daily scheduled run.

The proposal and reminder tables have RLS enabled and no direct anonymous or standard authenticated access. The privileged Supabase client remains server-only.
