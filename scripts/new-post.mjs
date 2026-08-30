#!/usr/bin/env node
/**
 * 新文章脚手架
 * 用法：npm run new-post -- "标题" [--tags a,b] [--category Tools] [--ai agent]
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const args = process.argv.slice(2);
const getArg = (name) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : undefined;
};

const title = args.find((a) => !a.startsWith("--"));
if (!title) {
  console.error('用法: npm run new-post -- "标题" [--tags a,b] [--category Tools] [--ai agent]');
  process.exit(1);
}

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const category = (getArg("category") ?? "Uncategorized").trim();
const tags = (getArg("tags") ?? "")
  .split(",")
  .map((t) => t.trim())
  .filter(Boolean);
const ai = getArg("ai") ?? "human";
const now = new Date();

// ASCII 标题转 kebab-case；含中文时退化为日期戳，确保 URL 稳定
const slug = /^[\w\s-]+$/.test(title)
  ? title.toLowerCase().trim().replace(/\s+/g, "-")
  : `post-${now.toISOString().slice(0, 10).replace(/-/g, "")}`;

const dir = path.join(ROOT, "src", "content", "blog", category.toLowerCase().replace(/\s+/g, "-"));
const file = path.join(dir, `${slug}.md`);
if (fs.existsSync(file)) {
  console.error(`✗ 文件已存在: ${file}`);
  process.exit(1);
}

const frontmatter = {
  title,
  description: "（一句话摘要，60 字内 —— Agent 请如实填写）",
  pubDate: now.toISOString(),
  category,
  tags,
  ai,
};
const body = `<!-- 摘要分隔符：以上首段会作为列表页摘要，正文从这里开始 -->

`;
fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(file, matter.stringify(body, frontmatter), "utf8");
console.log(`✓ 已创建 ${path.relative(ROOT, file)}`);
console.log("  下一步：填写正文 → npm run build 自检 → git commit -m \"post: 标题\"");
