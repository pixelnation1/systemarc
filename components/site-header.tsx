"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";
import { Logo } from "@/components/logo";
import { navItems, startProjectHref } from "@/lib/site";

function isCurrent(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [openPath, setOpenPath] = useState<string | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const open = openPath === pathname;

  useEffect(() => {
    if (!open) {
      return;
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenPath(null);
        buttonRef.current?.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  function closeMenu() {
    setOpenPath(null);
  }

  function toggleMenu() {
    setOpenPath((current) => (current === pathname ? null : pathname));
  }

  return (
    <header className="sticky top-0 z-40 border-b border-steel bg-carbon">
      <div className="h-px bg-cobalt" aria-hidden="true" />
      <Container className="flex h-16 items-center justify-between gap-4 lg:h-[4.5rem]">
        <Logo onClick={closeMenu} priority />
        <nav className="hidden items-center lg:flex" aria-label="Primary">
          <ul className="flex items-center">
            {navItems.map((item) => {
              const current = isCurrent(pathname, item.href);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={current ? "page" : undefined}
                    className={`inline-flex h-[4.5rem] items-center px-3 text-sm transition-colors duration-150 ${
                      current
                        ? "text-warm-white shadow-[inset_0_-2px_0_0_var(--color-cobalt)]"
                        : "text-silver hover:text-electric-cobalt"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <ButtonLink
            href={startProjectHref}
            current={isCurrent(pathname, startProjectHref)}
            analyticsLocation="header"
            className="ml-4"
          >
            Start a Project
          </ButtonLink>
        </nav>
        <button
          ref={buttonRef}
          type="button"
          className="inline-flex size-11 items-center justify-center border border-steel text-warm-white transition-colors duration-150 hover:border-cobalt lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={toggleMenu}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span className="relative block h-3.5 w-5" aria-hidden="true">
            <span
              className={`absolute left-0 h-px w-full bg-current transition-transform duration-150 motion-reduce:transition-none ${
                open ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute top-1.5 left-0 h-px w-full bg-current transition-opacity duration-150 motion-reduce:transition-none ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 h-px w-full bg-current transition-transform duration-150 motion-reduce:transition-none ${
                open ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
      </Container>
      <nav
        id="mobile-navigation"
        aria-label="Primary"
        hidden={!open}
        className="border-t border-steel bg-carbon lg:hidden"
      >
        <Container className="flex flex-col py-3">
          <ul>
            {navItems.map((item) => {
              const current = isCurrent(pathname, item.href);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    aria-current={current ? "page" : undefined}
                    className={`flex min-h-12 items-center border-l px-3 text-base transition-colors duration-150 ${
                      current
                        ? "border-cobalt text-warm-white"
                        : "border-transparent text-silver hover:text-electric-cobalt"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <ButtonLink
            href={startProjectHref}
            onClick={closeMenu}
            current={isCurrent(pathname, startProjectHref)}
            analyticsLocation="header"
            className="mt-3 w-full"
          >
            Start a Project
          </ButtonLink>
        </Container>
      </nav>
    </header>
  );
}
