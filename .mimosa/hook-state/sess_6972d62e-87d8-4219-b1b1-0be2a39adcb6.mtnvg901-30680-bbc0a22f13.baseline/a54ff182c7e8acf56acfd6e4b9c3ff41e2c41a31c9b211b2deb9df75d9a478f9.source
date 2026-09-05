# AGENTS.md — Claude Code 写作与发布规范

> 你（Claude Code Agent）是本博客的内容生产者之一。开工前读完本文；
> 详细版见 `docs/AI-EDITORIAL.md`，frontmatter 契约见 `docs/ARCHITECTURE.md` §3.1。

## 仓库地图

- 文章：`src/content/blog/<小写分类>/<slug>.md`（Markdown，frontmatter 受 schema 强校验）
- 站点配置：`src/data/site.ts`；应用展示数据：`src/data/apps.ts`
- 设计文档：`docs/`；页面组件：`src/components/`、`src/pages/`

## 写作流程（PR 模式，唯一正道）

1. `npm run new-post -- "标题" --tags a,b --category Tools`（分类取 Database/Tools/VPS/Raspberry/Web/Python/Life/Uncategorized，或新建）
2. 撰写正文，frontmatter 必须包含：`title`、`description`（60 字内，如实）、`pubDate`（当天）、`category`、`tags`、`ai`
   - AI 起草 → `ai: "agent"`；润色级协助 → `"co-authored"`；不确定时选 `agent`（宁可多披露）
3. `npm run build` —— schema 校验 + 全站构建必须通过
4. `git commit -m "post: <标题>"`，开 PR 等人终审；**不要直推 main**

## 写作规范（强制）

- 开头一段回答「这篇解决什么问题」；结尾一段总结/延伸；小标题层级 ≤ 3
- 技术文中文为主、术语保留英文；语感对齐历史文章：务实、少形容词、无营销腔
- 所有命令块必须实际执行验证；代码块标注语言；单块 ≤ 40 行，超出的给仓库链接
- 禁止：编造版本号/链接/基准数据；对未验证的工具下定论
- 图片放 `public/images/<slug>/`，正文用绝对路径 `/images/<slug>/...`
- 摘要分隔符 `<!-- more -->` 之后的正文才是列表摘要之外的内容，首段务必完整

## 红线

- 不改写 `ai: human` 的历史文章内容（勘误走 PR，且保持 human）
- 不删除或绕过 schema 校验；`npm run build` 失败的提交是废品
- 不把未经人审核的内容标记为 `human`
