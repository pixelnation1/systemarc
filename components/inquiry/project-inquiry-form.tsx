"use client";

import { useEffect, useRef, useState, useTransition, type FormEvent } from "react";
import Link from "next/link";
import { submitProjectInquiry } from "@/app/start-a-project/actions";
import { FormStep, ProgressIndicator } from "@/components/inquiry/progress";
import { ReviewItem, ReviewSection } from "@/components/inquiry/review";
import { AboutStep, BusinessStep, ProblemStep, ProjectStep, SystemsStep } from "@/components/inquiry/steps";
import { SubmissionSuccess } from "@/components/inquiry/success";
import { trackInquiryEvent } from "@/lib/inquiry/analytics";
import {
  emptyInquiryDraft,
  type FieldErrors,
  type InquiryDraft,
} from "@/lib/inquiry/model";
import {
  errorsForStep,
  firstErrorField,
  firstErrorStep,
  validateInquiry,
} from "@/lib/inquiry/validate";

const primaryButton =
  "inline-flex h-12 flex-1 items-center justify-center bg-warm-white px-5 text-sm font-medium text-carbon transition-colors duration-150 hover:text-deep-cobalt disabled:cursor-wait disabled:opacity-60 sm:flex-none sm:min-w-40";
const secondaryButton =
  "inline-flex h-12 flex-1 items-center justify-center border border-steel px-5 text-sm font-medium text-warm-white transition-colors duration-150 hover:border-cobalt disabled:opacity-60 sm:flex-none sm:min-w-32";

const stepCopy = [
  {
    title: "About you",
    intro: "Tell us who to talk with. The technical approach comes later.",
  },
  {
    title: "The business",
    intro: "A short picture of the operation is more useful than a product name.",
  },
  {
    title: "What's not working?",
    intro: "This is the part that matters most. Describe the work, not the technology.",
  },
  {
    title: "What does the business use today?",
    intro: "Existing tools can stay. We need to know what the process already depends on.",
  },
  {
    title: "What would better look like?",
    intro: "You do not need a finished design. A change in the operation is enough.",
  },
  {
    title: "Review",
    intro: "Check this before starting the conversation. You can edit any section.",
  },
];

function focusField(id: string) {
  const root = document.querySelector(`[data-field="${id}"]`);
  const control = root?.querySelector<HTMLElement>("input, textarea, select");
  control?.focus();
}

function list(values: readonly string[]) {
  return values.length ? values.join(", ") : "";
}

export function ProjectInquiryForm() {
  const [draft, setDraft] = useState<InquiryDraft>(emptyInquiryDraft);
  const [step, setStep] = useState(0);
  const [reached, setReached] = useState(0);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [pending, startTransition] = useTransition();
  const [delivery, setDelivery] = useState<"webhook" | "log" | "discarded" | null>(null);
  const started = useRef(false);
  const mounted = useRef(false);
  const focusTarget = useRef("heading");
  const headingRef = useRef<HTMLHeadingElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    if (focusTarget.current === "heading") {
      headingRef.current?.focus();
    } else {
      focusField(focusTarget.current);
      focusTarget.current = "heading";
    }
    headingRef.current?.scrollIntoView({ block: "start" });
  }, [step]);

  useEffect(() => {
    if (delivery) successRef.current?.focus();
  }, [delivery]);

  function markStarted() {
    if (started.current) return;
    started.current = true;
    trackInquiryEvent({ name: "project_form_started" });
  }

  function update<K extends keyof InquiryDraft>(section: K, patch: Partial<InquiryDraft[K]>) {
    markStarted();
    setDraft((current) => ({
      ...current,
      [section]: { ...current[section], ...patch },
    }));
  }

  function showStepErrors(nextErrors: FieldErrors) {
    const field = firstErrorField(nextErrors);
    const target = firstErrorStep(nextErrors);
    setErrors(nextErrors);
    if (target !== step) {
      focusTarget.current = field;
      setStep(target);
      return;
    }
    focusField(field);
  }

  function continueStep() {
    markStarted();
    const stepErrors = errorsForStep(step, validateInquiry(draft));
    if (Object.keys(stepErrors).length > 0) {
      setFormError("Some answers on this step need another look.");
      showStepErrors(stepErrors);
      return;
    }
    setErrors({});
    setFormError("");
    trackInquiryEvent({ name: "project_form_step_completed", step: step + 1 });
    focusTarget.current = "heading";
    setReached((value) => Math.max(value, step + 1));
    setStep(step + 1);
  }

  function selectStep(index: number) {
    if (index === step || index > reached) return;
    if (index > step) {
      const stepErrors = errorsForStep(step, validateInquiry(draft));
      if (Object.keys(stepErrors).length > 0) {
        setFormError("Some answers on this step need another look.");
        showStepErrors(stepErrors);
        return;
      }
    }
    setErrors({});
    setFormError("");
    focusTarget.current = "heading";
    setStep(index);
  }

  function back() {
    setErrors({});
    setFormError("");
    focusTarget.current = "heading";
    setStep((current) => Math.max(0, current - 1));
  }

  function edit(target: number) {
    setErrors({});
    setFormError("");
    focusTarget.current = "heading";
    setStep(target);
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (step < 5) {
      continueStep();
      return;
    }

    const allErrors = validateInquiry(draft);
    if (Object.keys(allErrors).length > 0) {
      setFormError("Some answers need another look before this can be sent.");
      showStepErrors(allErrors);
      return;
    }

    setFormError("");
    startTransition(async () => {
      const result = await submitProjectInquiry({
        draft,
        honeypot,
        referrer: typeof document === "undefined" ? "" : document.referrer,
      });

      if (result.ok) {
        trackInquiryEvent({ name: "project_form_submitted" });
        setDelivery(result.delivery);
        return;
      }

      if (result.code === "validation") {
        setFormError(result.message);
        showStepErrors(result.fieldErrors);
        return;
      }

      setFormError(result.message);
    });
  }

  if (delivery) {
    return <SubmissionSuccess headingRef={successRef} delivery={delivery} />;
  }

  const copy = stepCopy[step];

  return (
    <form onSubmit={onSubmit} noValidate className="border border-steel bg-graphite">
      <div className="border-l border-cobalt px-5 py-8 sm:px-8 sm:py-10 lg:px-10">
        <ProgressIndicator current={step} reached={reached} onSelect={selectStep} />
        <FormStep
          id={`inquiry-step-${step}`}
          title={copy?.title ?? "Inquiry"}
          intro={copy?.intro}
          headingRef={headingRef}
        >
          {step === 0 ? <AboutStep draft={draft} errors={errors} update={update} /> : null}
          {step === 1 ? <BusinessStep draft={draft} errors={errors} update={update} /> : null}
          {step === 2 ? <ProblemStep draft={draft} errors={errors} update={update} /> : null}
          {step === 3 ? <SystemsStep draft={draft} errors={errors} update={update} /> : null}
          {step === 4 ? <ProjectStep draft={draft} errors={errors} update={update} /> : null}
          {step === 5 ? (
            <div className="grid gap-2">
              <ReviewSection title="About you" onEdit={() => edit(0)}>
                <ReviewItem label="Name" value={draft.contact.name} />
                <ReviewItem label="Work email" value={draft.contact.email} />
                <ReviewItem label="Phone" value={draft.contact.phone} />
                <ReviewItem label="Preferred contact" value={draft.contact.preferredContact} />
                <ReviewItem label="Company / organization" value={draft.company.name} />
              </ReviewSection>
              <ReviewSection title="The business" onEdit={() => edit(1)}>
                <ReviewItem label="What the business does" value={draft.company.description} />
                <ReviewItem label="Business type" value={draft.company.type} />
                <ReviewItem label="Organization size" value={draft.company.size} />
              </ReviewSection>
              <ReviewSection title="The problem" onEdit={() => edit(2)}>
                <ReviewItem label="Problem" value={draft.problem.description} />
                <ReviewItem label="What happens today" value={draft.problem.currentProcess} />
                <ReviewItem label="Who is affected" value={list(draft.problem.affectedUsers)} />
                <ReviewItem label="How often" value={draft.problem.frequency} />
              </ReviewSection>
              <ReviewSection title="Current systems" onEdit={() => edit(3)}>
                <ReviewItem label="Tools" value={draft.systems.currentTools} />
                <ReviewItem label="Manual movement" value={draft.systems.manualDataMovement} />
                <ReviewItem label="Systems to keep" value={draft.systems.keepExisting} />
                {draft.systems.keepExisting === "Yes" ? (
                  <ReviewItem label="Which systems" value={draft.systems.systemsToKeep} />
                ) : null}
              </ReviewSection>
              <ReviewSection title="The project" onEdit={() => edit(4)}>
                <ReviewItem label="What would change" value={draft.project.desiredOutcome} />
                <ReviewItem label="Idea of what to build" value={draft.project.solutionAwareness} />
                <ReviewItem label="Areas" value={list(draft.project.areas)} />
                <ReviewItem label="Timeline" value={draft.project.timeline} />
                <ReviewItem label="Budget" value={draft.project.budget} />
              </ReviewSection>
              <div className="max-w-2xl space-y-3 pt-2 text-sm leading-6 text-silver">
                <p>
                  By submitting this form, you&apos;re starting a conversation with
                  SystemArc. This is not a project agreement or binding estimate.
                </p>
                <p>
                  The{" "}
                  <Link
                    href="/privacy"
                    className="text-warm-white underline decoration-steel underline-offset-4 hover:text-electric-cobalt hover:decoration-cobalt"
                  >
                    privacy page
                  </Link>{" "}
                  is where SystemArc will explain how personal information is handled.
                  That policy is not published yet.
                </p>
              </div>
            </div>
          ) : null}
        </FormStep>

        {formError ? (
          <p role="alert" className="mt-6 max-w-2xl text-sm leading-6 text-warm-white">
            {formError}
          </p>
        ) : null}

        <div className="mt-8 flex max-w-2xl flex-col gap-3 sm:flex-row">
          {step > 0 ? (
            <button type="button" className={secondaryButton} onClick={back} disabled={pending}>
              Back
            </button>
          ) : null}
          {step < 5 ? (
            <button type="submit" className={primaryButton}>
              Continue
            </button>
          ) : (
            <button type="submit" className={primaryButton} disabled={pending}>
              {pending ? "Sending…" : "Start the Conversation"}
            </button>
          )}
        </div>

        <div className="sr-only" aria-hidden="true">
          <label htmlFor="leave_blank">Leave this field blank</label>
          <input
            id="leave_blank"
            name="leave_blank"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(event) => setHoneypot(event.target.value)}
          />
        </div>
      </div>
    </form>
  );
}
