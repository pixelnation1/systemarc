"use client";

import { useEffect, useState, useTransition, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { submitSimpleInquiry } from "@/app/start-a-project/actions";

const choices = [
  { value: "launch", label: "Launch Website — from $999" },
  { value: "business-pro", label: "Business Pro — from $1,999" },
  { value: "custom-systems", label: "Custom Software — from $3,500" },
  { value: "website-care", label: "Website Care — from $99/month" },
  { value: "not-sure", label: "Not sure yet" },
];
const fieldClass = "mt-2 w-full border border-steel bg-carbon p-3 text-warm-white";

export function SimpleInquiryForm() {
  const params = useSearchParams();
  const [service, setService] = useState("not-sure");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [details, setDetails] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState("");
  const [sent, setSent] = useState(false);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    const requested = params.get("service");
    if (choices.some((choice) => choice.value === requested)) setService(requested!);
  }, [params]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("");
    startTransition(async () => {
      const result = await submitSimpleInquiry({ name, email, company, service, details, honeypot });
      setStatus(result.message);
      if (result.ok) setSent(true);
    });
  }

  if (sent) return <div role="status" className="border border-steel p-8 text-warm-white">{status}</div>;

  return (
    <form onSubmit={submit} className="space-y-6 border border-steel bg-graphite p-6 sm:p-9">
      <h2 className="font-serif text-3xl text-warm-white">Tell us about your project</h2>
      <p className="text-silver">A few details are all we need to get started. No technical knowledge required.</p>
      <label className="block text-sm text-warm-white">Your name *
        <input className={fieldClass} required minLength={2} maxLength={120} autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label className="block text-sm text-warm-white">Email address *
        <input className={fieldClass} required type="email" maxLength={254} autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label className="block text-sm text-warm-white">Business name (optional)
        <input className={fieldClass} maxLength={160} autoComplete="organization" value={company} onChange={(e) => setCompany(e.target.value)} />
      </label>
      <label className="block text-sm text-warm-white">What are you interested in?
        <select className={fieldClass} value={service} onChange={(e) => setService(e.target.value)}>
          {choices.map((choice) => <option key={choice.value} value={choice.value}>{choice.label}</option>)}
        </select>
      </label>
      <label className="block text-sm text-warm-white">Tell us what you need *
        <textarea className={fieldClass} required minLength={10} maxLength={4000} rows={4} value={details} onChange={(e) => setDetails(e.target.value)} placeholder="I need a website for my business..." />
      </label>
      <div className="sr-only" aria-hidden="true">
        <label>Leave blank<input tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} /></label>
      </div>
      {status && <p role="alert" className="text-warm-white">{status}</p>}
      <button type="submit" disabled={pending} className="bg-warm-white px-7 py-3 font-medium text-carbon disabled:opacity-50">
        {pending ? "Sending..." : "Request a Quote"}
      </button>
      <p className="text-xs text-silver">No obligation. We'll follow up to discuss your needs and provide a tailored quote.</p>
    </form>
  );
}
