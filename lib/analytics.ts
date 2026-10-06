/**
 * Site analytics events. No inquiry text, names, email addresses, or phone numbers.
 * No provider is connected. Call subscribeToAnalytics from one client entry
 * when a provider is chosen.
 */
export type AnalyticsEvent =
  | { name: "project_form_started" }
  | { name: "project_form_step_completed"; step: number }
  | { name: "project_form_submitted" }
  | { name: "start_project_clicked"; location: string }
  | { name: "case_study_viewed"; slug: string }
  | { name: "service_cta_clicked"; slug: string };

type AnalyticsHandler = (event: AnalyticsEvent) => void;

const handlers = new Set<AnalyticsHandler>();

export function subscribeToAnalytics(handler: AnalyticsHandler) {
  handlers.add(handler);
  return () => {
    handlers.delete(handler);
  };
}

export function trackAnalytics(event: AnalyticsEvent) {
  for (const handler of handlers) {
    try {
      handler(event);
    } catch {
      // A listener cannot interrupt the page.
    }
  }
}
