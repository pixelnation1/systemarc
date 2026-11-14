"use client";

import Link from "next/link";
import { useState, useTransition, type FormEvent } from "react";
import { submitProjectInquiry } from "@/app/start-a-project/actions";
import type { InquiryDraft } from "@/lib/inquiry/model";

const fieldClass = "mt-2 block min-h-12 w-full rounded-md border border-steel bg-carbon px-3 py-3 text-base text-warm-white outline-none focus:border-cobalt focus:ring-1 focus:ring-cobalt";
const labelClass = "block text-sm font-medium text-warm-white";
const topics = [
  { value: "business-assessment", label: "Business security assessment", area: "Cybersecurity Assessment" },
  { value: "account-hardening", label: "Account or device security", area: "Security Hardening" },
  { value: "application-review", label: "Website or application security review", area: "Cybersecurity Assessment" },
  { value: "personal-safety", label: "Personal digital safety", area: "Security Hardening" },
] as const;
type Topic = (typeof topics)[number]["value"];

export function SecurityInquiryForm() {
  const [kind, setKind] = useState<"business" | "individual">("business");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [topic, setTopic] = useState<Topic>("business-assessment");
  const [concern, setConcern] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [error, setError] = useState("");
  const [outcome, setOutcome] = useState<"received" | "not-stored" | null>(null);
  const [pending, startTransition] = useTransition();

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (name.trim().length < 2 || name.length > 120) {
      setError("Please enter your name (2–120 characters).");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) || email.length > 254) {
      setError("Please enter a valid email address.");
      return;
    }
    if (kind === "business" && (company.trim().length < 2 || company.length > 160)) {
      setError("Please enter your organization name.");
      return;
    }
    if (phone.trim() && !/^[0-9+().\-\s]{7,40}$/.test(phone.trim())) {
      setError("Please enter a valid phone number or leave it blank.");
      return;
    }
    if (concern.trim().length < 10 || concern.length > 4000) {
      setError("Please describe your concern in 10–4000 characters, without including sensitive details.");
      return;
    }
    const selection = topics.find(item => item.value === topic) ?? topics[0];
    const description = kind === "individual"
      ? "Personal security inquiry from an individual, not a business."
      : "Business cybersecurity inquiry requesting a defined security conversation.";
    const draft: InquiryDraft = {
      contact: { name: name.trim(), email: email.trim(), phone: phone.trim(), preferredContact: phone.trim() ? "Either" : "Email" },
      company: { name: kind === "individual" ? "Individual / personal security" : company.trim(), description, type: "Other", size: "" },
      problem: { description: concern.trim(), currentProcess: "Service interest: " + selection.label, affectedUsers: kind === "business" ? ["Employees"] : ["Other"], frequency: "" },
      systems: { currentTools: "", manualDataMovement: "", keepExisting: "", systemsToKeep: "" },
      project: { desiredOutcome: "Understand the security concern and agree on practical steps to reduce risks.", solutionAwareness: "No — I just know the problem", areas: [selection.area], timeline: "", budget: "" },
    };
    startTransition(async () => {
      try {
        const result = await submitProjectInquiry({
          draft, honeypot,
          // The action whitelists only the origin and pathname, never the URL query.
          referrer: typeof window === "undefined" ? "" : window.location.origin + window.location.pathname,
        });
        if (!result.ok) {
          setError(result.message);
          return;
        }
        setOutcome(result.delivery === "log" ? "not-stored" : "received");
      } catch {
        setError("We couldn't confirm your request was received. Please try again or contact us by email.");
      }
    });
  }

  if (outcome === "received") {
    return <div role="status" className="rounded-md border border-steel bg-carbon p-7">
      <h3 className="font-serif text-2xl text-warm-white">Thank you for reaching out.</h3>
      <p className="mt-3 leading-7 text-silver">Your request has been submitted. We&apos;ll review the general concern and discuss the appropriate next step before any security work begins.</p>
      <p className="mt-4 text-sm text-silver">Submitting this form does not authorize testing of any device, network, or account.</p>
    </div>;
  }
  if (outcome === "not-stored") {
    return <p role="status" className="rounded-md border border-steel bg-carbon p-6 text-sm leading-6 text-silver">This development environment recorded your inquiry for testing only; it was not stored for follow-up. Please contact SystemArc directly.</p>;
  }

  return <form onSubmit={onSubmit} noValidate className="space-y-5 rounded-md border border-steel bg-[#111e32] p-5 sm:p-8">
    <fieldset>
      <legend className={labelClass}>Who needs help?</legend>
      <div className="mt-3 flex flex-wrap gap-5 text-sm text-warm-white">
        <label className="inline-flex min-h-11 items-center gap-2"><input className="size-4 accent-cobalt" type="radio" name="kind" value="business" checked={kind === "business"} onChange={() => { setKind("business"); if (topic === "personal-safety") setTopic("business-assessment"); }} />A business</label>
        <label className="inline-flex min-h-11 items-center gap-2"><input className="size-4 accent-cobalt" type="radio" name="kind" value="individual" checked={kind === "individual"} onChange={() => { setKind("individual"); if (topic === "business-assessment") setTopic("personal-safety"); }} />Myself or my family</label>
      </div>
    </fieldset>
    <div className="grid gap-5 sm:grid-cols-2">
      <label className={labelClass}>Your name <span aria-hidden="true">*</span><input className={fieldClass} name="name" autoComplete="name" value={name} onChange={event => setName(event.target.value)} maxLength={120} required /></label>
      <label className={labelClass}>Email address <span aria-hidden="true">*</span><input className={fieldClass} type="email" name="email" autoComplete="email" value={email} onChange={event => setEmail(event.target.value)} maxLength={254} required /></label>
    </div>
    <div className="grid gap-5 sm:grid-cols-2">
      {kind === "business" ? <label className={labelClass}>Organization <span aria-hidden="true">*</span><input className={fieldClass} name="organization" autoComplete="organization" value={company} onChange={event => setCompany(event.target.value)} maxLength={160} required /></label> : null}
      <label className={labelClass}>Phone number <span className="text-silver">(optional)</span><input className={fieldClass} type="tel" name="phone" autoComplete="tel" value={phone} onChange={event => setPhone(event.target.value)} maxLength={40} /></label>
    </div>
    <label className={labelClass}>What kind of help are you looking for?
      <select className={fieldClass} name="topic" value={topic} onChange={event => setTopic(event.target.value as Topic)}>
        {topics.map(item => <option key={item.value} value={item.value}>{item.label}</option>)}
      </select>
    </label>
    <label className={labelClass}>What concerns you? <span aria-hidden="true">*</span>
      <textarea className={fieldClass + " min-h-36"} name="concern" rows={5} value={concern} onChange={event => setConcern(event.target.value)} maxLength={4000} placeholder="Describe the general issue. Please don't include passwords, recovery codes, account numbers, or customer data." required />
    </label>
    <p className="text-sm leading-6 text-silver">This starts a conversation, not an emergency response or authorization to test systems. Information is handled under our <Link href="/privacy" className="text-warm-white underline underline-offset-4">Privacy Policy</Link>.</p>
    {error ? <p role="alert" className="rounded-md border border-[#7f4661] bg-[#301924] px-4 py-3 text-sm text-warm-white">{error}</p> : null}
    <button type="submit" disabled={pending} className="inline-flex min-h-12 items-center justify-center rounded-md bg-warm-white px-6 font-medium text-carbon disabled:opacity-60">{pending ? "Submitting…" : "Request a security conversation"}</button>
    <div className="sr-only" aria-hidden="true"><label htmlFor="security-contact-extra">Leave blank</label><input id="security-contact-extra" type="text" name="extra" autoComplete="off" tabIndex={-1} value={honeypot} onChange={event => setHoneypot(event.target.value)} /></div>
  </form>;
}
