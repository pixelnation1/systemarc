import { PlaceholderPage } from "@/components/placeholder-page";
import { createMetadata } from "@/lib/site";

export const metadata = createMetadata({
  title: "Terms",
  description: "Terms of use for the SystemArc website.",
  path: "/terms",
  index: false,
});

export default function TermsPage() {
  return (
    <PlaceholderPage
      eyebrow="Legal"
      title="Terms"
      description="The terms of use for this website will be published on this page."
      note="The terms are not published here yet."
    />
  );
}
