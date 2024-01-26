// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxt/ui",
    "nuxt-icon",
    "@nuxtjs/google-fonts",
    "@nuxtjs/fontaine",
    "@vueuse/nuxt",
    "nuxt-rate-limit"
  ],
  ui: {
    icons: ["heroicons", "lucide"],
  },
  colorMode: {
    preference: "dark",
  },
  nuxtRateLimit: {
    routes: {
      '/api/*': {
        maxRequests: 5,
        intervalSeconds: 60,
      },
    },
  },
  app: {
    head: {
      script: [
        {
          src: "https://eu.umami.is/script.js",
          "data-website-id": "2bd6347d-b9b2-4bd7-b846-a7b0a7f24598",
          async: true,
        },
      ],
    },
  },
  googleFonts: {
    display: "swap",
    families: {
      Inter: [400, 500, 600, 700, 800, 900],
    },
  },
});
