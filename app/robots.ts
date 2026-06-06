import type { MetadataRoute } from "next";
import { SITE } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/thank-you", "/api/", "/admin"] },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
