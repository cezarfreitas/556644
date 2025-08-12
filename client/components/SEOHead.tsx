import { useEffect } from "react";
import { LandingPageData } from "../hooks/useLandingPageData";

interface SEOHeadProps {
  seo: LandingPageData["seo"];
}

export default function SEOHead({ seo }: SEOHeadProps) {
  useEffect(() => {
    console.log("🚀 SEOHead iniciando...");

    // Aplicar SEO básico mesmo se os dados ainda não chegaram
    const title =
      seo?.title ||
      "Seja um Lojista Oficial Onbongo | Revenda Streetwear Premium";
    const description =
      seo?.description ||
      "Torne-se um lojista oficial Onbongo e tenha acesso a produtos exclusivos de streetwear. Mais de 30 anos de história, pronta entrega e suporte especializado.";
    const keywords =
      seo?.keywords ||
      "onbongo, lojista, revenda, streetwear, surfwear, atacado, moda urbana, franquia";

    console.log("📝 Aplicando título:", title);
    document.title = title;

    // Função para criar/atualizar meta tag
    const setMetaTag = (name: string, content: string, property = false) => {
      if (!content) return;

      const selector = property
        ? `meta[property="${name}"]`
        : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;

      if (!meta) {
        meta = document.createElement("meta");
        if (property) {
          meta.setAttribute("property", name);
        } else {
          meta.setAttribute("name", name);
        }
        document.head.appendChild(meta);
        console.log("➕ Criada meta tag:", name);
      }

      meta.setAttribute("content", content);
      console.log(
        "✅ Meta tag atualizada:",
        name,
        "=",
        content.substring(0, 50) + "...",
      );
    };

    // Meta tags básicas
    setMetaTag("description", description);
    setMetaTag("keywords", keywords);
    setMetaTag("author", seo?.author || "Onbongo Brasil");
    setMetaTag("robots", "index, follow");

    // Open Graph
    setMetaTag("og:title", seo?.openGraph?.title || title, true);
    setMetaTag(
      "og:description",
      seo?.openGraph?.description || description,
      true,
    );
    setMetaTag(
      "og:image",
      seo?.openGraph?.image || "/images/og-image.jpg",
      true,
    );
    setMetaTag("og:url", seo?.openGraph?.url || window.location.href, true);
    setMetaTag("og:type", seo?.openGraph?.type || "website", true);
    setMetaTag(
      "og:site_name",
      seo?.openGraph?.siteName || "Onbongo Lojistas",
      true,
    );

    // Twitter Card
    setMetaTag("twitter:card", seo?.twitter?.card || "summary_large_image");
    setMetaTag("twitter:title", seo?.twitter?.title || title);
    setMetaTag("twitter:description", seo?.twitter?.description || description);
    setMetaTag(
      "twitter:image",
      seo?.twitter?.image || "/images/twitter-card.jpg",
    );
    setMetaTag("twitter:creator", seo?.twitter?.creator || "@onbongo_oficial");
    setMetaTag("twitter:site", seo?.twitter?.site || "@onbongo_oficial");

    // Meta tags adicionais
    setMetaTag("viewport", "width=device-width, initial-scale=1.0");
    setMetaTag("theme-color", "#e97101");
    setMetaTag("msapplication-TileColor", "#e97101");
    setMetaTag("format-detection", "telephone=no");
    setMetaTag("apple-mobile-web-app-capable", "yes");
    setMetaTag("apple-mobile-web-app-status-bar-style", "default");
    setMetaTag("apple-mobile-web-app-title", title);

    // Canonical URL
    const canonicalUrl = seo?.canonicalUrl || window.location.href;
    let canonical = document.querySelector(
      'link[rel="canonical"]',
    ) as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
      console.log("➕ Criado link canonical");
    }
    canonical.setAttribute("href", canonicalUrl);
    console.log("✅ Canonical URL:", canonicalUrl);

    // Favicon
    const faviconUrl = seo?.favicon || "/favicon.ico";
    let favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
    if (!favicon) {
      favicon = document.createElement("link");
      favicon.setAttribute("rel", "icon");
      favicon.setAttribute("type", "image/x-icon");
      document.head.appendChild(favicon);
      console.log("➕ Criado favicon");
    }
    favicon.setAttribute("href", faviconUrl);

    // Apple Touch Icon
    const appleTouchIcon = seo?.appleTouchIcon || "/apple-touch-icon.png";
    let appleIcon = document.querySelector(
      'link[rel="apple-touch-icon"]',
    ) as HTMLLinkElement;
    if (!appleIcon) {
      appleIcon = document.createElement("link");
      appleIcon.setAttribute("rel", "apple-touch-icon");
      appleIcon.setAttribute("sizes", "180x180");
      document.head.appendChild(appleIcon);
      console.log("➕ Criado apple-touch-icon");
    }
    appleIcon.setAttribute("href", appleTouchIcon);

    // Structured Data (JSON-LD)
    if (seo?.structured) {
      let script = document.querySelector('script[type="application/ld+json"]');
      if (!script) {
        script = document.createElement("script");
        script.setAttribute("type", "application/ld+json");
        document.head.appendChild(script);
        console.log("➕ Criado script JSON-LD");
      }

      const structuredData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: seo.structured.organizationName || "Onbongo Brasil",
        logo:
          seo.structured.organizationLogo || "/images/brand/onbongo-logo.webp",
        url: seo.structured.organizationUrl || "https://onbongo.com.br/",
        contactPoint: {
          "@type": "ContactPoint",
          telephone: seo.structured.contactPhone || "+55 11 99999-9999",
          email: seo.structured.contactEmail || "lojistas@onbongo.com.br",
          contactType: "business",
        },
      };

      script.textContent = JSON.stringify(structuredData);
      console.log("✅ Structured data aplicado");
    }

    // Log final
    console.log("🎉 SEO aplicado com sucesso!");
    console.log("📊 Estado final:");
    console.log("   - Título:", document.title);
    console.log("   - Meta tags:", document.querySelectorAll("meta").length);
    console.log(
      "   - Open Graph tags:",
      document.querySelectorAll('meta[property^="og:"]').length,
    );
    console.log(
      "   - Twitter tags:",
      document.querySelectorAll('meta[name^="twitter:"]').length,
    );
  }, [seo]); // Reagir a mudanças nos dados SEO

  return null;
}
