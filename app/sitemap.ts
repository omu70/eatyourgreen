import type { MetadataRoute } from "next";
import { SITE } from "@/lib/seo";
import { books } from "@/data/books";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = ["", "/about", "/faq", "/contact", "/privacy", "/terms", "/refund-policy"];
  return [
    ...staticRoutes.map((p) => ({
      url: `${SITE.url}${p}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: p === "" ? 1 : 0.6,
    })),
    ...books.map((b) => ({
      url: `${SITE.url}/books/${b.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
  ];
}
