import type { Metadata } from "next";
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
        This route doesn&apos;t exist.
      </h1>
      <p className="mt-6 max-w-xl text-base leading-7 text-secondary sm:text-lg">
        The system is working. This page isn&apos;t part of it.
      </p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/">Return Home</ButtonLink>
        <ButtonLink href="/services" variant="secondary">
          Explore Services
        </ButtonLink>
      </div>
    </Container>
  );
}
