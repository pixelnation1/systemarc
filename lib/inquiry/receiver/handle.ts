import { authorizeInquiryReceiver } from "@/lib/inquiry/receiver/auth";
import { notifyLeadStored, type LeadStoredEvent } from "@/lib/inquiry/receiver/notify";
import {
  InquiryPersistenceError,
  projectInquiryRow,
  type InquiryStore,
} from "@/lib/inquiry/receiver/persist";
import { validateInquiryWebhook } from "@/lib/inquiry/receiver/validate";

export const inquiryReceiverPath = "/api/inquiries/webhook";
export const inquiryReceiverMaxBodyBytes = 65_536;

export type InquiryReceiverDeps = {
  secret: string | undefined;
  store: InquiryStore;
  notify?: (event: LeadStoredEvent) => Promise<void>;
};

export async function handleInquiryWebhook(request: Request, deps: InquiryReceiverDeps) {
  const auth = authorizeInquiryReceiver(request.headers.get("authorization"), deps.secret);
  if (auth !== "ok") {
    logReceiver({ category: auth === "unconfigured" ? "not_configured" : "unauthorized" });
    if (auth === "unconfigured") return json({ error: "Inquiry receiver is not configured." }, 503);
    return json({ error: "Unauthorized." }, 401);
  }

  if (!isJsonContentType(request.headers.get("content-type"))) {
    logReceiver({ category: "unsupported_media_type" });
    return json({ error: "Unsupported media type." }, 415);
  }

  const contentLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(contentLength) && contentLength > inquiryReceiverMaxBodyBytes) {
    logReceiver({ category: "payload_too_large" });
    return json({ error: "Inquiry payload is too large." }, 413);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    logReceiver({ category: "invalid_payload" });
    return json({ error: "Invalid inquiry payload." }, 400);
  }

  const validated = validateInquiryWebhook(body);
  if (!validated.ok) {
    logReceiver({ category: "invalid_payload", fields: validated.fields.slice(0, 20).join(",") });
    return json({ error: "Invalid inquiry payload." }, 400);
  }

  const row = projectInquiryRow(validated.payload);
  try {
    const result = await deps.store.insert(row);
    const duplicate = result === "duplicate";
    if (!duplicate) {
      try {
        await (deps.notify ?? notifyLeadStored)({ inquiryId: row.external_inquiry_id });
      } catch {
        console.error(
          JSON.stringify({
            event: "project_inquiry_notification_failed",
            inquiryId: row.external_inquiry_id,
          }),
        );
      }
    }
    logReceiver({
      category: duplicate ? "duplicate" : "stored",
      inquiryId: row.external_inquiry_id,
    });
    return json(
      { received: true, inquiryId: row.external_inquiry_id, duplicate },
      duplicate ? 200 : 201,
    );
  } catch (error) {
    const category = error instanceof InquiryPersistenceError ? error.category : "persist_failed";
    const entry: Record<string, string> = {
      category,
      inquiryId: row.external_inquiry_id,
    };
    if (error instanceof InquiryPersistenceError && error.missing) entry.missing = error.missing;
    if (error instanceof InquiryPersistenceError && error.code) entry.code = error.code;
    logReceiver(entry);
    return json({ error: "Inquiry could not be stored." }, 503);
  }
}

function isJsonContentType(value: string | null) {
  const media = value?.split(";")[0]?.trim().toLowerCase();
  return media === "application/json";
}

function json(body: Record<string, unknown>, status: number) {
  return Response.json(body, { status });
}

function logReceiver(entry: Record<string, string>) {
  const level = entry.category === "stored" || entry.category === "duplicate" ? "info" : "error";
  const line = JSON.stringify({ event: "project_inquiry_receiver", ...entry });
  if (level === "info") console.info(line);
  else console.error(line);
}
