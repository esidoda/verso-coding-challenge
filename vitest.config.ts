import { fileURLToPath } from 'url';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom', // Simulates a browser environment
  },
  resolve: {
    // https://vitejs.dev/config/shared-options.html#resolve-alias
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      stream: "rollup-plugin-node-polyfills/polyfills/stream",
    },
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
  },
});