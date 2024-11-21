import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { keycloakify } from "keycloakify/vite-plugin";


export default defineConfig({
  plugins: [
      react(),
      keycloakify({
        accountThemeImplementation: "Multi-Page",
        startKeycloakOptions: {
          realmJsonFilePath: "./realm-export.json"
        }
      })
  ],
  resolve: {
    alias: {
      "@/": "/src/",
      "@/account": "/src/account",
      "@/assets": "/src/assets",
      "@/components": "/src/components",
      "@/helpers": "/src/helpers",
      "@/layouts": "/src/layouts",
      "@/login": "/src/login"
    }
  },
});
