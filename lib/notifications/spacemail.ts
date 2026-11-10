import "server-only";
import nodemailer from "nodemailer";
import { singleMailbox } from "@/lib/notifications/message";

// This is the same Spacemail mailbox used by HQX Command.
// Credentials must remain in SystemArc's server-only Vercel environment.
export const systemArcMailbox = "info@systemarchq.com";
export function isSpacemailConfigured() {
  return !!process.env.SPACEMAIL_SMTP_PASSWORD?.trim();
}
export type SystemArcMail = {to:string;subject:string;html:string;text:string;replyTo?:string};
export async function sendSystemArcMail(message:SystemArcMail):Promise<{id:string}> {
  if(!isSpacemailConfigured()) throw new Error("spacemail_not_configured");
  const recipient=singleMailbox(message.to);
  if(!recipient||message.subject.length>200||!message.subject.trim()) throw new Error("invalid_mail_destination");
  const transport=nodemailer.createTransport({
    host:"mail.spacemail.com",port:465,secure:true,
    auth:{user:systemArcMailbox,pass:process.env.SPACEMAIL_SMTP_PASSWORD!},
    connectionTimeout:5000,greetingTimeout:5000,socketTimeout:10000,
    tls:{minVersion:"TLSv1.2"},logger:false,debug:false,
  });
  try {
    const result=await transport.sendMail({
      from:{name:"SystemArc",address:systemArcMailbox},to:recipient,
      subject:message.subject,html:message.html,text:message.text,
      ...(message.replyTo&&singleMailbox(message.replyTo)?{replyTo:message.replyTo}:{}),
      disableFileAccess:true,disableUrlAccess:true,
    });
    if(!result.accepted.some(address=>address.toLowerCase()===recipient.toLowerCase()))
      throw new Error("spacemail_recipient_not_accepted");
    return {id:result.messageId};
  } finally { transport.close(); }
}
