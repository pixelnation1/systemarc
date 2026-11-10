-- First-party conversion analytics. No cookies, persistent visitor IDs, contact fields, or IP addresses.
create table if not exists public.systemarc_conversion_events (
  id bigint generated always as identity primary key,
  occurred_at timestamptz not null default now(),
  event_name text not null check (event_name in (
    'page_view','cta_click','website_quote_started','website_quote_submitted',
    'software_inquiry_started','software_inquiry_submitted'
  )),
  page_path text not null check (length(page_path) between 1 and 180),
  target_path text check (target_path is null or length(target_path) <= 180),
  traffic_source text not null default 'direct' check (length(traffic_source) <= 80),
  traffic_medium text check (traffic_medium is null or length(traffic_medium) <= 80),
  campaign text check (campaign is null or length(campaign) <= 80),
  referrer_host text check (referrer_host is null or length(referrer_host) <= 120)
);
alter table public.systemarc_conversion_events enable row level security;
revoke all on public.systemarc_conversion_events from anon, authenticated;
grant select, insert on public.systemarc_conversion_events to service_role;
create index if not exists systemarc_conversion_event_date_idx
  on public.systemarc_conversion_events (occurred_at desc);
create index if not exists systemarc_conversion_event_name_date_idx
  on public.systemarc_conversion_events (event_name, occurred_at desc);

-- The site never exposes analytics reading via a public API. Aggregate using Supabase Studio or an authenticated reporting client.
