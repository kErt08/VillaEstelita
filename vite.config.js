import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "js",
    emptyOutDir: false,
    rollupOptions: {
      input: resolve(__dirname, "src/gallery.jsx"),
      output: {
        format: "iife",
        name: "VillaEstelitaGallery",
        entryFileNames: "gallery.bundle.js",
        assetFileNames: "gallery.[ext]",
      },
    },
  },
});
