import { randomUUID } from "node:crypto";
import { headers } from "next/headers";
import { consumeRateLimit } from "@/lib/inquiry/rate-limit";
import type { ProjectInquiry } from "@/lib/inquiry/model";
import {
  deliverInquiryWebhook,
  selectInquiryDelivery,
  type InquiryDeliverySelection,
} from "@/lib/inquiry/webhook";

export type InquiryDelivery = "webhook" | "log";

export type InquiryDestination = {
  name: InquiryDelivery;
  deliver(inquiry: ProjectInquiry & { id: string }): Promise<void>;
};

const windowMs = 15 * 60 * 1000;
const attemptLimit = 20;

export async function inquiryClientKey() {
  const headerList = await headers();
  const forwarded = headerList.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || "unknown";
  return `inquiry:${ip.slice(0, 80)}`;
}

export function allowInquiryAttempt(key: string) {
  return consumeRateLimit(key, attemptLimit, windowMs).ok;
}

function currentDeliverySelection(): InquiryDeliverySelection {
  return selectInquiryDelivery({
    nodeEnv: process.env.NODE_ENV,
    webhookUrl: process.env.INQUIRY_WEBHOOK_URL,
    logSink: process.env.INQUIRY_LOG_SINK,
  });
}

export function explainUnavailableDestination(): "missing" | "invalid" {
  const selection = currentDeliverySelection();
  if (selection.kind === "unavailable") return selection.reason;
  return "missing";
}

function logDestination(): InquiryDestination {
  return {
    name: "log",
    async deliver(inquiry) {
      console.info(
        JSON.stringify({
          event: "project_inquiry_received",
          id: inquiry.id,
          sourcePage: inquiry.metadata.sourcePage,
          companyType: inquiry.company.type,
          areaCount: inquiry.project.areas.length,
        }),
      );
    },
  };
}

export function resolveInquiryDestination(): InquiryDestination | null {
  const selection = currentDeliverySelection();
  if (selection.kind === "webhook") {
    const url = selection.url;
    const secret = process.env.INQUIRY_WEBHOOK_SECRET;
    return {
      name: "webhook",
      deliver(inquiry) {
        return deliverInquiryWebhook(url, inquiry, { secret });
      },
    };
  }
  if (selection.kind === "log") return logDestination();
  return null;
}

export function createInquiryId() {
  return randomUUID();
}
