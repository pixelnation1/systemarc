import { Container } from "@/components/container";
import { JsonLd } from "@/components/json-ld";
import { WorkConversion } from "@/components/work/work-conversion";
import { WorkHub } from "@/components/work/work-hub";
import { caseStudies } from "@/lib/case-studies";
import { pageGraph } from "@/lib/schema";
import { createMetadata, siteUrl } from "@/lib/site";

const title = "Software Projects & Systems | SystemArc Work";
const description =
  "Explore software platforms and operational systems built by SystemArc, including ReviewForge, RepairForge, and PixelNation Systems.";

export const metadata = createMetadata({
  title,
  description,
  path: "/work",
  index: true,
  absoluteTitle: true,
});

export default function WorkPage() {
  return (
    <>
      <JsonLd
        data={pageGraph({
          path: "/work",
          name: title,
          description,
          breadcrumbs: [
            { name: "Home", path: "/" },
            { name: "Work", path: "/work" },
          ],
          mainEntityId: `${siteUrl}/work#projects`,
          extra: [
            {
              "@type": "ItemList",
              "@id": `${siteUrl}/work#projects`,
              name: "Selected work",
              itemListElement: caseStudies.map((study, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: study.name,
                url: `${siteUrl}${study.href}`,
              })),
            },
          ],
        })}
      />
      <Container className="pt-20 sm:pt-28">
        <p className="font-mono text-xs tracking-[0.18em] text-electric-cobalt uppercase">
          Selected work
        </p>
        <h1 className="mt-4 max-w-[12em] font-serif text-4xl leading-[1.08] tracking-[-0.03em] text-balance text-foreground sm:text-6xl">
          Systems built around real problems.
        </h1>
        <div className="mt-6 max-w-2xl space-y-5 text-base leading-7 text-secondary sm:text-lg sm:leading-8">
          <p>Good software starts with understanding the operation.</p>
          <p>
            These projects show how SystemArc turns operational problems,
            disconnected workflows, customer friction, and missing capabilities
            into working systems.
          </p>
        </div>
      </Container>
      <Container className="border-t border-steel py-16 sm:py-24">
        <WorkHub />
      </Container>
      <WorkConversion />
    </>
  );
}
