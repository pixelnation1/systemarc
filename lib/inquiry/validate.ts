import {
  affectedUserOptions,
  budgetOptions,
  businessTypeOptions,
  fieldStep,
  frequencyOptions,
  inquiryLimits,
  organizationSizeOptions,
  preferredContactOptions,
  projectAreaOptions,
  solutionAwarenessOptions,
  timelineOptions,
  yesNoUnsureOptions,
  type FieldErrors,
  type InquiryDraft,
  type ProjectInquiry,
} from "@/lib/inquiry/model";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[0-9+().\-\s]{7,40}$/;

function oneOf<T extends string>(value: string, options: readonly T[]): value is T {
  return (options as readonly string[]).includes(value);
}

function cleanList<T extends string>(value: unknown, options: readonly T[]): T[] {
  if (!Array.isArray(value)) return [];
  const allowed = new Set<string>(options);
  const next: T[] = [];
  for (const item of value) {
    if (typeof item !== "string" || !allowed.has(item) || next.includes(item as T)) continue;
    next.push(item as T);
  }
  return next;
}

function text(value: unknown) {
  return typeof value === "string" ? value.replace(/\s+/g, " ").trim() : "";
}

function longText(value: unknown) {
  return typeof value === "string" ? value.replace(/\r\n/g, "\n").trim() : "";
}

function record(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  return value as Record<string, unknown>;
}

export function draftFromUnknown(value: unknown): InquiryDraft | null {
  const source = record(value);
  if (!source) return null;
  const contact = record(source.contact);
  const company = record(source.company);
  const problem = record(source.problem);
  const systems = record(source.systems);
  const project = record(source.project);
  if (!contact || !company || !problem || !systems || !project) return null;

  const preferred = text(contact.preferredContact);
  const type = text(company.type);
  const size = text(company.size);
  const frequency = text(problem.frequency);
  const manual = text(systems.manualDataMovement);
  const keep = text(systems.keepExisting);
  const awareness = text(project.solutionAwareness);
  const timeline = text(project.timeline);
  const budget = text(project.budget);

  return {
    contact: {
      name: text(contact.name),
      email: text(contact.email),
      phone: text(contact.phone),
      preferredContact: oneOf(preferred, preferredContactOptions) ? preferred : "",
    },
    company: {
      name: text(company.name),
      description: longText(company.description),
      type: oneOf(type, businessTypeOptions) ? type : "",
      size: oneOf(size, organizationSizeOptions) ? size : "",
    },
    problem: {
      description: longText(problem.description),
      currentProcess: longText(problem.currentProcess),
      affectedUsers: cleanList(problem.affectedUsers, affectedUserOptions),
      frequency: oneOf(frequency, frequencyOptions) ? frequency : "",
    },
    systems: {
      currentTools: longText(systems.currentTools),
      manualDataMovement: oneOf(manual, yesNoUnsureOptions) ? manual : "",
      keepExisting: oneOf(keep, yesNoUnsureOptions) ? keep : "",
      systemsToKeep: longText(systems.systemsToKeep),
    },
    project: {
      desiredOutcome: longText(project.desiredOutcome),
      solutionAwareness: oneOf(awareness, solutionAwarenessOptions) ? awareness : "",
      areas: cleanList(project.areas, projectAreaOptions),
      timeline: oneOf(timeline, timelineOptions) ? timeline : "",
      budget: oneOf(budget, budgetOptions) ? budget : "",
    },
  };
}

function tooLong(value: string, max: number, label: string) {
  if (value.length > max) return `Use ${max} characters or fewer for ${label}.`;
  return "";
}

export function validateInquiry(draft: InquiryDraft): FieldErrors {
  const errors: FieldErrors = {};
  const { contact, company, problem, systems, project } = draft;

  if (contact.name.length < 2) errors.name = "Enter your name.";
  else {
    const length = tooLong(contact.name, inquiryLimits.name, "your name");
    if (length) errors.name = length;
  }

  if (!emailPattern.test(contact.email) || contact.email.length > inquiryLimits.email) {
    errors.email = "Enter a work email address.";
  }

  if (contact.phone && !phonePattern.test(contact.phone)) {
    errors.phone = "Enter a phone number we can use, or leave it blank.";
  } else if (contact.preferredContact === "Phone" && !contact.phone) {
    errors.phone = "Add a phone number, since phone is the contact method you chose.";
  }

  if (!contact.preferredContact) {
    errors.preferredContact = "Choose how SystemArc should reach you.";
  }

  if (company.name.length < 2) errors.companyName = "Enter the company or organization.";
  else {
    const length = tooLong(company.name, inquiryLimits.company, "the organization");
    if (length) errors.companyName = length;
  }

  if (company.description.length < 10) {
    errors.businessDescription = "Tell us what the business does, in a sentence or two.";
  } else {
    const length = tooLong(company.description, inquiryLimits.longText, "the business description");
    if (length) errors.businessDescription = length;
  }

  if (!company.type) errors.businessType = "Choose the description that fits best.";

  if (problem.description.length < 10) {
    errors.problemDescription = "Describe the problem you want to solve.";
  } else {
    const length = tooLong(problem.description, inquiryLimits.longText, "the problem");
    if (length) errors.problemDescription = length;
  }

  const processLength = tooLong(problem.currentProcess, inquiryLimits.longText, "the current process");
  if (processLength) errors.currentProcess = processLength;

  const toolsLength = tooLong(systems.currentTools, inquiryLimits.longText, "the tools");
  if (toolsLength) errors.currentTools = toolsLength;

  if (systems.keepExisting === "Yes" && systems.systemsToKeep.length < 2) {
    errors.systemsToKeep = "Name the systems you want to keep.";
  } else {
    const keepLength = tooLong(systems.systemsToKeep, inquiryLimits.longText, "the systems to keep");
    if (keepLength) errors.systemsToKeep = keepLength;
  }

  if (project.desiredOutcome.length < 10) {
    errors.desiredOutcome = "Describe what would be different if this problem were solved.";
  } else {
    const length = tooLong(project.desiredOutcome, inquiryLimits.longText, "the outcome");
    if (length) errors.desiredOutcome = length;
  }

  if (!project.solutionAwareness) {
    errors.solutionAwareness = "Choose the option that fits. Knowing the problem is enough.";
  }

  return errors;
}

export function errorsForStep(step: number, errors: FieldErrors): FieldErrors {
  return Object.fromEntries(
    Object.entries(errors).filter(([field]) => fieldStep[field] === step),
  );
}

export function firstErrorStep(errors: FieldErrors) {
  const steps = Object.keys(errors).map((field) => fieldStep[field] ?? 0);
  return steps.length ? Math.min(...steps) : 0;
}

export function firstErrorField(errors: FieldErrors) {
  const ordered = Object.keys(fieldStep);
  return ordered.find((field) => errors[field]) ?? "";
}

export function toProjectInquiry(
  draft: InquiryDraft,
  metadata: Omit<ProjectInquiry["metadata"], "submittedAt"> & { submittedAt: string },
): ProjectInquiry | null {
  if (Object.keys(validateInquiry(draft)).length > 0) return null;
  if (!draft.contact.preferredContact || !draft.company.type || !draft.project.solutionAwareness) {
    return null;
  }

  return {
    contact: {
      name: draft.contact.name,
      email: draft.contact.email,
      phone: draft.contact.phone,
      preferredContact: draft.contact.preferredContact,
    },
    company: {
      name: draft.company.name,
      description: draft.company.description,
      type: draft.company.type,
      size: draft.company.size,
    },
    problem: {
      description: draft.problem.description,
      currentProcess: draft.problem.currentProcess,
      affectedUsers: draft.problem.affectedUsers,
      frequency: draft.problem.frequency,
    },
    systems: {
      currentTools: draft.systems.currentTools,
      manualDataMovement: draft.systems.manualDataMovement,
      keepExisting: draft.systems.keepExisting,
      systemsToKeep: draft.systems.keepExisting === "Yes" ? draft.systems.systemsToKeep : "",
    },
    project: {
      desiredOutcome: draft.project.desiredOutcome,
      solutionAwareness: draft.project.solutionAwareness,
      areas: draft.project.areas,
      timeline: draft.project.timeline,
      budget: draft.project.budget,
    },
    metadata,
  };
}

export function referrerForInquiry(value: unknown) {
  if (typeof value !== "string") return "";
  const trimmed = value.trim();
  if (!trimmed || trimmed.length > 500) return "";
  try {
    const url = new URL(trimmed);
    if (url.protocol !== "https:" && url.protocol !== "http:") return "";
    return `${url.origin}${url.pathname}`.slice(0, 300);
  } catch {
    return "";
  }
}
