import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages serves project sites from /<repo>/; `npm run build:gh` sets the base accordingly.
export default defineConfig({
  base: process.env.VITE_BASE ?? "/",
  plugins: [react()],
});
