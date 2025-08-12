import { useEffect } from "react";
import { LandingPageData } from "../hooks/useLandingPageData";

interface SEOHeadProps {
  seo: LandingPageData["seo"];
}

export default function SEOHead({ seo }: SEOHeadProps) {
  useEffect(() => {
    console.log("🔍 SEOHead recebeu dados:", seo);
    if (!seo) {
      console.log("❌ SEO dados não encontrados");
      return;
    }

    // Update document title
    if (seo.title) {
      document.title = seo.title;
    }

    // Function to update or create meta tag
    const updateMetaTag = (
      name: string,
      content: string,
      attribute: string = "name",
    ) => {
      if (!content) return;

      let meta = document.querySelector(
        `meta[${attribute}="${name}"]`,
      ) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    // Function to update or create link tag
    const updateLinkTag = (
      rel: string,
      href: string,
      sizes?: string,
      type?: string,
    ) => {
      if (!href) return;

      let link = document.querySelector(
        `link[rel="${rel}"]`,
      ) as HTMLLinkElement;
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", rel);
        document.head.appendChild(link);
      }
      link.setAttribute("href", href);
      if (sizes) link.setAttribute("sizes", sizes);
      if (type) link.setAttribute("type", type);
    };

    // Basic meta tags
    updateMetaTag("description", seo.description);
    updateMetaTag("keywords", seo.keywords);
    updateMetaTag("author", seo.author);
    updateMetaTag("robots", "index, follow");

    // Open Graph meta tags
    if (seo.openGraph) {
      updateMetaTag("og:title", seo.openGraph.title, "property");
      updateMetaTag("og:description", seo.openGraph.description, "property");
      updateMetaTag("og:image", seo.openGraph.image, "property");
      updateMetaTag("og:url", seo.openGraph.url, "property");
      updateMetaTag("og:type", seo.openGraph.type, "property");
      updateMetaTag("og:site_name", seo.openGraph.siteName, "property");
    }

    // Twitter Card meta tags
    if (seo.twitter) {
      updateMetaTag("twitter:card", seo.twitter.card);
      updateMetaTag("twitter:title", seo.twitter.title);
      updateMetaTag("twitter:description", seo.twitter.description);
      updateMetaTag("twitter:image", seo.twitter.image);
      updateMetaTag("twitter:creator", seo.twitter.creator);
      updateMetaTag("twitter:site", seo.twitter.site);
    }

    // Canonical URL
    if (seo.canonicalUrl) {
      let canonical = document.querySelector(
        'link[rel="canonical"]',
      ) as HTMLLinkElement;
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.setAttribute("rel", "canonical");
        document.head.appendChild(canonical);
      }
      canonical.setAttribute("href", seo.canonicalUrl);
    }

    // Favicon
    if (seo.favicon) {
      updateLinkTag("icon", seo.favicon, "32x32", "image/x-icon");
      updateLinkTag("shortcut icon", seo.favicon, undefined, "image/x-icon");
    }

    // Apple Touch Icon
    if (seo.appleTouchIcon) {
      updateLinkTag("apple-touch-icon", seo.appleTouchIcon, "180x180");
    }

    // Structured Data (JSON-LD)
    if (seo.structured) {
      let structuredScript = document.querySelector(
        'script[type="application/ld+json"]',
      );
      if (!structuredScript) {
        structuredScript = document.createElement("script");
        structuredScript.setAttribute("type", "application/ld+json");
        document.head.appendChild(structuredScript);
      }

      const structuredData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: seo.structured.organizationName,
        logo: seo.structured.organizationLogo,
        url: seo.structured.organizationUrl,
        contactPoint: {
          "@type": "ContactPoint",
          telephone: seo.structured.contactPhone,
          email: seo.structured.contactEmail,
          contactType: "business",
        },
        sameAs: [seo.openGraph?.url || ""],
      };

      structuredScript.textContent = JSON.stringify(structuredData);
    }

    // Additional mobile and performance meta tags
    updateMetaTag("viewport", "width=device-width, initial-scale=1.0");
    updateMetaTag("theme-color", "#e86001");
    updateMetaTag("msapplication-TileColor", "#e86001");
    updateMetaTag("format-detection", "telephone=no");

    // PWA meta tags
    updateMetaTag("apple-mobile-web-app-capable", "yes");
    updateMetaTag("apple-mobile-web-app-status-bar-style", "default");
    updateMetaTag("apple-mobile-web-app-title", seo.title);
  }, [seo]);

  return null; // This component doesn't render anything
}

// Export function to dynamically update page title for SPA navigation
export const updatePageTitle = (title: string) => {
  if (title) {
    document.title = title;
  }
};

// Export function to track page views with SEO data
export const trackPageView = (seo: LandingPageData["seo"]) => {
  // This can be integrated with Google Analytics or other tracking
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", "GA_MEASUREMENT_ID", {
      page_title: seo?.title,
      page_location: seo?.canonicalUrl || window.location.href,
    });
  }
};
