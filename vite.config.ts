import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { createServer } from "./server";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    fs: {
      allow: ["./client", "./shared"],
      deny: [".env", ".env.*", "*.{crt,pem}", "**/.git/**", "server/**"],
    },
  },
  build: {
    outDir: "dist/spa",
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // React core
          if (id.includes("react") || id.includes("react-dom")) {
            return "vendor-react";
          }
          // Icons
          if (id.includes("react-icons")) {
            return "vendor-icons";
          }
          // Radix UI components
          if (id.includes("@radix-ui")) {
            return "vendor-ui";
          }
          // Large dependencies
          if (id.includes("framer-motion")) {
            return "vendor-animation";
          }
          // Node modules
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
        // Optimize chunk names
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash].[ext]",
      },
    },
    // Improve build performance
    target: "es2020",
    minify: "esbuild",
    sourcemap: false, // Disable in production for smaller bundles
  },
  plugins: [react(), expressPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
}));

function expressPlugin(): Plugin {
  return {
    name: "express-plugin",
    apply: "serve", // Only apply during development (serve mode)
    configureServer(server) {
      const app = createServer();

      // Add Express app as middleware to Vite dev server
      server.middlewares.use(app);
    },
  };
}
