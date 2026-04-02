import Link from "next/link";
import categories from "@/data/categories.json";

export default function Header() {
  return (
    <header className="bg-[#1a1225] border-b border-purple-800/30 sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-purple-400">
            星知恵
          </Link>
          <nav className="hidden md:flex gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/${cat.slug}`}
                className="text-sm font-medium text-purple-300/70 hover:text-purple-100 transition-colors"
              >
                {cat.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
