import type { CollectionEntry } from "astro:content";

export type Post = CollectionEntry<"blog">;

export function published(posts: Post[]): Post[] {
  return posts.filter((p) => !p.data.draft);
}

export function byDateDesc(a: Post, b: Post): number {
  return b.data.pubDate.valueOf() - a.data.pubDate.valueOf();
}

export function sortedPosts(posts: Post[]): Post[] {
  return [...posts].sort(byDateDesc);
}

export function getAllTags(posts: Post[]): { tag: string; count: number }[] {
  const map = new Map<string, number>();
  for (const p of posts) {
    for (const t of p.data.tags) map.set(t, (map.get(t) ?? 0) + 1);
  }
  return [...map.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

export function getCategories(posts: Post[]): { category: string; count: number }[] {
  const map = new Map<string, number>();
  for (const p of posts) map.set(p.data.category, (map.get(p.data.category) ?? 0) + 1);
  return [...map.entries()]
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count || a.category.localeCompare(b.category));
}

export function groupByYear(posts: Post[]): { year: number; posts: Post[] }[] {
  const map = new Map<number, Post[]>();
  for (const p of posts) {
    const y = p.data.pubDate.getFullYear();
    (map.get(y) ?? map.set(y, []).get(y)!).push(p);
  }
  return [...map.entries()]
    .map(([year, list]) => ({ year, posts: list.sort(byDateDesc) }))
    .sort((a, b) => b.year - a.year);
}
