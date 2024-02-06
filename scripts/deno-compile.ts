// deno 二进制打包
import { execa } from "execa";
import { writeFile } from "fs/promises";

await execa("npx", ["nuxt", "build"], {
  env: {
    NITRO_PRESET: "deno-server",
  },
  stdio: "inherit",
});

writeFile(
  ".output/main.mjs",
  `import { execa } from "https://deno.land/x/easy_std/src/process.ts";

import("./server/index.mjs").then(() => {
  const port = Deno.env.get("NITRO_PORT") || Deno.env.get("PORT") || 3000
  const url = 'http://localhost:' + port
  execa(['explorer', url])
})
`,
);

await execa("deno", ["compile", "-A", ".output/main.mjs"], {
  stdio: "inherit",
});
