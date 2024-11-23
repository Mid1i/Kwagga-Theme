import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { keycloakify } from "keycloakify/vite-plugin";
import svgr from "vite-plugin-svgr";


export default defineConfig({
  plugins: [
    svgr(),
    react(),
    keycloakify({
      accountThemeImplementation: "Multi-Page",
      startKeycloakOptions: {
        realmJsonFilePath: "./realm-export.json"
      }
    })
  ],
  build: {
    assetsInlineLimit: 0
  },
  resolve: {
    alias: {
      "@/": "/src/",
      "@/account": "/src/account",
      "@/assets": "/src/assets",
      "@/components": "/src/components",
      "@/helpers": "/src/helpers",
      "@/layouts": "/src/layouts",
      "@/login": "/src/login",
      "@/types": "/src/types"
    }
  },
});
