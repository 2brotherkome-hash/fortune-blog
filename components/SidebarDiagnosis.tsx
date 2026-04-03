"use client";
import { useState } from "react";
import Link from "next/link";

const SHUKU_LIST = [
  { name: "昴" }, { name: "畢" }, { name: "觜" }, { name: "参" },
  { name: "井" }, { name: "鬼" }, { name: "柳" }, { name: "星" },
  { name: "張" }, { name: "翼" }, { name: "軫" }, { name: "角" },
  { name: "亢" }, { name: "氐" }, { name: "房" }, { name: "心" },
  { name: "尾" }, { name: "箕" }, { name: "斗" }, { name: "牛" },
  { name: "女" }, { name: "虚" }, { name: "危" }, { name: "室" },
  { name: "壁" }, { name: "奎" }, { name: "婁" },
];

function getShuku(month: number, day: number) {
  const ref = new Date(2000, 0, 1);
  const target = new Date(2000, month - 1, day);
  const days = Math.round((target.getTime() - ref.getTime()) / (1000 * 60 * 60 * 24));
  return SHUKU_LIST[((days % 27) + 27) % 27];
}

export default function SidebarDiagnosis() {
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [result, setResult] = useState<{ name: string } | null>(null);

  const handleCheck = () => {
    const m = parseInt(month), d = parseInt(day);
    if (!m || !d || m < 1 || m > 12 || d < 1 || d > 31) return;
    setResult(getShuku(m, d));
  };

  return (
    <div className="bg-gradient-to-br from-purple-800 to-violet-700 rounded-xl p-5 text-white">
      <h3 className="font-bold text-center mb-1 text-base">あなたの宿は？</h3>
      <p className="text-purple-200 text-xs text-center mb-4">誕生日の月・日を入力</p>

      <div className="flex gap-2 mb-3">
        <input
          type="number" min="1" max="12" placeholder="月"
          value={month} onChange={e => setMonth(e.target.value)}
          className="w-full text-center bg-white/20 border border-white/30 rounded-lg py-2 text-white placeholder-white/50 focus:outline-none text-sm"
        />
        <input
          type="number" min="1" max="31" placeholder="日"
          value={day} onChange={e => setDay(e.target.value)}
          className="w-full text-center bg-white/20 border border-white/30 rounded-lg py-2 text-white placeholder-white/50 focus:outline-none text-sm"
        />
      </div>

      <button
        onClick={handleCheck}
        className="w-full bg-white text-purple-800 font-bold py-2 rounded-lg text-sm hover:bg-purple-100 transition-colors"
      >
        調べる ✨
      </button>

      {result && (
        <div className="mt-4 bg-white/15 rounded-lg p-3 text-center">
          <p className="text-purple-200 text-xs mb-1">あなたの宿</p>
          <p className="text-3xl font-bold mb-2">{result.name}宿</p>
          <Link
            href={`/seikaku/${result.name}shuku`}
            className="block text-xs bg-white text-purple-800 font-bold py-1.5 rounded-lg hover:bg-purple-100 transition-colors"
          >
            詳細を見る →
          </Link>
        </div>
      )}
    </div>
  );
}
