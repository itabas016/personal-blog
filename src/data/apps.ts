/**
 * /apps 页面数据源 —— 加一个应用 = 加一条记录，无需改页面代码。
 * 字段含义见 docs/DESIGN.md §6。
 *
 * 链接说明：2026-09-05 对照 Cloudflare API（workers / 自定义域 / Pages）逐一核实。
 * 有自定义域名的一律用自定义域名；没有的用 *.pages.dev / *.workers.dev 默认域。
 * 例外：polymarket-monitor 仍返回 403（Cloudflare Access 保护），personal-wiki 已下线，见各自注释。
 */

/** 按用途分类（访客视角），技术栈作为卡片 tag 呈现，不参与分类 */
export const CATEGORIES = [
  { id: "experiments", label: "实验", emoji: "🧪" },
  { id: "data", label: "数据", emoji: "📈" },
  { id: "reading", label: "阅读", emoji: "📚" },
  { id: "life", label: "生活", emoji: "🏃" },
  { id: "tools", label: "工具", emoji: "🛠" },
] as const;

export type CategoryId = (typeof CATEGORIES)[number]["id"];

export interface App {
  name: string;
  tagline: string;
  emoji: string;
  /** 渐变色对，取值见 APP_GRADIENTS */
  gradient: string;
  stack: string[];
  status: "live" | "wip" | "archived";
  /** 用途分类；缺省 = 未分类，仍在「全部」中显示 */
  category?: CategoryId;
  /** 精选位：进 /apps 顶部大卡区与首页速览 */
  featured?: boolean;
  /** 应用截图（16:10），放 public/images/apps/<slug>/cover.png；缺省用渐变块兜底 */
  cover?: string;
  /** 关联博客文章 slug，用于「实现笔记」互链 */
  posts?: string[];
  links?: { live?: string; repo?: string };
  /** 是否 AI 协作（vibe coding）开发 */
  vibeCoded: boolean;
  /** 使用的模型 / Agent */
  model?: string;
  addedAt: string; // YYYY-MM
}

/** 渐变色对 → Tailwind 类，AppCard 与精选大卡共用 */
export const APP_GRADIENTS: Record<string, string> = {
  violet: "from-violet-500/80 to-violet-700/80",
  cyan: "from-cyan-400/80 to-sky-600/80",
  sunset: "from-orange-400/80 to-rose-500/80",
  emerald: "from-emerald-400/80 to-teal-600/80",
  slate: "from-slate-400/70 to-slate-600/80",
};

export const apps: App[] = [
  {
    name: "EnglishMate 英语学伴",
    tagline: "AI 驱动的英语精读、跟读训练、生词本与学习打卡。",
    emoji: "🎓",
    gradient: "cyan",
    stack: ["Cloudflare Workers"],
    status: "live",
    category: "tools",
    links: { live: "https://englishmate.itabas.com" },
    vibeCoded: true,
    model: "Claude Code",
    addedAt: "2026-09",
  },
  {
    name: "MeetPulse",
    tagline: "AI 会议小能手：智能会议记录、双语同传字幕与结构化纪要。",
    emoji: "🎙️",
    gradient: "violet",
    stack: ["Cloudflare Workers"],
    status: "live",
    category: "tools",
    links: { live: "https://meetpulse.itabas.com" },
    vibeCoded: true,
    model: "Claude Code",
    addedAt: "2026-09",
  },
  {
    name: "Novelist Site",
    tagline: "novelist-agent 写着玩的长篇与随笔集，《河流的方向》连载中。",
    emoji: "📜",
    gradient: "sunset",
    stack: ["Cloudflare Workers"],
    status: "live",
    category: "reading",
    links: { live: "https://novelist-site.itabas016.workers.dev" },
    vibeCoded: true,
    model: "novelist-agent",
    addedAt: "2026-09",
  },
  {
    name: "MarbleFlow 弹珠链迹",
    tagline: "休闲解压的小球连锁反应小游戏。",
    emoji: "🎱",
    gradient: "emerald",
    stack: ["Cloudflare Pages"],
    status: "live",
    category: "experiments",
    links: { live: "https://games.itabas.com/marbleflow/" },
    vibeCoded: true,
    model: "Claude Code",
    addedAt: "2026-09",
  },
  {
    name: "V2EX PWA",
    tagline: "V2EX 论坛 PWA，边缘缓存加速的社区阅读客户端。",
    emoji: "💬",
    gradient: "cyan",
    stack: ["Cloudflare Workers"],
    status: "live",
    category: "tools",
    links: { live: "https://v2ex-pwa.itabas016.workers.dev" },
    vibeCoded: true,
    model: "Claude Code",
    addedAt: "2026-09",
  },
  {
    name: "Lingxi",
    // ⚠️ 2026-09-05 实测：lingxi.itabas.com TLS 握手失败（证书未就绪），
    // lingxi-api workers.dev 根路径返回 404 JSON（纯 API，无公开 UI）。
    // 公开入口就绪后改 status 为 live 并补 links.live（自定义域名优先）。
    tagline: "服务接口灰度部署中，公开入口与介绍待补。",
    emoji: "🧩",
    gradient: "slate",
    stack: ["Cloudflare Workers"],
    status: "wip",
    category: "tools",
    vibeCoded: true,
    model: "Claude Code",
    addedAt: "2026-09",
  },
  {
    name: "Universe Modeling",
    tagline: "宇宙建模实验场，把物理与宇宙学模型做成可交互的可视化。",
    emoji: "🌌",
    gradient: "violet",
    stack: ["Vite", "Cloudflare Workers"],
    status: "live",
    category: "experiments",
    featured: true,
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
    category: "data",
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
    stack: ["Astro", "Cloudflare Workers"],
    status: "live",
    category: "reading",
    links: { live: "https://reading-challenge.itabas.com" },
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
    category: "data",
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
    category: "reading",
    featured: true,
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
    category: "life",
    links: { live: "https://family-tree.itabas.com" },
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
    category: "life",
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
    category: "life",
    featured: true,
    // 另有等价自定义域 badminton-activity.itabas.com，指向同一 worker
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
    category: "tools",
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
    // ⚠️ 2026-09-05 实测已无法访问（https TLS 握手失败、http 502），链接移除
    tagline: "个人知识库，沉淀 2017 年前后的技术笔记。",
    emoji: "📚",
    gradient: "slate",
    stack: ["Wiki"],
    status: "archived",
    vibeCoded: false,
    addedAt: "2017-11",
  },
];
