export const preferredContactOptions = ["Email", "Phone", "Either"] as const;
export const businessTypeOptions = [
  "Repair / Service Business",
  "Gaming / Hobby Retail",
  "Retail",
  "Local Service Business",
  "Professional Services",
  "Software / Technology",
  "Other",
] as const;
export const organizationSizeOptions = [
  "Just me",
  "2–10",
  "11–25",
  "26–50",
  "51–100",
  "101–250",
  "250+",
] as const;
export const affectedUserOptions = [
  "Customers",
  "Employees",
  "Management",
  "Vendors / Partners",
  "Other",
] as const;
export const frequencyOptions = [
  "Constantly",
  "Daily",
  "Weekly",
  "Occasionally",
  "Not sure",
] as const;
export const yesNoUnsureOptions = ["Yes", "No", "Not sure"] as const;
export const solutionAwarenessOptions = [
  "Yes",
  "Somewhat",
  "No — I just know the problem",
] as const;
export const projectAreaOptions = [
  "Custom Software",
  "Automation",
  "Web Application",
  "Customer Portal",
  "Internal Tools",
  "Software Integrations",
  "AI",
  "Dashboard / Reporting",
  "Scheduling",
  "Inventory",
  "Customer Communication",
  "Not Sure",
  "Other",
] as const;
export const timelineOptions = [
  "As soon as practical",
  "1–3 months",
  "3–6 months",
  "6–12 months",
  "Exploring / No deadline",
] as const;
export const budgetOptions = [
  "Not yet",
  "Under $10,000",
  "$10,000–$25,000",
  "$25,000–$50,000",
  "$50,000–$100,000",
  "$100,000+",
  "Prefer to discuss",
] as const;

export type PreferredContact = (typeof preferredContactOptions)[number];
export type BusinessType = (typeof businessTypeOptions)[number];
export type OrganizationSize = (typeof organizationSizeOptions)[number];
export type AffectedUser = (typeof affectedUserOptions)[number];
export type Frequency = (typeof frequencyOptions)[number];
export type YesNoUnsure = (typeof yesNoUnsureOptions)[number];
export type SolutionAwareness = (typeof solutionAwarenessOptions)[number];
export type ProjectArea = (typeof projectAreaOptions)[number];
export type Timeline = (typeof timelineOptions)[number];
export type Budget = (typeof budgetOptions)[number];

export const inquiryLimits = {
  name: 120,
  email: 254,
  phone: 40,
  company: 160,
  shortText: 200,
  longText: 4000,
} as const;

export type InquiryDraft = {
  contact: {
    name: string;
    email: string;
    phone: string;
    preferredContact: PreferredContact | "";
  };
  company: {
    name: string;
    description: string;
    type: BusinessType | "";
    size: OrganizationSize | "";
  };
  problem: {
    description: string;
    currentProcess: string;
    affectedUsers: AffectedUser[];
    frequency: Frequency | "";
  };
  systems: {
    currentTools: string;
    manualDataMovement: YesNoUnsure | "";
    keepExisting: YesNoUnsure | "";
    systemsToKeep: string;
  };
  project: {
    desiredOutcome: string;
    solutionAwareness: SolutionAwareness | "";
    areas: ProjectArea[];
    timeline: Timeline | "";
    budget: Budget | "";
  };
};

export type ProjectInquiry = {
  contact: {
    name: string;
    email: string;
    phone: string;
    preferredContact: PreferredContact;
  };
  company: {
    name: string;
    description: string;
    type: BusinessType;
    size: OrganizationSize | "";
  };
  problem: {
    description: string;
    currentProcess: string;
    affectedUsers: AffectedUser[];
    frequency: Frequency | "";
  };
  systems: {
    currentTools: string;
    manualDataMovement: YesNoUnsure | "";
    keepExisting: YesNoUnsure | "";
    systemsToKeep: string;
  };
  project: {
    desiredOutcome: string;
    solutionAwareness: SolutionAwareness;
    areas: ProjectArea[];
    timeline: Timeline | "";
    budget: Budget | "";
  };
  metadata: {
    submittedAt: string;
    sourcePage: "/start-a-project";
    referrer: string;
  };
};

export const inquirySteps = [
  { id: "about", label: "About you" },
  { id: "business", label: "The business" },
  { id: "problem", label: "The problem" },
  { id: "systems", label: "Current systems" },
  { id: "project", label: "The project" },
  { id: "review", label: "Review" },
] as const;

export const emptyInquiryDraft = (): InquiryDraft => ({
  contact: { name: "", email: "", phone: "", preferredContact: "" },
  company: { name: "", description: "", type: "", size: "" },
  problem: { description: "", currentProcess: "", affectedUsers: [], frequency: "" },
  systems: {
    currentTools: "",
    manualDataMovement: "",
    keepExisting: "",
    systemsToKeep: "",
  },
  project: {
    desiredOutcome: "",
    solutionAwareness: "",
    areas: [],
    timeline: "",
    budget: "",
  },
});

export type FieldErrors = Partial<Record<string, string>>;

export const fieldStep: Record<string, number> = {
  name: 0,
  email: 0,
  phone: 0,
  preferredContact: 0,
  companyName: 0,
  businessDescription: 1,
  businessType: 1,
  organizationSize: 1,
  problemDescription: 2,
  currentProcess: 2,
  affectedUsers: 2,
  frequency: 2,
  currentTools: 3,
  manualDataMovement: 3,
  keepExisting: 3,
  systemsToKeep: 3,
  desiredOutcome: 4,
  solutionAwareness: 4,
  areas: 4,
  timeline: 4,
  budget: 4,
};
