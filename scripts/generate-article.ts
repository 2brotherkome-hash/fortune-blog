import Anthropic from "@anthropic-ai/sdk";
import fs from "fs";
import path from "path";

const client = new Anthropic();

type TemplateType = "comparison" | "guide" | "review" | "knowledge";

type GenerateOptions = {
  template: TemplateType;
  keyword: string;
  category: string;
  slug: string;
  // template-specific
  services?: string;
  topic?: string;
  serviceName?: string;
  audience?: string;
  affiliateIds?: string[];
};

function loadTemplate(type: TemplateType): string {
  const templatePath = path.join(__dirname, "templates", `${type}.md`);
  return fs.readFileSync(templatePath, "utf8");
}

function fillTemplate(template: string, vars: Record<string, string>): string {
  let result = template;
  for (const [key, value] of Object.entries(vars)) {
    result = result.replace(new RegExp(`\\{\\{${key}\\}\\}`, "g"), value);
  }
  return result;
}

async function generateArticle(options: GenerateOptions): Promise<string> {
  const template = loadTemplate(options.template);

  const vars: Record<string, string> = {
    keyword: options.keyword,
    category: options.category,
    services: options.services || "",
    topic: options.topic || "",
    serviceName: options.serviceName || "",
    audience: options.audience || "投資初心者",
  };

  const prompt = fillTemplate(template, vars);

  console.log(`Generating article: ${options.keyword}...`);

  const message = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 4096,
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  const content = message.content[0];
  if (content.type !== "text") throw new Error("Unexpected response type");

  return content.text;
}

function saveArticle(options: GenerateOptions, content: string): string {
  const frontmatter = `---
title: "${options.keyword}"
description: "${options.keyword}について分かりやすく解説します。"
category: "${options.category}"
date: "${new Date().toISOString().split("T")[0]}"
template: "${options.template}"
affiliateIds: [${(options.affiliateIds || []).map((id) => `"${id}"`).join(", ")}]
---

`;

  const articleDir = path.join(
    process.cwd(),
    "content/articles",
    options.category
  );
  fs.mkdirSync(articleDir, { recursive: true });

  const filePath = path.join(articleDir, `${options.slug}.md`);
  fs.writeFileSync(filePath, frontmatter + content);

  console.log(`Saved: ${filePath}`);
  return filePath;
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log(`
Usage: npx tsx scripts/generate-article.ts <options>

Options (JSON string):
  template:     comparison | guide | review | knowledge
  keyword:      SEO target keyword
  category:     nisa | fx | credit-card | bank
  slug:         URL slug
  services:     (comparison) comma-separated service names
  topic:        (guide/knowledge) article topic
  serviceName:  (review) service name to review
  audience:     (knowledge) target audience
  affiliateIds: array of affiliate IDs from affiliates.json

Example:
  npx tsx scripts/generate-article.ts '{
    "template": "comparison",
    "keyword": "SBI証券 楽天証券 比較",
    "category": "nisa",
    "slug": "sbi-vs-rakuten",
    "services": "SBI証券, 楽天証券",
    "affiliateIds": ["sbi-securities", "rakuten-securities"]
  }'
`);
    process.exit(0);
  }

  const options: GenerateOptions = JSON.parse(args[0]);
  const content = await generateArticle(options);
  const filePath = saveArticle(options, content);

  console.log("\nArticle generated successfully!");
  console.log(`File: ${filePath}`);
  console.log("\nNext steps:");
  console.log("1. Review the article content");
  console.log("2. Run: npx tsx scripts/publish.ts");
}

main().catch(console.error);
