import { fileURLToPath } from "node:url";

import tailwindcss from "@tailwindcss/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

const srcPath = fileURLToPath(new URL("./src", import.meta.url));

export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },

  resolve: {
    alias: {
      "@": srcPath,
    },
    dedupe: [
      "react",
      "react-dom",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "@tanstack/react-query",
      "@tanstack/query-core",
      "@tanstack/react-router",
    ],
  },

  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-dom/client",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
    ],
    ignoreOutdatedRequests: true,
  },

  plugins: [
    tailwindcss(),

    tsConfigPaths({
      projects: ["./tsconfig.json"],
    }),

    viteReact(),
  ],
});