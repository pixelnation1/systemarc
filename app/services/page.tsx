import { PlaceholderPage } from "@/components/placeholder-page";
import { createMetadata } from "@/lib/site";

export const metadata = createMetadata({
  title: "Services",
  description:
    "Custom software, business automation, web applications, and AI and integrations from SystemArc.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <PlaceholderPage
      eyebrow="Services"
      title="Services"
      description="This page will describe how SystemArc designs and builds custom software, business automation, web applications, and AI and integrations."
      secondaryHref="/#capabilities"
      secondaryLabel="See capabilities"
    />
  );
}
