import { PlaceholderPage } from "@/components/placeholder-page";
import { createMetadata } from "@/lib/site";

export const metadata = createMetadata({
  title: "Start a Project",
  description:
    "Start a conversation with SystemArc about a workflow, a disconnected system, or software that does not exist yet.",
  path: "/start-a-project",
  index: false,
});

export default function StartProjectPage() {
  return (
    <PlaceholderPage
      eyebrow="Project inquiry"
      title="Start a Project"
      description="Bring a workflow that is still manual, systems that do not connect, or software that does not exist yet. That is the conversation SystemArc is built for."
      note="This page will collect that conversation. An inquiry form is not available here yet."
      primaryHref="/"
      primaryLabel="Back to home"
    />
  );
}
