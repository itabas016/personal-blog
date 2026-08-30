# AI 内容生产规范 · AI-EDITORIAL

> 本博客自 2026 年起采用「人机协作」内容流水线：**人出题与终审，Claude Code Agent 起草与发布**。
> 本文档同时以 `AGENTS.md`（仓库根目录）形式供 Agent 开工前阅读。

## 1. 角色分工

| 环节 | 负责 | 说明 |
|---|---|---|
| 选题 | 人 | 在 issue 里用模板提出主题、角度、参考资料 |
| 起草 | Claude Code Agent | 按 §3 规范写作，生成 PR |
| 事实核查 | Agent 自查 + 人抽检 | 技术细节必须可复现，命令须跑通 |
| 终审 | 人 | 合并 PR 即代表背书 |
| 发布 | CI | merge 到 main 自动构建部署 |

## 2. 披露等级（`ai` 字段，读者可见）

| 值 | 含义 | 徽章 |
|---|---|---|
| `human` | 纯人写 | 不显示 |
| `co-authored` | 人写主体，AI 润色/补充 | `✦ AI co-authored` |
| `agent` | Agent 起草，人审核后发布 | `🤖 Agent written` |

规则：**宁可多披露**。AI 参与超过润色级别（段落重组以上）必须 `agent`。

## 3. Agent 写作规范（强制）

1. **frontmatter 契约**：见 `docs/ARCHITECTURE.md` §3.1。`description` 必填（60 字内摘要）；`ai: "agent"`；`pubDate` 用当天日期。
2. **文章结构**：开头一段回答「这篇解决什么问题」；正文小标题层级 ≤ 3；结尾一段总结/延伸。
3. **语言**：技术文中文为主、术语保留英文；与历史文章语感一致（务实、少形容词）。
4. **代码**：所有命令块必须实际执行验证过；代码块标注语言；不贴超过 40 行的代码，超出的给仓库链接。
5. **禁止**：编造版本号/链接/基准数据；营销腔；对未亲自验证的工具下定论。
6. **图片**：放 `public/images/<slug>/`，路径 `/images/<slug>/...`，必须 `loading="lazy"`。
7. **脚手架**：`npm run new-post -- "标题" --tags a,b --category Tools` 生成骨架。
8. **本地验证**：`npm run build` 必须通过（schema 校验不过 = 拒收）。

## 4. Agent 发布流程（PR 模式）

```
1. git checkout -b post/<slug>
2. npm run new-post -- "..." && 填写内容
3. npm run build   # schema + 渲染自检
4. git commit      # 规范：post: <标题>
5. 开 PR → 人审核（重点看事实与语气）→ merge → CI 自动部署
```

紧急模式（人直接授权、单 commit 直推 main）仅限 typo 级修订。

## 5. 存量内容说明

- `src/content/blog/` 中 2016–2020 的 58 篇文章为**纯人写**（`ai: human`），迁移自 Hexo 仓库，内容保持原貌（仅 frontmatter 结构化、资源路径归一化），不做 AI 重写。个别确需勘误的按正常 PR 流程走，且保留 `human`。

## 6. 与 `/ai` 页面的关系

`/ai` 页面是本规范面向读者的公开版本（宣言式），由本文件驱动。两边不一致时以本文档为准。
