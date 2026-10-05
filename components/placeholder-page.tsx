import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";

export function PlaceholderPage({
  eyebrow,
  title,
  description,
  note = "This page is in preparation.",
  primaryHref = "/",
  primaryLabel = "Back to home",
  secondaryHref,
  secondaryLabel,
}: {
  eyebrow: string;
  title: string;
  description: string;
  note?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  return (
    <Container className="py-20 sm:py-28">
      <p className="font-mono text-xs tracking-[0.18em] text-electric-cobalt uppercase">
        {eyebrow}
      </p>
      <h1 className="mt-4 max-w-[14em] font-serif text-4xl leading-[1.1] tracking-[-0.02em] text-balance text-foreground sm:text-5xl">
        {title}
      </h1>
      <div className="mt-6 max-w-2xl space-y-4 text-base leading-7 text-secondary sm:text-lg sm:leading-8">
        <p>{description}</p>
        <p>{note}</p>
      </div>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href={primaryHref}>{primaryLabel}</ButtonLink>
        {secondaryHref && secondaryLabel ? (
          <ButtonLink href={secondaryHref} variant="secondary">
            {secondaryLabel}
          </ButtonLink>
        ) : null}
      </div>
    </Container>
  );
}
