export type SalesOpportunity = {
  id: string;
  inquiry_id: string | null;
  company_name: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  service: "Website" | "Software" | "Automation" | "Media" | "Other";
  source: string;
  summary: string;
  stage: "new" | "contacted" | "qualified" | "proposal" | "won" | "lost";
  estimated_value_cents: number;
  next_follow_up: string | null;
  notes: string;
  first_contacted_at: string | null;
  closed_at: string | null;
  created_at: string;
  updated_at: string;
};
export const stageLabels: Record<SalesOpportunity["stage"],string> = {
  new:"New", contacted:"Contacted", qualified:"Qualified",
  proposal:"Proposal Sent", won:"Won", lost:"Lost",
};
export function formatMoney(cents: number) {
  return new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",maximumFractionDigits:0}).format(cents/100);
}
export function formatExactMoney(cents: number) {
  return (cents/100).toFixed(2);
}
export function formatDate(value: string) {
  const date = new Date(value.length === 10 ? value+"T12:00:00Z" : value);
  return new Intl.DateTimeFormat("en-US",{timeZone:"America/Chicago",month:"short",day:"numeric",year:"numeric"}).format(date);
}
export function businessToday() {
  const parts=new Intl.DateTimeFormat("en-US",{timeZone:"America/Chicago",year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(new Date());
  const get=(part:string)=>parts.find(x=>x.type===part)?.value ?? "";
  return get("year")+"-"+get("month")+"-"+get("day");
}
