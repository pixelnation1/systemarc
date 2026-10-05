import Link from "next/link";
import type { ReactNode } from "react";

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
}: {
  href: string;
  children: ReactNode;
  variant?: keyof typeof variants;
  className?: string;
  current?: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={current ? "page" : undefined}
      className={`inline-flex h-12 items-center justify-center px-5 text-sm font-medium tracking-wide transition-colors duration-150 ${variants[variant]} ${buttonShadow(variant, current)} ${className}`}
    >
      {children}
    </Link>
  );
}
