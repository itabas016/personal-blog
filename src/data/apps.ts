/**
 * /apps 页面数据源 —— 加一个应用 = 加一条记录，无需改页面代码。
 * 字段含义见 docs/DESIGN.md §6。
 *
 * ⚠️ TODO(Roger)：以下 8 个应用的 tagline 是 AI 根据应用名推断的占位描述，
 *    且均未填链接 —— 仓库为 GitHub 私有仓，部署域名（Cloudflare）请按实际补充：
 *    - links.live: 线上地址（如 https://<app>.workers.dev 或自定义域）
 *    - links.repo: 若仓库转公开后再填
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
    name: "Universe Modeling",
    tagline: "宇宙建模实验场，把物理与宇宙学模型做成可交互的可视化。",
    emoji: "🌌",
    gradient: "violet",
    stack: ["Cloudflare"],
    status: "live",
    vibeCoded: true,
    model: "Claude Code",
    addedAt: "2026-08",
  },
  {
    name: "Equity Research",
    tagline: "股票研究工作台，AI 辅助整理财报、估值与行业数据。",
    emoji: "📊",
    gradient: "cyan",
    stack: ["Cloudflare"],
    status: "live",
    vibeCoded: true,
    model: "Claude Code",
    addedAt: "2026-08",
  },
  {
    name: "Reading Challenge",
    tagline: "阅读挑战打卡，把年度书单变成可以坚持的游戏。",
    emoji: "📚",
    gradient: "emerald",
    stack: ["Cloudflare"],
    status: "live",
    vibeCoded: true,
    model: "Claude Code",
    addedAt: "2026-08",
  },
  {
    name: "Polymarket Monitor",
    tagline: "预测市场监控，盯住关心的事件合约与价格异动。",
    emoji: "🎯",
    gradient: "sunset",
    stack: ["Cloudflare Workers"],
    status: "live",
    vibeCoded: true,
    model: "Claude Code",
    addedAt: "2026-08",
  },
  {
    name: "Immersive Reading",
    tagline: "沉浸式阅读器，为长文打造专注的排版与体验。",
    emoji: "📖",
    gradient: "cyan",
    stack: ["Cloudflare"],
    status: "live",
    vibeCoded: true,
    model: "Claude Code",
    addedAt: "2026-08",
  },
  {
    name: "Family Tree",
    tagline: "家谱整理工具，把家族关系可视化地留存下去。",
    emoji: "🌳",
    gradient: "emerald",
    stack: ["Cloudflare"],
    status: "live",
    vibeCoded: true,
    model: "Claude Code",
    addedAt: "2026-08",
  },
  {
    name: "WillFit",
    tagline: "健身训练小助手，计划、负荷与打卡一目了然。",
    emoji: "🏋️",
    gradient: "sunset",
    stack: ["Cloudflare"],
    status: "live",
    vibeCoded: true,
    model: "Claude Code",
    addedAt: "2026-08",
  },
  {
    name: "Rune",
    tagline: "神秘项目，敬请期待。",
    emoji: "🧿",
    gradient: "violet",
    stack: ["Cloudflare"],
    status: "wip",
    vibeCoded: true,
    model: "Claude Code",
    addedAt: "2026-08",
  },
  {
    name: "Homeless.group",
    tagline: "2020 年做的分享型小站，记录当时折腾的各类服务。",
    emoji: "🏠",
    gradient: "slate",
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
    gradient: "slate",
    stack: ["Wiki"],
    status: "archived",
    links: { live: "https://wiki.itabas.com" },
    vibeCoded: false,
    addedAt: "2017-11",
  },
];
