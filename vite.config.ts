import { defineConfig, loadEnv } from "vite";

import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

export default ({ mode }: { mode: string }) => {
  // Load app-level env vars to node-level env vars.
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [react()],
    resolve: {
      alias: [{ find: "@", replacement: resolve("./src") }],
    },
    optimizeDeps: {
      include: ["recoil"],
    },
    build: {
      chunkSizeWarningLimit: 1000,
      sourcemap: false,
    },
  });
};
