import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ArticleCard from "@/components/ArticleCard";
import { getArticlesByCategory } from "@/lib/markdown";
import categories from "@/data/categories.json";

type Props = {
  params: Promise<{ category: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const cat = categories.find((c) => c.slug === category);
  if (!cat) return {};
  return {
    title: cat.name,
    description: cat.description,
  };
}

export const dynamicParams = true;

export function generateStaticParams() {
  return categories.map((cat) => ({ category: cat.slug }));
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const cat = categories.find((c) => c.slug === category);
  if (!cat) notFound();

  const articles = getArticlesByCategory(category);

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: cat.color }}
          />
          <h1 className="text-2xl font-bold text-purple-900">{cat.name}</h1>
        </div>
        <p className="text-purple-600">{cat.description}</p>
      </div>

      {articles.length === 0 ? (
        <div className="bg-white rounded-lg border border-purple-200 p-8 text-center text-purple-400">
          このカテゴリにはまだ記事がありません。
        </div>
      ) : (
        <div className="grid gap-4">
          {articles.map((article) => (
            <ArticleCard key={article.slug} {...article} />
          ))}
        </div>
      )}
    </div>
  );
}
