import type { MetadataRoute } from "next";

const BASE_URL = process.env.SITE_URL || "https://fortune-blog-2brotherkome-hashs-projects.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
