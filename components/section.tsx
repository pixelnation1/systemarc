import type { ReactNode } from "react";
import { Container } from "@/components/container";

export function Section({
  id,
  labelledBy,
  children,
  className = "",
}: {
  id?: string;
  labelledBy?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`border-t border-border py-20 sm:py-28 ${className}`}
    >
      <Container>{children}</Container>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  id,
  children,
}: {
  eyebrow: string;
  title: string;
  id?: string;
  children?: ReactNode;
}) {
  return (
    <div className="max-w-3xl">
      <p className="font-mono text-xs tracking-[0.18em] text-electric-cobalt uppercase">
        {eyebrow}
      </p>
      <h2
        id={id}
        className="mt-4 max-w-[18em] font-serif text-3xl leading-[1.12] tracking-[-0.02em] text-balance text-foreground sm:text-4xl lg:text-[2.75rem]"
      >
        {title}
      </h2>
      {children ? (
        <div className="mt-6 max-w-2xl space-y-4 text-base leading-7 text-secondary sm:text-lg sm:leading-8">
          {children}
        </div>
      ) : null}
    </div>
  );
}
