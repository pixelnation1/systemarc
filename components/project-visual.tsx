import Image from "next/image";
import type { Project } from "@/lib/projects";

function FrameMarks() {
  const mark =
    "pointer-events-none absolute size-3 border-cobalt/45 transition-colors duration-150 group-hover:border-cobalt";

  return (
    <>
      <span aria-hidden="true" className={`${mark} top-4 left-4 border-t border-l`} />
      <span aria-hidden="true" className={`${mark} top-4 right-4 border-t border-r`} />
      <span aria-hidden="true" className={`${mark} bottom-4 left-4 border-b border-l`} />
      <span aria-hidden="true" className={`${mark} right-4 bottom-4 border-r border-b`} />
    </>
  );
}

export function ProjectVisual({
  project,
  number,
}: {
  project: Project;
  number: string;
}) {
  const frame =
    "relative flex min-h-[22rem] w-full min-w-0 flex-col border border-steel bg-graphite transition-colors duration-150 group-hover:border-cobalt sm:min-h-[24rem]";

  if (project.image) {
    return (
      <div className={`${frame} overflow-hidden`}>
        <Image
          src={project.image}
          alt={`${project.name} product view`}
          fill
          sizes="(min-width: 1024px) 36rem, 100vw"
          className="object-cover"
        />
        <FrameMarks />
      </div>
    );
  }

  return (
    <div className={frame}>
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-steel) 1px, transparent 1px), linear-gradient(to bottom, var(--color-steel) 1px, transparent 1px)",
          backgroundSize: "3.5rem 3.5rem",
        }}
      />
      <FrameMarks />
      <div className="relative flex flex-1 flex-col justify-between p-6 sm:p-8">
        <div>
          <div className="flex items-center justify-between gap-4">
            <p className="font-mono text-[0.68rem] tracking-[0.18em] text-electric-cobalt uppercase">
              Product view
            </p>
            <p className="font-mono text-[0.68rem] tracking-[0.16em] text-electric-cobalt">
              {number}
            </p>
          </div>
          <div aria-hidden="true" className="mt-6 flex items-center gap-3">
            <span className="size-1.5 bg-cobalt" />
            <span className="h-px w-14 bg-cobalt" />
            <span className="size-1.5 border border-cobalt" />
            <span className="h-px w-8 bg-steel" />
          </div>
        </div>
        <div className="max-w-md">
          <p className="font-serif text-3xl leading-tight tracking-[-0.02em] text-warm-white sm:text-4xl">
            {project.name}
          </p>
          <p className="mt-3 text-sm leading-6 text-silver">{project.category}</p>
        </div>
        <p className="font-mono text-[0.68rem] tracking-[0.18em] text-silver uppercase">
          Screenshot coming soon
        </p>
      </div>
    </div>
  );
}
