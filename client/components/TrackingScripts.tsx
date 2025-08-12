import { useEffect } from "react";
import { LandingPageData } from "../hooks/useLandingPageData";

interface TrackingScriptsProps {
  integrations: LandingPageData["integrations"];
}

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
    fbq: (...args: any[]) => void;
    google_tag_manager: any;
  }
}

export default function TrackingScripts({
  integrations,
}: TrackingScriptsProps) {
  useEffect(() => {
    // Google Analytics 4
    if (integrations?.googleAnalytics?.enabled && integrations?.googleAnalytics?.measurementId) {
      const measurementId = integrations.googleAnalytics.measurementId;

      // Remove existing GA script if any
      const existingGA = document.querySelector(
        `script[src*="gtag/js?id=${measurementId}"]`,
      );
      if (existingGA) {
        existingGA.remove();
      }

      // Load GA script
      const gaScript = document.createElement("script");
      gaScript.async = true;
      gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
      document.head.appendChild(gaScript);

      // Initialize GA
      window.dataLayer = window.dataLayer || [];
      function gtag(...args: any[]) {
        window.dataLayer.push(args);
      }
      window.gtag = gtag;

      gtag("js", new Date());
      gtag("config", measurementId);
    }

    // Google Tag Manager
    if (
      integrations?.googleTagManager?.enabled &&
      integrations?.googleTagManager?.containerId &&
      integrations.googleTagManager.containerId !== "GTM-XXXXXXX"
    ) {
      const containerId = integrations.googleTagManager.containerId;

      // GTM Head Script
      if (
        !document.querySelector(
          `script[src*="googletagmanager.com/gtm.js?id=${containerId}"]`,
        )
      ) {
        const gtmScript = document.createElement("script");
        gtmScript.async = true;
        gtmScript.src = `https://www.googletagmanager.com/gtm.js?id=${containerId}`;
        document.head.appendChild(gtmScript);

        // Initialize dataLayer
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          "gtm.start": new Date().getTime(),
          event: "gtm.js",
        });
      }

      // GTM Body NoScript (for when JS is disabled)
      if (
        !document.querySelector(
          `iframe[src*="googletagmanager.com/ns.html?id=${containerId}"]`,
        )
      ) {
        const noscript = document.createElement("noscript");
        noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${containerId}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
        document.body.insertBefore(noscript, document.body.firstChild);
      }
    }

    // Meta Pixel
    if (integrations?.metaPixel?.enabled && integrations?.metaPixel?.pixelId) {
      const pixelId = integrations.metaPixel.pixelId;

      // Remove existing Meta Pixel script if any
      const existingFB = document.querySelector(
        'script[src*="connect.facebook.net"]',
      );
      if (existingFB) {
        existingFB.remove();
      }

      // Initialize Meta Pixel
      !(function (f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
        if (f.fbq) return;
        n = f.fbq = function () {
          n.callMethod
            ? n.callMethod.apply(n, arguments)
            : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = "2.0";
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      })(
        window,
        document,
        "script",
        "https://connect.facebook.net/en_US/fbevents.js",
      );

      window.fbq("init", pixelId);
      window.fbq("track", "PageView");
    }
  }, [integrations]);

  return null; // This component doesn't render anything
}

// Export function to track form submission
export const trackFormSubmission = (
  integrations: LandingPageData["integrations"],
  formData: any,
) => {
  // Google Analytics conversion
  if (integrations?.googleAnalytics?.enabled && integrations?.googleAnalytics?.measurementId && window.gtag) {
    window.gtag("event", "generate_lead", {
      event_category: "Form",
      event_label: "Lojista Registration",
      value: 1,
    });
  }

  // Meta Pixel conversion
  if (integrations?.metaPixel?.enabled && integrations?.metaPixel?.pixelId && window.fbq) {
    window.fbq("track", "Lead", {
      content_name: "Lojista Registration",
      content_category: "Lead Generation",
    });

    // If conversion name is configured
    if (integrations.metaPixel.conversionName) {
      window.fbq(
        "trackCustom",
        integrations.metaPixel.conversionName,
        formData,
      );
    }
  }

  // Google Ads conversion
  if (
    integrations?.googleAds?.enabled &&
    integrations?.googleAds?.conversionId &&
    integrations.googleAds.conversionLabel &&
    window.gtag
  ) {
    window.gtag("event", "conversion", {
      send_to: `${integrations.googleAds.conversionId}/${integrations.googleAds.conversionLabel}`,
      value: 1.0,
      currency: "BRL",
    });
  }

  // Google Tag Manager event
  if (integrations?.googleTagManager?.enabled && integrations?.googleTagManager?.containerId && window.dataLayer) {
    window.dataLayer.push({
      event: "form_submission",
      form_type: "lojista_registration",
      form_data: formData,
    });
  }
};

// Export function to send data to Form API
export const submitToFormAPI = async (
  integrations: LandingPageData["integrations"],
  formData: any,
) => {
  if (!integrations?.formApi) {
    throw new Error("Form API endpoint not configured");
  }

  try {
    const response = await fetch(integrations.formApi, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`Form submission failed: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error submitting form:", error);
    throw error;
  }
};
