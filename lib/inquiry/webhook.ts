import type { ProjectInquiry } from "@/lib/inquiry/model";

export const inquiryWebhookEvent = "systemarc.project_inquiry.created";
export const inquiryWebhookVersion = "1.0";
export const inquiryWebhookUserAgent = "SystemArc-Inquiry/1.0";

/** One attempt. Long enough for a normal HTTPS webhook, short enough not to hold the request open. */
export const inquiryWebhookTimeoutMs = 10_000;

export type InquiryWebhookPayload = {
  event: typeof inquiryWebhookEvent;
  version: typeof inquiryWebhookVersion;
  inquiryId: string;
  submittedAt: string;
  contact: ProjectInquiry["contact"];
  company: ProjectInquiry["company"];
  problem: ProjectInquiry["problem"];
  systems: ProjectInquiry["systems"];
  project: ProjectInquiry["project"];
  metadata: {
    sourcePage: ProjectInquiry["metadata"]["sourcePage"];
    referrer: string;
  };
};

export type InquiryDeliverySelection =
  | { kind: "webhook"; url: URL }
  | { kind: "log" }
  | { kind: "unavailable"; reason: "missing" | "invalid" };

export class InquiryDeliveryError extends Error {
  readonly category: "timeout" | "network" | "rejected" | "invalid_webhook_url";
  readonly status?: number;

  constructor(category: InquiryDeliveryError["category"], status?: number) {
    super("Inquiry delivery failed");
    this.name = "InquiryDeliveryError";
    this.category = category;
    this.status = status;
  }
}

export function inquiryWebhookPayload(
  inquiry: ProjectInquiry & { id: string },
): InquiryWebhookPayload {
  return {
    event: inquiryWebhookEvent,
    version: inquiryWebhookVersion,
    inquiryId: inquiry.id,
    submittedAt: inquiry.metadata.submittedAt,
    contact: inquiry.contact,
    company: inquiry.company,
    problem: inquiry.problem,
    systems: inquiry.systems,
    project: inquiry.project,
    metadata: {
      sourcePage: inquiry.metadata.sourcePage,
      referrer: inquiry.metadata.referrer,
    },
  };
}

/** Accept only an https URL. Anything else is not a production destination. */
export function parseHttpsWebhookUrl(raw: string): URL | null {
  try {
    const url = new URL(raw);
    if (url.protocol !== "https:") return null;
    if (!url.hostname) return null;
    return url;
  } catch {
    return null;
  }
}

export function selectInquiryDelivery(env: {
  nodeEnv: string | undefined;
  webhookUrl: string | undefined;
  logSink: string | undefined;
}): InquiryDeliverySelection {
  const raw = env.webhookUrl?.trim() ?? "";
  if (raw) {
    const url = parseHttpsWebhookUrl(raw);
    if (!url) return { kind: "unavailable", reason: "invalid" };
    return { kind: "webhook", url };
  }

  const developmentLog =
    env.nodeEnv !== "production" &&
    (env.nodeEnv === "development" || env.logSink === "true");

  if (developmentLog) return { kind: "log" };
  return { kind: "unavailable", reason: "missing" };
}

export async function deliverInquiryWebhook(
  url: URL,
  inquiry: ProjectInquiry & { id: string },
  options: {
    secret?: string;
    timeoutMs?: number;
    fetchImpl?: typeof fetch;
  } = {},
): Promise<void> {
  const fetchImpl = options.fetchImpl ?? fetch;
  const timeoutMs = options.timeoutMs ?? inquiryWebhookTimeoutMs;
  const secret = options.secret?.trim();
  const headers: Record<string, string> = {
    "content-type": "application/json",
    "user-agent": inquiryWebhookUserAgent,
  };
  if (secret) headers.authorization = `Bearer ${secret}`;

  let response: Response;
  try {
    response = await fetchImpl(url, {
      method: "POST",
      headers,
      body: JSON.stringify(inquiryWebhookPayload(inquiry)),
      signal: AbortSignal.timeout(timeoutMs),
      redirect: "manual",
      cache: "no-store",
    });
  } catch (error) {
    if (isTimeoutError(error)) throw new InquiryDeliveryError("timeout");
    throw new InquiryDeliveryError("network");
  }

  if (!response.ok) {
    throw new InquiryDeliveryError("rejected", response.status);
  }
}

export function logInquiryDeliveryFailure(inquiryId: string, error: unknown) {
  const category = error instanceof InquiryDeliveryError ? error.category : "unexpected";
  const status = error instanceof InquiryDeliveryError ? error.status : undefined;
  const entry: Record<string, string | number> = {
    event: "project_inquiry_delivery_failed",
    inquiryId,
    submittedAt: new Date().toISOString(),
    category,
  };
  if (typeof status === "number") entry.status = status;
  console.error(JSON.stringify(entry));
}

function isTimeoutError(error: unknown) {
  return (
    error instanceof Error && (error.name === "TimeoutError" || error.name === "AbortError")
  );
}
