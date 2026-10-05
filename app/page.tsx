import type { Metadata } from "next";
import { Capabilities } from "@/components/home/capabilities";
import { ClosingCta } from "@/components/home/closing-cta";
import { Hero } from "@/components/home/hero";
import { Problem } from "@/components/home/problem";
import { Process } from "@/components/home/process";
import { WhatWeBuild } from "@/components/home/what-we-build";
import { WorkPreview } from "@/components/home/work-preview";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { url: "/" },
};

export default function HomePage() {
  return (
    <>
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
