import type { LeadStoredEvent } from "@/lib/inquiry/receiver/notify";
import {
  buildInquiryNotification,
  singleMailbox,
  type InquiryNotificationMessage,
} from "@/lib/notifications/message";

/**
 * A transactional email transport. The production implementation is Resend,
 * constructed beside this module. Do not send with a mailbox password, and do
 * not put a provider key in a NEXT_PUBLIC_ variable.
 */
export type TransactionalEmailReceipt = {
  providerMessageId: string;
};

export type TransactionalEmailTransport = {
  name: string;
  send(message: InquiryNotificationMessage): Promise<TransactionalEmailReceipt>;
};

export type NotificationDeliveryEnv = {
  nodeEnv: string | undefined;
  notificationEmail: string | undefined;
  defaultEmail: string;
  transport: TransactionalEmailTransport | null;
};

export type NotificationDeliveryResult =
  | { status: "sent" }
  | { status: "skipped" }
  | { status: "not_configured" }
  | { status: "failed" };

/**
 * Sends one internal notification after the caller has confirmed a new row.
 * This function does not throw. A send failure does not change the stored inquiry.
 */
export async function deliverProjectInquiryNotification(
  event: LeadStoredEvent,
  env: NotificationDeliveryEnv,
): Promise<NotificationDeliveryResult> {
  if (env.nodeEnv !== "production") {
    logNotification("info", {
      event: "project_inquiry_notification_skipped",
      inquiryId: event.inquiryId,
      reason: "not_production",
    });
    return { status: "skipped" };
  }

  const transport = env.transport;
  const to = notificationDestination(env);
  if (!transport || !to) {
    logNotification("error", {
      event: "project_inquiry_notification_not_configured",
      inquiryId: event.inquiryId,
    });
    return { status: "not_configured" };
  }

  try {
    const receipt = await transport.send(buildInquiryNotification(event, to));
    const providerMessageId = acceptedProviderMessageId(receipt?.providerMessageId);
    if (providerMessageId === null) {
      logNotification("error", {
        event: "project_inquiry_notification_failed",
        inquiryId: event.inquiryId,
      });
      return { status: "failed" };
    }
    logNotification("info", {
      event: "project_inquiry_notification_sent",
      inquiryId: event.inquiryId,
      ...(providerMessageId ? { providerMessageId } : {}),
    });
    return { status: "sent" };
  } catch {
    logNotification("error", {
      event: "project_inquiry_notification_failed",
      inquiryId: event.inquiryId,
    });
    return { status: "failed" };
  }
}

function acceptedProviderMessageId(value: string | undefined) {
  const id = value?.trim() ?? "";
  if (!id) return null;
  if (!/^[A-Za-z0-9._-]{1,128}$/.test(id)) return "";
  return id;
}

function notificationDestination(env: NotificationDeliveryEnv) {
  const configured = env.notificationEmail?.trim() ?? "";
  if (configured) return singleMailbox(configured);
  return singleMailbox(env.defaultEmail);
}

function logNotification(
  level: "info" | "error",
  entry: { event: string; inquiryId: string; reason?: string; providerMessageId?: string },
) {
  const line = JSON.stringify(entry);
  if (level === "info") console.info(line);
  else console.error(line);
}
