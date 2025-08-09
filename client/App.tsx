import "./global.css";
import React from "react";

import { createRoot, Root } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

// Ensure createRoot is only called once
const container = document.getElementById("root");
if (!container) {
  throw new Error("Root container not found");
}

// Store root in a global variable to prevent multiple creations during HMR
let root: Root;

if (!(globalThis as any).__reactRoot) {
  root = createRoot(container);
  (globalThis as any).__reactRoot = root;
} else {
  root = (globalThis as any).__reactRoot;
}

root.render(<App />);
