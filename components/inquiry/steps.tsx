import { ChoiceGroup, MultiSelect, RadioOption } from "@/components/inquiry/choices";
import { Field, Textarea } from "@/components/inquiry/fields";
import {
  affectedUserOptions,
  budgetOptions,
  businessTypeOptions,
  frequencyOptions,
  organizationSizeOptions,
  preferredContactOptions,
  projectAreaOptions,
  solutionAwarenessOptions,
  timelineOptions,
  yesNoUnsureOptions,
  type FieldErrors,
  type InquiryDraft,
} from "@/lib/inquiry/model";

type Editor = {
  draft: InquiryDraft;
  errors: FieldErrors;
  update: <K extends keyof InquiryDraft>(section: K, patch: Partial<InquiryDraft[K]>) => void;
};

export function AboutStep({ draft, errors, update }: Editor) {
  const contact = draft.contact;
  return (
    <>
      <Field
        id="name"
        name="name"
        label="Name"
        required
        autoComplete="name"
        value={contact.name}
        error={errors.name}
        onChange={(event) => update("contact", { name: event.target.value })}
      />
      <Field
        id="email"
        name="email"
        type="email"
        label="Work email"
        required
        autoComplete="email"
        inputMode="email"
        value={contact.email}
        error={errors.email}
        onChange={(event) => update("contact", { email: event.target.value })}
      />
      <Field
        id="phone"
        name="phone"
        type="tel"
        label="Phone"
        autoComplete="tel"
        inputMode="tel"
        value={contact.phone}
        error={errors.phone}
        hint="Optional, unless you prefer a phone call."
        onChange={(event) => update("contact", { phone: event.target.value })}
      />
      <ChoiceGroup
        id="preferredContact"
        legend="Preferred contact method"
        required
        error={errors.preferredContact}
      >
        {preferredContactOptions.map((option) => (
          <RadioOption
            key={option}
            name="preferredContact"
            value={option}
            label={option}
            checked={contact.preferredContact === option}
            onChange={(value) =>
              update("contact", {
                preferredContact: value as InquiryDraft["contact"]["preferredContact"],
              })
            }
          />
        ))}
      </ChoiceGroup>
      <Field
        id="companyName"
        name="organization"
        label="Company / organization"
        required
        autoComplete="organization"
        value={draft.company.name}
        error={errors.companyName}
        onChange={(event) => update("company", { name: event.target.value })}
      />
    </>
  );
}

export function BusinessStep({ draft, errors, update }: Editor) {
  return (
    <>
      <Textarea
        id="businessDescription"
        name="businessDescription"
        label="What does your business do?"
        required
        value={draft.company.description}
        error={errors.businessDescription}
        onChange={(event) => update("company", { description: event.target.value })}
      />
      <ChoiceGroup
        id="businessType"
        legend="Which best describes the business?"
        required
        hint="This helps us understand the operation. It does not limit the conversation."
        error={errors.businessType}
      >
        {businessTypeOptions.map((option) => (
          <RadioOption
            key={option}
            name="businessType"
            value={option}
            label={option}
            checked={draft.company.type === option}
            onChange={(value) =>
              update("company", { type: value as InquiryDraft["company"]["type"] })
            }
          />
        ))}
      </ChoiceGroup>
      <ChoiceGroup
        id="organizationSize"
        legend="Approximate organization size"
        hint="Optional."
        error={errors.organizationSize}
      >
        {organizationSizeOptions.map((option) => (
          <RadioOption
            key={option}
            name="organizationSize"
            value={option}
            label={option}
            checked={draft.company.size === option}
            onChange={(value) =>
              update("company", { size: value as InquiryDraft["company"]["size"] })
            }
          />
        ))}
      </ChoiceGroup>
    </>
  );
}

export function ProblemStep({ draft, errors, update }: Editor) {
  return (
    <>
      <Textarea
        id="problemDescription"
        name="problemDescription"
        label="What problem are you trying to solve?"
        required
        hint="Describe the workflow, bottleneck, repetitive task, missing capability, customer problem, or operational issue."
        value={draft.problem.description}
        error={errors.problemDescription}
        onChange={(event) => update("problem", { description: event.target.value })}
      />
      <Textarea
        id="currentProcess"
        name="currentProcess"
        label="What happens today?"
        hint="Walk us through the current process if you can."
        value={draft.problem.currentProcess}
        error={errors.currentProcess}
        onChange={(event) => update("problem", { currentProcess: event.target.value })}
      />
      <MultiSelect
        id="affectedUsers"
        legend="Who is affected by this problem?"
        hint="Choose every group that fits."
        options={affectedUserOptions}
        selected={draft.problem.affectedUsers}
        error={errors.affectedUsers}
        onChange={(affectedUsers) =>
          update("problem", {
            affectedUsers: affectedUsers as InquiryDraft["problem"]["affectedUsers"],
          })
        }
      />
      <ChoiceGroup id="frequency" legend="How often does this problem occur?" error={errors.frequency}>
        {frequencyOptions.map((option) => (
          <RadioOption
            key={option}
            name="frequency"
            value={option}
            label={option}
            checked={draft.problem.frequency === option}
            onChange={(value) =>
              update("problem", { frequency: value as InquiryDraft["problem"]["frequency"] })
            }
          />
        ))}
      </ChoiceGroup>
    </>
  );
}

export function SystemsStep({ draft, errors, update }: Editor) {
  return (
    <>
      <Textarea
        id="currentTools"
        name="currentTools"
        label="What software or tools are involved in this process?"
        hint="Examples include a CRM, POS, e-commerce, spreadsheets, accounting software, scheduling software, email, or internal tools."
        value={draft.systems.currentTools}
        error={errors.currentTools}
        onChange={(event) => update("systems", { currentTools: event.target.value })}
      />
      <ChoiceGroup
        id="manualDataMovement"
        legend="Does information currently have to be manually moved between systems?"
        error={errors.manualDataMovement}
      >
        {yesNoUnsureOptions.map((option) => (
          <RadioOption
            key={option}
            name="manualDataMovement"
            value={option}
            label={option}
            checked={draft.systems.manualDataMovement === option}
            onChange={(value) =>
              update("systems", {
                manualDataMovement: value as InquiryDraft["systems"]["manualDataMovement"],
              })
            }
          />
        ))}
      </ChoiceGroup>
      <ChoiceGroup
        id="keepExisting"
        legend="Are there existing systems you want to keep?"
        hint="We do not replace working software unnecessarily. Sometimes the best solution is connecting or extending what already works."
        error={errors.keepExisting}
      >
        {yesNoUnsureOptions.map((option) => (
          <RadioOption
            key={option}
            name="keepExisting"
            value={option}
            label={option}
            checked={draft.systems.keepExisting === option}
            onChange={(value) =>
              update("systems", {
                keepExisting: value as InquiryDraft["systems"]["keepExisting"],
              })
            }
          />
        ))}
      </ChoiceGroup>
      {draft.systems.keepExisting === "Yes" ? (
        <Textarea
          id="systemsToKeep"
          name="systemsToKeep"
          label="Which systems?"
          required
          value={draft.systems.systemsToKeep}
          error={errors.systemsToKeep}
          onChange={(event) => update("systems", { systemsToKeep: event.target.value })}
        />
      ) : null}
    </>
  );
}

export function ProjectStep({ draft, errors, update }: Editor) {
  return (
    <>
      <Textarea
        id="desiredOutcome"
        name="desiredOutcome"
        label="If this problem were solved, what would change?"
        required
        value={draft.project.desiredOutcome}
        error={errors.desiredOutcome}
        onChange={(event) => update("project", { desiredOutcome: event.target.value })}
      />
      <ChoiceGroup
        id="solutionAwareness"
        legend="Do you already have an idea of what needs to be built?"
        required
        hint="Knowing the problem is enough. SystemArc determines the technical approach during discovery."
        error={errors.solutionAwareness}
      >
        {solutionAwarenessOptions.map((option) => (
          <RadioOption
            key={option}
            name="solutionAwareness"
            value={option}
            label={option}
            checked={draft.project.solutionAwareness === option}
            onChange={(value) =>
              update("project", {
                solutionAwareness: value as InquiryDraft["project"]["solutionAwareness"],
              })
            }
          />
        ))}
      </ChoiceGroup>
      <MultiSelect
        id="areas"
        legend="Which areas might be involved?"
        hint="Choose any that seem relevant. Not sure is a complete answer."
        options={projectAreaOptions}
        selected={draft.project.areas}
        error={errors.areas}
        onChange={(areas) =>
          update("project", { areas: areas as InquiryDraft["project"]["areas"] })
        }
      />
      <ChoiceGroup id="timeline" legend="Is there a target timeline?" error={errors.timeline}>
        {timelineOptions.map((option) => (
          <RadioOption
            key={option}
            name="timeline"
            value={option}
            label={option}
            checked={draft.project.timeline === option}
            onChange={(value) =>
              update("project", { timeline: value as InquiryDraft["project"]["timeline"] })
            }
          />
        ))}
      </ChoiceGroup>
      <ChoiceGroup
        id="budget"
        legend="Has a budget range been established?"
        hint="This is for planning the conversation. It does not decide whether we will talk."
        error={errors.budget}
      >
        {budgetOptions.map((option) => (
          <RadioOption
            key={option}
            name="budget"
            value={option}
            label={option}
            checked={draft.project.budget === option}
            onChange={(value) =>
              update("project", { budget: value as InquiryDraft["project"]["budget"] })
            }
          />
        ))}
      </ChoiceGroup>
    </>
  );
}
