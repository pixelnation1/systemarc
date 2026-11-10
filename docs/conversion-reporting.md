# SystemArc conversion reporting

First-party conversion events are stored privately in the `public.systemarc_conversion_events` table of the SystemArc Supabase project. The production site uses a privileged **server-only** Supabase client. Browser users have no direct table grants and there is no public stats endpoint.

Events:
- `page_view` — a route was rendered in the visitor's browser (not unique visitors).
- `cta_click` — a link to /website-quote or /start-a-project was clicked.
- `website_quote_started` and `software_inquiry_started` — the respective form was first edited.
- `website_quote_submitted` and `software_inquiry_submitted` — the webhook confirmed storing a valid inquiry. Server-side, so it is not counted if delivery failed.

Attribution uses a limited `utm_source`, `utm_medium`, and `utm_campaign` value saved within the browser tab for up to four hours. There are no analytics cookies or persistent visitor identifiers. Signals such as Do Not Track and Global Privacy Control suppress the analytics client. Contact details and form text are never stored in the analytics events table.

## Dashboard queries

Run these in the **SystemArc Supabase SQL Editor**, or ask ChatGPT to retrieve and summarize the table through the connected Supabase account.

### Last 30 days of event counts
```sql
select event_name, count(*) as events
from public.systemarc_conversion_events
where occurred_at >= now() - interval '30 days'
group by event_name
order by event_name;
```

### Weekly website quote funnel
```sql
select date_trunc('week', occurred_at at time zone 'America/Chicago')::date as week,
       count(*) filter (where event_name='page_view' and page_path='/website-quote') as quote_page_views,
       count(*) filter (where event_name='website_quote_started') as form_starts,
       count(*) filter (where event_name='website_quote_submitted') as delivered_leads
from public.systemarc_conversion_events
where occurred_at >= now() - interval '90 days'
group by 1 order by 1 desc;
```

### Campaigns producing submitted leads
```sql
select traffic_source, coalesce(traffic_medium,'—') as medium,
       coalesce(campaign,'—') as campaign,
       count(*) filter (where event_name='page_view') as page_views,
       count(*) filter (where event_name='cta_click') as inquiry_clicks,
       count(*) filter (where event_name in ('website_quote_submitted','software_inquiry_submitted')) as delivered_leads
from public.systemarc_conversion_events
where occurred_at >= now() - interval '30 days'
group by 1,2,3 order by delivered_leads desc, inquiry_clicks desc;
```

Counts are events, **not unique people**. Do not call leads/page-views a visitor conversion rate. This does not yet track proposals, signed clients, or revenue—those require a sales pipeline linked to inquiries.

## Tagged campaign link examples

- Facebook: `https://www.systemarchq.com/services/business-websites?utm_source=facebook&utm_medium=social&utm_campaign=kansas_websites`
- LinkedIn: `https://www.systemarchq.com/services/business-websites?utm_source=linkedin&utm_medium=social&utm_campaign=kansas_websites`
- Individual outreach: `https://www.systemarchq.com/website-quote?utm_source=outreach&utm_medium=email&utm_campaign=november_kansas`

Do **not** put customer names, email addresses, or other personal information into the campaign parameters.

## Operations

1. Confirm production Vercel has `SUPABASE_URL` and `SUPABASE_SECRET_KEY` (do not expose values).
2. Apply the migration `20261110020000_create_conversion_events.sql`.
3. Open pages and click one quote link to test browser events.
4. Send a **clearly labeled internal test inquiry** before relying on production conversions; verify inquiry storage, notification, and event count, then delete test records through authorized admin tools.
5. Monitor Vercel runtime errors for analytics insert failures. Event tracking is best-effort and should never block genuine inquiries.
