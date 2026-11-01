"use client";

import Link from "next/link";
import { useRef, useState, useTransition, type FormEvent } from "react";
import { submitProjectInquiry } from "@/app/start-a-project/actions";
import { Field, Textarea } from "@/components/inquiry/fields";
import { MultiSelect } from "@/components/inquiry/choices";
import { emptyMediaBrief, mediaAreaOptions, mediaBriefToDraft, type MediaBrief } from "@/lib/inquiry/media-brief";
import { firstErrorField, validateInquiry } from "@/lib/inquiry/validate";
import type { FieldErrors, ProjectArea } from "@/lib/inquiry/model";

export function MediaBriefForm({ service }: { service?: string }) {
  const [brief, setBrief] = useState(() => emptyMediaBrief(service));
  const [errors, setErrors] = useState<FieldErrors>({});
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [pending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  function update<K extends keyof MediaBrief>(key: K, value: MediaBrief[K]) {
    setBrief(current => ({ ...current, [key]: value }));
  }
  function showErrors(nextErrors: FieldErrors) {
    setErrors(nextErrors);
    setMessage("Please check the highlighted answers. Your brief has not been sent.");
    const control = formRef.current?.querySelector<HTMLElement>(`[id="${firstErrorField(nextErrors)}"]`);
    control?.focus();
  }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const draft = mediaBriefToDraft(brief);
    const nextErrors = validateInquiry(draft);
    if (Object.keys(nextErrors).length) { showErrors(nextErrors); return; }
    setErrors({});
    setMessage("");
    startTransition(async () => {
      try {
        const result = await submitProjectInquiry({ draft, honeypot, referrer: document.referrer });
        if (!result.ok) {
          if (result.code === "validation") showErrors(result.fieldErrors);
          else setMessage(result.message);
          return;
        }
        if (result.delivery === "log") {
          setMessage("This is a development preview. Your brief has not been delivered to SystemArc.");
          return;
        }
        setSuccess(true);
        requestAnimationFrame(() => statusRef.current?.focus());
      } catch {
        setMessage("We could not confirm receipt of your brief. Your answers are still here; please try again.");
      }
    });
  }
  if (success) return <div ref={statusRef} tabIndex={-1} role="status" className="border border-cobalt bg-graphite p-8"><h2 className="text-3xl font-semibold">Your brief is in.</h2><p className="mt-4 leading-8 text-silver">Thank you. SystemArc will review your goals and follow up by email about fit, scope, and next steps.</p><Link href="/media/approach" className="mt-6 inline-flex min-h-11 items-center underline underline-offset-8">Explore how engagements work ↗</Link></div>;
  return <form ref={formRef} onSubmit={submit} noValidate aria-label="Media project brief" className="space-y-7">
    <fieldset disabled={pending} className="space-y-7 disabled:opacity-70">
      <legend className="mb-7 text-2xl font-semibold">Tell us what you have in mind.</legend>
      <div className="grid gap-7 sm:grid-cols-2">
        <Field id="name" label="Your name" autoComplete="name" required maxLength={120} value={brief.name} error={errors.name} onChange={e => update("name", e.target.value)} />
        <Field id="email" label="Work email" type="email" autoComplete="email" required maxLength={254} value={brief.email} error={errors.email} onChange={e => update("email", e.target.value)} />
      </div>
      <Field id="companyName" label="Company / organization" autoComplete="organization" required maxLength={160} value={brief.company} error={errors.companyName} onChange={e => update("company", e.target.value)} />
      <Textarea id="businessDescription" label="What do you do, and who do you serve?" required maxLength={4000} value={brief.business} error={errors.businessDescription} onChange={e => update("business", e.target.value)} />
      <MultiSelect id="areas" legend="Where could we help?" hint="Choose what fits, or leave this open and we will shape the plan with you." options={mediaAreaOptions.map(item => item.area)} selected={brief.areas} error={errors.areas} onChange={areas => update("areas", areas as ProjectArea[])} />
      <Textarea id="problemDescription" label="What is the challenge or opportunity?" required maxLength={4000} hint="A launch, inconsistent content, an audience you want to reach, or a campaign you want to improve." value={brief.challenge} error={errors.problemDescription} onChange={e => update("challenge", e.target.value)} />
      <Textarea id="desiredOutcome" label="What would success look like?" required maxLength={4000} hint="For example: more qualified inquiries, a stronger brand presence, or a reliable content process." value={brief.outcome} error={errors.desiredOutcome} onChange={e => update("outcome", e.target.value)} />
      <Textarea id="currentTools" label="Website and current social channels" maxLength={4000} hint="Optional. Share public links and the channels you use today." value={brief.channels} error={errors.currentTools} onChange={e => update("channels", e.target.value)} />
      <Textarea id="currentProcess" label="Budget, timing, and engagement preferences" maxLength={3800} hint="Optional. Is this a project or ongoing work? If you have a budget, specify monthly or total, and whether ad spend is separate." value={brief.planning} error={errors.currentProcess} onChange={e => update("planning", e.target.value)} />
      <div aria-hidden="true" className="hidden"><label htmlFor="media-company-url">Leave this empty</label><input id="media-company-url" tabIndex={-1} autoComplete="off" value={honeypot} onChange={e => setHoneypot(e.target.value)} /></div>
      <p className="text-sm leading-7 text-silver">We will follow up by email and help define the approach. This is an inquiry, with no commitment to services or advertising spend. See our <Link href="/privacy" className="underline underline-offset-4">privacy policy</Link>.</p>
      <button type="submit" className="min-h-12 w-full bg-warm-white px-6 py-3 font-medium text-carbon hover:text-deep-cobalt disabled:cursor-wait" disabled={pending}>{pending ? "Sending your brief…" : "Send Your Media Brief ↗"}</button>
    </fieldset>
    {message ? <p role="alert" className="border-l border-cobalt pl-4 leading-7">{message}</p> : null}
  </form>;
}
