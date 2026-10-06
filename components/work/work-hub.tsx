import Link from "next/link";
import { ProjectVisual } from "@/components/project-visual";
import { ProductShot, shotAlt } from "@/components/work/product-shot";
import { caseStudies } from "@/lib/case-studies";
import { getProject } from "@/lib/projects";
import { listProjectShots, shotsByRole } from "@/lib/project-shots";

export function WorkHub() {
  return (
    <>
      <ol>
        {caseStudies.map((study, index) => {
          const project = getProject(study.slug);
          if (!project) return null;

          const hero = shotsByRole(listProjectShots(study.imageDir), "hero")[0];
          const visualFirst = index % 2 === 1;

          return (
            <li
              key={study.slug}
              className="border-t border-steel py-16 first:border-t-0 first:pt-0 lg:py-24"
            >
              <article className="group grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
                <div className={visualFirst ? "min-w-0 lg:order-2 lg:col-span-5" : "min-w-0 lg:col-span-5"}>
                  <div className="flex items-center gap-3">
                    <p className="font-mono text-sm tracking-[0.16em] text-electric-cobalt">
                      {study.number}
                    </p>
                    <span
                      aria-hidden="true"
                      className="h-px w-10 bg-steel transition-colors duration-150 group-hover:bg-cobalt"
                    />
                  </div>
                  <h2 className="mt-4 font-serif text-4xl leading-tight tracking-[-0.02em] text-warm-white sm:text-5xl">
                    <Link
                      href={study.href}
                      className="transition-colors duration-150 hover:text-electric-cobalt"
                    >
                      {study.name}
                    </Link>
                  </h2>
                  <p className="mt-4 max-w-xl text-sm leading-6 text-silver sm:text-base">
                    {study.category}
                  </p>
                  <p className="mt-5 max-w-xl text-base leading-7 text-silver">
                    {project.description}
                  </p>
                  <ul aria-label={`${study.name} capabilities`} className="mt-6 flex flex-wrap gap-2">
                    {project.capabilities.map((capability) => (
                      <li
                        key={capability}
                        className="border border-steel px-2.5 py-1.5 font-mono text-[0.68rem] tracking-[0.14em] text-silver uppercase"
                      >
                        {capability}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-8">
                    <Link
                      href={study.href}
                      className="inline-flex min-h-11 items-center gap-2 text-sm text-warm-white"
                    >
                      View Case Study
                      <span
                        aria-hidden="true"
                        className="transition-transform duration-150 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                      >
                        →
                      </span>
                    </Link>
                  </p>
                </div>
                <div className={visualFirst ? "min-w-0 lg:order-1 lg:col-span-7" : "min-w-0 lg:col-span-7"}>
                  {hero ? (
                    <ProductShot
                      src={hero.src}
                      alt={shotAlt(study.name, "hero")}
                      ratio="16 / 10"
                      sizes="(min-width: 1024px) 44rem, 100vw"
                    />
                  ) : (
                    <ProjectVisual project={project} number={study.number} />
                  )}
                </div>
              </article>
            </li>
          );
        })}
      </ol>
    </>
  );
}
