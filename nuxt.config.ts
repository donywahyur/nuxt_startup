// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "Nuxt Startup",
      meta: [{ name: "description", content: "STARTUP " }],
      link: [
        {
          rel: "icon",
          type: "image/x-icon",
          href: "/favicon.ico",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap",
        },
      ],
    },
  },
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],
  tailwindcss: {
    cssPath: ["~/public/assets/css/tailwind.css", { injectPosition: "first" }],
  },
  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.API_BASE_URL,
    },
  },
});
