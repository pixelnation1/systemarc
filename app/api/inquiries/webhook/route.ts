import { handleInquiryWebhook } from "@/lib/inquiry/receiver/handle";
import { notifyLeadStored } from "@/lib/inquiry/receiver/notify";
import { createSupabaseInquiryStore } from "@/lib/inquiry/receiver/supabase-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function readServerEnv(name: string) {
  return process.env[name];
}

export function POST(request: Request) {
  return handleInquiryWebhook(request, {
    secret: readServerEnv("INQUIRY_RECEIVER_SECRET"),
    store: createSupabaseInquiryStore(),
    notify: notifyLeadStored,
  });
}
