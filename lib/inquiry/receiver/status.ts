/** Internal lead statuses. Webhook inserts always use `new`. */
export const inquiryStatuses = [
  "new",
  "reviewed",
  "discovery",
  "qualified",
  "proposal",
  "won",
  "lost",
  "archived",
] as const;

export type InquiryStatus = (typeof inquiryStatuses)[number];

export const initialInquiryStatus = "new" satisfies InquiryStatus;
