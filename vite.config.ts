import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { keycloakify } from "keycloakify/vite-plugin";


export default defineConfig({
  plugins: [
      react(),
      keycloakify({
        accountThemeImplementation: "none",
        startKeycloakOptions: {
          realmJsonFilePath: "./realm-export.json"
        }
      })
  ],
  resolve: {
    alias: {
      "@/": "/src/",
      "@/assets": "/src/assets",
      "@/components": "/src/components",
      "@/layouts": "/src/layouts",
      "@/login": "/src/login"
    }
  },
});
