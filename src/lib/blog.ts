import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  keyword: string;
  category: string;
  date: string;
  updated?: string;
  readingTime: string;
  related: string[];
};

function parseFile(slug: string): { meta: PostMeta; body: string } {
  const raw = fs.readFileSync(path.join(BLOG_DIR, `${slug}.mdx`), "utf8");
  const { data, content } = matter(raw);
  return {
    meta: {
      slug,
      title: data.title ?? slug,
      description: data.description ?? "",
      keyword: data.keyword ?? "",
      category: data.category ?? "Guide",
      date: data.date ?? "2026-01-01",
      updated: data.updated,
      readingTime: data.readingTime ?? "5 min",
      related: Array.isArray(data.related) ? data.related : [],
    },
    body: content,
  };
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getAllPostsMeta(): PostMeta[] {
  return getPostSlugs()
    .map((slug) => parseFile(slug).meta)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): { meta: PostMeta; body: string } | null {
  try {
    return parseFile(slug);
  } catch {
    return null;
  }
}

export function getCategories(): { name: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const p of getAllPostsMeta()) counts.set(p.category, (counts.get(p.category) ?? 0) + 1);
  return [...counts.entries()].map(([name, count]) => ({ name, count }));
}
