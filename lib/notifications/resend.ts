import type { TransactionalEmailTransport } from "@/lib/notifications/deliver";
import { singleMailbox, type InquiryNotificationMessage } from "@/lib/notifications/message";

export type ResendEmailPayload = {
  from: string;
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
};

export type ResendSend = (payload: ResendEmailPayload) => Promise<{ id?: string | null }>;

/**
 * Returns the production transport when a server-side API key and a single
 * configured sender are present. A missing key or sender returns null so the
 * stored inquiry can still succeed.
 */
export function createResendTransport(options: {
  apiKey: string | undefined;
  from: string | undefined;
  send?: ResendSend;
}): TransactionalEmailTransport | null {
  const apiKey = usableApiKey(options.apiKey);
  const from = safeFromIdentity(options.from);
  if (!apiKey || !from) return null;

  const send = options.send ?? ((payload) => sendWithResend(apiKey, payload));

  return {
    name: "resend",
    async send(message: InquiryNotificationMessage) {
      const replyTo = singleMailbox(message.replyTo);
      const result = await send({
        from,
        to: message.to,
        subject: message.subject,
        html: message.html,
        text: message.text,
        ...(replyTo ? { replyTo } : {}),
      });
      const id = result?.id?.trim() ?? "";
      if (!id) throw new Error("notification_rejected");
      return { providerMessageId: id };
    },
  };
}

export function safeFromIdentity(value: string | undefined) {
  const raw = value?.trim() ?? "";
  if (!raw || raw.length > 320 || /[\u0000-\u001F\u007F]/.test(raw)) return "";

  const wrapped = raw.match(/^(.*) <([^<>]+)>$/);
  if (!wrapped) return singleMailbox(raw);

  const name = wrapped[1].trim();
  const mailbox = singleMailbox(wrapped[2]);
  if (!name || name.length > 78 || /[<>"\\]/.test(name) || !mailbox) return "";
  return `${name} <${mailbox}>`;
}

function usableApiKey(value: string | undefined) {
  const key = value?.trim() ?? "";
  if (!key || key.length > 512 || /\s/.test(key)) return "";
  return key;
}

async function sendWithResend(apiKey: string, payload: ResendEmailPayload) {
  const { Resend } = await import("resend");
  const resend = new Resend(apiKey);
  const { data, error } = await resend.emails.send({
    from: payload.from,
    to: payload.to,
    subject: payload.subject,
    html: payload.html,
    text: payload.text,
    ...(payload.replyTo ? { replyTo: payload.replyTo } : {}),
  });
  if (error || !data?.id) throw new Error("notification_rejected");
  return { id: data.id };
}
