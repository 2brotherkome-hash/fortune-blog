"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import categories from "@/data/categories.json";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="bg-[#1a1225] border-b border-purple-800/30 sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="text-xl font-bold text-purple-400 shrink-0"
            onClick={() => setMenuOpen(false)}
          >
            宿曜占い｜誕生日の宿
          </Link>

          {/* デスクトップナビ */}
          <nav className="hidden md:flex gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/${cat.slug}`}
                className={`text-sm font-medium transition-colors ${
                  pathname.startsWith(`/${cat.slug}`)
                    ? "text-purple-200"
                    : "text-purple-300/70 hover:text-purple-100"
                }`}
              >
                {cat.name}
              </Link>
            ))}
            <Link
              href="/aishyo"
              className={`text-sm font-medium transition-colors ${
                pathname === "/aishyo"
                  ? "text-purple-200"
                  : "text-purple-300/70 hover:text-purple-100"
              }`}
            >
              相性診断
            </Link>
          </nav>

          {/* ハンバーガーボタン（モバイル） */}
          <button
            className="md:hidden text-purple-300 p-2"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="メニュー"
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* モバイルメニュー */}
      {menuOpen && (
        <div className="md:hidden bg-[#120d1e] border-t border-purple-800/30 px-4 py-4">
          <nav className="flex flex-col gap-1">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/${cat.slug}`}
                onClick={() => setMenuOpen(false)}
                className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  pathname.startsWith(`/${cat.slug}`)
                    ? "bg-purple-800/40 text-purple-200"
                    : "text-purple-300/70 hover:bg-purple-800/20 hover:text-purple-200"
                }`}
              >
                {cat.name}
              </Link>
            ))}
            <Link
              href="/aishyo"
              onClick={() => setMenuOpen(false)}
              className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                pathname === "/aishyo"
                  ? "bg-purple-800/40 text-purple-200"
                  : "text-purple-300/70 hover:bg-purple-800/20 hover:text-purple-200"
              }`}
            >
              相性診断
            </Link>
            <Link
              href="/lp"
              onClick={() => setMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg text-sm font-medium text-purple-300/70 hover:bg-purple-800/20 hover:text-purple-200 transition-colors"
            >
              宿を調べる
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
