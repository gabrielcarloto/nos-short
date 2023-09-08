import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,woff,woff2}"],
      },
      includeAssets: ["assets/*"],
      manifest: {
        name: "nós.short - O melhor encurtador de links",
        description: "Encurte, salve e compartilhe links em poucos cliques!",
        short_name: "nós.short",
        icons: [
          {
            src: "/favicon-72x72.png",
            type: "image/png",
            sizes: "72x72",
            purpose: "any maskable",
          },
          {
            src: "/favicon-96x96.png",
            type: "image/png",
            sizes: "96x96",
            purpose: "any maskable",
          },
          {
            src: "/favicon-128x128.png",
            type: "image/png",
            sizes: "128x128",
            purpose: "any maskable",
          },
          {
            src: "/favicon-144x144.png",
            type: "image/png",
            sizes: "144x144",
            purpose: "any maskable",
          },
          {
            src: "/favicon-152x152.png",
            type: "image/png",
            sizes: "152x152",
            purpose: "any maskable",
          },
          {
            src: "/favicon-192x192.png",
            type: "image/png",
            sizes: "192x192",
            purpose: "any maskable",
          },
          {
            src: "/favicon-384x384.png",
            type: "image/png",
            sizes: "384x384",
            purpose: "any maskable",
          },
          {
            src: "/favicon-512x512.png",
            type: "image/png",
            sizes: "512x512",
            purpose: "any maskable",
          },
        ],
        scope: "/",
        start_url: "/?source=pwa",
        display: "standalone",
        theme_color: "#fcd34d",
        background_color: "#fafafa",
      },
      devOptions: {
        enabled: !process.env.production,
      },
    }),
  ],
});
