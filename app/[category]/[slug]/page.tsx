import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getArticle, getAllArticles } from "@/lib/markdown";
import { generateArticleMetadata, generateArticleJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo";
import AffiliateLink from "@/components/AffiliateLink";
import CTAButton from "@/components/CTAButton";
import categories from "@/data/categories.json";
import Link from "next/link";

type Props = {
  params: Promise<{ category: string; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, slug } = await params;
  const article = await getArticle(category, slug);
  if (!article) return {};
  return generateArticleMetadata(article);
}

export const dynamicParams = true;

export function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((a) => ({
    category: a.category,
    slug: a.slug,
  }));
}

export default async function ArticlePage({ params }: Props) {
  const { category, slug } = await params;
  const article = await getArticle(category, slug);
  if (!article) notFound();

  const cat = categories.find((c) => c.slug === category);

  const articleJsonLd = generateArticleJsonLd(article);
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "ホーム", url: "/" },
    { name: cat?.name || category, url: `/${category}` },
    { name: article.title, url: `/${category}/${slug}` },
  ]);

  return (
    <article>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* パンくず */}
      <nav className="flex items-center gap-2 text-sm text-purple-400 mb-6">
        <Link href="/" className="hover:text-purple-600 transition-colors">ホーム</Link>
        <span>/</span>
        <Link href={`/${category}`} className="hover:text-purple-600 transition-colors">
          {cat?.name || category}
        </Link>
        <span>/</span>
        <span className="text-purple-600 truncate">{article.title}</span>
      </nav>

      {/* 記事ヘッダー */}
      <header className="mb-8 pb-6 border-b border-purple-200">
        {cat && (
          <span
            className="inline-block text-xs font-medium px-2 py-0.5 rounded-full text-white mb-3"
            style={{ backgroundColor: cat.color }}
          >
            {cat.name}
          </span>
        )}
        <h1 className="text-2xl font-bold text-purple-900 mb-3 leading-snug">{article.title}</h1>
        <time className="text-sm text-purple-400">{article.date}</time>
      </header>

      {/* 記事本文 */}
      <div
        className="article-prose max-w-none mb-8"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      {/* アフィリエイトCTA */}
      {article.affiliateIds && article.affiliateIds.length > 0 && (
        <section className="mt-12 space-y-6">
          <h2 className="text-xl font-bold text-purple-900">おすすめサービス</h2>
          {article.affiliateIds.map((id) => (
            <AffiliateLink key={id} id={id} variant="card" />
          ))}
          <CTAButton id={article.affiliateIds[0]} />
        </section>
      )}
    </article>
  );
}
