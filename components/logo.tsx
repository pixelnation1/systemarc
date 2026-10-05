import Image from "next/image";
import Link from "next/link";

export function Logo({
  onClick,
  priority = false,
}: {
  onClick?: () => void;
  priority?: boolean;
}) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="SystemArc, home"
      className="inline-flex shrink-0 items-center gap-2.5"
    >
      <Image
        src="/images/favicon.png"
        alt=""
        width={1254}
        height={1254}
        sizes="96px"
        priority={priority}
        className="logo-mark size-9 mix-blend-lighten"
      />
      <span className="text-[0.95rem] font-medium tracking-[-0.02em] text-warm-white">
        SystemArc
      </span>
    </Link>
  );
}
