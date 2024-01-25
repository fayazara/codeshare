// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxt/ui",
    "nuxt-icon",
    "@nuxtjs/google-fonts",
    "@nuxtjs/fontaine",
    "@vueuse/nuxt",
    "nuxt-security"
  ],
  ui: {
    icons: ["heroicons", "lucide"],
  },
  security: {
    headers: {
      crossOriginEmbedderPolicy:
        process.env.NODE_ENV === "development" ? "unsafe-none" : "require-corp",
    },
  },
  colorMode: {
    preference: "dark",
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
  routeRules: {
    "/api/*": {
      security: {
        rateLimiter: {
          tokensPerInterval: 5,
          interval: 30000,
          driver: {
            name: "cloudflare-kv-binding",
            options: {
              binding: "KV",
            },
          },
          throwError: false,
        },
      },
    },
  },
  googleFonts: {
    display: "swap",
    families: {
      Inter: [400, 500, 600, 700, 800, 900],
    },
  },
});
