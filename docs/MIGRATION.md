# 内容迁移方案 · MIGRATION（Hexo → Astro）

> 执行脚本：`scripts/migrate-hexo.mjs`（幂等，可重复运行）
>
> 用法：`npm run migrate -- --source "C:/Projects/github.com/itabas016/hexo-blog"`
> 不传 `--source` 时使用默认路径 `C:/Projects/github.com/itabas016/hexo-blog`。

## 1. 迁移映射

### 1.1 文章 frontmatter

| Hexo 字段 | Astro 字段 | 转换规则 |
|---|---|---|
| `title` | `title` | 原样保留 |
| — | `description` | 取 `<!-- more -->` 之前的首个非引用段落，去 Markdown 语法后截断 160 字；无 `<!-- more -->` 则取首段 |
| `date` | `pubDate` | `2016-10-14` → `2016-10-14T00:00:00.000Z`（ISO） |
| — | `updated` | Hexo 未记录修改时间，置空 |
| `categories`（字符串或数组） | `category` | 取第一级分类，原大小写保留（Database / Tools / VPS / Raspberry / Web / Python / Life） |
| `tags`（数组） | `tags` | 原样保留（`[]` 兜底） |
| — | `ai` | 全部历史文章为纯人写，固定 `human` |
| — | `slug` | 由文件名生成（脚本内用于分类目录存放，路径仍由 Astro 从文件路径派生） |
| — | `draft` | 原样迁移（旧仓如有 draft） |

### 1.2 正文

- `<!-- more -->` 截断标记：保留原样（Astro 端仅在需要时读取全文，摘要已固化进 frontmatter）。
- 资源路径归一化：`\](/../../../ref/x.gif)` → `\](/ref/x.gif)`（浏览器本就将其解析为站点根，显式化利于 lint 与 Pagefind）。
- Hexo 特有标签（如 `{% codeblock %}`）经扫描不存在，无需处理；个别 `<!-- more -->` 缺失不影响渲染。
- 图片引用目录：`/images/`、`/ref/`、`/screenshots/` 整体拷贝至 `public/`，路径不变。

### 1.3 站点静态资源

| 旧 | 新 |
|---|---|
| `source/images/*` | `public/images/*`（avatar.jpg、logo.png 等） |
| `source/ref/*` | `public/ref/*`（Oracle/SQL 图示 gif/png） |
| `source/screenshots/*` | `public/screenshots/*` |
| `source/favicon.ico` | `public/favicon.ico` |
| `source/CNAME`（tech.itabas.com） | `public/CNAME`（GH Pages 自定义域名必需） |
| `source/about/index.md`、`links/` | 人工改写为新版 `/about` 页（不脚本迁移） |

### 1.4 目录组织

`source/_posts/<category>/<file>.md` → `src/content/blog/<category>/<file>.md`，分类目录名统一小写（database/…），大小写信息保留在 frontmatter `category`。

## 2. 执行结果（2026-08-30 实跑）

```
posts scanned:    58
posts written:    58
assets copied:    public/images, public/ref, public/screenshots, favicon
frontmatter fixes: 0 (无非法字段)
skipped:          about/links/tags/categories 站点页（人工重写）
```

迁移后全站构建校验：`npm run build` 通过，58 个 `/blog/<slug>/` 页面全部生成，历史图片抽查可访问（`/ref/oracle-structure.jpg` 等）。

## 3. 不迁移项与理由

| 项 | 理由 |
|---|---|
| even 主题 SCSS | 设计系统全部重写 |
| search.xml（hexo-generator-search） | 由 Pagefind 替代 |
| qiniu CDN 注释配置 | 弃用七牛，图片站内自托管 |
| 评论（旧站未启用） | roadmap Phase 4 引入 giscus |
