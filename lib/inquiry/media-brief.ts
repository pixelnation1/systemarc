import { emptyInquiryDraft, type ProjectArea } from "./model";

export const mediaAreaOptions = [
  { id: "strategy", area: "Brand / Content Strategy" },
  { id: "creative", area: "Content / Video Production" },
  { id: "social", area: "Social Media Management" },
  { id: "paid-media", area: "Paid Media / Advertising" },
  { id: "website", area: "Website / Ecommerce" },
] as const satisfies readonly { id: string; area: ProjectArea }[];

export type MediaBrief = {
  name: string;
  email: string;
  company: string;
  business: string;
  challenge: string;
  outcome: string;
  channels: string;
  planning: string;
  areas: ProjectArea[];
};
export function emptyMediaBrief(service?: string): MediaBrief {
  const match = mediaAreaOptions.find(item => item.id === service);
  return { name: "", email: "", company: "", business: "", challenge: "", outcome: "", channels: "", planning: "", areas: match ? [match.area] : [] };
}
export function mediaBriefToDraft(brief: MediaBrief) {
  const draft = emptyInquiryDraft();
  draft.contact = { name: brief.name, email: brief.email, phone: "", preferredContact: "Email" };
  draft.company = { name: brief.company, description: brief.business, type: "Other", size: "" };
  draft.problem.description = brief.challenge;
  draft.problem.currentProcess = brief.planning ? `Media brief — budget, timing, and engagement preferences:
${brief.planning}` : "";
  draft.systems.currentTools = brief.channels;
  draft.project.desiredOutcome = brief.outcome;
  draft.project.solutionAwareness = "No — I just know the problem";
  draft.project.areas = brief.areas;
  return draft;
}
