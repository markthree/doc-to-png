import nitroPort from "nitro-port-module";

export default defineNuxtConfig({
  typescript: {
    shim: false,
  },
  ssr: false,
  modules: ["@nuxt/ui"],
  nitro: {
    modules: [
      nitroPort({
        port: 9000,
      }),
    ],
  },
});
