// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { SITE } from "./src/data/site";

// 站点最终域名以部署为准；历史域名 tech.itabas.com 由 404 页面做旧链接兼容
export default defineConfig({
  site: SITE.url,
  trailingSlash: "ignore",
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    syntaxHighlight: "shiki",
    shikiConfig: {
      themes: {
        light: "github-light",
        dark: "one-dark-pro",
      },
    },
    gfm: true,
  },
  build: {
    inlineStylesheets: "auto",
  },
});
