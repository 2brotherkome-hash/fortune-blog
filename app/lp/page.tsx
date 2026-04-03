import ShukuDiagnosisTool from "@/components/ShukuDiagnosisTool";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "あなたの宿を調べる｜宿曜占い・誕生日の宿",
  description: "TikTokで話題の宿曜占星術。生年月日の月と日を入れるだけで、あなたの宿がわかります。",
};

export default function LandingPage() {
  return (
    <div className="max-w-lg mx-auto py-6">
      {/* ヘッダー */}
      <div className="text-center mb-8">
        <p className="text-purple-500 text-sm font-medium mb-2">TikTokで話題の占い</p>
        <h1 className="text-3xl font-bold text-purple-900 mb-3">宿曜占い</h1>
        <p className="text-purple-600 text-sm">
          1200年前、空海が伝えた星の学問<br />
          誕生日の月と日だけで、あなたの本質がわかる
        </p>
      </div>

      {/* 診断ツール */}
      <div className="mb-8">
        <ShukuDiagnosisTool />
      </div>

      {/* リンク集 */}
      <div className="space-y-3 mb-8">
        <Link
          href="/aishyo"
          className="flex items-center gap-4 bg-white border border-purple-200 rounded-xl p-4 hover:border-purple-400 hover:shadow-md transition-all"
        >
          <span className="text-2xl">💫</span>
          <div>
            <p className="font-bold text-purple-900 text-sm">相性診断</p>
            <p className="text-xs text-purple-500">二人の宿の相性を調べる</p>
          </div>
          <span className="ml-auto text-purple-400">→</span>
        </Link>

        <Link
          href="/seikaku"
          className="flex items-center gap-4 bg-white border border-purple-200 rounded-xl p-4 hover:border-purple-400 hover:shadow-md transition-all"
        >
          <span className="text-2xl">🌙</span>
          <div>
            <p className="font-bold text-purple-900 text-sm">27宿の性格診断</p>
            <p className="text-xs text-purple-500">全宿の性格・才能を詳しく解説</p>
          </div>
          <span className="ml-auto text-purple-400">→</span>
        </Link>

        <Link
          href="/unmei"
          className="flex items-center gap-4 bg-white border border-purple-200 rounded-xl p-4 hover:border-purple-400 hover:shadow-md transition-all"
        >
          <span className="text-2xl">✨</span>
          <div>
            <p className="font-bold text-purple-900 text-sm">宿別・恋愛と運勢</p>
            <p className="text-xs text-purple-500">恋愛傾向・仕事運・金運を解説</p>
          </div>
          <span className="ml-auto text-purple-400">→</span>
        </Link>
      </div>

      {/* 宿曜とは */}
      <div className="bg-white border border-purple-200 rounded-xl p-5 text-center">
        <p className="text-xs text-purple-400 mb-2">宿曜占星術とは</p>
        <p className="text-sm text-purple-700 leading-relaxed">
          今から約1200年前、弘法大師・空海が唐から日本に持ち帰った密教の占術。月が通る27の「宿」で人の性格・運命を読み解きます。
        </p>
      </div>
    </div>
  );
}
