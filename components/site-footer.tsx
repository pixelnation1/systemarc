import Link from "next/link";
import { Container } from "@/components/container";
import { Logo } from "@/components/logo";
import { contactEmail, footerItems, legalItems } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-steel bg-carbon">
      <Container className="py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Logo />
            <p className="mt-4 max-w-xs text-base leading-7 text-silver">
              Software built around your business.
            </p>
            <p
              id="footer-contact"
              className="mt-8 font-mono text-xs tracking-[0.18em] text-electric-cobalt uppercase"
            >
              Contact
            </p>
            <a
              href={`mailto:${contactEmail}`}
              className="mt-3 inline-flex min-h-11 items-center text-sm text-silver transition-colors duration-150 hover:text-electric-cobalt"
            >
              {contactEmail}
            </a>
          </div>
          <nav className="lg:col-span-4" aria-label="Footer">
            <p
              id="footer-site"
              className="font-mono text-xs tracking-[0.18em] text-electric-cobalt uppercase"
            >
              Site
            </p>
            <ul aria-labelledby="footer-site" className="mt-4">
              {footerItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-11 items-center text-sm text-silver transition-colors duration-150 hover:text-electric-cobalt"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav className="lg:col-span-3" aria-label="Legal">
            <p
              id="footer-legal"
              className="font-mono text-xs tracking-[0.18em] text-electric-cobalt uppercase"
            >
              Legal
            </p>
            <ul aria-labelledby="footer-legal" className="mt-4">
              {legalItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-11 items-center text-sm text-silver transition-colors duration-150 hover:text-electric-cobalt"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <p className="mt-14 border-t border-steel pt-6 text-sm text-silver">
          © 2026 SystemArc. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
