import type { Metadata } from "next";

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
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: date,
      url: `/${category}/${slug}`,
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
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished: date,
    author: {
      "@type": "Organization",
      name: "マネ知恵",
    },
    publisher: {
      "@type": "Organization",
      name: "マネ知恵",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `/${category}/${slug}`,
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
      item: item.url,
    })),
  };
}
