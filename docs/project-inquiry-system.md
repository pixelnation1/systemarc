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
4. Resolve a destination.
5. Deliver the inquiry, or return an error that says it was not stored.

Destinations:

- `webhook`: used when `INQUIRY_WEBHOOK_URL` is an `https` URL. The server POSTs the inquiry JSON. This is the production path.
- `log`: used in development, or when `INQUIRY_LOG_SINK=true`. It writes an id, source page, business type, and area count to the server log. It does not write the visitor's answers, and it is not durable.
- none: production without a valid webhook URL. The form tells the visitor the inquiry was not sent.

The success screen is shown only after a destination accepts the inquiry, or after a honeypot discard. The log destination adds a visible note that the inquiry is not stored for follow-up.

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
| `INQUIRY_WEBHOOK_URL` | `https` URL that receives the inquiry JSON. Required before production leads can be relied upon. |
| `INQUIRY_WEBHOOK_SECRET` | Optional bearer token. Sent only from the server as `Authorization`. Never put this in client code. |
| `INQUIRY_LOG_SINK` | Set to `true` to force the non-durable server log. Development uses that log automatically. |

No API credentials are included in the repo.

## Connecting a CRM later

Add a destination beside the webhook in `resolveInquiryDestination`. It should:

- accept a `ProjectInquiry` plus an id
- perform the provider call on the server
- throw if the provider does not accept the inquiry
- read secrets from environment variables

Keep the form and the wizard unaware of the provider. A webhook in front of the CRM is enough if the CRM can receive JSON.

## Connecting email later

Use the same destination interface. Send mail from the server with a provider already configured in the environment. Do not add a public mail API key to the browser. The message body can be built from `ProjectInquiry`. Do not log the full body.

## Analytics

`lib/inquiry/analytics.ts` emits:

- `project_form_started` on the first edit or continue
- `project_form_step_completed` with a step number when a step is accepted
- `project_form_submitted` after the server accepts the inquiry

Subscribe with `subscribeToInquiryEvents`. Events do not include names, email addresses, or answers. No analytics product is installed.

## Privacy

The form says the submission starts a conversation and is not an agreement or an estimate. It links to `/privacy`. That page is still a placeholder and remains `noindex`. Do not describe retention, sharing, or security practices until they are written into the policy.

The referrer stored with an inquiry has no query string.

## Before production leads can be relied upon

- Set `INQUIRY_WEBHOOK_URL` to a real `https` endpoint, or add a server destination that stores the inquiry.
- Confirm the endpoint persists the payload and notifies a person.
- Replace the in-memory rate limit if more than one server handles the form.
- Publish the privacy policy, then remove the "not published yet" sentence on the review step.
- Leave `INQUIRY_LOG_SINK` unset in production. The log is not a mailbox.
