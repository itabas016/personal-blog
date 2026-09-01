export const SITE = {
  /** 部署域名（GitHub Pages 自定义域，见 public/CNAME） */
  url: "https://io.itabas.com",
  /** 2016-2020 使用的旧域名，由 404 页兜底跳转 */
  legacyUrl: "https://tech.itabas.com",
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
      { label: "Personal Wiki", href: "https://wiki.itabas.com" },
    ],
  },
} as const;
