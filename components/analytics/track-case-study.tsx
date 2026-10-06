"use client";

import { useEffect } from "react";
import { trackAnalytics } from "@/lib/analytics";

export function TrackCaseStudyView({ slug }: { slug: string }) {
  useEffect(() => {
    trackAnalytics({ name: "case_study_viewed", slug });
  }, [slug]);

  return null;
}
