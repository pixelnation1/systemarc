/**
 * Inquiry analytics events carry step and state only.
 * Do not add field values, email addresses, or inquiry text.
 * No third-party analytics product is connected.
 */
export type ProjectInquiryEvent =
  | { name: "project_form_started" }
  | { name: "project_form_step_completed"; step: number }
  | { name: "project_form_submitted" };

type InquiryEventHandler = (event: ProjectInquiryEvent) => void;

const handlers = new Set<InquiryEventHandler>();

export function subscribeToInquiryEvents(handler: InquiryEventHandler) {
  handlers.add(handler);
  return () => {
    handlers.delete(handler);
  };
}

export function trackInquiryEvent(event: ProjectInquiryEvent) {
  for (const handler of handlers) {
    try {
      handler(event);
    } catch {
      // A listener cannot interrupt the inquiry.
    }
  }
}
