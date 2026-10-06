import {
  affectedUserOptions,
  budgetOptions,
  businessTypeOptions,
  frequencyOptions,
  inquiryLimits,
  organizationSizeOptions,
  preferredContactOptions,
  projectAreaOptions,
  solutionAwarenessOptions,
  timelineOptions,
  yesNoUnsureOptions,
} from "@/lib/inquiry/model";
import {
  inquiryWebhookEvent,
  inquiryWebhookVersion,
  type InquiryWebhookPayload,
} from "@/lib/inquiry/webhook";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[0-9+().\-\s]{7,40}$/;
const uuidPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const topLevelKeys = [
  "event",
  "version",
  "inquiryId",
  "submittedAt",
  "contact",
  "company",
  "problem",
  "systems",
  "project",
  "metadata",
] as const;

export type InquiryWebhookValidation =
  | { ok: true; payload: InquiryWebhookPayload }
  | { ok: false; fields: string[] };

export function validateInquiryWebhook(input: unknown): InquiryWebhookValidation {
  const fields: string[] = [];
  const root = record(input);
  if (!root) return { ok: false, fields: ["payload"] };

  for (const key of Object.keys(root)) {
    if (!topLevelKeys.includes(key as (typeof topLevelKeys)[number])) fields.push(key);
  }

  if (root.event !== inquiryWebhookEvent) fields.push("event");
  if (root.version !== inquiryWebhookVersion) fields.push("version");

  const inquiryId = uuid(root.inquiryId);
  if (!inquiryId) fields.push("inquiryId");

  const submittedAt = timestamp(root.submittedAt);
  if (!submittedAt) fields.push("submittedAt");

  const contact = section(root.contact, ["name", "email", "phone", "preferredContact"], "contact", fields);
  const company = section(
    root.company,
    ["name", "description", "type", "size"],
    "company",
    fields,
  );
  const problem = section(
    root.problem,
    ["description", "currentProcess", "affectedUsers", "frequency"],
    "problem",
    fields,
  );
  const systems = section(
    root.systems,
    ["currentTools", "manualDataMovement", "keepExisting", "systemsToKeep"],
    "systems",
    fields,
  );
  const project = section(
    root.project,
    ["desiredOutcome", "solutionAwareness", "areas", "timeline", "budget"],
    "project",
    fields,
  );
  const metadata = section(root.metadata, ["sourcePage", "referrer"], "metadata", fields);

  const contactName = requiredLine(contact?.name, 2, inquiryLimits.name, "contact.name", fields);
  const contactEmail = email(contact?.email, fields);
  const contactPhone = phone(contact?.phone, fields);
  const preferredContact = requiredEnum(
    contact?.preferredContact,
    preferredContactOptions,
    "contact.preferredContact",
    fields,
  );

  const companyName = requiredLine(company?.name, 2, inquiryLimits.company, "company.name", fields);
  const companyDescription = requiredBlock(
    company?.description,
    10,
    inquiryLimits.longText,
    "company.description",
    fields,
  );
  const companyType = requiredEnum(company?.type, businessTypeOptions, "company.type", fields);
  const companySize = optionalEnum(company?.size, organizationSizeOptions, "company.size", fields);

  const problemDescription = requiredBlock(
    problem?.description,
    10,
    inquiryLimits.longText,
    "problem.description",
    fields,
  );
  const currentProcess = optionalBlock(
    problem?.currentProcess,
    inquiryLimits.longText,
    "problem.currentProcess",
    fields,
  );
  const affectedUsers = enumList(
    problem?.affectedUsers,
    affectedUserOptions,
    "problem.affectedUsers",
    fields,
  );
  const frequency = optionalEnum(problem?.frequency, frequencyOptions, "problem.frequency", fields);

  const currentTools = optionalBlock(
    systems?.currentTools,
    inquiryLimits.longText,
    "systems.currentTools",
    fields,
  );
  const manualDataMovement = optionalEnum(
    systems?.manualDataMovement,
    yesNoUnsureOptions,
    "systems.manualDataMovement",
    fields,
  );
  const keepExisting = optionalEnum(
    systems?.keepExisting,
    yesNoUnsureOptions,
    "systems.keepExisting",
    fields,
  );
  const systemsToKeep = optionalBlock(
    systems?.systemsToKeep,
    inquiryLimits.longText,
    "systems.systemsToKeep",
    fields,
  );
  if (keepExisting === "Yes" && systemsToKeep.length < 2) fields.push("systems.systemsToKeep");

  const desiredOutcome = requiredBlock(
    project?.desiredOutcome,
    10,
    inquiryLimits.longText,
    "project.desiredOutcome",
    fields,
  );
  const solutionAwareness = requiredEnum(
    project?.solutionAwareness,
    solutionAwarenessOptions,
    "project.solutionAwareness",
    fields,
  );
  const areas = enumList(project?.areas, projectAreaOptions, "project.areas", fields);
  const timeline = optionalEnum(project?.timeline, timelineOptions, "project.timeline", fields);
  const budget = optionalEnum(project?.budget, budgetOptions, "project.budget", fields);

  const sourcePage = metadata?.sourcePage;
  if (sourcePage !== "/start-a-project") fields.push("metadata.sourcePage");
  const referrer = optionalLine(metadata?.referrer, 300, "metadata.referrer", fields);

  const unique = [...new Set(fields)];
  if (
    unique.length > 0 ||
    !inquiryId ||
    !submittedAt ||
    !contact ||
    !company ||
    !problem ||
    !systems ||
    !project ||
    !metadata
  ) {
    return { ok: false, fields: unique.length > 0 ? unique : ["payload"] };
  }

  return {
    ok: true,
    payload: {
      event: inquiryWebhookEvent,
      version: inquiryWebhookVersion,
      inquiryId,
      submittedAt,
      contact: {
        name: contactName,
        email: contactEmail,
        phone: contactPhone,
        preferredContact,
      },
      company: {
        name: companyName,
        description: companyDescription,
        type: companyType,
        size: companySize,
      },
      problem: {
        description: problemDescription,
        currentProcess,
        affectedUsers,
        frequency,
      },
      systems: {
        currentTools,
        manualDataMovement,
        keepExisting,
        systemsToKeep,
      },
      project: {
        desiredOutcome,
        solutionAwareness,
        areas,
        timeline,
        budget,
      },
      metadata: {
        sourcePage: "/start-a-project",
        referrer,
      },
    },
  };
}

function record(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  return value as Record<string, unknown>;
}

function section(
  value: unknown,
  keys: readonly string[],
  field: string,
  fields: string[],
): Record<string, unknown> | null {
  const object = record(value);
  if (!object) {
    fields.push(field);
    return null;
  }
  for (const key of Object.keys(object)) {
    if (!keys.includes(key)) fields.push(`${field}.${key}`);
  }
  return object;
}

function uuid(value: unknown) {
  if (typeof value !== "string" || !uuidPattern.test(value)) return "";
  return value.toLowerCase();
}

function timestamp(value: unknown) {
  if (typeof value !== "string" || value.length > 40) return "";
  const time = Date.parse(value);
  if (!Number.isFinite(time)) return "";
  if (time > Date.now() + 24 * 60 * 60 * 1000) return "";
  return new Date(time).toISOString();
}

function line(value: unknown) {
  return typeof value === "string" ? value.replace(/\s+/g, " ").trim() : null;
}

function block(value: unknown) {
  return typeof value === "string" ? value.replace(/\r\n/g, "\n").trim() : null;
}

function requiredLine(
  value: unknown,
  min: number,
  max: number,
  field: string,
  fields: string[],
) {
  const text = line(value);
  if (text === null || text.length < min || text.length > max) {
    fields.push(field);
    return "";
  }
  return text;
}

function optionalLine(value: unknown, max: number, field: string, fields: string[]) {
  if (value === undefined) return "";
  const text = line(value);
  if (text === null || text.length > max) {
    fields.push(field);
    return "";
  }
  return text;
}

function requiredBlock(
  value: unknown,
  min: number,
  max: number,
  field: string,
  fields: string[],
) {
  const text = block(value);
  if (text === null || text.length < min || text.length > max) {
    fields.push(field);
    return "";
  }
  return text;
}

function optionalBlock(value: unknown, max: number, field: string, fields: string[]) {
  if (value === undefined) return "";
  const text = block(value);
  if (text === null || text.length > max) {
    fields.push(field);
    return "";
  }
  return text;
}

function requiredEnum<T extends string>(
  value: unknown,
  options: readonly T[],
  field: string,
  fields: string[],
): T {
  const text = line(value);
  if (text === null || !options.includes(text as T)) {
    fields.push(field);
    return options[0];
  }
  return text as T;
}

function optionalEnum<T extends string>(
  value: unknown,
  options: readonly T[],
  field: string,
  fields: string[],
): T | "" {
  if (value === undefined) return "";
  const text = line(value);
  if (text === null || (text !== "" && !options.includes(text as T))) {
    fields.push(field);
    return "";
  }
  return text as T | "";
}

function email(value: unknown, fields: string[]) {
  const text = line(value);
  if (text === null || text.length > inquiryLimits.email || !emailPattern.test(text)) {
    fields.push("contact.email");
    return "";
  }
  return text;
}

function phone(value: unknown, fields: string[]) {
  if (value === undefined) return "";
  const text = line(value);
  if (text === null || (text !== "" && !phonePattern.test(text))) {
    fields.push("contact.phone");
    return "";
  }
  return text ?? "";
}

function enumList<T extends string>(
  value: unknown,
  options: readonly T[],
  field: string,
  fields: string[],
): T[] {
  if (value === undefined) return [];
  if (!Array.isArray(value) || value.length > options.length) {
    fields.push(field);
    return [];
  }
  const next: T[] = [];
  for (const item of value) {
    const text = line(item);
    if (text === null || !options.includes(text as T) || next.includes(text as T)) {
      fields.push(field);
      return [];
    }
    next.push(text as T);
  }
  return next;
}
