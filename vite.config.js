import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // GitHub Pages needs the repo path; Vercel and local dev use the root.
  base: process.env.GITHUB_ACTIONS ? "/onepiecegames/" : "/",
});