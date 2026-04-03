import type { Metadata } from "next";

const SITE_URL =
  process.env.SITE_URL || "https://fortune-blog-2brotherkome-hashs-projects.vercel.app";
const SITE_NAME = "宿曜占い｜誕生日の宿";

export function generateArticleMetadata({
  title,
  description,
  category,
  slug,
  date,
}: {
  title: string;
  description: string;
  category: string;
  slug: string;
  date: string;
}): Metadata {
  const url = `${SITE_URL}/${category}/${slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: date,
      url,
      siteName: SITE_NAME,
      locale: "ja_JP",
    },
  };
}

export function generateArticleJsonLd({
  title,
  description,
  date,
  category,
  slug,
}: {
  title: string;
  description: string;
  date: string;
  category: string;
  slug: string;
}) {
  const url = `${SITE_URL}/${category}/${slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished: date,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };
}

export function generateBreadcrumbJsonLd(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}
