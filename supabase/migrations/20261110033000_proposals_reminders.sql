
-- Private editable proposals linked to SystemArc sales opportunities.
create table if not exists public.systemarc_sales_proposals (
  id uuid primary key default gen_random_uuid(),
  number bigint generated always as identity unique,
  opportunity_id uuid not null references public.systemarc_sales_opportunities(id) on delete cascade,
  title text not null check (char_length(title) between 3 and 160),
  overview text not null default '' check (char_length(overview) <= 3500),
  deliverables text not null default '' check (char_length(deliverables) <= 4500),
  timeline text not null default '' check (char_length(timeline) <= 1500),
  exclusions text not null default '' check (char_length(exclusions) <= 1500),
  terms text not null default '' check (char_length(terms) <= 3000),
  line_items jsonb not null default '[]'::jsonb check (jsonb_typeof(line_items) = 'array'),
  subtotal_cents bigint not null default 0 check (subtotal_cents between 0 and 9999999999),
  deposit_percent integer not null default 50 check (deposit_percent between 0 and 100),
  valid_until date,
  status text not null default 'draft' check (status in ('draft','sending','sent','accepted','declined')),
  sent_at timestamptz,
  sent_to text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists systemarc_sales_proposals_opportunity_idx on public.systemarc_sales_proposals(opportunity_id, created_at desc);
create index if not exists systemarc_sales_proposals_status_idx on public.systemarc_sales_proposals(status,created_at desc);
alter table public.systemarc_sales_proposals enable row level security;
revoke all on public.systemarc_sales_proposals from anon, authenticated;
grant select,insert,update,delete on public.systemarc_sales_proposals to service_role;
grant usage,select on sequence public.systemarc_sales_proposals_number_seq to service_role;

-- Exactly one owner reminder email per local day; no customer addresses in this table.
create table if not exists public.systemarc_sales_reminder_runs (
  run_day date primary key,
  status text not null check (status in ('sending','sent','failed')),
  due_count integer not null default 0,
  sent_at timestamptz,
  provider_id text,
  created_at timestamptz not null default now()
);
alter table public.systemarc_sales_reminder_runs enable row level security;
revoke all on public.systemarc_sales_reminder_runs from anon, authenticated;
grant select,insert,update on public.systemarc_sales_reminder_runs to service_role;
