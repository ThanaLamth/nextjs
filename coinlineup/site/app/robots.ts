import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/wordpress";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();
  const isProductionHost = siteUrl.includes("coinlineup.com");

  return {
    rules: isProductionHost
      ? {
          userAgent: "*",
          allow: "/",
          disallow: ["/api/"],
        }
      : {
          userAgent: "*",
          disallow: "/",
        },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}

