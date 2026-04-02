import Link from "next/link";
import categories from "@/data/categories.json";

export default function Footer() {
  return (
    <footer className="bg-[#0a0612] text-purple-300/70 mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-purple-200 font-bold text-lg mb-3">星知恵</h3>
            <p className="text-sm leading-relaxed">
              星座占い・恋愛占い・スピリチュアルの情報をお届け。あなたの運命を星の導きで紐解きます。
            </p>
          </div>
          <div>
            <h4 className="text-purple-200 font-medium mb-3">カテゴリ</h4>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/${cat.slug}`}
                    className="text-sm hover:text-purple-200 transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-purple-200 font-medium mb-3">サイトについて</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="hover:text-purple-200 transition-colors">
                  プライバシーポリシー
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-purple-200 transition-colors">
                  免責事項
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-purple-800/30 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} 星知恵. All rights reserved.</p>
          <p className="mt-1 text-xs text-purple-400/50">
            ※当サイトの記事にはアフィリエイトリンクが含まれます。
          </p>
        </div>
      </div>
    </footer>
  );
}
