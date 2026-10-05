import { Capabilities } from "@/components/home/capabilities";
import { ClosingCta } from "@/components/home/closing-cta";
import { Hero } from "@/components/home/hero";
import { Problem } from "@/components/home/problem";
import { Process } from "@/components/home/process";
import { WhatWeBuild } from "@/components/home/what-we-build";
import { WorkPreview } from "@/components/home/work-preview";
import { PageSchema } from "@/components/json-ld";
import { createMetadata, siteDescription, siteTitle } from "@/lib/site";

export const metadata = createMetadata({
  title: siteTitle,
  description: siteDescription,
  path: "/",
  absoluteTitle: true,
  index: true,
});

export default function HomePage() {
  return (
    <>
      <PageSchema
        path="/"
        name={siteTitle}
        description={siteDescription}
        breadcrumbs={[{ name: "Home", path: "/" }]}
      />
      <Hero />
      <Problem />
      <Capabilities />
      <WhatWeBuild />
      <Process />
      <WorkPreview />
      <ClosingCta />
    </>
  );
}
