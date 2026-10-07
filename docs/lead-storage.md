# Lead storage

SystemArc owns the receiving side of a project inquiry. The public form is unchanged. It still validates on the server and POSTs the version `1.0` webhook. This app then receives that POST, checks it again, and stores it in Supabase.

```txt
Start a Project form
  -> existing server validation
  -> existing outbound webhook
  -> POST /api/inquiries/webhook
  -> Supabase project_inquiries
  -> 2xx only after the row is stored
  -> existing success screen
```

The form does not contain the webhook URL. Production sets it in the environment:

```txt
INQUIRY_WEBHOOK_URL=https://www.systemarchq.com/api/inquiries/webhook
INQUIRY_WEBHOOK_SECRET=<shared secret>
INQUIRY_RECEIVER_SECRET=<same shared secret>
```

`INQUIRY_WEBHOOK_SECRET` belongs to the sending side. `INQUIRY_RECEIVER_SECRET` belongs to the receiving side. This deployment uses one shared value in both variables. Neither value is hardcoded.

A non-2xx response from the receiver, including a database failure, keeps the existing fail-closed form behavior. The visitor sees the success screen only after the row is stored.

## Schema

Migration: `supabase/migrations/20261006180000_create_project_inquiries.sql`.

Table: `public.project_inquiries`.

| Column | Source |
| --- | --- |
| `id` | Database UUID. Not the webhook id. |
| `external_inquiry_id` | Webhook `inquiryId`. Unique. |
| `submitted_at` | Webhook `submittedAt`. |
| `created_at` | Time the row was inserted. |
| `updated_at` | Set on insert and before any later update. A duplicate webhook does not change it. |
| `status` | Always `new` on insert. The webhook cannot set it. |
| `contact_name`, `contact_email`, `contact_phone`, `preferred_contact` | `contact` |
| `company_name`, `company_description`, `company_type`, `company_size` | `company` |
| `problem_description`, `current_process`, `affected_users`, `problem_frequency` | `problem` |
| `current_tools`, `manual_data_movement`, `keep_existing`, `systems_to_keep` | `systems` |
| `desired_outcome`, `solution_awareness`, `project_areas`, `timeline`, `budget` | `project` |
| `source_page`, `referrer` | `metadata` |
| `raw_payload` | Validated webhook body as JSONB |

`systems.keepExisting` is stored in `keep_existing`. `systems.systemsToKeep` is stored in `systems_to_keep`. The payload has no separate details field, so the table does not add one.

`raw_payload` is the body after validation: trimmed strings, a lowercase inquiry id, and `submittedAt` in UTC. It does not include the `Authorization` header, the bearer secret, or environment variables. A payload that fails validation is not written.

Normalized columns are filled from that validated object. Unknown keys are rejected rather than written into a column.

Indexes: `created_at`, `(status, created_at)`, `contact_email`, and `company_name`.

`external_inquiry_id` is unique and must be a UUID. `status` allows only `new`, `reviewed`, `discovery`, `qualified`, `proposal`, `won`, `lost`, and `archived`. Text length limits match the form. Optional prospect fields may be empty. The database does not freeze every business enum, so a copy change in the form does not require a new check constraint for those lists. `source_page` for version `1.0` is `/start-a-project`.

## Status

New webhook submissions start as `new`. The allowed values live in `lib/inquiry/receiver/status.ts` and in the table check. A future admin can change status. The receiver rejects a payload that includes `status`.

## Row level security

Row level security is enabled. There are no `SELECT`, `INSERT`, `UPDATE`, or `DELETE` policies.

`anon`, `authenticated`, and `public` have no grants. The browser has no Supabase client and no publishable key in this app.

`service_role` can select, insert, update, and delete. The webhook uses the secret key, which bypasses row level security, and its code only inserts. Update access is there for a future server-side admin using the same privileged credential. Do not add a public policy to open this table to the browser.

## Server credentials

`lib/supabase/server.ts` imports `server-only` and creates the client with `SUPABASE_URL` and `SUPABASE_SECRET_KEY`. Sessions are not persisted. Client components cannot import that module.

`SUPABASE_SECRET_KEY` is the privileged secret key from the Supabase API Keys page (`sb_secret_...`). It bypasses row level security. A legacy `service_role` JWT can be placed in the same variable if the project has not moved to secret keys. Do not put a publishable or `anon` key in that variable. Do not prefix either Supabase variable with `NEXT_PUBLIC_`.

The values are read with `process.env[name]` so they stay in the server environment.

## Webhook authentication

`POST /api/inquiries/webhook` accepts POST only. Other methods receive 405.

The receiver requires `Authorization: Bearer <INQUIRY_RECEIVER_SECRET>`. The comparison hashes both values before checking them. A missing or wrong token returns 401. If `INQUIRY_RECEIVER_SECRET` is unset, the receiver returns 503 and stores nothing.

`Content-Type` must be `application/json`. A body over 64 KB is rejected. The secret is also not trusted as proof of shape. The receiver checks:

- `event` is `systemarc.project_inquiry.created`
- `version` is `1.0`
- `inquiryId` is a UUID
- `submittedAt` is a parseable time, not more than a day in the future
- `contact`, `company`, `problem`, `systems`, `project`, and `metadata`
- required text, maximum lengths, enums, and arrays

A malformed payload returns 400. The response does not include the inquiry, SQL, a Supabase message, or a stack.

## Idempotency

`external_inquiry_id` is unique. The second delivery of the same valid `inquiryId` does not insert another row and does not update the first row.

New row:

```json
{ "received": true, "inquiryId": "...", "duplicate": false }
```

HTTP 201.

Already stored:

```json
{ "received": true, "inquiryId": "...", "duplicate": true }
```

HTTP 200.

Both are success responses. The existing sender treats any 2xx as delivered. The response does not include the stored inquiry.

## Database failure

If Supabase is not configured, is unreachable, or rejects the insert for a reason other than the unique inquiry id, the receiver returns 503:

```json
{ "error": "Inquiry could not be stored." }
```

The sender then shows the existing failure message. The success screen stays off.

Server logs may include `inquiryId`, a category (`not_configured`, `persist_failed`, `unauthorized`, `invalid_payload`), a variable name that is missing, and a five-character database error code. They do not include the inquiry body, the bearer token, or the Supabase key.

## Notifications

`notifyLeadStored` in `lib/inquiry/receiver/notify.ts` runs only after a new row is stored. Register future work with `onLeadStored`. A duplicate delivery does not notify again.

The database row is the source of truth. A notification handler that throws is logged as `project_inquiry_notification_failed` with the inquiry id. The row stays, and the HTTP response stays successful. No email provider is installed.

## Privacy

Inquiries contain personal and business information. They are not returned by a public API, not written into analytics, and not placed in the page URL. The receiver logs ids and categories. The form still holds the draft in memory while the visitor is filling it out.

`/privacy` is still a placeholder. Publish a privacy policy that describes this collection, storage, and who can read it before the form is promoted as a production lead channel.

## Migration procedure

1. Create a Supabase project.
2. Open the SQL editor.
3. Run `supabase/migrations/20261006180000_create_project_inquiries.sql`.
4. Confirm `project_inquiries` exists, row level security is on, and the policy list is empty.
5. In Project Settings → API Keys, copy the project URL and create or reveal a secret key.
6. Set the production environment variables below and redeploy.

The same file is a Supabase CLI migration if you later link this repo with `supabase db push`. The CLI is not required for the first apply.

## Production environment variables

Set these on the production server. Names only belong in `.env.example`.

| Name | Side | Value |
| --- | --- | --- |
| `INQUIRY_WEBHOOK_URL` | Sender | `https://www.systemarchq.com/api/inquiries/webhook` |
| `INQUIRY_WEBHOOK_SECRET` | Sender | Shared bearer secret |
| `INQUIRY_RECEIVER_SECRET` | Receiver | The same shared bearer secret |
| `SUPABASE_URL` | Server | `https://<project-ref>.supabase.co` |
| `SUPABASE_SECRET_KEY` | Server, privileged | Secret key (`sb_secret_...`) |
| `INQUIRY_LOG_SINK` | Sender | Leave unset |

Preview deployments should not use the production webhook URL and production database unless that is intentional. Leave the inquiry variables unset on preview, or point them at a separate Supabase project.

## Testing

Unit tests, with no database:

```txt
node --experimental-strip-types --import ./lib/inquiry/webhook-test-hooks.mjs --test lib/inquiry/receiver/receiver.test.ts
```

They cover a missing token, a wrong token, the wrong content type, the wrong event, the wrong version, a malformed payload, a valid payload, a duplicate id, a store failure, and a notification failure after a successful insert. The store in these tests is in-memory. A passing run does not mean Supabase saved a row.

There is no automated test against a live Supabase project in this repo. Do not treat a mocked insert as that test.

### First real end-to-end test

1. Apply the migration and set the production variables.
2. Open `https://www.systemarchq.com/start-a-project`.
3. Submit one inquiry you can recognize.
4. Confirm the success screen: “Now we understand where to start.”
5. In the Supabase table editor, open `project_inquiries`.
6. Confirm one row, `status` = `new`, and `external_inquiry_id` matches a UUID. `raw_payload.event` is `systemarc.project_inquiry.created`.
7. To check idempotency, replay that same JSON once with `curl` to the webhook URL and the bearer token. The response has `"duplicate": true` and the table still has one row. The form itself creates a new id on every submission, so a second form submit is a second lead.

## Backup and export

Use the Supabase project's backups. When you need a copy, export `project_inquiries` from the dashboard or with SQL. The export contains personal and business information. Keep it with the same access limits as the table. A failed export does not remove the rows.

## Future admin

`/admin/leads` is not built. The table is shaped so a later server-side admin can list leads, open one lead, filter by status, email, company, and date, and change `status`.

Do not add public read policies for that admin. Add server-side access separately. Notes, discovery records, assignment, and proposal documents are future tables. They are not in this migration. Proposal progress can use the `proposal` status until those records exist.
