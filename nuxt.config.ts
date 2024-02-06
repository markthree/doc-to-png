import nitroPort from "nitro-port-module";

export default defineNuxtConfig({
  typescript: {
    shim: false,
  },
  modules: ["@nuxt/ui"],
  nitro: {
    rollupConfig: {
      external: ["docx-preview"],
    },
    modules: [
      nitroPort({
        port: 9000,
      }),
    ],
  },
});
