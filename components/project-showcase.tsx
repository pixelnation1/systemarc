import Link from "next/link";
import { ProjectVisual } from "@/components/project-visual";
import type { Project } from "@/lib/projects";

export function ProjectShowcase({
  project,
  number,
  visualFirst,
  headingLevel = "h3",
}: {
  project: Project;
  number: string;
  visualFirst: boolean;
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;

  return (
    <article className="group grid items-center gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">
      <div className={visualFirst ? "min-w-0 lg:order-2" : "min-w-0"}>
        <div className="flex items-center gap-3">
          <p className="font-mono text-sm tracking-[0.16em] text-electric-cobalt">
            {number}
          </p>
          <span
            aria-hidden="true"
            className="h-px w-10 bg-steel transition-colors duration-150 group-hover:bg-cobalt"
          />
        </div>
        <Heading className="mt-4 font-serif text-4xl leading-tight tracking-[-0.02em] text-warm-white sm:text-5xl">
          <Link
            href={project.href}
            className="transition-colors duration-150 hover:text-electric-cobalt"
          >
            {project.name}
          </Link>
        </Heading>
        <p className="mt-4 max-w-xl text-sm leading-6 text-silver sm:text-base">
          {project.category}
        </p>
        <p className="mt-5 max-w-xl text-base leading-7 text-silver">
          {project.description}
        </p>
        <ul aria-label="Capabilities" className="mt-6 flex flex-wrap gap-2">
          {project.capabilities.map((capability) => (
            <li
              key={capability}
              className="border border-steel px-2.5 py-1.5 font-mono text-[0.68rem] tracking-[0.14em] text-silver uppercase transition-colors duration-150 hover:border-cobalt hover:text-warm-white"
            >
              {capability}
            </li>
          ))}
        </ul>
        <p className="mt-8">
          <Link
            href={project.href}
            className="inline-flex min-h-11 items-center gap-2 text-sm text-warm-white"
          >
            View {project.name}
            <span
              aria-hidden="true"
              className="transition-transform duration-150 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
            >
              →
            </span>
          </Link>
        </p>
      </div>
      <div className={visualFirst ? "min-w-0 lg:order-1" : "min-w-0"}>
        <ProjectVisual project={project} number={number} />
      </div>
    </article>
  );
}
