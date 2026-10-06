/**
 * Inquiry events are part of the site analytics bus.
 * They still exclude field values, email addresses, and inquiry text.
 */
import { subscribeToAnalytics, trackAnalytics, type AnalyticsEvent } from "@/lib/analytics";

export type ProjectInquiryEvent = Extract<
  AnalyticsEvent,
  | { name: "project_form_started" }
  | { name: "project_form_step_completed" }
  | { name: "project_form_submitted" }
>;

type InquiryEventHandler = (event: ProjectInquiryEvent) => void;

export function subscribeToInquiryEvents(handler: InquiryEventHandler) {
  return subscribeToAnalytics((event) => {
    if (!event.name.startsWith("project_form_")) return;
    handler(event as ProjectInquiryEvent);
  });
}

export function trackInquiryEvent(event: ProjectInquiryEvent) {
  trackAnalytics(event);
}
