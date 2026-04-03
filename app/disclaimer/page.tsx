import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "免責事項",
  description: "宿曜占い｜誕生日の宿の免責事項ページです。",
};

export default function DisclaimerPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-purple-900 mb-8">免責事項</h1>

      <div className="space-y-8 text-purple-800/80 text-sm leading-relaxed">
        <section>
          <h2 className="text-lg font-bold text-purple-900 mb-3">コンテンツの正確性について</h2>
          <p>
            当サイトに掲載されている占い・運勢・相性に関するコンテンツは、
            宿曜占星術に基づく参考情報であり、その内容の正確性・完全性を保証するものではありません。
            掲載内容によって生じた損害について、当サイトは一切の責任を負いません。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-purple-900 mb-3">占いコンテンツについて</h2>
          <p>
            当サイトの占いコンテンツはエンターテインメント・参考情報として提供しています。
            重要な人生の決断（医療・法律・財務・人間関係等）は、専門家にご相談ください。
            占いの結果のみに基づいた判断はお控えいただくことをお勧めします。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-purple-900 mb-3">リンク先について</h2>
          <p>
            当サイトからリンクしている外部サイトの内容・運営については、
            当サイトは一切の責任を負いません。
            リンク先サービスのご利用は、各サービスの利用規約に従ってください。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-purple-900 mb-3">アフィリエイトリンクについて</h2>
          <p>
            当サイトにはアフィリエイトリンクが含まれています。
            リンクを経由して申し込みが行われた場合、当サイトが報酬を受け取ることがありますが、
            これによって掲載情報の客観性を損なうことはありません。
            紹介しているサービスは当サイトが実際に価値があると判断したものに限っています。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-purple-900 mb-3">著作権について</h2>
          <p>
            当サイトに掲載されている文章・画像等のコンテンツの著作権は、
            当サイトまたは正当な権利者に帰属します。
            無断での複製・転用はお控えください。
          </p>
        </section>

        <p className="text-xs text-purple-400 pt-4 border-t border-purple-100">
          制定日：2026年4月1日
        </p>
      </div>
    </div>
  );
}
