# 技术架构 · ARCHITECTURE

> 版本：v2.0 · 2026-08-30

## 1. 技术选型

### 1.1 框架：Astro 5

| 候选 | 结论 | 理由 |
|---|---|---|
| **Astro 5** ✅ | 采用 | 内容站最佳实践：Content Collections 提供类型安全的 frontmatter 校验；默认零客户端 JS（阅读页 0KB framework）；Markdown/MDX 一等公民； Islands 架构为未来局部交互留口 |
| Next.js | 不采用 | 为应用而生，SSR/RSC 的复杂度对纯内容站是负债；构建慢 |
| 继续升级 Hexo | 不采用 | 生态停滞，主题即 mudball；无法获得类型安全与组件化 |
| Vue/React SPA | 不采用 | 内容站上 SPA 是反模式：SEO、首屏、维护三输 |

### 1.2 依赖清单（刻意保持最少）

| 包 | 用途 |
|---|---|
| `astro` | 框架本体（内置 Shiki 高亮、Markdown、Content Collections） |
| `tailwindcss` + `@tailwindcss/vite` | Tailwind CSS 4 原生 Vite 集成（无 postcss 配置） |
| `@astrojs/sitemap` | sitemap 生成 |
| `@astrojs/rss` | RSS 生成 |
| `@fontsource-variable/inter` / `@fontsource-variable/jetbrains-mono` | 字体自托管 |
| `pagefind` | 构建后静态索引，全站搜索无后端 |
| `gray-matter`（devDep） | 仅迁移脚本解析 Hexo frontmatter |
| `typescript` / `@types/node`（devDep） | 类型支持 |

明确**不引入**：React/Vue 等任何 UI 框架（当前无岛屿需求）、评论系统（roadmap）、分析统计（可用 Cloudflare Pages/Vercel 面板替代）。

## 2. 目录结构

```
personal-blog/
├── astro.config.mjs        # 站点 URL、sitemap、Shiki 双主题
├── docs/                   # 本套设计文档
├── public/                 # 原样拷贝的静态资源（CNAME、favicon、images/ref/screenshots、robots.txt、llms.txt）
├── scripts/
│   ├── migrate-hexo.mjs    # Hexo → Astro 一次性迁移脚本
│   └── new-post.mjs        # 新文章脚手架（npm run new-post）
└── src/
    ├── content.config.ts   # Content Collection 定义（blog）+ schema 校验
    ├── content/blog/       # 迁移后的文章（按分类分目录）
    ├── data/
    │   ├── site.ts         # 站点元信息单点配置（标题/作者/导航/社交）
    │   └── apps.ts         # /apps 展示数据
    ├── styles/global.css   # Tailwind 4 + 设计令牌 + prose 样式
    ├── layouts/BaseLayout.astro     # <html> 骨架、主题脚本、Header/Footer
    ├── components/         # Header / Footer / PostCard / AIBadge / AppCard / Hero …
    ├── pages/              # 路由（见 DESIGN.md 信息架构）
    └── utils/              # 排序、分组、标签聚合等纯函数
```

## 3. 内容管道

```
src/content/blog/**/*.md
  → content.config.ts schema 校验（缺字段/类型错 → 构建失败，Agent 无法提交坏数据）
  → Astro 编译 Markdown（GFM + Shiki 双主题）
  → 输出 /blog/<slug>/ 静态页
  → pagefind 扫描 dist/ 生成本地搜索索引
  → rss.xml / sitemap / llms.txt 同步生成
```

### 3.1 frontmatter 契约（schema 强制）

```yaml
title: string            # 必填
description: string      # 必填（迁移脚本从 <!-- more --> 前文自动提取）
pubDate: date            # 必填（ISO）
category: string         # 必填
tags: string[]           # 必填（可为空数组）
ai: "human" | "co-authored" | "agent"   # 默认 human
draft: boolean           # 默认 false，true 则全渠道隐藏
```

## 4. 部署架构

```
本地 / Claude Code Agent
  └─ git push → GitHub (main)
       └─ GitHub Actions: npm ci → astro build → pagefind → 部署 dist/ 至 GitHub Pages
            └─ CNAME: io.itabas.com（DNS CNAME → itabas016.github.io）
```

- 与旧流程（Bitbucket 私有源码 + 本地 `hexo deploy` 推送 gh-pages）对比：**源码与产物同仓**，构建在 CI，可回滚、可审计。
- 仓库改名建议：GitHub 仓库即 `personal-blog`（本项目），Pages 仍发布到 `itabas016.github.io` 对应的域名 `io.itabas.com`。
- 关键文件：`.github/workflows/deploy.yml`、`public/CNAME`。

## 5. 兼容性策略

| 旧事物 | 处理 |
|---|---|
| 旧 permalink `/2016/10/14/xxx/` | 404 页 JS 捕获该模式 → 跳转 `/blog/xxx/` |
| 旧域名 `tech.itabas.com` | DNS 处；404 页兜底 |
| `/atom.xml` | 新站继续提供 `/rss.xml`，并保留 `/atom.xml` 别名路由 |
| 图片路径 `/../../..` 前缀 | 迁移脚本归一化为站点根路径 |
| 搜索（search.xml） | 改用 Pagefind（`/search`），旧入口 404 兜底 |

## 6. 性能预算

- 单页 JS：0 KB（搜索页按需加载 Pagefind UI）
- CSS：单文件 < 30KB（Tailwind 4 自动 tree-shake）
- 字体：Inter + JetBrains Mono 可变字体 woff2，自托管，`font-display: swap`
- 图片：原生 `<img loading="lazy">`，站内小图不做 CDN 改造
- Lighthouse 移动端目标 ≥ 95
