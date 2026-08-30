import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE } from "../data/site";
import { published, sortedPosts } from "../utils/posts";

export async function GET(context) {
  const posts = sortedPosts(published(await getCollection("blog"))).slice(0, 20);
  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site,
    items: posts.map((p) => ({
      title: p.data.title,
      pubDate: p.data.pubDate,
      description: p.data.description,
      categories: [p.data.category, ...p.data.tags],
      link: `/blog/${p.id}/`,
    })),
    customData: `<language>zh-cn</language>`,
  });
}
