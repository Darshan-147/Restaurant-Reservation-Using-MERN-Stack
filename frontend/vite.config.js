import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // not only will this replace /api with localhost url, but also will make the server think that the request is originated from this same url, even though if it was originated from a different url
      "/api": "http://localhost:4000",
    },
  },
});
