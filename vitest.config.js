import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";
export default defineConfig({
  // ...
  plugins: [
    react({
      jsxRuntime: "automatic",
    }),
  ],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/setupTests.js",
    alias: {
      "@": path.resolve(process.cwd(), "src"),
    },
    include: ["src/tests/*.test.jsx", "src/tests/*.test.js"],
    coverage: {
      include: ["src/**/*.jsx", "src/**/*.js"],
      exclude: ["./src/trash"],
      provider: "v8",
      reporter: ["text", "html"],
    },
  },
});
