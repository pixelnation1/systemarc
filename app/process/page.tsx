import { PlaceholderPage } from "@/components/placeholder-page";
import { createMetadata } from "@/lib/site";

export const metadata = createMetadata({
  title: "Process",
  description:
    "How SystemArc moves from understanding a business to launching and supporting custom software.",
  path: "/process",
  index: false,
});

export default function ProcessPage() {
  return (
    <PlaceholderPage
      eyebrow="Process"
      title="Process"
      description="This page will expand on how a SystemArc engagement moves from discovery through architecture, build, launch, and support."
      secondaryHref="/#process"
      secondaryLabel="See the process"
    />
  );
}
