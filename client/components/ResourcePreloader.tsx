import { useEffect } from "react";

interface ResourcePreloaderProps {
  heroImage?: string;
  logo?: string;
}

export default function ResourcePreloader({
  heroImage,
  logo,
}: ResourcePreloaderProps) {
  useEffect(() => {
    // Preload critical images
    const preloadImage = (src: string, priority: "high" | "low" = "high") => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = src;
      if (priority === "high") {
        link.setAttribute("fetchpriority", "high");
      }
      document.head.appendChild(link);
    };

    // Preload hero background image
    if (heroImage) {
      preloadImage(heroImage, "high");
    }

    // Preload logo
    if (logo) {
      preloadImage(logo, "high");
    }

    // Preload critical fonts
    const preloadFont = (href: string) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "font";
      link.type = "font/woff2";
      link.href = href;
      link.crossOrigin = "anonymous";
      document.head.appendChild(link);
    };

    // Preload Inter font (if using Google Fonts)
    preloadFont(
      "https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2",
    );
  }, [heroImage, logo]);

  return null; // This component doesn't render anything
}
