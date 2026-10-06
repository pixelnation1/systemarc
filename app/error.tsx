"use client";

import { useEffect } from "react";
import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";

const retryClass =
  "inline-flex h-12 items-center justify-center bg-warm-white px-5 text-sm font-medium tracking-wide text-carbon transition-colors duration-150 hover:text-deep-cobalt";

export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }
  }, [error]);

  return (
    <Container className="py-24 sm:py-32">
      <p className="font-mono text-xs tracking-[0.18em] text-electric-cobalt uppercase">
        Error
      </p>
      <h1 className="mt-4 max-w-[14em] font-serif text-4xl leading-[1.1] tracking-[-0.02em] text-foreground sm:text-5xl">
        This page could not be displayed.
      </h1>
      <p className="mt-6 max-w-xl text-base leading-7 text-secondary sm:text-lg">
        The rest of the site is still available. You can try this page again,
        or return home.
      </p>
      {error.digest ? (
        <p className="mt-4 font-mono text-xs tracking-[0.14em] text-silver uppercase">
          Reference {error.digest}
        </p>
      ) : null}
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <button type="button" className={retryClass} onClick={() => retry()}>
          Try again
        </button>
        <ButtonLink href="/" variant="secondary">
          Return Home
        </ButtonLink>
      </div>
    </Container>
  );
}
