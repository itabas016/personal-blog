# ITABAS 个人博客现代化重设计 · 总体设计方案

> 版本：v2.0 · 2026-08-30 · 作者：Roger Cui（itabas016）× Claude Code

## 1. 背景与现状

旧博客（`C:\Projects\github.com\itabas016\hexo-blog`）建于 2016 年：

| 维度 | 现状 |
|---|---|
| 框架 | Hexo 3.9（2022 年锁定），主题 even |
| 内容 | 58 篇文章，7 个分类（database / tools / vps / raspberry / web / python / life） |
| 托管 | Bitbucket 私有仓库 → `hexo deploy` 推送 `itabas016.github.io`（自定义域名 `tech.itabas.com`，旧域名 `tech.itabas.com`） |
| 特性 | Atom feed、sitemap、本地搜索（search.xml）、旧 permalink `:year/:month/:day/:title/` |

存在的核心问题：

1. **构建链老旧**：Hexo 3.9 + SCSS/Stylus 混用渲染器，Node 版本兼容性差，维护成本高。
2. **体验停留在 2016**：无响应式暗色模式、无现代排版系统、 permalink 带日期冗长。
3. **内容与 AI 时代脱节**：2025 年起大量工作由 AI Agent（Claude Code 等）协同完成，博客缺少 AI 元素的表达与披露。
4. **缺少应用展示**：vibe coding 产出的小应用越来越多，没有统一展示入口。
5. **发布流程手工化**：手动写作、手动构建部署；未来应由 Claude Code Agent 负责文章编写与发布。

## 2. 重设计目标

- **G1 现代化技术栈**：内容驱动的现代静态站点框架，构建快、依赖少、默认零 JS。
- **G2 现代化阅读体验**：暗色优先、精致排版、代码高亮、全站搜索、移动端完美适配。
- **G3 AI 原生**：AI 不是贴纸式的装饰，而是贯穿信息架构、内容披露、内容生产流程的一等公民。
- **G4 应用展示**：新增 `/apps` 页面，数据驱动展示 vibe coding 应用。
- **G5 Agent 发布**：建立 Claude Code 文章生产规范（frontmatter 契约 + 写作规范 + 发布流程），实现「人出题目，Agent 写初稿，人来审」的流水线。
- **G6 平滑迁移**：保留全部 58 篇历史文章与图片资源，旧 URL 自动跳转到新地址，SEO 不断档。

## 3. 信息架构（IA）

```
/                     首页：Hero（终端卡片 + AI 陈述）→ 最新文章 → 应用速览 → About 速览
/blog                 文章列表（按年份分组，AI 徽章、分类、标签）
/blog/[slug]          文章详情（Shiki 双主题代码高亮、上下篇导航、AI 披露）
/tags/[tag]           标签聚合页
/archive              按年份时间线的全量归档
/apps                 Vibe Coding 应用展示墙（数据驱动卡片）
/ai                   AI 使用宣言与工作流披露页（AI 元素核心页面）
/about                关于（人、设备、链接）
/search               全文搜索（Pagefind 本地索引，无外部服务）
/rss.xml              Atom 订阅
/sitemap-index.xml    站点地图
/llms.txt             面向 AI 爬虫的站点导览（2026 现代实践）
404                   兜底页 + 旧 permalink（/:year/:month/:day/:title/）自动跳转
```

设计取舍：

- **导航只保留 5 项**：Blog / Apps / AI / Archive / About。扁平优于层级，一屏可读。
- **URL 策略**：新文章使用 `/blog/<slug>/`（slug 取原文件名，短且稳定）；旧地址 `/2016/10/14/xxx/` 由 404 页 JS 正则跳转到 `/blog/xxx/`，历史外链与搜索引擎收录无损。
- **中英文界面**：UI 标签用英文（现代简洁），内容中英混排，`<html lang="zh-CN">`。

## 4. 设计系统（Design System）

### 4.1 视觉基调：`Terminal × Paper`

一句话定位：**「工程师的安静书桌，桌上放着一台 AI 终端」**。

- 暗色优先（dark-first）：默认深色，可切换浅色，`localStorage` + `prefers-color-scheme` 双记忆，内联脚本防闪白。
- 一条贯穿全站的 **渐变主色**（violet → cyan），只用在强调处：链接 hover、徽章、Hero 标题、卡片 hover 光晕。大面积保持克制。
- 背景点缀：极淡的网格线 + Hero 区径向光晕，营造「工位感」而非「赛博朋克」。

### 4.2 色彩令牌（Tailwind CSS 4 `@theme`）

| 令牌 | Dark | Light | 用途 |
|---|---|---|---|
| `--color-bg` | `#0b0c10` | `#fafaf9` | 页面背景 |
| `--color-surface` | `#14161c` | `#ffffff` | 卡片 |
| `--color-muted` | `#9ca3af` | `#52525b` | 次要文字 |
| `--color-default` | `#e5e7eb` | `#18181b` | 正文 |
| `--color-accent` | `#8b5cf6` | `#7c3aed` | 强调（violet-500/600） |
| `--color-accent-2` | `#22d3ee` | `#0891b2` | 渐变副色（cyan） |

### 4.3 字体

- 正文/标题：`Inter Variable`（拉丁）+ 系统中文栈（PingFang SC / MiSans / Microsoft YaHei），全部本地自托管（fontsource），无第三方请求。
- 代码：`JetBrains Mono Variable`。
- 正文 17px/1.8，行宽上限 72ch；标题层级收紧字距。

### 4.4 组件规范

| 组件 | 规范 |
|---|---|
| Header | 玻璃拟态（backdrop-blur + 半透明底），滚动后加底边框；右侧主题切换（Sun/Moon 图标） |
| PostCard | 标题 + 摘要两行截断 + 元信息行（日期 · 分类 · AI 徽章 · 标签）；hover 边框泛起主色微光 |
| AIBadge | `🤖 Agent` / `✦ Co-authored` 两种，胶囊形，渐变描边，hover 有 tooltip 说明 |
| AppCard | 渐变图标块 + 应用名 + 一句话 + 技术栈 chips + 状态点（Live 绿 / WIP 黄 / Archived 灰）+ 链接 |
| Hero | 左侧标题与陈述文案，右侧终端卡片（打字机效果展示 `claude` 会话），支持 `prefers-reduced-motion` 降级 |
| Footer | 三栏：签名 / 导航 / RSS·llms.txt；底部独立社交栏（Facebook · X · Instagram · Weibo · GitHub）；署名「Human reviewed, AI assisted」 |

### 4.5 动效

- 只用 transform/opacity，150–300ms ease-out。
- `prefers-reduced-motion: reduce` 时全部禁用（含 Hero 打字机）。
- 不引入任何动画库，纯 CSS 完成。

## 5. AI 元素设计（G3 核心分四层

### L1 内容层
- frontmatter 增加 `ai: human | co-authored | agent` 字段，全站渲染 AI 徽章，读者一眼知道内容来源。
- 文章详情页底部固定渲染 **AI 披露块**：生成模型、人审情况、反馈渠道。

### L2 页面层
- `/ai` 页：AI 使用宣言——博客哪些环节用了 AI、人机分工边界、历史文章说明（58 篇旧文为纯人写）。
- 首页 Hero 终端卡片：`$ claude` 会话演示，把「这个博客由 Agent 协作维护」变成可感知的场景。

### L3 协议层
- `/llms.txt`：为 AI 爬虫与 Agent 提供站点导览（栏目、核心页、RSS）。
- `robots.txt` 显式欢迎 AI 爬虫。
- RSS 保持全文输出，方便 Agent 订阅。

### L4 流程层
- 详见 `docs/AI-EDITORIAL.md`：Claude Code 写作规范 + frontmatter 契约 + `npm run new-post` 脚手架 + 审核发布流水线。

## 6. `/apps` 应用展示页设计（G4）

- 数据源：`src/data/apps.ts` 单文件，加应用 = 加一条记录，不改页面代码。
- 数据模型：

```ts
interface App {
  name: string;            // 应用名
  tagline: string;         // 一句话简介
  emoji: string;           // 图标（渐变色块背景）
  stack: string[];         // 技术栈 chips
  status: "live" | "wip" | "archived";
  category?: CategoryId;   // 用途分类 experiments/data/reading/life/tools；缺省 = 未分类
  featured?: boolean;      // 精选位：/apps 顶部大卡区 + 首页速览
  cover?: string;          // 应用截图（16:10），public/images/apps/<slug>/cover.png
  posts?: string[];        // 关联博客文章 slug，实现笔记互链
  links?: { live?: string; repo?: string };
  vibeCoded: boolean;      // 是否 AI 协作开发
  model?: string;          // 使用的模型/Agent，如 "Claude Code"
  addedAt: string;         // YYYY-MM
}
```

- 展示形态（2026-09 更新）：**分类目录页**——眼球与效率分工，首页速览引流，`/apps` 负责浏览与转化。页面结构：Hero（标题 + tabular-nums 数字条）→ Featured 精选大卡区（`featured` 标记，3+2+通栏不对称布局）→ 分类筛选 pills（按用途：实验/数据/阅读/生活/工具，vanilla JS 渐进增强，筛选态同步 `?c=` 到 URL）→ 应用网格 → 早期作品时间线（archived 不进网格）。
- 分类原则：按用途（访客视角）分类，技术栈是卡片 tag 不参与分类；`category` 为可选字段，漏填的应用落「未分类」照常展示，加应用永不被 schema 卡住。
- 交互：筛选时 Featured 区隐藏、被筛中的精选应用回网格；pill 用 `aria-pressed` 驱动选中态；网格重排 200ms 淡入上移 stagger 40ms，`prefers-reduced-motion` 时关闭；无 JS 时 pills 隐藏、精选 + 全量网格照常可读。
- 排序：网格 Live 优先再按 addedAt 倒序；时间线按 addedAt 倒序；`vibeCoded` 应用带 ✦ 徽章呼应 AI 主题。
- 首页含「Vibe Coding Apps」速览（优先 `featured`，不足三个用其余 live 应用补齐），引流到 `/apps`。

## 7. 迁移策略（G6）

详见 `docs/MIGRATION.md`。要点：一次性脚本 `scripts/migrate-hexo.mjs` 完成 frontmatter 转换、`<!-- more -->` 摘要提取、资源路径归一化（`/../../..` → 站点根），资源整体拷贝至 `public/`，生成迁移报告。

## 8. 成功指标

- [x] `npm run build` 一键构建，产物纯静态
- [x] Lighthouse 移动端 Performance ≥ 95（图片懒加载、零第三方脚本、字体子集化自托管）
- [x] 全部 58 篇文章迁移完成且图片可访问
- [x] 旧 permalink 可自动跳转
- [x] Agent 可按 `AGENTS.md` 独立完成一篇新文章的发布
