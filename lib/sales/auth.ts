import "server-only";
import { createHash, createHmac, randomBytes, scrypt as callbackScrypt, timingSafeEqual } from "node:crypto";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { createInquirySupabase } from "@/lib/supabase/server";

const cookieName = "sa_sales_session";
const sessionSeconds = 7 * 24 * 60 * 60;
const iterations = 1 << 15;
const scryptOptions = { N:iterations, r:8, p:1, maxmem:64*1024*1024 };
function derivePassword(password:string,salt:Buffer):Promise<Buffer> {
  return new Promise((resolve,reject)=>callbackScrypt(password,salt,64,scryptOptions,(err,key)=>{
    if(err)reject(err);
    else resolve(key as Buffer);
  }));
}
export const salesStages = ["new","contacted","qualified","proposal","won","lost"] as const;
export type SalesStage = (typeof salesStages)[number];

function sha256(text:string) { return createHash("sha256").update(text).digest("hex"); }
export function isSalesLoginConfigured() {
  return !!process.env.INQUIRY_RECEIVER_SECRET?.trim() && !!createInquirySupabase();
}
export async function hashSalesPassword(password:string):Promise<string> {
  const salt = randomBytes(24).toString("hex");
  const digest = await derivePassword(password,Buffer.from(salt,"hex"));
  return "scrypt-v1:"+salt+":"+digest.toString("hex");
}
export async function verifySalesPassword(password:string, encoded:string):Promise<boolean> {
  const match = /^scrypt-v1:([0-9a-f]{48}):([0-9a-f]{128})$/.exec(encoded);
  if (!match) return false;
  try {
    const candidate=await derivePassword(password,Buffer.from(match[1],"hex"));
    return timingSafeEqual(candidate,Buffer.from(match[2],"hex"));
  } catch { return false; }
}
async function requesterKey() {
  const requestHeaders=await headers();
  const ip=(requestHeaders.get("x-forwarded-for")||"unknown").split(",")[0].trim().slice(0,160);
  const secret=process.env.INQUIRY_RECEIVER_SECRET||"";
  return createHmac("sha256",secret).update(ip).digest("hex");
}
export async function startSalesPasswordSession(password:string):Promise<boolean> {
  if (!isSalesLoginConfigured()||password.length<1||password.length>256) return false;
  const client=createInquirySupabase();
  if(!client) return false;
  const requester_hash=await requesterKey();
  const since=new Date(Date.now()-15*60*1000).toISOString();
  const {count,error:attemptError}=await client.from("systemarc_sales_password_attempts")
    .select("id",{head:true,count:"exact"})
    .eq("requester_hash",requester_hash).gte("attempted_at",since);
  if(attemptError || (count??0)>=6) return false;
  const {data:attempt,error:insertError}=await client.from("systemarc_sales_password_attempts")
    .insert({requester_hash,success:false}).select("id").single();
  if(insertError || !attempt) return false;

  const {data,error}=await client.from("systemarc_sales_admin_credentials")
    .select("password_hash").eq("admin_id","owner").maybeSingle();
  if(error||!data||!await verifySalesPassword(password,data.password_hash)) return false;
  const token=randomBytes(32).toString("hex");
  const {error:sessionError}=await client.from("systemarc_sales_sessions").insert({
    token_hash:sha256(token),expires_at:new Date(Date.now()+sessionSeconds*1000).toISOString()
  });
  if(sessionError) return false;
  await client.from("systemarc_sales_password_attempts").update({success:true}).eq("id",attempt.id);
  (await cookies()).set(cookieName,token,{
    httpOnly:true,secure:process.env.NODE_ENV==="production",sameSite:"lax",
    path:"/sales",maxAge:sessionSeconds,
  });
  return true;
}
export async function hasSalesSession():Promise<boolean> {
  const token=(await cookies()).get(cookieName)?.value||"";
  if(!/^[a-f0-9]{64}$/.test(token)) return false;
  const client=createInquirySupabase();
  if(!client) return false;
  const {data,error}=await client.from("systemarc_sales_sessions").select("id")
    .eq("token_hash",sha256(token)).is("revoked_at",null)
    .gt("expires_at",new Date().toISOString()).maybeSingle();
  return !error&&!!data;
}
export async function requireSalesSession():Promise<void> {
  if(!(await hasSalesSession())) redirect("/sales/login");
}
export async function updateSalesPassword(currentPassword:string,newPassword:string):Promise<"updated"|"invalid"|"unavailable"> {
  await requireSalesSession();
  if (currentPassword.length<1||currentPassword.length>256 || newPassword.length<16||newPassword.length>128 ||
      newPassword===currentPassword) return "invalid";
  const client=createInquirySupabase();
  if(!client) return "unavailable";
  const {data,error}=await client.from("systemarc_sales_admin_credentials")
    .select("password_hash").eq("admin_id","owner").maybeSingle();
  if(error||!data||!await verifySalesPassword(currentPassword,data.password_hash))return "invalid";
  const newHash=await hashSalesPassword(newPassword);
  const {data:changed,error:saveError}=await client.from("systemarc_sales_admin_credentials")
    .update({password_hash:newHash,changed_at:new Date().toISOString()})
    .eq("admin_id","owner").eq("password_hash",data.password_hash)
    .select("admin_id").maybeSingle();
  if(saveError||!changed)return "unavailable";
  const ownToken=(await cookies()).get(cookieName)?.value??"";
  if(/^[a-f0-9]{64}$/.test(ownToken)) {
    const {error:revokeError}=await client.from("systemarc_sales_sessions")
      .update({revoked_at:new Date().toISOString()}).is("revoked_at",null)
      .neq("token_hash",sha256(ownToken));
    if(revokeError)console.error("sales_other_session_revoke_failed");
  }
  return "updated";
}
export async function revokeSalesSession() {
  const jar=await cookies(),token=jar.get(cookieName)?.value||"";
  const client=createInquirySupabase();
  if(/^[a-f0-9]{64}$/.test(token)&&client)
    await client.from("systemarc_sales_sessions")
      .update({revoked_at:new Date().toISOString()})
      .eq("token_hash",sha256(token)).is("revoked_at",null);
  jar.set(cookieName,"",{
    httpOnly:true,secure:process.env.NODE_ENV==="production",sameSite:"lax",
    path:"/sales",maxAge:0,
  });
}
