import Link from "next/link";
import ShukuDiagnosisTool from "@/components/ShukuDiagnosisTool";
import categories from "@/data/categories.json";

export default function Home() {

  return (
    <div>
      {/* ヒーロー */}
      <section className="bg-gradient-to-r from-purple-900 via-violet-900 to-indigo-900 text-white rounded-xl p-8 mb-8 relative overflow-hidden">
        <div className="relative z-10">
          <p className="text-purple-300 text-sm font-medium mb-2 tracking-widest uppercase">
            1200年の秘術
          </p>
          <h1 className="text-3xl md:text-4xl font-bold mb-3 leading-tight">
            あなたの宿を知る。<br />
            <span className="text-purple-300">宿曜占星術</span>で運命を読み解く。
          </h1>
          <p className="text-purple-200 text-base md:text-lg max-w-xl">
            空海が日本に伝えた1200年の星の学問。生年月日の「月・日」だけでわかる、あなたの宿（星）と運命。
          </p>
        </div>
        {/* 装飾 */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-32 h-32 bg-violet-400/10 rounded-full translate-y-1/2 pointer-events-none" />
      </section>

      {/* 診断ツール（メインコンテンツ最上部） */}
      <section className="mb-10">
        <ShukuDiagnosisTool />
      </section>

      {/* 宿曜占星術とは */}
      <section className="bg-white rounded-xl border border-purple-100 p-6 mb-8">
        <h2 className="text-xl font-bold text-purple-900 mb-4">宿曜占星術とは？</h2>
        <div className="grid md:grid-cols-3 gap-4 text-sm text-purple-800/80">
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="text-2xl mb-2">🌙</div>
            <h3 className="font-bold text-purple-900 mb-1">月の軌道が基礎</h3>
            <p>月が27日間で天空を一周する軌道を27区域に分け、それぞれに「宿（しゅく）」と名付けた星の学問です。</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="text-2xl mb-2">🔮</div>
            <h3 className="font-bold text-purple-900 mb-1">空海が伝えた秘術</h3>
            <p>平安時代に空海（弘法大師）がインドから日本に伝えたとされる占星術。朝廷や武将も重用しました。</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="text-2xl mb-2">✨</div>
            <h3 className="font-bold text-purple-900 mb-1">27の宿で性格がわかる</h3>
            <p>昴宿・心宿・鬼宿など27の宿に分類。生年月日の「月・日」から、あなたの宿と本質的な性格がわかります。</p>
          </div>
        </div>
      </section>

      {/* カテゴリ */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-purple-900 mb-4">カテゴリから探す</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.filter((cat) => cat.slug !== "shuku").map((cat) => (
            <Link
              key={cat.slug}
              href={`/${cat.slug}`}
              className="bg-white rounded-lg border border-purple-200 p-4 text-center hover:shadow-lg hover:shadow-purple-900/20 transition-shadow"
            >
              <div
                className="w-3 h-3 rounded-full mx-auto mb-2"
                style={{ backgroundColor: cat.color }}
              />
              <h3 className="font-bold text-purple-800 text-sm">{cat.name}</h3>
              <p className="text-xs text-purple-600/70 mt-1 line-clamp-2">
                {cat.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}
