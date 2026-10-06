-- SystemArc project inquiries.
-- Apply in the Supabase SQL editor, or with the Supabase CLI (`supabase db push`).
-- The webhook receiver inserts with the server secret key. No browser role can read or write this table.

create table public.project_inquiries (
  id uuid primary key default gen_random_uuid(),
  external_inquiry_id text not null,
  submitted_at timestamptz not null,
  created_at timestamptz not null default now(),
  status text not null default 'new',

  contact_name text not null,
  contact_email text not null,
  contact_phone text not null default '',
  preferred_contact text not null,

  company_name text not null,
  company_description text not null,
  company_type text not null,
  company_size text not null default '',

  problem_description text not null,
  current_process text not null default '',
  affected_users jsonb not null default '[]'::jsonb,
  problem_frequency text not null default '',

  current_tools text not null default '',
  manual_data_movement text not null default '',
  keep_existing text not null default '',
  systems_to_keep text not null default '',

  desired_outcome text not null,
  solution_awareness text not null,
  project_areas jsonb not null default '[]'::jsonb,
  timeline text not null default '',
  budget text not null default '',

  source_page text not null,
  referrer text not null default '',

  raw_payload jsonb not null,

  constraint project_inquiries_external_inquiry_id_key unique (external_inquiry_id),
  constraint project_inquiries_external_inquiry_id_uuid check (
    external_inquiry_id ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'
  ),
  constraint project_inquiries_status_check check (
    status in (
      'new',
      'reviewed',
      'discovery',
      'qualified',
      'proposal',
      'won',
      'lost',
      'archived'
    )
  ),
  constraint project_inquiries_contact_name_len check (char_length(contact_name) between 2 and 120),
  constraint project_inquiries_contact_email_len check (char_length(contact_email) between 3 and 254),
  constraint project_inquiries_contact_phone_len check (char_length(contact_phone) <= 40),
  constraint project_inquiries_preferred_contact_len check (char_length(preferred_contact) between 1 and 40),
  constraint project_inquiries_company_name_len check (char_length(company_name) between 2 and 160),
  constraint project_inquiries_company_description_len check (char_length(company_description) between 10 and 4000),
  constraint project_inquiries_company_type_len check (char_length(company_type) between 1 and 80),
  constraint project_inquiries_company_size_len check (char_length(company_size) <= 40),
  constraint project_inquiries_problem_description_len check (char_length(problem_description) between 10 and 4000),
  constraint project_inquiries_current_process_len check (char_length(current_process) <= 4000),
  constraint project_inquiries_problem_frequency_len check (char_length(problem_frequency) <= 40),
  constraint project_inquiries_current_tools_len check (char_length(current_tools) <= 4000),
  constraint project_inquiries_manual_data_movement_len check (char_length(manual_data_movement) <= 40),
  constraint project_inquiries_keep_existing_len check (char_length(keep_existing) <= 40),
  constraint project_inquiries_systems_to_keep_len check (char_length(systems_to_keep) <= 4000),
  constraint project_inquiries_desired_outcome_len check (char_length(desired_outcome) between 10 and 4000),
  constraint project_inquiries_solution_awareness_len check (char_length(solution_awareness) between 1 and 80),
  constraint project_inquiries_timeline_len check (char_length(timeline) <= 40),
  constraint project_inquiries_budget_len check (char_length(budget) <= 40),
  constraint project_inquiries_source_page_check check (source_page = '/start-a-project'),
  constraint project_inquiries_referrer_len check (char_length(referrer) <= 300),
  constraint project_inquiries_affected_users_array check (jsonb_typeof(affected_users) = 'array'),
  constraint project_inquiries_project_areas_array check (jsonb_typeof(project_areas) = 'array'),
  constraint project_inquiries_raw_payload_object check (jsonb_typeof(raw_payload) = 'object')
);

comment on table public.project_inquiries is
  'Project inquiries accepted by POST /api/inquiries/webhook. Browser roles have no policies. Status changes belong to a future server-side admin.';

comment on column public.project_inquiries.external_inquiry_id is
  'inquiryId from the version 1.0 webhook. Unique. A repeat delivery does not update the row.';

comment on column public.project_inquiries.keep_existing is
  'Webhook field systems.keepExisting. The payload does not use a separate systemsToKeepDetails field.';

comment on column public.project_inquiries.systems_to_keep is
  'Webhook field systems.systemsToKeep.';

comment on column public.project_inquiries.raw_payload is
  'Validated version 1.0 webhook body. No Authorization header, secret, or environment variable.';

comment on column public.project_inquiries.status is
  'Internal lead status. Webhook inserts always use new. Allowed: new, reviewed, discovery, qualified, proposal, won, lost, archived.';

create index project_inquiries_created_at_idx
  on public.project_inquiries (created_at desc);

create index project_inquiries_status_created_at_idx
  on public.project_inquiries (status, created_at desc);

create index project_inquiries_contact_email_idx
  on public.project_inquiries (contact_email);

create index project_inquiries_company_name_idx
  on public.project_inquiries (company_name);

alter table public.project_inquiries enable row level security;

revoke all on table public.project_inquiries from public, anon, authenticated;
grant select, insert, update, delete on table public.project_inquiries to service_role;
