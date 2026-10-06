"use client";

import { useEffect } from "react";
import Link from "next/link";
import { fontVariables } from "@/lib/fonts";
import "./globals.css";

const retryClass =
  "inline-flex h-12 items-center justify-center bg-warm-white px-5 text-sm font-medium tracking-wide text-carbon";

export default function GlobalError({
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
    <html lang="en" className={`${fontVariables} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-carbon font-sans text-warm-white">
        <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-24">
          <p className="font-mono text-xs tracking-[0.18em] text-electric-cobalt uppercase">
            SystemArc
          </p>
          <h1 className="mt-4 max-w-[14em] font-serif text-4xl leading-[1.1] tracking-[-0.02em]">
            This page could not be displayed.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-silver">
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
            <Link
              href="/"
              className="inline-flex h-12 items-center justify-center border border-steel px-5 text-sm font-medium text-warm-white"
            >
              Return Home
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
