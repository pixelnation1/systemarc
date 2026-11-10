
-- Private sales pipeline for SystemArc. All reads/writes are server-only.
create table if not exists public.systemarc_sales_opportunities (
  id uuid primary key default gen_random_uuid(),
  inquiry_id uuid unique references public.project_inquiries(id) on delete set null,
  company_name text not null check (char_length(company_name) between 2 and 160),
  contact_name text not null check (char_length(contact_name) between 2 and 120),
  contact_email text not null default '' check (char_length(contact_email) <= 254),
  contact_phone text not null default '' check (char_length(contact_phone) <= 40),
  service text not null default 'Other' check (service in ('Website','Software','Automation','Media','Other')),
  source text not null default 'manual' check (char_length(source) <= 80),
  summary text not null default '' check (char_length(summary) <= 2000),
  stage text not null default 'new' check (stage in ('new','contacted','qualified','proposal','won','lost')),
  estimated_value_cents bigint not null default 0 check (estimated_value_cents between 0 and 9999999999),
  next_follow_up date,
  notes text not null default '' check (char_length(notes) <= 4000),
  first_contacted_at timestamptz,
  closed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists sa_sales_stage_idx on public.systemarc_sales_opportunities(stage,created_at desc);
create index if not exists sa_sales_follow_up_idx on public.systemarc_sales_opportunities(next_follow_up) where next_follow_up is not null;
create index if not exists sa_sales_created_idx on public.systemarc_sales_opportunities(created_at desc);
alter table public.systemarc_sales_opportunities enable row level security;
revoke all on public.systemarc_sales_opportunities from anon, authenticated;
grant select,insert,update,delete on public.systemarc_sales_opportunities to service_role;

-- Opaque, expiring, single-use email login links and hashed session tokens.
create table if not exists public.systemarc_sales_login_links (
  id uuid primary key default gen_random_uuid(),
  token_hash text not null unique check (char_length(token_hash)=64),
  requester_hash text not null check (char_length(requester_hash)=64),
  created_at timestamptz not null default now(),
  expires_at timestamptz not null,
  used_at timestamptz
);
create index if not exists sa_login_ip_idx on public.systemarc_sales_login_links(requester_hash,created_at desc);
alter table public.systemarc_sales_login_links enable row level security;
revoke all on public.systemarc_sales_login_links from anon, authenticated;
grant select,insert,update,delete on public.systemarc_sales_login_links to service_role;

create table if not exists public.systemarc_sales_sessions (
  id uuid primary key default gen_random_uuid(),
  token_hash text not null unique check (char_length(token_hash)=64),
  created_at timestamptz not null default now(),
  expires_at timestamptz not null,
  revoked_at timestamptz
);
create index if not exists sa_session_expiry_idx on public.systemarc_sales_sessions(expires_at);
alter table public.systemarc_sales_sessions enable row level security;
revoke all on public.systemarc_sales_sessions from anon, authenticated;
grant select,insert,update,delete on public.systemarc_sales_sessions to service_role;

-- Newly received inquiries automatically enter the private pipeline.
create or replace function public.systemarc_sales_capture_inquiry()
returns trigger language plpgsql security invoker
set search_path = ''
as $$
begin
  insert into public.systemarc_sales_opportunities
  (inquiry_id,company_name,contact_name,contact_email,contact_phone,service,source,summary)
  values
  (new.id,new.company_name,new.contact_name,new.contact_email,new.contact_phone,
    case
      when new.project_areas ? 'Website / Ecommerce' then 'Website'
      when new.project_areas ? 'Automation' then 'Automation'
      when new.project_areas ? 'Brand / Content Strategy' or new.project_areas ? 'Social Media Management' then 'Media'
      else 'Software'
    end,
    case when new.project_areas ? 'Website / Ecommerce' then 'website_form' else 'project_form' end,
    left(new.problem_description,2000))
  on conflict (inquiry_id) do nothing;
  return new;
end;
$$;
drop trigger if exists systemarc_sales_capture_inquiry on public.project_inquiries;
create trigger systemarc_sales_capture_inquiry after insert on public.project_inquiries
for each row execute function public.systemarc_sales_capture_inquiry();

-- Backfill any inquiries received before this dashboard existed.
insert into public.systemarc_sales_opportunities
 (inquiry_id,company_name,contact_name,contact_email,contact_phone,service,source,summary,created_at)
select p.id,p.company_name,p.contact_name,p.contact_email,p.contact_phone,
 case
   when p.project_areas ? 'Website / Ecommerce' then 'Website'
   when p.project_areas ? 'Automation' then 'Automation'
   when p.project_areas ? 'Brand / Content Strategy' or p.project_areas ? 'Social Media Management' then 'Media'
   else 'Software'
 end,
 case when p.project_areas ? 'Website / Ecommerce' then 'website_form' else 'project_form' end,
 left(p.problem_description,2000),p.submitted_at
from public.project_inquiries p
on conflict (inquiry_id) do nothing;
