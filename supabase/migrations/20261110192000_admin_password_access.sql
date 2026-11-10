-- SystemArc admin is a single-password account; no public sign-ups or emailed magic links.
create table if not exists public.systemarc_sales_admin_credentials (
  admin_id text primary key check (admin_id = 'owner'),
  password_hash text not null check (char_length(password_hash) between 120 and 200),
  changed_at timestamptz not null default now()
);
alter table public.systemarc_sales_admin_credentials enable row level security;
revoke all on public.systemarc_sales_admin_credentials from anon, authenticated;
grant select,insert,update on public.systemarc_sales_admin_credentials to service_role;

create table if not exists public.systemarc_sales_password_attempts (
  id bigint generated always as identity primary key,
  requester_hash char(64) not null,
  attempted_at timestamptz not null default now(),
  success boolean not null default false
);
create index if not exists systemarc_sales_password_attempts_recent_idx
  on public.systemarc_sales_password_attempts (requester_hash, attempted_at desc);
alter table public.systemarc_sales_password_attempts enable row level security;
revoke all on public.systemarc_sales_password_attempts from anon, authenticated;
grant select,insert,update,delete on public.systemarc_sales_password_attempts to service_role;
grant usage,select on sequence public.systemarc_sales_password_attempts_id_seq to service_role;

-- Retire unclaimed email links and sessions from the old sign-in mechanism.
update public.systemarc_sales_login_links set used_at = now() where used_at is null;
update public.systemarc_sales_sessions set revoked_at = now() where revoked_at is null;
