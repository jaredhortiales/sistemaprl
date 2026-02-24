import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Cambie "sistemaprl-frontend-staging" por el nombre exacto de su repo:
  base: "/sistemaprl-frontend-staging/"
});