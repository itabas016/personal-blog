# ITABAS · personal-blog

> Roger Cui（itabas016）的个人博客 v2 —— 2026 年以 Astro 重建，AI 原生。
> 线上地址：[tech.itabas.com](https://tech.itabas.com)（旧域名 tech.itabas.com 自动跳转）

## 这是什么

- **技术栈**：[Astro 5](https://astro.build) + Tailwind CSS 4 + TypeScript，默认零客户端 JS，Pagefind 本地全文搜索。
- **内容**：58 篇历史文章（2016–2020，纯人写）迁移自旧 Hexo 博客；新文章由 Claude Code Agent 按公开规范起草、人工终审发布。
- **AI 原生**：每篇文章带 `ai` 披露字段（human / co-authored / agent）并渲染徽章；站点提供 `/llms.txt` 与显式欢迎 AI 爬虫的 `robots.txt`；详见 [/ai](https://tech.itabas.com/ai/)。
- **Apps 展示墙**：vibe coding 应用一页收录，数据驱动，加一条记录即上新。

## 快速开始

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # astro build + pagefind 索引 → dist/
npm run preview    # 本地预览构建产物（含搜索）
```

## 常用操作

| 操作 | 命令 |
|---|---|
| 写新文章（脚手架） | `npm run new-post -- "标题" --tags a,b --category Tools` |
| 本地搜索预览 | 先 `npm run build` 再 `npm run preview` |
| 重新迁移 Hexo 内容（幂等） | `npm run migrate -- --source "<hexo 仓库路径>" [--force]` |

## 目录导览

```
docs/          设计文档：DESIGN / ARCHITECTURE / ROADMAP / MIGRATION / AI-EDITORIAL
src/content/   博客文章（Markdown + frontmatter 契约，schema 校验）
src/data/      site.ts 站点配置 · apps.ts 应用展示数据
src/pages/     路由：/ /blog /apps /ai /archive /about /search …
public/        CNAME、robots.txt、llms.txt、图片资源
AGENTS.md      Claude Code Agent 写作与发布规范（必读）
```

## 部署

推送 `main` → GitHub Actions 构建并发布到 GitHub Pages（`.github/workflows/deploy.yml`），
自定义域名 `tech.itabas.com` 由 `public/CNAME` 保证。首次启用需在仓库
Settings → Pages 中把 Source 设为 **GitHub Actions**。

## 内容与 AI 披露

本博客遵循「宁可多披露」原则：AI 参与的内容都会标注等级，分工与底线见
[docs/AI-EDITORIAL.md](docs/AI-EDITORIAL.md)。
