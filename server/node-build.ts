import { createServer } from "./index.js";
import express from "express";
import path from "path";
import { URL } from "url";

const app = createServer();
const port = process.env.PORT || 80;

// In production, serve the built SPA files
// Fix for Node.js 18 compatibility
const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, "../spa");

// Serve static files
app.use(express.static(distPath));

// Handle React Router - serve index.html for all non-API routes
app.get("*", (req, res) => {
  // Don't serve index.html for API routes or health check
  if (
    req.path.startsWith("/api/") ||
    req.path.startsWith("/health") ||
    req.path.startsWith("/imagens/")
  ) {
    return res.status(404).json({ error: "Endpoint not found" });
  }

  // Serve index.html for all other routes (React Router will handle routing)
  res.sendFile(path.join(distPath, "index.html"), (err) => {
    if (err) {
      console.error("Error serving index.html:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  });
});

app.listen(port, "0.0.0.0", () => {
  console.log(`🚀 Fusion Starter server running on port ${port}`);
  console.log(`📱 Frontend: http://0.0.0.0:${port}`);
  console.log(`🔧 API: http://0.0.0.0:${port}/api`);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("🛑 Received SIGTERM, shutting down gracefully");
  process.exit(0);
});

process.on("SIGINT", () => {
  console.log("🛑 Received SIGINT, shutting down gracefully");
  process.exit(0);
});
