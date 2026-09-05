export const SITE = {
  /** 部署域名（GitHub Pages 自定义域，见 public/CNAME） */
  url: "https://tech.itabas.com",
  /** 曾用域名 io.itabas.com，由 Cloudflare Redirect Rule 301 到新域名 */
  legacyUrl: "https://io.itabas.com",
  title: "ITABAS",
  tagline: "Notes & apps in the AI era",
  description:
    "Roger Cui (itabas016) 的个人博客：数据库、Linux、homelab 与 vibe coding。自 2016 年写作，2026 年以 Astro 重建，内容生产采用人机协作流水线。",
  author: { name: "Roger Cui", handle: "itabas016" },
  nav: [
    { href: "/blog", label: "Blog" },
    { href: "/tags", label: "Tags" },
    { href: "/apps", label: "Apps" },
    { href: "/ai", label: "AI" },
    { href: "/archive", label: "Archive" },
    { href: "/about", label: "About" },
  ],
  social: {
    github: "https://github.com/itabas016",
    // TODO(Roger): 以下 handle 为占位，替换为各平台的真实主页地址
    facebook: "https://facebook.com/itabas016",
    x: "https://x.com/itabas016",
    instagram: "https://instagram.com/itabas016",
    weibo: "https://weibo.com/itabas016",
    rss: "/rss.xml",
    links: [
      { label: "Homeless.group", href: "https://www.homeless.group" },
      // Personal Wiki（wiki.itabas.com）2026-09-05 实测已下线，链接移除
    ],
  },
} as const;
