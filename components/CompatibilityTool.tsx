"use client";
import { useState } from "react";
import compatibilityData from "@/data/compatibility.json";

const SHUKU_LIST = [
  { name: "昴", read: "ぼうしゅく" },
  { name: "畢", read: "ひっしゅく" },
  { name: "觜", read: "ししゅく" },
  { name: "参", read: "しんしゅく" },
  { name: "井", read: "せいしゅく" },
  { name: "鬼", read: "きしゅく" },
  { name: "柳", read: "りゅうしゅく" },
  { name: "星", read: "せいしゅく" },
  { name: "張", read: "ちょうしゅく" },
  { name: "翼", read: "よくしゅく" },
  { name: "軫", read: "しんしゅく" },
  { name: "角", read: "かくしゅく" },
  { name: "亢", read: "こうしゅく" },
  { name: "氐", read: "ていしゅく" },
  { name: "房", read: "ぼうしゅく" },
  { name: "心", read: "しんしゅく" },
  { name: "尾", read: "びしゅく" },
  { name: "箕", read: "きしゅく" },
  { name: "斗", read: "としゅく" },
  { name: "牛", read: "ぎゅうしゅく" },
  { name: "女", read: "じょしゅく" },
  { name: "虚", read: "きょしゅく" },
  { name: "危", read: "きしゅく" },
  { name: "室", read: "しつしゅく" },
  { name: "壁", read: "へきしゅく" },
  { name: "奎", read: "けいしゅく" },
  { name: "婁", read: "ろうしゅく" },
];

function getShukuFromDate(month: number, day: number) {
  const ref = new Date(2000, 0, 1);
  const target = new Date(2000, month - 1, day);
  const days = Math.round((target.getTime() - ref.getTime()) / (1000 * 60 * 60 * 24));
  return SHUKU_LIST[((days % 27) + 27) % 27];
}

function StarScore({ score }: { score: number }) {
  return (
    <div className="flex justify-center gap-1 text-2xl my-2">
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={i <= score ? "text-yellow-400" : "text-purple-200/30"}>
          ★
        </span>
      ))}
    </div>
  );
}

export default function CompatibilityTool() {
  const [mode, setMode] = useState<"select" | "date">("select");
  const [shuku1, setShuku1] = useState("");
  const [shuku2, setShuku2] = useState("");
  const [month1, setMonth1] = useState("");
  const [day1, setDay1] = useState("");
  const [month2, setMonth2] = useState("");
  const [day2, setDay2] = useState("");
  const [result, setResult] = useState<{
    score: number;
    label: string;
    comment: string;
  } | null>(null);
  const [names, setNames] = useState<{ a: string; b: string }>({ a: "", b: "" });
  const [error, setError] = useState("");

  const handleCheck = () => {
    let a = shuku1,
      b = shuku2;
    if (mode === "date") {
      const m1 = parseInt(month1),
        d1 = parseInt(day1);
      const m2 = parseInt(month2),
        d2 = parseInt(day2);
      if (!m1 || !d1 || !m2 || !d2) {
        setError("月と日を入力してください");
        return;
      }
      a = getShukuFromDate(m1, d1).name;
      b = getShukuFromDate(m2, d2).name;
    }
    if (!a || !b) {
      setError("宿を選んでください");
      return;
    }
    setError("");
    const data = compatibilityData as Record<
      string,
      Record<string, { score: number; label: string; comment: string }>
    >;
    const comp = data[a]?.[b] || data[b]?.[a];
    if (comp) {
      setResult(comp);
      setNames({ a, b });
    }
  };

  return (
    <div className="bg-gradient-to-br from-purple-900 to-violet-800 rounded-2xl p-8 text-white">
      <h2 className="text-2xl font-bold text-center mb-2">宿の相性を調べる</h2>
      <p className="text-purple-200 text-center text-sm mb-6">二人の宿を選んで相性を診断</p>

      {/* モード切替 */}
      <div className="flex justify-center gap-3 mb-6">
        <button
          onClick={() => setMode("select")}
          className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${
            mode === "select" ? "bg-white text-purple-800" : "bg-white/20 text-white"
          }`}
        >
          宿で選ぶ
        </button>
        <button
          onClick={() => setMode("date")}
          className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${
            mode === "date" ? "bg-white text-purple-800" : "bg-white/20 text-white"
          }`}
        >
          誕生日で調べる
        </button>
      </div>

      {mode === "select" ? (
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-sm text-purple-200 mb-2 text-center">自分の宿</p>
            <select
              value={shuku1}
              onChange={(e) => setShuku1(e.target.value)}
              className="w-full bg-white/20 border border-white/30 rounded-lg px-3 py-3 text-white focus:outline-none"
            >
              <option value="" className="text-gray-800">
                選んでください
              </option>
              {SHUKU_LIST.map((s) => (
                <option key={s.name} value={s.name} className="text-gray-800">
                  {s.name}宿（{s.read}）
                </option>
              ))}
            </select>
          </div>
          <div>
            <p className="text-sm text-purple-200 mb-2 text-center">相手の宿</p>
            <select
              value={shuku2}
              onChange={(e) => setShuku2(e.target.value)}
              className="w-full bg-white/20 border border-white/30 rounded-lg px-3 py-3 text-white focus:outline-none"
            >
              <option value="" className="text-gray-800">
                選んでください
              </option>
              {SHUKU_LIST.map((s) => (
                <option key={s.name} value={s.name} className="text-gray-800">
                  {s.name}宿（{s.read}）
                </option>
              ))}
            </select>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-sm text-purple-200 mb-2 text-center">自分の誕生日</p>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="月"
                value={month1}
                onChange={(e) => setMonth1(e.target.value)}
                className="w-full bg-white/20 border border-white/30 rounded-lg px-2 py-3 text-white text-center placeholder-white/50 focus:outline-none"
                min="1"
                max="12"
              />
              <input
                type="number"
                placeholder="日"
                value={day1}
                onChange={(e) => setDay1(e.target.value)}
                className="w-full bg-white/20 border border-white/30 rounded-lg px-2 py-3 text-white text-center placeholder-white/50 focus:outline-none"
                min="1"
                max="31"
              />
            </div>
          </div>
          <div>
            <p className="text-sm text-purple-200 mb-2 text-center">相手の誕生日</p>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="月"
                value={month2}
                onChange={(e) => setMonth2(e.target.value)}
                className="w-full bg-white/20 border border-white/30 rounded-lg px-2 py-3 text-white text-center placeholder-white/50 focus:outline-none"
                min="1"
                max="12"
              />
              <input
                type="number"
                placeholder="日"
                value={day2}
                onChange={(e) => setDay2(e.target.value)}
                className="w-full bg-white/20 border border-white/30 rounded-lg px-2 py-3 text-white text-center placeholder-white/50 focus:outline-none"
                min="1"
                max="31"
              />
            </div>
          </div>
        </div>
      )}

      {error && <p className="text-red-300 text-center text-sm mb-3">{error}</p>}

      <div className="text-center mb-6">
        <button
          onClick={handleCheck}
          className="bg-white text-purple-800 font-bold px-10 py-3 rounded-full text-lg hover:bg-purple-100 transition-colors shadow-lg"
        >
          相性を診断する 💫
        </button>
      </div>

      {result && (
        <div className="bg-white/10 backdrop-blur rounded-xl p-6 text-center border border-white/20">
          <p className="text-purple-200 text-sm mb-1">
            {names.a}宿 × {names.b}宿
          </p>
          <p className="text-2xl font-bold mb-1">{result.label}</p>
          <StarScore score={result.score} />
          <p className="text-white text-sm leading-relaxed mt-3">{result.comment}</p>
        </div>
      )}
    </div>
  );
}
