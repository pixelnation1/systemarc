/**
 * Fires only after a new project inquiry row is stored.
 * A duplicate delivery does not call this again.
 * A handler failure is logged and does not remove the row or change the HTTP success.
 */
export type LeadStoredEvent = {
  inquiryId: string;
};

type LeadStoredHandler = (event: LeadStoredEvent) => Promise<void> | void;

const handlers = new Set<LeadStoredHandler>();

export function onLeadStored(handler: LeadStoredHandler) {
  handlers.add(handler);
  return () => {
    handlers.delete(handler);
  };
}

export async function notifyLeadStored(event: LeadStoredEvent) {
  for (const handler of handlers) {
    try {
      await handler(event);
    } catch {
      console.error(
        JSON.stringify({
          event: "project_inquiry_notification_failed",
          inquiryId: event.inquiryId,
        }),
      );
    }
  }
}
