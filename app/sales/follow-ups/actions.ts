"use server";
import { redirect } from "next/navigation";
import { requireSalesSession } from "@/lib/sales/auth";
import { sendDueFollowUps } from "@/lib/sales/reminders";
export async function sendFollowUpDigestNowAction() {
  await requireSalesSession();
  const status=await sendDueFollowUps();
  redirect("/sales/follow-ups?digest="+status);
}
