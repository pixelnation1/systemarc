"server-only";
import { createHash, createHmac, randomBytes } from "node:crypto";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { Resend } from "resend";
import { createInquirySupabase } from "@/lib/supabase/server";
import { safeFromIdentity } from "@/lib/notifications/resend";

const cookieName = "sa_sales_session";
const sessionSeconds = 7 * 24 * 60 * 60;
const loginMinutes = 15;
export const salesStages = ["new","contacted","qualified","proposal","won","lost"] as const;
export type SalesStage = (typeof salesStages)[number];

function hash(value: string) { return createHash("sha256").update(value).digest("hex"); }
function adminEmail() {
  const email = (process.env.SALES_ADMIN_EMAIL || process.env.INQUIRY_NOTIFICATION_EMAIL || "").trim().toLowerCase();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : null;
}
function isReady() {
  return !!adminEmail() && !!process.env.RESEND_API_KEY && !!safeFromIdentity(process.env.RESEND_FROM_EMAIL)
    && !!process.env.INQUIRY_RECEIVER_SECRET && !!createInquirySupabase();
}
export function isSalesLoginConfigured() { return isReady(); }
function loginUrl(token: string) {
  return "https://www.systemarchq.com/sales/login?token=" + encodeURIComponent(token);
}

export async function requestSalesLogin(): Promise<"sent"|"limited"|"unavailable"> {
  if (!isReady()) return "unavailable";
  const client = createInquirySupabase();
  if (!client) return "unavailable";
  const req = await headers();
  const ip = (req.get("x-forwarded-for") || "unknown").split(",")[0].trim().slice(0,150);
  const requesterHash = createHmac("sha256", process.env.INQUIRY_RECEIVER_SECRET!).update(ip).digest("hex");
  const oneHourAgo = new Date(Date.now() - 3600000).toISOString();
  const [perSource, all] = await Promise.all([
    client.from("systemarc_sales_login_links").select("id",{count:"exact",head:true}).eq("requester_hash",requesterHash).gte("created_at",oneHourAgo),
    client.from("systemarc_sales_login_links").select("id",{count:"exact",head:true}).gte("created_at",oneHourAgo),
  ]);
  if (perSource.error || all.error) return "unavailable";
  if ((perSource.count ?? 0) >= 4 || (all.count ?? 0) >= 30) return "limited";

  const token = randomBytes(32).toString("hex");
  const tokenHash = hash(token);
  const { error: insertError } = await client.from("systemarc_sales_login_links").insert({
    token_hash: tokenHash,
    requester_hash: requesterHash,
    expires_at: new Date(Date.now() + loginMinutes * 60000).toISOString(),
  });
  if (insertError) return "unavailable";
  try {
    const resend = new Resend(process.env.RESEND_API_KEY!);
    const link = loginUrl(token);
    const {error,data} = await resend.emails.send({
      from: safeFromIdentity(process.env.RESEND_FROM_EMAIL),
      to: adminEmail()!,
      subject: "Your SystemArc Sales Command Center sign-in",
      text: "Use this one-time link to sign in to the SystemArc Sales Command Center. It expires in 15 minutes.\n\n" + link + "\n\nIf you did not request this, you can ignore the email.",
      html: '<p>Use this one-time link to sign in to the SystemArc Sales Command Center. It expires in 15 minutes.</p><p><a href="' + link + '">Open Sales Command Center</a></p><p>If you did not request this, ignore the message.</p>',
    });
    if (error || !data?.id) throw new Error("resend_failed");
    return "sent";
  } catch {
    await client.from("systemarc_sales_login_links").delete().eq("token_hash",tokenHash);
    return "unavailable";
  }
}

export async function completeSalesLogin(token: string): Promise<boolean> {
  if (!/^[a-f0-9]{64}$/.test(token)) return false;
  const client = createInquirySupabase();
  if (!client || !adminEmail()) return false;
  const now = new Date().toISOString();
  // A conditional update consumes the link exactly once, even under concurrent requests.
  const {data,error} = await client.from("systemarc_sales_login_links")
    .update({used_at:now}).eq("token_hash",hash(token))
    .is("used_at",null).gt("expires_at",now).select("id").maybeSingle();
  if (error || !data) return false;
  const secret = randomBytes(32).toString("hex");
  const {error:sessionError} = await client.from("systemarc_sales_sessions").insert({
    token_hash:hash(secret),
    expires_at:new Date(Date.now() + sessionSeconds*1000).toISOString(),
  });
  if (sessionError) return false;
  (await cookies()).set(cookieName,secret,{
    httpOnly:true,secure:process.env.NODE_ENV==="production",sameSite:"lax",
    path:"/sales",maxAge:sessionSeconds,
  });
  return true;
}

export async function hasSalesSession(): Promise<boolean> {
  const token = (await cookies()).get(cookieName)?.value ?? "";
  if (!/^[a-f0-9]{64}$/.test(token) || !adminEmail()) return false;
  const client = createInquirySupabase();
  if (!client) return false;
  const {data,error}=await client.from("systemarc_sales_sessions")
    .select("id").eq("token_hash",hash(token)).is("revoked_at",null)
    .gt("expires_at",new Date().toISOString()).maybeSingle();
  return !error && !!data;
}
export async function requireSalesSession(): Promise<void> {
  if (!(await hasSalesSession())) redirect("/sales/login");
}
export async function revokeSalesSession() {
  const jar = await cookies();
  const token = jar.get(cookieName)?.value ?? "";
  const client = createInquirySupabase();
  if (/^[a-f0-9]{64}$/.test(token) && client) {
    await client.from("systemarc_sales_sessions").update({revoked_at:new Date().toISOString()})
      .eq("token_hash",hash(token)).is("revoked_at",null);
  }
  jar.delete(cookieName);
}
