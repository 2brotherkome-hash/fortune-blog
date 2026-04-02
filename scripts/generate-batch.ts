import { execSync } from "child_process";
import fs from "fs";
import path from "path";

type ArticlePlan = {
  template: string;
  keyword: string;
  category: string;
  slug: string;
  services?: string;
  topic?: string;
  serviceName?: string;
  audience?: string;
  affiliateIds?: string[];
};

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log(`
Usage: npx tsx scripts/generate-batch.ts <plan-file.json>

Plan file format (JSON array):
[
  {
    "template": "comparison",
    "keyword": "SBI証券 楽天証券 比較",
    "category": "nisa",
    "slug": "sbi-vs-rakuten",
    "services": "SBI証券, 楽天証券",
    "affiliateIds": ["sbi-securities", "rakuten-securities"]
  },
  ...
]
`);
    process.exit(0);
  }

  const planFile = path.resolve(args[0]);
  const plans: ArticlePlan[] = JSON.parse(fs.readFileSync(planFile, "utf8"));

  console.log(`Generating ${plans.length} articles...\n`);

  for (let i = 0; i < plans.length; i++) {
    const plan = plans[i];
    console.log(`[${i + 1}/${plans.length}] ${plan.keyword}`);

    try {
      execSync(
        `npx tsx scripts/generate-article.ts '${JSON.stringify(plan)}'`,
        { cwd: process.cwd(), stdio: "inherit" }
      );
      console.log(`  -> Done!\n`);
    } catch (err) {
      console.error(`  -> Failed: ${err}\n`);
    }

    // Rate limit: wait 2 seconds between API calls
    if (i < plans.length - 1) {
      await new Promise((r) => setTimeout(r, 2000));
    }
  }

  console.log("\nBatch generation complete!");
  console.log("Review the articles in content/articles/ then run: npx tsx scripts/publish.ts");
}

main().catch(console.error);
