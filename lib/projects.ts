export type Project = {
  slug: string;
  name: string;
  category: string;
  description: string;
  capabilities: readonly string[];
  /** Public image path, or null until a screenshot is added. */
  image: string | null;
  href: string;
};

export const projects: readonly Project[] = [
  {
    slug: "reviewforge",
    name: "ReviewForge",
    category: "Reputation & Customer Engagement Platform",
    description:
      "A platform built to help businesses create structured customer feedback and reputation workflows instead of relying on disconnected manual follow-up.",
    capabilities: [
      "Customer Feedback",
      "Review Workflows",
      "Business Dashboard",
      "Customer Engagement",
      "Automation",
    ],
    image: null,
    href: "/work/reviewforge",
  },
  {
    slug: "repairforge",
    name: "RepairForge",
    category: "Repair Workflow & Customer Communication Platform",
    description:
      "A system designed around repair businesses, giving customers clearer service visibility while helping shops organize communication and workflow around active repairs.",
    capabilities: [
      "Repair Workflow",
      "Customer Status",
      "Service Communication",
      "Operational Tools",
      "Automation",
    ],
    image: null,
    href: "/work/repairforge",
  },
  {
    slug: "pixelnation-systems",
    name: "PixelNation Systems",
    category: "Community, Loyalty & Operational Systems",
    description:
      "Custom systems built around the operation of a modern gaming and technology business, including community engagement, customer check-ins, support points, loyalty concepts, event workflows, and internal operational tools.",
    capabilities: [
      "Community Platform",
      "Customer Check-In",
      "Support Points",
      "Events",
      "Operational Systems",
    ],
    image: null,
    href: "/work/pixelnation-systems",
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
