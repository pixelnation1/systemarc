"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { completeSalesLogin, requestSalesLogin, requireSalesSession, revokeSalesSession, salesStages } from "@/lib/sales/auth";
import { createInquirySupabase } from "@/lib/supabase/server";

function text(form: FormData, key: string, max: number) {
  const value = form.get(key);
  if (typeof value !== "string" || value.length > max) return null;
  return value.trim();
}
function dollarsToCents(value: string|null): number|null {
  if (value === null || value === "") return 0;
  if (!/^\d{1,8}(\.\d{1,2})?$/.test(value)) return null;
  const [whole,fraction=""] = value.split(".");
  const cents = Number(whole) * 100 + Number(fraction.padEnd(2,"0"));
  return cents <= 9999999999 ? cents : null;
}
function validDate(value: string|null): string|null|false {
  if (!value) return null;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || Number.isNaN(Date.parse(value))) return false;
  return new Date(value + "T12:00:00.000Z").toISOString().slice(0,10) === value ? value : false;
}
function errPath(path: string, message: string): never {
  redirect(path + "?error=" + encodeURIComponent(message));
}

export async function requestSignInAction() {
  const result = await requestSalesLogin();
  redirect("/sales/login?" + (result==="sent" ? "sent=1" : "error=" + (result==="limited" ? "limit" : "unavailable")));
}
export async function confirmSignInAction(form: FormData) {
  const token=text(form,"token",64) ?? "";
  if (!await completeSalesLogin(token)) redirect("/sales/login?error=expired");
  redirect("/sales");
}
export async function signOutAction() {
  await revokeSalesSession();
  redirect("/sales/login");
}

export async function createSalesLeadAction(form: FormData) {
  await requireSalesSession();
  const name=text(form,"name",120),company=text(form,"company",160);
  const email=text(form,"email",254)??"",phone=text(form,"phone",40)??"";
  const service=text(form,"service",30)??"Other";
  const summary=text(form,"summary",2000)??"";
  const source=text(form,"source",80)??"manual";
  const money=dollarsToCents(text(form,"value",16));
  const date=validDate(text(form,"next_follow_up",10));
  const validServices=["Website","Software","Automation","Media","Other"];
  if (!name || name.length<2 || !company || company.length<2 || (!email && !phone) ||
      (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) || !validServices.includes(service) || money===null || date===false)
    errPath("/sales/new","invalid");
  const client=createInquirySupabase();
  if (!client) errPath("/sales/new","unavailable");
  const {error}=await client!.from("systemarc_sales_opportunities").insert({
    company_name:company,contact_name:name,contact_email:email,contact_phone:phone,
    service,summary,source:source||"manual",estimated_value_cents:money,next_follow_up:date,
  });
  if (error) errPath("/sales/new","save");
  revalidatePath("/sales");
  redirect("/sales?created=1");
}

export async function updateSalesLeadAction(form: FormData) {
  await requireSalesSession();
  const id=text(form,"id",36)??"";
  if (!/^[0-9a-f-]{36}$/i.test(id)) redirect("/sales");
  const stage=text(form,"stage",20)??"";
  const contact_name=text(form,"contact_name",120),company_name=text(form,"company_name",160);
  const contact_email=text(form,"contact_email",254),contact_phone=text(form,"contact_phone",40);
  const notes=text(form,"notes",4000),money=dollarsToCents(text(form,"value",16));
  const date=validDate(text(form,"next_follow_up",10));
  const path="/sales/lead/"+id;
  if (!salesStages.includes(stage as (typeof salesStages)[number]) || notes===null || money===null || date===false
    || !contact_name || contact_name.length<2 || !company_name || company_name.length<2
    || contact_email===null || contact_phone===null || (!contact_email&&!contact_phone)
    || (contact_email&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact_email)))
    errPath(path,"invalid");
  const client=createInquirySupabase();
  if (!client) errPath(path,"unavailable");
  const {data:existing,error:lookup}=await client!.from("systemarc_sales_opportunities")
    .select("stage,first_contacted_at").eq("id",id).maybeSingle();
  if (lookup || !existing) errPath(path,"notfound");
  const closing=stage==="won" || stage==="lost";
  const now=new Date().toISOString();
  const fields={
    stage,notes,contact_name,company_name,contact_email,contact_phone,estimated_value_cents:money,next_follow_up:date,
    updated_at:now,
    first_contacted_at:existing.first_contacted_at ||
      (stage!=="new" ? now : null),
    closed_at:closing ? (existing.stage===stage ? undefined : now) : null,
  };
  const {error}=await client!.from("systemarc_sales_opportunities").update(fields).eq("id",id);
  if (error) errPath(path,"save");
  revalidatePath("/sales");
  revalidatePath(path);
  redirect(path+"?saved=1");
}
