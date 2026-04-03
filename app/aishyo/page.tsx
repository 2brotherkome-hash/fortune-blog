import CompatibilityTool from "@/components/CompatibilityTool";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "宿の相性診断",
  description:
    "宿曜占星術で二人の宿の相性を診断。恋愛・友人・仕事のパートナーとの相性を詳しく解説します。",
};

export default function AishyoPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-purple-900 mb-3">宿の相性診断</h1>
        <p className="text-purple-700/80">
          宿曜占星術では、27の宿それぞれに相性の良し悪しがあります。恋人・友人・職場のパートナーとの相性を調べてみましょう。
        </p>
      </div>
      <CompatibilityTool />
      <div className="mt-10 bg-white rounded-xl border border-purple-200 p-6">
        <h2 className="text-lg font-bold text-purple-900 mb-3">相性診断の見方</h2>
        <ul className="space-y-2 text-sm text-purple-700/80">
          <li>
            ⭐⭐⭐⭐⭐ <strong>最高の相性</strong>
            ：お互いの長所が引き出し合える最高の組み合わせ
          </li>
          <li>
            ⭐⭐⭐⭐ <strong>相性良好</strong>
            ：自然と気が合い、長続きする関係が築けます
          </li>
          <li>
            ⭐⭐⭐ <strong>普通</strong>
            ：大きな問題はなく、お互いを理解することで良い関係に
          </li>
          <li>
            ⭐⭐ <strong>やや注意</strong>：価値観のズレが出やすい。思いやりを意識して
          </li>
          <li>
            ⭐ <strong>難しい相性</strong>
            ：真逆の性質を持つ組み合わせ。理解し合えれば補い合える
          </li>
        </ul>
      </div>
    </div>
  );
}
