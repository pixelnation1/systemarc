# Project inquiry system

`/start-a-project` is the start of discovery. It collects how a business works and what is not working. It does not ask the visitor to choose a technology, language, or architecture.

The page is indexable. `/privacy` stays `noindex` until a real policy is published. The form links to that page and does not invent privacy practices.

## Form architecture

The page is a server component. The wizard is `ProjectInquiryForm`, a client component. Steps are:

1. About you
2. The business
3. The problem
4. Current systems
5. The project
6. Review

Draft state stays in the client while the visitor moves back and forward. Continue validates the current step. Review can jump back to any earlier step without clearing answers.

The browser calls the server action `submitProjectInquiry` in `app/start-a-project/actions.ts`. That action is the only public entry point. The UI does not call a CRM, an email API, or a database.

## Data model

Defined in `lib/inquiry/model.ts`.

```txt
contact: name, email, phone, preferredContact
company: name, description, type, size
problem: description, currentProcess, affectedUsers, frequency
systems: currentTools, manualDataMovement, keepExisting, systemsToKeep
project: desiredOutcome, solutionAwareness, areas, timeline, budget
metadata: submittedAt, sourcePage, referrer
```

`submittedAt` and `sourcePage` are set on the server. The client may send a referrer. The server keeps only the origin and path, and drops the query string.

Business type is context. It does not restrict the lead. Budget is stored for planning. It does not accept or reject the inquiry.

A future CRM, email notification, or pipeline should accept this object. Add a destination in `lib/inquiry/submit.ts` that implements `InquiryDestination`. Do not put provider credentials in the form component.

## Validation

`lib/inquiry/validate.ts` is shared by the wizard and the server action.

The server trims text, drops unknown enum values, and validates again. Client checks are only a convenience.

Required:

- name
- work email
- preferred contact method
- company / organization
- what the business does
- business type
- the problem
- what would change if it were solved
- whether the visitor already has an idea of what to build

Phone is required only when the preferred contact method is Phone. Systems to keep are required only when the visitor says existing systems should stay.

Email must look like an email address. Phone, when present, allows digits and common separators. Text fields have maximum lengths. Enum answers must match the options shown on the page.

Errors name the field and are tied to it with `aria-describedby` and `aria-invalid`. Focus moves to the first invalid control. A step change moves focus to that step's heading.

Internal exceptions are not returned to the visitor.

## Submission flow

1. Rate-limit the attempt.
2. If the honeypot has a value, return success and store nothing.
3. Normalize and validate.
4. Create an inquiry id with `crypto.randomUUID()` on the server. The browser does not supply this id.
5. Set `submittedAt` on the server.
6. Resolve a destination.
7. Deliver the inquiry, or return an error that says it was not confirmed as received.

Destinations:

- `webhook`: used when `INQUIRY_WEBHOOK_URL` is an `https` URL. The server POSTs one JSON request. This is the production path.
- `log`: used in development when no webhook URL is set, or outside production when `INQUIRY_LOG_SINK=true`. It writes an id, source page, business type, and area count. It does not write the visitor's answers, and it is not durable. Production ignores this sink.
- none: production without a webhook URL. The form says the inquiry was not sent and nothing was stored.
- invalid: a webhook URL is set but is not `https`. Every environment fails closed. The visitor sees the delivery failure message. The log records `invalid_webhook_url` and does not record the URL.

The success screen is shown only after the webhook returns a 2xx status, after the development log sink accepts the record, or after a honeypot discard. A completed `fetch` with a 4xx, 5xx, redirect, timeout, or network error is a failure. The log sink adds a visible note that the inquiry is not stored for follow-up.

There is no automatic retry. A second attempt would risk a duplicate inquiry. The receiver treats `inquiryId` as an idempotency key and stores once per id.

The production receiver is `POST /api/inquiries/webhook`, documented in `docs/lead-storage.md`. Point `INQUIRY_WEBHOOK_URL` at it from the environment. The form does not contain that URL.

## Webhook payload

Version `1.0`. Event name `systemarc.project_inquiry.created`. Built in `lib/inquiry/webhook.ts`.

Field names follow the inquiry model. `systems` keeps `keepExisting` and `systemsToKeep`. `submittedAt` is lifted to the top of the payload. `metadata` on the wire is `sourcePage` and `referrer` only.

```json
{
  "event": "systemarc.project_inquiry.created",
  "version": "1.0",
  "inquiryId": "server-generated-uuid",
  "submittedAt": "2026-10-06T15:00:00.000Z",
  "contact": {
    "name": "",
    "email": "",
    "phone": "",
    "preferredContact": "Email"
  },
  "company": {
    "name": "",
    "description": "",
    "type": "Other",
    "size": ""
  },
  "problem": {
    "description": "",
    "currentProcess": "",
    "affectedUsers": [],
    "frequency": ""
  },
  "systems": {
    "currentTools": "",
    "manualDataMovement": "",
    "keepExisting": "",
    "systemsToKeep": ""
  },
  "project": {
    "desiredOutcome": "",
    "solutionAwareness": "Somewhat",
    "areas": [],
    "timeline": "",
    "budget": ""
  },
  "metadata": {
    "sourcePage": "/start-a-project",
    "referrer": ""
  }
}
```

The request is server-side only.

- `Content-Type: application/json`
- `User-Agent: SystemArc-Inquiry/1.0`
- `Authorization: Bearer <INQUIRY_WEBHOOK_SECRET>` when that variable is non-empty after trimming
- Redirects are not followed
- Timeout is 10 seconds (`inquiryWebhookTimeoutMs`), using `AbortSignal.timeout`
- Success is an HTTP status from 200 through 299

`INQUIRY_WEBHOOK_URL` and `INQUIRY_WEBHOOK_SECRET` are read on the server. They are not sent to client JavaScript.

## Failure behavior

The visitor sees:

> We couldn't send your project inquiry right now. Your information has not been confirmed as received. Please try again shortly.

That message is used when delivery was attempted and not confirmed, and when the webhook URL is set but invalid. A missing production URL uses a separate message: the inquiry was not sent because a destination is not configured, and nothing was stored.

The page does not show an HTTP status, stack trace, webhook host, or environment variable.

The server log for a failure is one JSON line:

```json
{
  "event": "project_inquiry_delivery_failed",
  "inquiryId": "...",
  "submittedAt": "...",
  "category": "rejected",
  "status": 500
}
```

`category` is `timeout`, `network`, `rejected`, `invalid_webhook_url`, or `unexpected`. `status` is included for an HTTP response that was not a success. The secret, the webhook URL, and the form contents are not logged.

## Testing the webhook locally

`lib/inquiry/webhook.test.ts` posts to a local HTTP receiver. It does not use a public URL. Run:

```txt
node --experimental-strip-types --import ./lib/inquiry/webhook-test-hooks.mjs --test lib/inquiry/webhook.test.ts lib/inquiry/receiver/receiver.test.ts
```

Webhook cases: 2xx success, 400, 500, timeout, redirect, missing URL, invalid URL, bearer token present, bearer token absent, and a failure log that omits the secret and the inquiry body.

Receiver cases in `lib/inquiry/receiver/receiver.test.ts` check authentication, payload validation, a duplicate id, and a failed store. They use an in-memory store. They do not connect to Supabase and they do not count as proof that a row was saved.

To try a real endpoint from a development server, set `INQUIRY_WEBHOOK_URL` to an `https` URL you control. Leave `INQUIRY_LOG_SINK` unset. Submit one inquiry and confirm that URL stored the `inquiryId`. Do not point the variable at a production inbox until that check is intentional.

## Anti-spam

- Server-side validation of required fields, email format, lengths, and allowed values.
- A honeypot field named `leave_blank`. It is hidden from assistive technology and removed from tab order. A filled honeypot is discarded and looks like success to the sender.
- `consumeRateLimit` in `lib/inquiry/rate-limit.ts` allows 20 attempts per 15 minutes for each client key. The key is the first `x-forwarded-for` address, or `unknown`.

This limiter lives in process memory. It resets on deploy and is not shared across instances. Replace it with a shared store before relying on it in a multi-instance deployment.

No CAPTCHA is installed.

## Environment variables

See `.env.example`.

| Variable | Purpose |
| --- | --- |
| `INQUIRY_WEBHOOK_URL` | Sending side. Production `https` endpoint that receives the inquiry JSON. For this site, that is `https://www.systemarchq.com/api/inquiries/webhook`. `http` and malformed values fail closed. |
| `INQUIRY_WEBHOOK_SECRET` | Sending side. Bearer token sent only from the server as `Authorization`. Use the same value as `INQUIRY_RECEIVER_SECRET`. |
| `INQUIRY_LOG_SINK` | Development-only diagnostic sink. Set to `true` outside production to log an id when no webhook URL is set. Ignored in production. |
| `INQUIRY_RECEIVER_SECRET` | Receiving side. Required bearer token for `POST /api/inquiries/webhook`. |
| `SUPABASE_URL` | Server-only project URL. Not a `NEXT_PUBLIC_` variable. |
| `SUPABASE_SECRET_KEY` | Privileged server-only Supabase secret key. Bypasses row level security. Never send it to the browser. |

No API credentials are included in the repo.

## Connecting a CRM later

Add a destination beside the webhook in `resolveInquiryDestination`. It should:

- accept a `ProjectInquiry` plus an id
- perform the provider call on the server
- throw if the provider does not accept the inquiry
- read secrets from environment variables

Keep the form and the wizard unaware of the provider. A webhook in front of the CRM is enough if the CRM can receive the version `1.0` payload and dedupe on `inquiryId`.

## Connecting email later

Use the same destination interface. Send mail from the server with a provider already configured in the environment. Do not add a public mail API key to the browser. The message body can be built from `ProjectInquiry`. Do not log the full body.

## Analytics

Inquiry events go through `lib/analytics.ts`, the shared site bus. `lib/inquiry/analytics.ts` still emits:

- `project_form_started` on the first edit or continue
- `project_form_step_completed` with a step number when a step is accepted
- `project_form_submitted` only after the webhook returns 2xx

A development log, a honeypot discard, and a failed delivery do not emit `project_form_submitted`. There is no separate submission-attempt event.

Subscribe with `subscribeToAnalytics` (or `subscribeToInquiryEvents` for the form events only). Events do not include names, email addresses, or answers. No analytics product is installed. See `docs/production-readiness.md` for the other prepared events.

## Privacy

The form says the submission starts a conversation and is not an agreement or an estimate. It links to `/privacy`. That page is still a placeholder and remains `noindex`. Do not describe retention, sharing, or security practices until they are written into the policy.

The referrer stored with an inquiry has no query string.

## Production lead delivery

The storage path is configured. Production points at Supabase project `systemarc` (`mvuxmjxutzafkhbxswkg`). The migration is applied, the production environment variables are set, and a synthetic `/start-a-project` submission is stored in `project_inquiries` with status `new`. The success screen appears only after that confirmed insert.

Still separate from delivery:

- Publish the privacy policy, including inquiry collection, before promoting the form as a production lead channel. Then remove the "not published yet" sentence on the review step.
- Replace the in-memory rate limit if more than one server handles the form.

Storage, authentication, and idempotency are specified in `docs/lead-storage.md`.
