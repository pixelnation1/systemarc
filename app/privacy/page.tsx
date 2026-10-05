import { PlaceholderPage } from "@/components/placeholder-page";
import { createMetadata } from "@/lib/site";

export const metadata = createMetadata({
  title: "Privacy",
  description: "Privacy policy for SystemArc.",
  path: "/privacy",
  index: false,
});

export default function PrivacyPage() {
  return (
    <PlaceholderPage
      eyebrow="Legal"
      title="Privacy"
      description="The SystemArc privacy policy will explain what information the site collects and how it is used."
      note="The policy is not published on this page yet."
    />
  );
}
