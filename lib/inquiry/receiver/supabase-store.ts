import "server-only";
import { InquiryPersistenceError, type InquiryStore } from "@/lib/inquiry/receiver/persist";
import { createInquirySupabase, missingInquirySupabaseEnv } from "@/lib/supabase/server";

const postgresCode = /^[0-9A-Z]{5}$/;

export function createSupabaseInquiryStore(): InquiryStore {
  return {
    async insert(row) {
      const supabase = createInquirySupabase();
      if (!supabase) {
        throw new InquiryPersistenceError("not_configured", {
          missing: missingInquirySupabaseEnv(),
        });
      }

      const { error } = await supabase.from("project_inquiries").insert(row);
      if (!error) return "created";

      const code = postgresCode.test(error.code) ? error.code : undefined;
      if (code === "23505") return "duplicate";
      throw new InquiryPersistenceError("persist_failed", { code });
    },
  };
}
