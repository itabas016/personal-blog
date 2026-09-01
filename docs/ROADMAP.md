# 路线图 · ROADMAP

> 版本：v2.0 · 2026-08-30 · 按「先立骨架，再长血肉」排序，Phase 1-2 为本次重构交付内容。

## Phase 1 · 重构落地（2026-08，本次完成）

- [x] 设计文档全套（DESIGN / ARCHITECTURE / ROADMAP / MIGRATION / AI-EDITORIAL）
- [x] Astro 5 + Tailwind CSS 4 + TypeScript 工程骨架
- [x] 设计系统：暗色优先主题、设计令牌、双主题代码高亮
- [x] 58 篇 Hexo 文章 + 图片资源全自动迁移
- [x] 页面：首页 / 博客列表 / 文章详情 / 标签 / 归档 / 关于 / 404
- [x] `/apps` 应用展示页（数据驱动）
- [x] AI 元素 L1-L4：徽章、披露、`/ai` 页、`llms.txt`、Agent 写作规范
- [x] Pagefind 全文搜索、RSS、sitemap
- [x] 旧 permalink 自动跳转、`/atom.xml` 兼容别名
- [x] GitHub Actions 自动部署 GitHub Pages

## Phase 2 · 内容与打磨（2026-09）

- [ ] **Agent 写作试运行**：按 `AGENTS.md` 流程由 Claude Code 发布 2-3 篇新文章（如《2026 年用 Astro 重构个人博客》《我的 vibe coding 工具箱》）
- [x] `src/data/apps.ts` 录入真实应用清单（universe-modeling / equity-research / reading-challenge / polymarket-monitor / immersive-reading / family-tree / willfit / rune，tagline 与链接待 owner 修订）
- [ ] 文章详情页 TOC（目录）+ 阅读进度条
- [ ] 代码块复制按钮
- [ ] Open Graph 图自动生成（`@vercel/og` 思路的构建期 Satori 实现，文章分享卡片）
- [ ] 旧域名 `tech.itabas.com` 配置 301 到新站
- [ ] Cloudflare Web Analytics（免费、无 Cookie）

## Phase 3 · AI 深化（2026-Q4）

- [ ] **构建期 AI 摘要**：CI 中调用 LLM 为文章生成 TL;DR，缓存于 frontmatter（`ai_tldr` 字段）
- [ ] **语义搜索**：Pagefind 关键词搜索之上叠加向量检索（构建期 embedding + 静态 JSON 索引 + 客户端余弦相似度）
- [ ] **博客 MCP Server**：把文章、标签、应用清单通过 MCP 协议暴露，任何人的 AI Agent 都能"读懂"这个博客并引用原文
- [ ] AI 徽章体系扩展：`reviewed-by` 字段，记录人审版本
- [ ] 站内 AI 问答（RAG over posts，Worker + Vectorize 方案，成本可控时上线）

## Phase 4 · 生态与长尾（2027）

- [ ] 评论系统：giscus（GitHub Discussions 驱动，无隐私负担）
- [ ] Newsletter（RSS → 邮件，Buttondown/自建）
- [ ] `/uses` 页面（设备、软件、homelab 配置——呼应旧博客 raspberry/vps 系列）
- [ ] 年度 AI 报告：统计本年 Agent 写作比例、人审改动量
- [ ] i18n：核心页面双语（zh-CN / en）

## 维护原则

1. **依赖极简**：新增依赖必须回答「Astro 本体/Tailwind 是否做不到」。
2. **内容即代码**：一切内容（文章、应用、关于页）都在 git 里，PR 即发布。
3. **AI 有披露**：任何 AI 参与 produce 的内容必须带 `ai` 字段，这是不可协商的底线。
