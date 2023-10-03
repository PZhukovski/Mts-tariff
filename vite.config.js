import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import { externalizeDeps } from "vite-plugin-externalize-deps";

export default defineConfig({
  plugins: [react(), externalizeDeps(), nodePolyfills()],
  build: {
    outDir: "dist",
  },
  base: "/Mts-tariff",
});
