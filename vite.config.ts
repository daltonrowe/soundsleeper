import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "prompt",
      workbox: {
        globPatterns: ["**/*{js,css,html,png,svg,mp3,wav}"],
      },
      manifest: {
        id: "/",
        name: "Soundsleeper",
        short_name: "Soundsleeper",
        description: "Looping Sounds for Sleep & Tinnitus Relief",
        theme_color: "#4e4ece",
        icons: [
          {
            src: "pwa-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "favicon.svg",
            sizes: "512x512",
            type: "image/svg",
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
