import Link from "next/link";
import categories from "@/data/categories.json";

type ArticleCardProps = {
  title: string;
  description: string;
  category: string;
  slug: string;
  date: string;
};

export default function ArticleCard({
  title,
  description,
  category,
  slug,
  date,
}: ArticleCardProps) {
  const cat = categories.find((c) => c.slug === category);

  return (
    <Link
      href={`/${category}/${slug}`}
      className="block bg-white rounded-lg border border-purple-200 p-6 hover:shadow-lg hover:shadow-purple-200/50 transition-shadow"
    >
      <div className="flex items-center gap-2 mb-3">
        {cat && (
          <span
            className="text-xs font-medium px-2 py-0.5 rounded-full text-white"
            style={{ backgroundColor: cat.color }}
          >
            {cat.name}
          </span>
        )}
        <time className="text-xs text-purple-400/50">{date}</time>
      </div>
      <h2 className="text-lg font-bold text-purple-900 mb-2 line-clamp-2">{title}</h2>
      <p className="text-sm text-purple-600/70 line-clamp-3">{description}</p>
    </Link>
  );
}
