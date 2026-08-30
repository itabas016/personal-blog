/**
 * /apps 页面数据源 —— 加一个应用 = 加一条记录，无需改页面代码。
 * 字段含义见 docs/DESIGN.md §6。
 *
 * ⚠️ 下面前两条为示例占位（来自旧 about 页的真实链接），发布前请替换/补充为真实的 vibe coding 应用。
 */
export interface App {
  name: string;
  tagline: string;
  emoji: string;
  /** 渐变色对，取值见 AppCard.astro 的 GRADIENTS */
  gradient: string;
  stack: string[];
  status: "live" | "wip" | "archived";
  links?: { live?: string; repo?: string };
  /** 是否 AI 协作（vibe coding）开发 */
  vibeCoded: boolean;
  /** 使用的模型 / Agent */
  model?: string;
  addedAt: string; // YYYY-MM
}

export const apps: App[] = [
  {
    name: "Homeless.group",
    tagline: "2020 年做的分享型小站，记录当时折腾的各类服务。",
    emoji: "🏠",
    gradient: "violet",
    stack: ["Web"],
    status: "archived",
    links: { live: "https://www.homeless.group" },
    vibeCoded: false,
    addedAt: "2020-01",
  },
  {
    name: "Personal Wiki",
    tagline: "个人知识库，沉淀 2017 年前后的技术笔记。",
    emoji: "📚",
    gradient: "cyan",
    stack: ["Wiki"],
    status: "archived",
    links: { live: "https://wiki.itabas.com" },
    vibeCoded: false,
    addedAt: "2017-11",
  },
  {
    name: "Your Next App",
    tagline: "示例占位：替换为你真实的 vibe coding 应用 —— 一行一句话，填好 stack 与链接即可。",
    emoji: "🚀",
    gradient: "sunset",
    stack: ["Astro", "Workers", "Claude Code"],
    status: "wip",
    vibeCoded: true,
    model: "Claude Code",
    addedAt: "2026-08",
  },
];
