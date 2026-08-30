#!/usr/bin/env node
/**
 * Hexo → Astro 一次性迁移脚本（幂等；默认跳过已存在的目标文件，--force 覆盖）
 *
 * 用法：
 *   npm run migrate -- --source "C:/Projects/github.com/itabas016/hexo-blog" [--force]
 *
 * 映射规则见 docs/MIGRATION.md
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

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DEFAULT_SOURCE = "C:/Projects/github.com/itabas016/hexo-blog";
const sourceDir = path.resolve(getArg("source") ?? DEFAULT_SOURCE);
const postsDir = path.join(sourceDir, "source", "_posts");
const outDir = path.join(ROOT, "src", "content", "blog");
const publicDir = path.join(ROOT, "public");
const force = args.includes("--force");

const report = {
  source: sourceDir,
  scanned: 0,
  written: 0,
  skippedExisting: 0,
  slugCollisions: [],
  missingFields: [],
  assets: [],
};

function walk(dir) {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((e) => (e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]));
}

/** 提取摘要：<!-- more --> 之前的首个有效段落，去 Markdown 语法，截断 160 字 */
function extractExcerpt(content) {
  const beforeMore = content.split("<!-- more -->")[0] ?? "";
  const candidates = [beforeMore, content];
  for (const src of candidates) {
    const text = src
      .replace(/```[\s\S]*?```/g, " ")
      .replace(/<img[^>]*>/g, " ")
      .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1")
      .replace(/<[^>]+>/g, " ")
      .replace(/^\s*{%-?[\s\S]*?-?%}\s*$/gm, " ")
      .replace(/^#{1,6}\s+/gm, "")
      .replace(/^>\s?/gm, "")
      .replace(/[*_`~]/g, "")
      .replace(/\s+/g, " ")
      .trim();
    if (text.length > 0) {
      return text.length > 160 ? `${text.slice(0, 157).trimEnd()}…` : text;
    }
  }
  return "";
}

function normalizeAssetPaths(content) {
  // Hexo 时代的 ](/../../../ref/x.gif) 与 ](../../screenshots/x.png) ——
  // 浏览器都会解析到站点根，这里显式归一化为 /ref/、/screenshots/ 等
  return content
    .replace(/\]\((?:\/?\.\.\/)+/g, "](/")
    .replace(/src="(?:\/?\.\.\/)+/g, 'src="')
    .replace(/\]\(\.\//g, "](/");
}

function normalizeFenceLangs(content) {
  // 代码块语言标签统一小写（Shiki 大小写敏感，"```SQL" 会退化为 plaintext）
  return content.replace(/^(\s*`{3,})([A-Za-z0-9_+-]+)/gm, (_, fence, lang) => fence + lang.toLowerCase());
}

function toIsoDate(value, file) {
  const d = value ? new Date(value) : new Date();
  if (Number.isNaN(d.valueOf())) {
    report.missingFields.push(`${file}: 非法日期 "${value}"，已回退为当前时间`);
    return new Date().toISOString();
  }
  return d.toISOString();
}

function copyAssets() {
  const items = [
    ["source/images", "images"],
    ["source/ref", "ref"],
    ["source/screenshots", "screenshots"],
    ["source/favicon.ico", "favicon.ico"],
  ];
  for (const [from, to] of items) {
    const src = path.join(sourceDir, from);
    const dest = path.join(publicDir, to);
    if (!fs.existsSync(src)) {
      report.assets.push(`${from}: 不存在，跳过`);
      continue;
    }
    fs.cpSync(src, dest, { recursive: true });
    report.assets.push(`${from} → public/${to}`);
  }
}

// ---------- 主流程 ----------
if (!fs.existsSync(postsDir)) {
  console.error(`✗ 找不到文章目录：${postsDir}`);
  process.exit(1);
}

const files = walk(postsDir).filter((f) => f.endsWith(".md"));
report.scanned = files.length;

// slug 唯一性预检（新站 URL 只取文件名）
const slugMap = new Map();
for (const file of files) {
  const slug = path.basename(file, ".md");
  if (slugMap.has(slug)) report.slugCollisions.push(`${slug}: ${slugMap.get(slug)} 与 ${file}`);
  slugMap.set(slug, file);
}
if (report.slugCollisions.length > 0) {
  console.error("✗ 文件名 slug 冲突，请先重命名：");
  report.slugCollisions.forEach((c) => console.error("  -", c));
  process.exit(1);
}

for (const file of files) {
  const raw = fs.readFileSync(file, "utf8");
  const { data: fm, content } = matter(raw);

  const title = String(fm.title ?? path.basename(file, ".md"));
  if (!fm.title) report.missingFields.push(`${file}: 缺少 title，已用文件名`);
  if (!fm.date) report.missingFields.push(`${file}: 缺少 date`);

  const categories = Array.isArray(fm.categories)
    ? fm.categories
    : fm.categories
      ? [fm.categories]
      : ["Uncategorized"];
  const category = String(categories[0]);

  const tags = Array.isArray(fm.tags)
    ? fm.tags.map(String)
    : fm.tags
      ? [String(fm.tags)]
      : [];

  const categoryDir = category.toLowerCase().replace(/\s+/g, "-");
  const slug = path.basename(file, ".md");
  const destPath = path.join(outDir, categoryDir, `${slug}.md`);

  if (fs.existsSync(destPath) && !force) {
    report.skippedExisting += 1;
    continue;
  }

  const data = {
    title,
    description: extractExcerpt(content),
    pubDate: toIsoDate(fm.date, file),
    category,
    tags,
    ai: "human", // 历史文章均为纯人写
  };
  const body = normalizeFenceLangs(normalizeAssetPaths(content));
  const output = matter.stringify(body, data);

  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  fs.writeFileSync(destPath, output, "utf8");
  report.written += 1;
}

copyAssets();

fs.writeFileSync(path.join(ROOT, "migration-report.json"), JSON.stringify(report, null, 2));
console.log(`✓ scanned=${report.scanned} written=${report.written} skipped=${report.skippedExisting}`);
report.missingFields.forEach((m) => console.log(`  ! ${m}`));
report.assets.forEach((a) => console.log(`  → ${a}`));
console.log("报告已写入 migration-report.json");
