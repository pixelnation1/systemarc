import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <Container className="py-24 sm:py-32">
      <p className="font-mono text-xs tracking-[0.18em] text-electric-cobalt uppercase">
        404
      </p>
      <h1 className="mt-4 max-w-[12em] font-serif text-4xl leading-[1.1] tracking-[-0.02em] text-foreground sm:text-5xl">
        This page is not available.
      </h1>
      <p className="mt-6 max-w-xl text-base leading-7 text-secondary sm:text-lg">
        The address may be incorrect, or the page may have been moved.
      </p>
      <div className="mt-10">
        <ButtonLink href="/">Back to home</ButtonLink>
      </div>
      <p className="mt-6">
        <Link
          href="/start-a-project"
          className="inline-flex min-h-11 items-center text-sm text-silver underline decoration-steel underline-offset-4 transition-colors duration-150 hover:text-electric-cobalt hover:decoration-cobalt"
        >
          Start a Project
        </Link>
      </p>
    </Container>
  );
}
