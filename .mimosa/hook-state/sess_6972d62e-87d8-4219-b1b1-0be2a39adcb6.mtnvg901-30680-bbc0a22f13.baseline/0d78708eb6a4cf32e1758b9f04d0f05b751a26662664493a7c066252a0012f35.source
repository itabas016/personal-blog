import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

/**
 * blog 集合 —— frontmatter 契约见 docs/ARCHITECTURE.md §3.1
 * schema 校验失败会导致构建失败，这是 Agent 发布流水线的第一道闸门。
 */
const blog = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/blog",
    // URL slug 只取文件名（/blog/<slug>/），与旧 permalink 的 :title 一一对应
    generateId: ({ entry }) =>
      entry
        .replace(/\\/g, "/")
        .split("/")
        .pop()!
        .replace(/\.md$/, ""),
  }),
  schema: z.object({
    title: z.string(),
    description: z.string().default(""),
    pubDate: z.coerce.date(),
    updated: z.coerce.date().optional(),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    ai: z.enum(["human", "co-authored", "agent"]).default("human"),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
