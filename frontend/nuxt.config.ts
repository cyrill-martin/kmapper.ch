import { fileURLToPath } from "node:url";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  css: ["~/assets/css/main.css"],
  modules: ["@nuxtjs/i18n"],
  i18n: {
    langDir: "locales",
    locales: [
      {
        code: "de",
        language: "de-DE",
        name: "Deutsch",
        file: "de.json",
      },
      {
        code: "en",
        language: "en-US",
        name: "English",
        file: "en.json",
      },
    ],
    baseUrl: process.env.NUXT_PUBLIC_BASE_URL || "http://localhost:3000",
    defaultLocale: "de",
    strategy: "prefix",
    detectBrowserLanguage: {
      useCookie: false,
      cookieKey: "i18n_lang",
      redirectOn: "root",
    },
    customRoutes: "config",
    pages: {
      home: {
        en: "/home",
        de: "/home",
      },
      curation: {
        en: "/curation",
        de: "/kuration",
      },
      organization: {
        en: "/organization",
        de: "/organisation",
      },
      publication: {
        en: "/publication",
        de: "/publikation",
      },
      about: {
        en: "/about",
        de: "/ueber",
      },
      projects: {
        en: "/projects",
        de: "/projekte",
      },
      imprint: {
        en: "/imprint",
        de: "/impressum",
      },
      privacy: {
        en: "/privacy",
        de: "/datenschutz",
      },
    },
  },
  runtimeConfig: {
    public: {
      baseUrl: process.env.NUXT_PUBLIC_BASE_URL || "http://localhost:3000",
    },
  },
  build: {
    transpile: [
      "naive-ui",
      "vueuc",
      "@css-render/vue3-ssr",
      "css-render",
      "@juggle/resize-observer",
    ],
  },
  nitro: {
    // Ships content/*.yaml with the server bundle so pages can read
    // them at runtime in both dev and the built .output server.
    // Absolute path so it resolves the same regardless of Nitro's own srcDir.
    serverAssets: [
      { baseName: "content", dir: fileURLToPath(new URL("./content", import.meta.url)) },
    ],
  },
});
