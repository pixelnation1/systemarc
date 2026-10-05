import { ProjectShowcase } from "@/components/project-showcase";
import { Container } from "@/components/container";
import { createMetadata } from "@/lib/site";
import { projects } from "@/lib/projects";

export const metadata = createMetadata({
  title: "Work",
  description:
    "Selected SystemArc projects, including ReviewForge, RepairForge, and PixelNation Systems.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <Container className="py-20 sm:py-28">
      <p className="font-mono text-xs tracking-[0.18em] text-electric-cobalt uppercase">
        Selected work
      </p>
      <h1 className="mt-4 max-w-[14em] font-serif text-4xl leading-[1.1] tracking-[-0.02em] text-balance text-foreground sm:text-5xl">
        Systems built to solve real problems.
      </h1>
      <p className="mt-6 max-w-2xl text-base leading-7 text-secondary sm:text-lg sm:leading-8">
        SystemArc&apos;s approach comes from identifying real operational
        problems and building software around them. These systems show that
        approach in practice.
      </p>
      <ol className="mt-16">
        {projects.map((project, index) => (
          <li
            key={project.slug}
            className="border-t border-steel py-14 first:border-t-0 first:pt-0 last:pb-0 lg:py-20"
          >
            <ProjectShowcase
              project={project}
              number={String(index + 1).padStart(2, "0")}
              visualFirst={index % 2 === 0}
              headingLevel="h2"
            />
          </li>
        ))}
      </ol>
    </Container>
  );
}
