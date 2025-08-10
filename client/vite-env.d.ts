/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PUBLIC_BUILDER_KEY: string;
  readonly VITE_GA4_MEASUREMENT_ID: string;
  readonly VITE_GTM_ID: string;
  readonly VITE_META_PIXEL_ID: string;
  readonly VITE_META_ACCESS_TOKEN: string;
  readonly VITE_META_CONVERSION_NAME: string;
  readonly VITE_META_API_VERSION: string;
  readonly VITE_META_TEST_EVENT_CODE: string;
  readonly VITE_GOOGLE_ADS_CONVERSION_ID: string;
  readonly VITE_GOOGLE_ADS_CONVERSION_LABEL: string;
  readonly VITE_api_form: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Extend Window interface for analytics
declare global {
  interface Window {
    formStartTime?: number;
    gtag?: (...args: any[]) => void;
    fbq?: (...args: any[]) => void;
    dataLayer?: any[];
    _fbq?: any;
  }
}

export {};
