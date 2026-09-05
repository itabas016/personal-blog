/**
 * /apps 页面数据源 —— 加一个应用 = 加一条记录，无需改页面代码。
 * 字段含义见 docs/DESIGN.md §6。
 *
 * 链接说明：所有 links.live 均已于 2026-08-31 实测可达
 * （polymarket-monitor 例外，见下）；GitHub 仓库均为私有仓，故不放 repo 链接。
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
    stack: ["Vite", "Cloudflare Workers"],
    status: "live",
    links: { live: "https://universe.itabas.com" },
    vibeCoded: true,
    model: "Claude Code",
    addedAt: "2026-08",
  },
  {
    name: "Equity Research",
    tagline: "股票研究工作台，AI 辅助整理财报、估值与行业数据。",
    emoji: "📊",
    gradient: "cyan",
    stack: ["Cloudflare Pages"],
    status: "live",
    links: { live: "https://equity-research.pages.dev" },
    vibeCoded: true,
    model: "Claude Code",
    addedAt: "2026-08",
  },
  {
    name: "Reading Challenge",
    tagline: "阅读挑战打卡，把年度书单变成可以坚持的游戏。",
    emoji: "📚",
    gradient: "emerald",
    stack: ["Astro", "Cloudflare Pages"],
    status: "live",
    links: { live: "https://reading-challenge.pages.dev" },
    vibeCoded: true,
    model: "Claude Code",
    addedAt: "2026-08",
  },
  {
    name: "Polymarket Monitor",
    // ⚠️ https://polymarket-monitor.pages.dev 当前返回 403（疑似 Cloudflare Access 保护），
    //    若已对公众开放请保持链接；已下线则改 status 并移除链接。
    tagline: "预测市场监控，盯住关心的事件合约与价格异动。",
    emoji: "🎯",
    gradient: "sunset",
    stack: ["Cloudflare Pages"],
    status: "live",
    links: { live: "https://polymarket-monitor.pages.dev" },
    vibeCoded: true,
    model: "Claude Code",
    addedAt: "2026-08",
  },
  {
    name: "Immersive Reading",
    tagline: "沉浸式阅读器，为长文打造专注的排版与分享体验。",
    emoji: "📖",
    gradient: "cyan",
    stack: ["SvelteKit", "Cloudflare Workers", "R2"],
    status: "live",
    links: { live: "https://immersive-reading.itabas.com" },
    vibeCoded: true,
    model: "Claude Code",
    addedAt: "2026-08",
  },
  {
    name: "Family Tree",
    tagline: "家谱整理工具，把家族关系与照片可视化地留存下去。",
    emoji: "🌳",
    gradient: "emerald",
    stack: ["Next.js", "Cloudflare Workers", "R2"],
    status: "live",
    links: { live: "https://family-tree.pages.dev" },
    vibeCoded: true,
    model: "Claude Code",
    addedAt: "2026-08",
  },
  {
    name: "WillFit",
    tagline: "健身训练小助手，计划、负荷与打卡一目了然。",
    emoji: "🏋️",
    gradient: "sunset",
    stack: ["Next.js", "Cloudflare Workers"],
    status: "live",
    links: { live: "https://willfit.itabas.com" },
    vibeCoded: true,
    model: "Claude Code",
    addedAt: "2026-08",
  },
  {
    name: "BadmintonSettle",
    tagline: "羽毛球活动管理与结算工具，约球记账一场清。",
    emoji: "🏸",
    gradient: "emerald",
    stack: ["Cloudflare Workers"],
    status: "live",
    links: { live: "https://bdm.itabas.com" },
    vibeCoded: true,
    model: "Claude Code",
    addedAt: "2026-08",
  },
  {
    name: "Rune",
    // Rust CLI 项目，无线上地址；仓库 private，故无链接
    tagline: "预算驱动的反思式终端 coding agent（Rust），多协议 + 强弱路由 + FTS5 检索。",
    emoji: "🧿",
    gradient: "violet",
    stack: ["Rust", "CLI"],
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
