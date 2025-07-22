import { defineConfig } from "vite";

export default defineConfig({
  base: "/idle/",
  root: "./", // Since your index.html is in the root
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        main: "./index.html",
      },
    },
  },
});
