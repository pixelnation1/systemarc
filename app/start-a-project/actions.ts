"use server";

import { emptyInquiryDraft, type FieldErrors } from "@/lib/inquiry/model";
import {
  allowInquiryAttempt,
  createInquiryId,
  explainUnavailableDestination,
  inquiryClientKey,
  resolveInquiryDestination,
  type InquiryDelivery,
} from "@/lib/inquiry/submit";
import { logInquiryDeliveryFailure, InquiryDeliveryError } from "@/lib/inquiry/webhook";
import {
  draftFromUnknown,
  firstErrorField,
  referrerForInquiry,
  toProjectInquiry,
  validateInquiry,
} from "@/lib/inquiry/validate";

export type InquiryActionResult =
  | { ok: true; delivery: InquiryDelivery | "discarded" }
  | {
      ok: false;
      code: "validation";
      message: string;
      fieldErrors: FieldErrors;
      focusField: string;
    }
  | { ok: false; code: "rate_limit" | "unavailable"; message: string };

const notConfiguredMessage =
  "This inquiry was not sent. A delivery destination is not configured yet, so nothing was stored.";

const deliveryFailedMessage =
  "We couldn't send your project inquiry right now. Your information has not been confirmed as received. Please try again shortly.";

const rateLimitMessage =
  "We couldn't accept another inquiry from this network just yet. Please try again later.";

const validationMessage = "Some answers need another look before this can be sent.";

export async function submitProjectInquiry(input: {
  draft: unknown;
  honeypot: unknown;
  referrer: unknown;
}): Promise<InquiryActionResult> {
  try {
    const key = await inquiryClientKey();
    if (!allowInquiryAttempt(key)) {
      return { ok: false, code: "rate_limit", message: rateLimitMessage };
    }

    const honeypot = typeof input.honeypot === "string" ? input.honeypot.trim() : "";
    if (honeypot) {
      return { ok: true, delivery: "discarded" };
    }

    const draft = draftFromUnknown(input.draft);
    if (!draft) {
      return {
        ok: false,
        code: "validation",
        message: validationMessage,
        fieldErrors: { name: "Enter your name." },
        focusField: "name",
      };
    }

    const fieldErrors = validateInquiry(draft);
    if (Object.keys(fieldErrors).length > 0) {
      return {
        ok: false,
        code: "validation",
        message: validationMessage,
        fieldErrors,
        focusField: firstErrorField(fieldErrors),
      };
    }

    const inquiry = toProjectInquiry(draft, {
      submittedAt: new Date().toISOString(),
      sourcePage: "/start-a-project",
      referrer: referrerForInquiry(input.referrer),
    });

    if (!inquiry) {
      return {
        ok: false,
        code: "validation",
        message: validationMessage,
        fieldErrors: { name: "Enter your name." },
        focusField: "name",
      };
    }

    const destination = resolveInquiryDestination();
    if (!destination) {
      if (explainUnavailableDestination() === "invalid") {
        logInquiryDeliveryFailure(createInquiryId(), new InquiryDeliveryError("invalid_webhook_url"));
        return { ok: false, code: "unavailable", message: deliveryFailedMessage };
      }
      return { ok: false, code: "unavailable", message: notConfiguredMessage };
    }

    const inquiryId = createInquiryId();
    try {
      await destination.deliver({ ...inquiry, id: inquiryId });
    } catch (error) {
      logInquiryDeliveryFailure(inquiryId, error);
      return { ok: false, code: "unavailable", message: deliveryFailedMessage };
    }

    return { ok: true, delivery: destination.name };
  } catch {
    return { ok: false, code: "unavailable", message: deliveryFailedMessage };
  }
}

export async function submitSimpleInquiry(input: {
  name: string;
  email: string;
  company: string;
  service: string;
  details: string;
  honeypot: string;
}): Promise<{ ok: boolean; message: string }> {
  const name = input.name.trim();
  const email = input.email.trim();
  const details = input.details.trim();
  const company = input.company.trim();
  const allowed = ["launch", "business-pro", "custom-systems", "website-care", "not-sure"];
  const service = allowed.includes(input.service) ? input.service : "not-sure";
  if (name.length < 2 || name.length > 120 || !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email) || email.length > 254 || details.length < 10 || details.length > 4000 || company.length > 160) {
    return { ok: false, message: "Please enter your name, a valid email, and a short project description." };
  }
  const draft = emptyInquiryDraft();
  draft.contact = { name, email, phone: "", preferredContact: "Email" };
  draft.company = { name: company || "Not provided", description: "Prospective SystemArc customer requesting a consultation.", type: "Other", size: "" };
  draft.problem = { description: details, currentProcess: "", affectedUsers: [], frequency: "" };
  draft.project = { desiredOutcome: details, solutionAwareness: "No — I just know the problem", areas: [], timeline: "", budget: "" };
  draft.systems = { currentTools: "", manualDataMovement: "", keepExisting: "", systemsToKeep: "" };
  draft.problem.description = "Service requested: " + service + ". " + details;
  const result = await submitProjectInquiry({ draft, honeypot: input.honeypot, referrer: "" });
  return result.ok
    ? { ok: true, message: "Thanks! Your inquiry has been sent." }
    : { ok: false, message: result.message };
}
