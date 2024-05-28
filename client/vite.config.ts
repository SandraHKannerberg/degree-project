import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        // target: "http://localhost:3000",
        target: "https://degree-project.onrender.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [react()],
});
