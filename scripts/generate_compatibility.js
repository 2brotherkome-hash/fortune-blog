// 宿曜占星術の相性データを生成するスクリプト
// 27宿の全組み合わせ (27×27) を作成

const SHUKU_LIST = [
  "昴", "畢", "觜", "参", "井", "鬼", "柳", "星", "張",
  "翼", "軫", "角", "亢", "氐", "房", "心", "尾", "箕",
  "斗", "牛", "女", "虚", "危", "室", "壁", "奎", "婁",
];

// 七宿グループ（方位別）
// 西方七宿: 奎・婁・胃(なし)・昴・畢・觜・参
// 南方七宿: 井・鬼・柳・星・張・翼・軫
// 東方七宿: 角・亢・氐・房・心・尾・箕
// 北方七宿: 斗・牛・女・虚・危・室・壁

const GROUPS = {
  "西方": ["昴", "畢", "觜", "参", "奎", "婁"],
  "南方": ["井", "鬼", "柳", "星", "張", "翼", "軫"],
  "東方": ["角", "亢", "氐", "房", "心", "尾", "箕"],
  "北方": ["斗", "牛", "女", "虚", "危", "室", "壁"],
};

// 三合の組（宿曜占星術における吉の関係）
// 順序: 0-26 のインデックスで、9宿ごとに相性が良い
const SANKIN_PAIRS = [
  // 例: 昴(0), 張(8), 尾(16) は三合
  [0, 9, 18],   // 昴・翼・斗
  [1, 10, 19],  // 畢・軫・牛
  [2, 11, 20],  // 觜・角・女
  [3, 12, 21],  // 参・亢・虚
  [4, 13, 22],  // 井・氐・危
  [5, 14, 23],  // 鬼・房・室
  [6, 15, 24],  // 柳・心・壁
  [7, 16, 25],  // 星・尾・奎
  [8, 17, 26],  // 張・箕・婁
];

// 対立（180度、13宿離れた宿）
function isOpposite(i, j) {
  const diff = Math.abs(i - j);
  return diff === 13 || diff === 14;
}

// 三合かどうか
function isSankin(i, j) {
  for (const group of SANKIN_PAIRS) {
    if (group.includes(i) && group.includes(j) && i !== j) return true;
  }
  return false;
}

// 同グループかどうか
function isSameGroup(nameA, nameB) {
  for (const members of Object.values(GROUPS)) {
    if (members.includes(nameA) && members.includes(nameB)) return true;
  }
  return false;
}

// 隣接（1〜2宿差）
function isAdjacent(i, j) {
  const diff = Math.min(Math.abs(i - j), 27 - Math.abs(i - j));
  return diff === 1 || diff === 2;
}

// 相性コメントデータ
const SCORE_COMMENTS = {
  5: [
    "お互いの強みが共鳴し、一緒にいることで両方が成長できる最高の組み合わせです。深い信頼と理解が自然と生まれます。",
    "まるで運命で結ばれたかのような深い縁があります。共に過ごす時間が輝かしい体験となるでしょう。",
    "二人の波長がぴったり合い、言葉にしなくても伝わる部分が多い理想的な関係です。",
    "お互いの長所を引き出し合い、一緒にいるだけで可能性が広がる最良のパートナーです。",
    "星の巡りが味方する絶妙な組み合わせ。お互いに高め合い、共に輝ける関係です。",
  ],
  4: [
    "価値観が近く、自然と気が合います。長く続く安定した関係が築けるでしょう。",
    "お互いを尊重し合える良好な関係。一緒にいると心が落ち着き、安心感があります。",
    "共通点が多く、意気投合しやすい組み合わせです。友情も恋愛も長続きする縁があります。",
    "自然なペースで深まる関係。無理をせず、お互いのペースを大切にできる良いパートナーです。",
    "信頼関係が築きやすく、困ったときに支え合える頼もしい相手です。",
  ],
  3: [
    "大きな衝突はなく、お互いを理解することで良い関係に発展できます。歩み寄りが大切です。",
    "可もなく不可もない関係ですが、お互いの違いを楽しむことで化学反応が生まれることも。",
    "普通の相性ですが、共通の目標を持つことで絆が深まります。努力次第で良い関係に。",
    "最初は距離感があるかもしれませんが、時間をかけて理解し合えば安定した関係になれます。",
    "お互いの個性が少し異なりますが、それが刺激になることも。柔軟な姿勢が関係を育みます。",
  ],
  2: [
    "価値観のズレが出やすい組み合わせです。思いやりを持ち、相手の立場を意識することが大切。",
    "すれ違いが起きやすいですが、コミュニケーションを大切にすることで乗り越えられます。",
    "お互いの違いが摩擦を生みやすいです。相手の良いところを意識的に見つけることで改善できます。",
    "意見の違いが出やすい組み合わせ。忍耐力を持って接することで関係が安定していきます。",
    "少し努力が必要な相性ですが、お互いを認め合うことで成長できる関係にもなれます。",
  ],
  1: [
    "真逆の性質を持つ組み合わせ。理解し合うには時間と努力が必要ですが、互いに補い合える可能性も秘めています。",
    "性格や価値観の違いが大きく、衝突しやすいですが、お互いの違いを受け入れることで成長のチャンスになります。",
    "難しい相性ですが、乗り越えることでより強い絆が生まれることも。相手を変えようとせず、尊重することが鍵です。",
    "正反対の性質を持つため誤解が生じやすいですが、それだけに学び合いの深い関係になれる可能性もあります。",
    "摩擦が起きやすい組み合わせ。お互いの長所を活かし短所を補い合う視点を持てると関係が変わります。",
  ],
};

// 似た者同士（同じ宿）のコメント
const SAME_COMMENTS = [
  "同じ宿同士の組み合わせ。お互いの気持ちがよくわかる反面、同じ欠点を持つ似た者同士です。理解し合えますが、成長するには違いも大切に。",
  "同じ宿同士は、まるで鏡のような存在。共感できる部分が多い一方、お互いの課題も似通っています。",
  "同じ星の下に生まれた似た者同士。息が合う反面、刺激を求めるなら違いも大切にしましょう。",
];

function getComment(score, index) {
  const arr = SCORE_COMMENTS[score];
  return arr[index % arr.length];
}

// スコアを決定するロジック
function calcScore(i, j) {
  if (i === j) return null; // 同じ宿は別処理

  const nameA = SHUKU_LIST[i];
  const nameB = SHUKU_LIST[j];

  // 三合 → 最高
  if (isSankin(i, j)) return 5;

  // 同グループ → 相性良好〜最高
  if (isSameGroup(nameA, nameB)) return 5;

  // 対立 → 難しい
  if (isOpposite(i, j)) return 1;

  // 隣接 → 良好
  if (isAdjacent(i, j)) return 4;

  // 差が5〜8: 普通〜良好
  const diff = Math.min(Math.abs(i - j), 27 - Math.abs(i - j));
  if (diff === 3 || diff === 4) return 4;
  if (diff === 5 || diff === 6) return 3;
  if (diff === 7 || diff === 8) return 3;
  if (diff === 9 || diff === 10) return 2;
  if (diff === 11 || diff === 12) return 2;

  return 3;
}

const LABELS = {
  5: "最高の相性",
  4: "相性良好",
  3: "普通",
  2: "やや注意",
  1: "難しい相性",
};

// データ生成
const result = {};
let commentCounter = 0;

for (let i = 0; i < 27; i++) {
  const nameA = SHUKU_LIST[i];
  result[nameA] = {};

  for (let j = 0; j < 27; j++) {
    const nameB = SHUKU_LIST[j];

    if (i === j) {
      // 同じ宿同士
      result[nameA][nameB] = {
        score: 4,
        label: "似た者同士",
        comment: SAME_COMMENTS[i % SAME_COMMENTS.length],
      };
    } else {
      const score = calcScore(i, j);
      result[nameA][nameB] = {
        score,
        label: LABELS[score],
        comment: getComment(score, commentCounter++),
      };
    }
  }
}

// 出力
const fs = require("fs");
const outputPath = "/Users/mca-tk/fortune-blog/data/compatibility.json";
fs.writeFileSync(outputPath, JSON.stringify(result, null, 2), "utf-8");

// 統計確認
let counts = {1:0, 2:0, 3:0, 4:0, 5:0};
for (const row of Object.values(result)) {
  for (const cell of Object.values(row)) {
    counts[cell.score]++;
  }
}
console.log("生成完了:", outputPath);
console.log("合計エントリ数:", 27 * 27);
console.log("スコア分布:", counts);
