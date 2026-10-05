import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/container";
import { getProject, projects } from "@/lib/projects";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return { title: "Work" };
  }

  return {
    title: project.name,
    description: project.description,
    alternates: { canonical: project.href },
    openGraph: { url: project.href },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <Container className="py-20 sm:py-28">
      <article>
        <h1 className="max-w-[14em] font-serif text-4xl leading-[1.1] tracking-[-0.02em] text-balance text-warm-white sm:text-5xl">
          {project.name}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-silver">
          {project.category}
        </p>
        <p className="mt-8 max-w-2xl text-base leading-7 text-silver">
          Case study coming soon.
        </p>
        <p className="mt-10">
          <Link
            href="/work"
            className="inline-flex min-h-11 items-center text-sm text-warm-white underline decoration-steel underline-offset-4 transition-colors duration-150 hover:text-electric-cobalt hover:decoration-cobalt"
          >
            Back to Work
          </Link>
        </p>
      </article>
    </Container>
  );
}
