// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  css: ["~/assets/css/main.css"],
  modules: ["@nuxtjs/i18n"],
  i18n: {
    locales: [
      {
        code: "de",
        language: "de-DE",
        name: "Deutsch",
      },
      {
        code: "en",
        language: "en-US",
        name: "English",
      },
    ],
    baseUrl: "https://kmapper.ch",
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
    // The env variables are set in the docker-compose.yml
    // The localhost URLs are fallbacks in case the environment variables are not set
    directusUrl: process.env.NUXT_DIRECTUS_URL || "http://localhost:8055",
    public: {
      directusUrl:
        process.env.NUXT_PUBLIC_DIRECTUS_URL || "http://localhost:8055",
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
  // Allow x-frame options for Directus preview
  nitro: {
    routeRules: {
      "/**": {
        headers: {
          "X-Frame-Options": "ALLOWALL",
          "Content-Security-Policy":
            "frame-ancestors 'self' http://localhost:8055 https://cms.kmapper.ch",
        },
      },
    },
  },
});
