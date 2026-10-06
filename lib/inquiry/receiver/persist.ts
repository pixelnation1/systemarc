import type { InquiryWebhookPayload } from "@/lib/inquiry/webhook";
import { initialInquiryStatus, type InquiryStatus } from "@/lib/inquiry/receiver/status";

export type ProjectInquiryRow = {
  external_inquiry_id: string;
  submitted_at: string;
  status: InquiryStatus;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  preferred_contact: string;
  company_name: string;
  company_description: string;
  company_type: string;
  company_size: string;
  problem_description: string;
  current_process: string;
  affected_users: string[];
  problem_frequency: string;
  current_tools: string;
  manual_data_movement: string;
  keep_existing: string;
  systems_to_keep: string;
  desired_outcome: string;
  solution_awareness: string;
  project_areas: string[];
  timeline: string;
  budget: string;
  source_page: string;
  referrer: string;
  raw_payload: InquiryWebhookPayload;
};

export type InquiryInsertResult = "created" | "duplicate";

export type InquiryStore = {
  insert(row: ProjectInquiryRow): Promise<InquiryInsertResult>;
};

export class InquiryPersistenceError extends Error {
  readonly category: "not_configured" | "persist_failed";
  readonly code?: string;
  readonly missing?: string;

  constructor(
    category: InquiryPersistenceError["category"],
    options: { code?: string; missing?: string } = {},
  ) {
    super("Inquiry persistence failed");
    this.name = "InquiryPersistenceError";
    this.category = category;
    this.code = options.code;
    this.missing = options.missing;
  }
}

export function projectInquiryRow(payload: InquiryWebhookPayload): ProjectInquiryRow {
  return {
    external_inquiry_id: payload.inquiryId,
    submitted_at: payload.submittedAt,
    status: initialInquiryStatus,
    contact_name: payload.contact.name,
    contact_email: payload.contact.email,
    contact_phone: payload.contact.phone,
    preferred_contact: payload.contact.preferredContact,
    company_name: payload.company.name,
    company_description: payload.company.description,
    company_type: payload.company.type,
    company_size: payload.company.size,
    problem_description: payload.problem.description,
    current_process: payload.problem.currentProcess,
    affected_users: payload.problem.affectedUsers,
    problem_frequency: payload.problem.frequency,
    current_tools: payload.systems.currentTools,
    manual_data_movement: payload.systems.manualDataMovement,
    keep_existing: payload.systems.keepExisting,
    systems_to_keep: payload.systems.systemsToKeep,
    desired_outcome: payload.project.desiredOutcome,
    solution_awareness: payload.project.solutionAwareness,
    project_areas: payload.project.areas,
    timeline: payload.project.timeline,
    budget: payload.project.budget,
    source_page: payload.metadata.sourcePage,
    referrer: payload.metadata.referrer,
    raw_payload: payload,
  };
}
