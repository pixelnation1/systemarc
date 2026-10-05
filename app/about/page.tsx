import { PlaceholderPage } from "@/components/placeholder-page";
import { createMetadata } from "@/lib/site";

export const metadata = createMetadata({
  title: "About",
  description:
    "About SystemArc, a company that designs and builds custom software and business systems.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <PlaceholderPage
      eyebrow="About"
      title="About"
      description="This page will introduce SystemArc and the people responsible for the work. That information is not published here yet."
    />
  );
}
