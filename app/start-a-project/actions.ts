"use server";

import type { FieldErrors } from "@/lib/inquiry/model";
import {
  allowInquiryAttempt,
  createInquiryId,
  inquiryClientKey,
  resolveInquiryDestination,
  type InquiryDelivery,
} from "@/lib/inquiry/submit";
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
  "We couldn't deliver this inquiry. Please try again in a moment.";

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
      return { ok: false, code: "unavailable", message: notConfiguredMessage };
    }

    try {
      await destination.deliver({ ...inquiry, id: createInquiryId() });
    } catch {
      return { ok: false, code: "unavailable", message: deliveryFailedMessage };
    }

    return { ok: true, delivery: destination.name };
  } catch {
    return { ok: false, code: "unavailable", message: deliveryFailedMessage };
  }
}
