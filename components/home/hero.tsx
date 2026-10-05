import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";
import { SystemsDiagram } from "@/components/systems-diagram";
import { startProjectHref } from "@/lib/site";

export function Hero() {
  return (
    <section aria-labelledby="hero-heading">
      <Container className="py-16 sm:py-20 xl:py-24">
        <div className="xl:grid xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] xl:items-center xl:gap-10">
          <div className="max-w-xl">
            <p className="font-mono text-xs tracking-[0.18em] text-electric-cobalt uppercase">
              Custom software and business systems
            </p>
            <h1
              id="hero-heading"
              className="mt-5 max-w-[12em] font-serif text-[2.65rem] leading-[1.08] font-normal tracking-[-0.02em] text-balance text-foreground sm:text-5xl lg:text-6xl"
            >
              Software built around your business.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-secondary sm:text-lg sm:leading-8">
              SystemArc designs and builds custom software, automation, and
              digital systems around the way your business actually operates.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={startProjectHref} className="w-full sm:w-auto">
                Start a Project
              </ButtonLink>
              <ButtonLink
                href="/#what-we-build"
                variant="secondary"
                className="w-full sm:w-auto"
              >
                See What We Build
              </ButtonLink>
            </div>
          </div>
          <div className="mt-14 sm:mt-16 xl:mt-0">
            <SystemsDiagram />
          </div>
        </div>
      </Container>
    </section>
  );
}
