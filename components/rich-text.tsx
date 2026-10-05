import Link from "next/link";
import type { Paragraph } from "@/lib/services";

export function RichText({ paragraphs }: { paragraphs: readonly Paragraph[] }) {
  return (
    <div className="space-y-4">
      {paragraphs.map((paragraph, index) => (
        <p key={index}>
          {paragraph.map((part, partIndex) =>
            typeof part === "string" ? (
              <span key={partIndex}>{part}</span>
            ) : (
              <Link
                key={partIndex}
                href={part.href}
                className="text-warm-white underline decoration-steel underline-offset-4 transition-colors hover:text-electric-cobalt hover:decoration-cobalt"
              >
                {part.text}
              </Link>
            ),
          )}
        </p>
      ))}
    </div>
  );
}
