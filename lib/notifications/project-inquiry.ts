import "server-only";
import { notifyLeadStored, type LeadStoredEvent } from "@/lib/inquiry/receiver/notify";
import { deliverProjectInquiryNotification } from "@/lib/notifications/deliver";
import { createResendTransport } from "@/lib/notifications/resend";

/**
 * Runs only after a newly stored inquiry. Duplicate deliveries must not call this.
 * Email is secondary: this function does not throw, and it does not send outside production.
 */
export async function notifyNewProjectInquiry(event: LeadStoredEvent) {
  await notifyLeadStored(event);
  await deliverProjectInquiryNotification(event, {
    nodeEnv: process.env.NODE_ENV,
    notificationEmail: process.env.INQUIRY_NOTIFICATION_EMAIL,
    defaultEmail: "",
    transport: createResendTransport({
      apiKey: process.env.RESEND_API_KEY,
      from: process.env.RESEND_FROM_EMAIL,
    }),
  });
}
