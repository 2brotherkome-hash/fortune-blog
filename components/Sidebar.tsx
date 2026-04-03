import Link from "next/link";
import categories from "@/data/categories.json";

export default function Sidebar() {
  return (
    <aside className="hidden lg:block w-72 shrink-0">
      <div className="sticky top-24 space-y-6">
        {/* カテゴリ一覧 */}
        <div className="bg-white rounded-lg border border-purple-200 p-5">
          <h3 className="font-bold text-purple-900 mb-4">カテゴリ</h3>
          <ul className="space-y-3">
            {categories.map((cat) => (
              <li key={cat.slug}>
                <Link
                  href={`/${cat.slug}`}
                  className="flex items-center gap-2 text-sm text-purple-700/70 hover:text-purple-900 transition-colors"
                >
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: cat.color }}
                  />
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* 人気記事 */}
        <div className="bg-white rounded-lg border border-purple-200 p-5">
          <h3 className="font-bold text-purple-900 mb-4">人気記事</h3>
          <p className="text-sm text-purple-400/50">記事が追加されると表示されます</p>
        </div>
      </div>
    </aside>
  );
}
