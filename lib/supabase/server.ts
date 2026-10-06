import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

function readServerEnv(name: string) {
  return process.env[name];
}

/**
 * Privileged Supabase client for inquiry storage.
 * Uses SUPABASE_SECRET_KEY, which bypasses row level security.
 * This module imports server-only so a client component cannot bundle it.
 */
export function createInquirySupabase(): SupabaseClient | null {
  const url = readServerEnv("SUPABASE_URL")?.trim() ?? "";
  const key = readServerEnv("SUPABASE_SECRET_KEY")?.trim() ?? "";
  if (!url || !key) return null;

  return createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
}

export function missingInquirySupabaseEnv() {
  const missing = [
    readServerEnv("SUPABASE_URL")?.trim() ? "" : "SUPABASE_URL",
    readServerEnv("SUPABASE_SECRET_KEY")?.trim() ? "" : "SUPABASE_SECRET_KEY",
  ].filter(Boolean);
  return missing.join(",");
}
