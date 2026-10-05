import { PlaceholderPage } from "@/components/placeholder-page";
import { createMetadata } from "@/lib/site";

export const metadata = createMetadata({
  title: "Solutions",
  description:
    "Business systems SystemArc designs around real operations, including portals, workflows, dashboards, and integrations.",
  path: "/solutions",
  index: false,
});

export default function SolutionsPage() {
  return (
    <PlaceholderPage
      eyebrow="Solutions"
      title="Solutions"
      description="This page will describe the kinds of business systems SystemArc builds, organized around how a company operates rather than around a catalog of templates."
      secondaryHref="/#what-we-build"
      secondaryLabel="See what we build"
    />
  );
}
