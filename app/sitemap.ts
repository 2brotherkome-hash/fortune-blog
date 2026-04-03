import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/markdown";
import categories from "@/data/categories.json";

const BASE_URL = process.env.SITE_URL || "https://fortune-blog-2brotherkome-hashs-projects.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticles();

  const articleUrls = articles.map((a) => ({
    url: `${BASE_URL}/${a.category}/${a.slug}`,
    lastModified: new Date(a.date),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const categoryUrls = categories.map((c) => ({
    url: `${BASE_URL}/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...categoryUrls,
    ...articleUrls,
  ];
}
