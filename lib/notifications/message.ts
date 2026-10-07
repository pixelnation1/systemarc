import type { LeadStoredEvent } from "@/lib/inquiry/receiver/notify";

const subjectPrefix = "New SystemArc Project Inquiry";

const mailboxPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

export type InquiryNotificationMessage = {
  to: string;
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
};

export function singleMailbox(value: string | undefined) {
  const mailbox = value?.trim() ?? "";
  if (!mailbox || mailbox.length > 254 || !mailboxPattern.test(mailbox)) return "";
  return mailbox;
}

export function inquirySubject(companyName: string) {
  const company = headerText(companyName).slice(0, 120);
  if (!company) return subjectPrefix;
  return `${subjectPrefix} — ${company}`;
}

export function prospectReplyHref(email: string) {
  const mailbox = singleMailbox(email);
  if (!mailbox) return "";
  return `mailto:${mailbox}`;
}

export function buildInquiryNotification(
  event: LeadStoredEvent,
  to: string,
): InquiryNotificationMessage {
  const subject = inquirySubject(event.company.name);
  const replyMailbox = singleMailbox(event.contact.email);
  const replyHref = prospectReplyHref(event.contact.email);
  const rows = inquiryRows(event);
  return {
    to,
    subject,
    text: plainText(rows, replyHref),
    html: htmlMessage(rows, replyHref),
    ...(replyMailbox ? { replyTo: replyMailbox } : {}),
  };
}

type InquiryRow = {
  label: string;
  value: string;
};

function inquiryRows(event: LeadStoredEvent): InquiryRow[] {
  const rows: InquiryRow[] = [
    { label: "Inquiry ID", value: event.inquiryId },
    { label: "Submitted at", value: submittedAtLabel(event.submittedAt) },
    { label: "Name", value: shown(event.contact.name) },
    { label: "Email", value: shown(event.contact.email) },
  ];
  const phone = event.contact.phone.trim();
  if (phone) rows.push({ label: "Phone", value: phone });
  rows.push(
    { label: "Preferred contact method", value: shown(event.contact.preferredContact) },
    { label: "Company / organization", value: shown(event.company.name) },
    { label: "Business description", value: shown(event.company.description) },
    { label: "Business type", value: shown(event.company.type) },
    { label: "Organization size", value: shown(event.company.size) },
    { label: "Problem description", value: shown(event.problem.description) },
    { label: "Current process", value: shown(event.problem.currentProcess) },
    { label: "Who is affected", value: shown(event.problem.affectedUsers.join(", ")) },
    { label: "Frequency", value: shown(event.problem.frequency) },
    { label: "Current tools", value: shown(event.systems.currentTools) },
    { label: "Manual data movement", value: shown(event.systems.manualDataMovement) },
    { label: "Systems they want to keep", value: shown(event.systems.keepExisting) },
  );
  const systemsToKeep = event.systems.systemsToKeep.trim();
  if (systemsToKeep) rows.push({ label: "System details", value: systemsToKeep });
  rows.push(
    { label: "Desired outcome", value: shown(event.project.desiredOutcome) },
    { label: "Solution awareness", value: shown(event.project.solutionAwareness) },
    { label: "Potential project areas", value: shown(event.project.areas.join(", ")) },
    { label: "Timeline", value: shown(event.project.timeline) },
    { label: "Budget range", value: shown(event.project.budget) },
    { label: "Source page", value: shown(event.sourcePage) },
  );
  const referrer = event.referrer.trim();
  if (referrer) rows.push({ label: "Referrer", value: referrer });
  return rows;
}

function plainText(rows: InquiryRow[], replyHref: string) {
  const lines = [
    "NEW PROJECT INQUIRY",
    "SystemArc",
    "",
    "This inquiry is already stored. This message is only a notification.",
    "",
  ];
  if (replyHref) {
    lines.push("Reply to Prospect", replyHref, "");
  }
  let section = "";
  for (const row of rows) {
    const next = sectionFor(row.label);
    if (next !== section) {
      section = next;
      lines.push(section, "");
    }
    lines.push(`${row.label}: ${row.value}`);
  }
  return lines.join("\n");
}

function htmlMessage(rows: InquiryRow[], replyHref: string) {
  const reply = replyHref
    ? `<p style="margin:0 0 20px;"><a href="${escapeHtml(replyHref)}" style="display:inline-block;background:#356bff;color:#f2f0ea;text-decoration:none;padding:10px 16px;font-family:Arial,sans-serif;font-size:14px;">Reply to Prospect</a></p>`
    : "";
  let section = "";
  const body = rows
    .map((row) => {
      const next = sectionFor(row.label);
      const heading =
        next === section
          ? ""
          : `<tr><td colspan="2" style="padding:18px 0 6px;font-family:Arial,sans-serif;font-size:12px;letter-spacing:0.08em;color:#356bff;">${escapeHtml(next)}</td></tr>`;
      section = next;
      return `${heading}<tr><td style="padding:6px 16px 6px 0;vertical-align:top;font-family:Arial,sans-serif;font-size:13px;color:#5b8cff;width:180px;">${escapeHtml(row.label)}</td><td style="padding:6px 0;vertical-align:top;font-family:Arial,sans-serif;font-size:14px;line-height:1.5;color:#1a1e24;word-break:break-word;">${escapeHtml(row.value).replaceAll("\n", "<br>")}</td></tr>`;
    })
    .join("");

  return `<!DOCTYPE html><html><body style="margin:0;padding:0;background:#f2f0ea;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f2f0ea;">
<tr><td align="center" style="padding:24px 12px;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#ffffff;border-top:4px solid #356bff;">
<tr><td style="background:#0b0d10;padding:20px 24px;font-family:Georgia,serif;font-size:22px;color:#f2f0ea;">SystemArc</td></tr>
<tr><td style="padding:24px;font-family:Arial,sans-serif;color:#1a1e24;">
<p style="margin:0 0 8px;font-size:12px;letter-spacing:0.08em;color:#356bff;">NEW PROJECT INQUIRY</p>
<p style="margin:0 0 16px;font-size:14px;line-height:1.5;">This inquiry is already stored. This message is only a notification.</p>
${reply}
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">${body}</table>
</td></tr>
</table>
</td></tr>
</table>
</body></html>`;
}

function sectionFor(label: string) {
  if (label === "Inquiry ID" || label === "Submitted at") return "INQUIRY";
  if (label === "Name" || label === "Email" || label === "Phone" || label === "Preferred contact method") {
    return "CONTACT";
  }
  if (
    label === "Company / organization" ||
    label === "Business description" ||
    label === "Business type" ||
    label === "Organization size"
  ) {
    return "COMPANY";
  }
  if (
    label === "Problem description" ||
    label === "Current process" ||
    label === "Who is affected" ||
    label === "Frequency"
  ) {
    return "THE PROBLEM";
  }
  if (
    label === "Current tools" ||
    label === "Manual data movement" ||
    label === "Systems they want to keep" ||
    label === "System details"
  ) {
    return "CURRENT SYSTEMS";
  }
  if (label === "Source page" || label === "Referrer") return "SOURCE";
  return "THE PROJECT";
}

function submittedAtLabel(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Not provided";
  return date.toISOString().replace(".000Z", " UTC").replace(/Z$/, " UTC").replace("T", " ");
}

function shown(value: string) {
  const text = value.replaceAll("\0", "").trim();
  return text || "Not provided";
}

function headerText(value: string) {
  return value
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
