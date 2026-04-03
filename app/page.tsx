import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import { getAllArticles } from "@/lib/markdown";
import categories from "@/data/categories.json";

export default function Home() {
  const articles = getAllArticles();

  return (
    <div>
      {/* ヒーロー */}
      <section className="bg-gradient-to-r from-purple-800 to-indigo-900 text-white rounded-xl p-8 mb-8">
        <h1 className="text-3xl font-bold mb-3">
          星の導きで、運命を知る。
        </h1>
        <p className="text-purple-200 text-lg">
          星座占い・恋愛占い・金運・スピリチュアルの総合サイト
        </p>
      </section>

      {/* カテゴリ */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/${cat.slug}`}
            className="bg-white rounded-lg border border-purple-200 p-4 text-center hover:shadow-lg hover:shadow-purple-900/20 transition-shadow"
          >
            <div
              className="w-3 h-3 rounded-full mx-auto mb-2"
              style={{ backgroundColor: cat.color }}
            />
            <h2 className="font-bold text-purple-800 text-sm">{cat.name}</h2>
            <p className="text-xs text-purple-600/70 mt-1 line-clamp-2">
              {cat.description}
            </p>
          </Link>
        ))}
      </section>

      {/* 最新記事 */}
      <section>
        <h2 className="text-xl font-bold text-purple-900 mb-4">最新記事</h2>
        {articles.length === 0 ? (
          <div className="bg-white rounded-lg border border-purple-200 p-8 text-center text-purple-400">
            記事が追加されると表示されます
          </div>
        ) : (
          <div className="grid gap-4">
            {articles.map((article) => (
              <ArticleCard key={`${article.category}/${article.slug}`} {...article} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
