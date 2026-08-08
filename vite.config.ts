import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { vitePrerenderPlugin } from "vite-prerender-plugin";

const ROUTES = [
  "/",
  "/inversion-de-impacto",
  "/bonos-de-carbono",
  "/vivero",
  "/compensa",
  "/crowdgrowing",
  "/hijuelos-espadin",
  "/blog",
  "/privacy",
];

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
    mode !== 'development' &&
    vitePrerenderPlugin({
      renderTarget: "#root",
      prerenderScript: path.resolve(__dirname, "./src/prerender.tsx"),
      additionalPrerenderRoutes: ROUTES,
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
