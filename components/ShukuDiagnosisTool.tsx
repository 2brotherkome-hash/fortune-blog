"use client";
import { useState } from "react";
import Link from "next/link";

const SHUKU_LIST = [
  { name: "昴", slug: "bou", read: "ぼうしゅく", catch: "華やかな存在感と強い意志を持つ星" },
  { name: "畢", slug: "hitsu", read: "ひっしゅく", catch: "堅実な努力で夢をつかむ勤勉の星" },
  { name: "觜", slug: "shi", read: "ししゅく", catch: "鋭い知性と表現力を持つ言葉の星" },
  { name: "参", slug: "san", read: "しんしゅく", catch: "強さと優しさを兼ね備えた守護の星" },
  { name: "井", slug: "sei", read: "せいしゅく", catch: "豊かな発想力と社交性を持つ繁栄の星" },
  { name: "鬼", slug: "oni", read: "きしゅく", catch: "深い洞察力と変革の力を持つ星" },
  { name: "柳", slug: "ryu", read: "りゅうしゅく", catch: "しなやかな適応力と感受性の星" },
  { name: "星", slug: "hoshi", read: "せいしゅく", catch: "輝きと個性で人を惹きつける星" },
  { name: "張", slug: "cho", read: "ちょうしゅく", catch: "広い視野と包容力を持つ大器の星" },
  { name: "翼", slug: "yoku", read: "よくしゅく", catch: "自由を愛し高みを目指す飛翔の星" },
  { name: "軫", slug: "jin", read: "じんしゅく", catch: "深い思慮と誠実さを持つ信頼の星" },
  { name: "角", slug: "kaku", read: "かくしゅく", catch: "先見の明と正義感あふれるリーダーの星" },
  { name: "亢", slug: "ko", read: "こうしゅく", catch: "真実を追い求める探求者の星" },
  { name: "氐", slug: "tei", read: "ていしゅく", catch: "穏やかな安定感と深い愛情の星" },
  { name: "房", slug: "fusa", read: "ぼうしゅく", catch: "温かい人間関係と繁栄をもたらす星" },
  { name: "心", slug: "kokoro", read: "しんしゅく", catch: "情熱と直感力で運命を切り拓く星" },
  { name: "尾", slug: "bi", read: "びしゅく", catch: "粘り強さと再生の力を持つ不死鳥の星" },
  { name: "箕", slug: "mino", read: "きしゅく", catch: "豊かな収穫と実りをもたらす星" },
  { name: "斗", slug: "to", read: "としゅく", catch: "着実に目標へ進む意志の星" },
  { name: "牛", slug: "gyu", read: "ぎゅうしゅく", catch: "勤勉と忍耐で大きな富を築く星" },
  { name: "女", slug: "jo", read: "じょしゅく", catch: "柔軟な知恵と人を包む温かさの星" },
  { name: "虚", slug: "kyo", read: "きょしゅく", catch: "無限の可能性を秘めた変化の星" },
  { name: "危", slug: "ki", read: "きしゅく", catch: "変化を恐れず前進する勇気の星" },
  { name: "室", slug: "shitsu", read: "しつしゅく", catch: "深い精神性と守護の力を持つ星" },
  { name: "壁", slug: "heki", read: "へきしゅく", catch: "知識と学びで人生を豊かにする星" },
  { name: "奎", slug: "kei", read: "けいしゅく", catch: "創造力と文才に恵まれた芸術の星" },
  { name: "婁", slug: "ro", read: "ろうしゅく", catch: "人を集め縁をつなぐ絆の星" },
];

function getShuku(month: number, day: number) {
  const ref = new Date(2000, 0, 1);
  const target = new Date(2000, month - 1, day);
  const days = Math.round((target.getTime() - ref.getTime()) / (1000 * 60 * 60 * 24));
  const index = ((days % 27) + 27) % 27;
  return { ...SHUKU_LIST[index], index };
}

export default function ShukuDiagnosisTool() {
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [result, setResult] = useState<(typeof SHUKU_LIST[0] & { index: number }) | null>(null);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    const m = parseInt(month);
    const d = parseInt(day);
    if (!m || !d || m < 1 || m > 12 || d < 1 || d > 31) {
      setError("正しい月と日を入力してください");
      return;
    }
    setError("");
    setResult(getShuku(m, d));
  };

  return (
    <div className="bg-gradient-to-br from-purple-900 to-violet-800 rounded-2xl p-8 text-white">
      <div className="flex gap-3 justify-center mb-4">
        <div className="flex items-center gap-2">
          <input
            type="number"
            min="1"
            max="12"
            placeholder="月"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="w-20 text-center text-lg font-bold bg-white/20 border border-white/30 rounded-lg px-3 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white/60"
          />
          <span className="text-lg">月</span>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min="1"
            max="31"
            placeholder="日"
            value={day}
            onChange={(e) => setDay(e.target.value)}
            className="w-20 text-center text-lg font-bold bg-white/20 border border-white/30 rounded-lg px-3 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white/60"
          />
          <span className="text-lg">日</span>
        </div>
      </div>

      {error && <p className="text-red-300 text-center text-sm mb-3">{error}</p>}

      <div className="text-center mb-6">
        <button
          onClick={handleSubmit}
          className="bg-white text-purple-800 font-bold px-10 py-3 rounded-full text-lg hover:bg-purple-100 transition-colors shadow-lg"
        >
          宿を調べる ✨
        </button>
      </div>

      {result && (
        <div className="bg-white/10 backdrop-blur rounded-xl p-6 text-center border border-white/20">
          <p className="text-purple-200 text-sm mb-1">あなたの宿は</p>
          <p className="text-5xl font-bold mb-1">{result.name}宿</p>
          <p className="text-purple-200 text-base mb-3">（{result.read}）</p>
          <p className="text-white text-base mb-5">{result.catch}</p>
          <Link
            href={`/seikaku/${result.slug}-shuku`}
            className="inline-block bg-white text-purple-800 font-bold px-8 py-2 rounded-full hover:bg-purple-100 transition-colors text-sm"
          >
            {result.name}宿の詳細を見る →
          </Link>
        </div>
      )}
    </div>
  );
}
