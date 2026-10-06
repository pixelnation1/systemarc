"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { trackAnalytics } from "@/lib/analytics";
import { startProjectHref } from "@/lib/site";

const variants = {
  primary: "bg-warm-white text-carbon hover:text-deep-cobalt",
  secondary:
    "border border-steel bg-transparent text-warm-white hover:border-cobalt",
} as const;

function buttonShadow(variant: keyof typeof variants, current: boolean) {
  if (variant !== "primary") return "";
  if (current) return "shadow-[inset_0_-2px_0_0_var(--color-cobalt)]";
  return "shadow-[inset_0_0_0_1px_transparent] hover:shadow-[inset_0_0_0_1px_var(--color-cobalt)]";
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
  current = false,
  onClick,
  analyticsLocation,
}: {
  href: string;
  children: ReactNode;
  variant?: keyof typeof variants;
  className?: string;
  current?: boolean;
  onClick?: () => void;
  /** Distinguishes a header control from an in-page control on the same URL. */
  analyticsLocation?: string;
}) {
  const pathname = usePathname();

  function handleClick() {
    onClick?.();

    if (href !== startProjectHref) return;

    const location = analyticsLocation ? `${analyticsLocation}:${pathname}` : pathname;
    trackAnalytics({ name: "start_project_clicked", location });

    const serviceSlug = pathname.match(/^\/services\/([a-z0-9-]+)$/)?.[1];
    if (serviceSlug && analyticsLocation !== "header") {
      trackAnalytics({ name: "service_cta_clicked", slug: serviceSlug });
    }
  }

  return (
    <Link
      href={href}
      onClick={handleClick}
      aria-current={current ? "page" : undefined}
      className={`inline-flex h-12 items-center justify-center px-5 text-sm font-medium tracking-wide transition-colors duration-150 ${variants[variant]} ${buttonShadow(variant, current)} ${className}`}
    >
      {children}
    </Link>
  );
}
