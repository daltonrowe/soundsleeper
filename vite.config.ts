import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        globPatterns: ["**/*{js,css,html,png,svg,mp3,wav}"],
      },
      includeAssets: ["favicon.svg", "apple-touch-icon.png"],
      manifest: {
        name: "Soundsleeper",
        short_name: "Soundsleeper",
        description: "Looping Sounds for Sleep & Tinnitus Relief",
        theme_color: "#4e4ece",
        icons: [
          {
            src: "src/assets/img/pwa-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "src/assets/img/pwa-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
