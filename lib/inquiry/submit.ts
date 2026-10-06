import { randomUUID } from "node:crypto";
import { headers } from "next/headers";
import { consumeRateLimit } from "@/lib/inquiry/rate-limit";
import type { ProjectInquiry } from "@/lib/inquiry/model";

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

function webhookDestination(): InquiryDestination | null {
  const raw = process.env.INQUIRY_WEBHOOK_URL?.trim();
  if (!raw) return null;

  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    return null;
  }

  if (url.protocol !== "https:") return null;

  return {
    name: "webhook",
    async deliver(inquiry) {
      const secret = process.env.INQUIRY_WEBHOOK_SECRET?.trim();
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          ...(secret ? { authorization: `Bearer ${secret}` } : {}),
        },
        body: JSON.stringify(inquiry),
        signal: AbortSignal.timeout(8000),
      });

      if (!response.ok) {
        throw new Error("Inquiry destination rejected the request.");
      }
    },
  };
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
  const webhook = webhookDestination();
  if (webhook) return webhook;
  if (process.env.NODE_ENV === "development" || process.env.INQUIRY_LOG_SINK === "true") {
    return logDestination();
  }
  return null;
}

export function createInquiryId() {
  return randomUUID();
}
