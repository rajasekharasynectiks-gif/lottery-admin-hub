import path from "node:path";
import { fileURLToPath } from "node:url";

import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  base: "/lottery-admin-hub/",

  server: {
    host: true,
    port: 8080,
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
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
    include: ["react", "react-dom", "react-dom/client"],
  },

  plugins: [
    tailwindcss(),
    tsConfigPaths(),
    react(),
  ],

  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});