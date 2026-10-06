import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

/**
 * Allows ordinary crawling, including Googlebot and Bingbot.
 * Add a named user-agent rule here later only after SystemArc chooses a crawler policy.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
