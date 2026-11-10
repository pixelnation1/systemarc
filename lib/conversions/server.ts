import "server-only";
import { createInquirySupabase } from "@/lib/supabase/server";

export const conversionEventNames = [
  "page_view", "cta_click", "website_quote_started", "website_quote_submitted",
  "software_inquiry_started", "software_inquiry_submitted",
] as const;
export type ConversionEventName = (typeof conversionEventNames)[number];

function object(value: unknown): Record<string,unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value) ? value as Record<string,unknown> : null;
}
function safeTag(value: unknown, max = 80): string | null {
  if (typeof value !== "string") return null;
  const text = value.trim();
  return text && text.length <= max && /^[a-zA-Z0-9_. -]+$/.test(text) ? text : null;
}
function safePath(value: unknown): string | null {
  if (typeof value !== "string") return null;
  return value.length <= 180 && /^\/[a-zA-Z0-9\/_-]*$/.test(value) ? value : null;
}
function safeHost(value: unknown): string | null {
  if (typeof value !== "string") return null;
  return value.length <= 120 && /^(?:[a-z0-9-]+\.)*[a-z0-9-]+$/.test(value) ? value : null;
}
export function normalizeConversionEvent(input: unknown) {
  const event = object(input);
  if (!event || !conversionEventNames.includes(event.eventName as ConversionEventName)) return null;
  const page_path = safePath(event.pagePath);
  if (!page_path) return null;
  const target_path = safePath(event.targetPath);
  const attribution = object(event.attribution);
  return {
    event_name: event.eventName as ConversionEventName,
    page_path,
    target_path,
    traffic_source: safeTag(attribution?.source) ?? "direct",
    traffic_medium: safeTag(attribution?.medium),
    campaign: safeTag(attribution?.campaign),
    referrer_host: safeHost(attribution?.referrerHost),
  };
}
export async function captureConversionEvent(input: unknown): Promise<boolean> {
  const row = normalizeConversionEvent(input);
  if (!row) return false;
  const supabase = createInquirySupabase();
  if (!supabase) {
    console.error("conversion_analytics_not_configured");
    return false;
  }
  try {
    const { error } = await supabase.from("systemarc_conversion_events").insert(row);
    if (error) {
      console.error(JSON.stringify({ event:"conversion_analytics_insert_failed", code: error.code }));
      return false;
    }
    return true;
  } catch {
    console.error("conversion_analytics_insert_exception");
    return false;
  }
}
