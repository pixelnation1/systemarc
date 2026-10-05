import Link from "next/link";
import { ProjectShowcase } from "@/components/project-showcase";
import { Section, SectionHeading } from "@/components/section";
import { projects } from "@/lib/projects";

export function WorkPreview() {
  return (
    <Section id="selected-work" labelledBy="work-heading" className="bg-slate">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          eyebrow="Selected work"
          title="Systems built to solve real problems."
          id="work-heading"
        >
          <p>
            SystemArc&apos;s approach comes from identifying real operational
            problems and building software around them. These systems show that
            approach in practice.
          </p>
        </SectionHeading>
        <Link
          href="/work"
          className="group/link inline-flex min-h-11 shrink-0 items-center gap-2 text-sm text-warm-white"
        >
          View All Work
          <span
            aria-hidden="true"
            className="transition-transform duration-150 group-hover/link:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover/link:translate-x-0"
          >
            →
          </span>
        </Link>
      </div>
      <ol className="mt-16 lg:mt-20">
        {projects.map((project, index) => (
          <li
            key={project.slug}
            className="border-t border-steel py-14 first:border-t-0 first:pt-0 last:pb-0 lg:py-20"
          >
            <ProjectShowcase
              project={project}
              number={String(index + 1).padStart(2, "0")}
              visualFirst={index % 2 === 0}
            />
          </li>
        ))}
      </ol>
    </Section>
  );
}
