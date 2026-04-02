import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import html from "remark-html";

const articlesDir = path.join(process.cwd(), "content/articles");

export type ArticleMeta = {
  title: string;
  description: string;
  category: string;
  slug: string;
  date: string;
  affiliateIds?: string[];
  template?: string;
};

export type Article = ArticleMeta & {
  content: string;
};

export function getAllArticles(): ArticleMeta[] {
  const categories = fs.readdirSync(articlesDir).filter((f) => {
    return fs.statSync(path.join(articlesDir, f)).isDirectory();
  });

  const articles: ArticleMeta[] = [];

  for (const category of categories) {
    const categoryDir = path.join(articlesDir, category);
    const files = fs.readdirSync(categoryDir).filter((f) => f.endsWith(".md"));

    for (const file of files) {
      const slug = file.replace(/\.md$/, "");
      const fullPath = path.join(categoryDir, file);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      articles.push({
        title: data.title || "",
        description: data.description || "",
        category,
        slug,
        date: data.date || "",
        affiliateIds: data.affiliateIds || [],
        template: data.template || "",
      });
    }
  }

  return articles.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getArticlesByCategory(category: string): ArticleMeta[] {
  return getAllArticles().filter((a) => a.category === category);
}

export async function getArticle(
  category: string,
  slug: string
): Promise<Article | null> {
  const fullPath = path.join(articlesDir, category, `${slug}.md`);

  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content: rawContent } = matter(fileContents);

  const result = await remark().use(remarkGfm).use(html, { sanitize: false }).process(rawContent);

  return {
    title: data.title || "",
    description: data.description || "",
    category,
    slug,
    date: data.date || "",
    affiliateIds: data.affiliateIds || [],
    template: data.template || "",
    content: result.toString(),
  };
}

export function getCategorySlugs(): string[] {
  if (!fs.existsSync(articlesDir)) return [];
  return fs.readdirSync(articlesDir).filter((f) => {
    return fs.statSync(path.join(articlesDir, f)).isDirectory();
  });
}
