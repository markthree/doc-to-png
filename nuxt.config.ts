import nitroPort from "nitro-port-module";

const isDenoDeployPreset = process.env.NITRO_PRESET === "deno-deploy";

export default defineNuxtConfig({
  typescript: {
    shim: false,
  },
  ssr: !isDenoDeployPreset,
  modules: ["@nuxt/ui"],
  nitro: {
    modules: [
      nitroPort({
        port: 9000,
      }),
    ],
  },
});
