import { useState } from "react";
import { FaPlay, FaCheck, FaExclamationTriangle } from "react-icons/fa";

export default function TestePage() {
  const [testResults, setTestResults] = useState<{ [key: string]: string }>({});

  // Environment variables
  const GA4_MEASUREMENT_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID;
  const GTM_ID = import.meta.env.VITE_GTM_ID;
  const META_PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID;
  const META_ACCESS_TOKEN = import.meta.env.VITE_META_ACCESS_TOKEN;
  const META_CONVERSION_NAME =
    import.meta.env.VITE_META_CONVERSION_NAME || "Lead";
  const META_API_VERSION = import.meta.env.VITE_META_API_VERSION || "v18.0";
  const META_TEST_EVENT_CODE =
    import.meta.env.VITE_META_TEST_EVENT_CODE || "TEST12345";
  const GOOGLE_ADS_CONVERSION_ID = import.meta.env
    .VITE_GOOGLE_ADS_CONVERSION_ID;

  // Helper function to get cookie
  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
    return null;
  };

  // Test Google Analytics 4
  const testGA4 = () => {
    try {
      if (GA4_MEASUREMENT_ID && window.gtag) {
        window.gtag("event", "test_event", {
          event_category: "Testing",
          event_label: "GA4 Test",
          value: 1,
          custom_parameter: "test_data",
        });
        setTestResults((prev) => ({
          ...prev,
          ga4: "✅ GA4 event sent successfully",
        }));
        console.log("GA4 test event sent");
      } else {
        setTestResults((prev) => ({
          ...prev,
          ga4: "❌ GA4 not configured or gtag not available",
        }));
      }
    } catch (error) {
      setTestResults((prev) => ({
        ...prev,
        ga4: `❌ GA4 error: ${error.message}`,
      }));
    }
  };

  // Test Google Tag Manager
  const testGTM = () => {
    try {
      if (GTM_ID && window.dataLayer) {
        window.dataLayer.push({
          event: "test_gtm_event",
          event_category: "Testing",
          event_action: "GTM Test",
          event_label: "Test Label",
          custom_data: {
            test_parameter: "test_value",
            timestamp: new Date().toISOString(),
          },
        });
        setTestResults((prev) => ({
          ...prev,
          gtm: "✅ GTM DataLayer event sent successfully",
        }));
        console.log("GTM test event sent");
      } else {
        setTestResults((prev) => ({
          ...prev,
          gtm: "❌ GTM not configured or dataLayer not available",
        }));
      }
    } catch (error) {
      setTestResults((prev) => ({
        ...prev,
        gtm: `❌ GTM error: ${error.message}`,
      }));
    }
  };

  // Test Meta Pixel
  const testMetaPixel = () => {
    try {
      if (META_PIXEL_ID && window.fbq) {
        window.fbq("trackCustom", "TestEvent", {
          content_category: "Testing",
          content_name: "Meta Pixel Test",
          value: 1,
          currency: "BRL",
          test_parameter: "pixel_test",
        });
        setTestResults((prev) => ({
          ...prev,
          metaPixel: "✅ Meta Pixel event sent successfully",
        }));
        console.log("Meta Pixel test event sent");
      } else {
        setTestResults((prev) => ({
          ...prev,
          metaPixel: "❌ Meta Pixel not configured or fbq not available",
        }));
      }
    } catch (error) {
      setTestResults((prev) => ({
        ...prev,
        metaPixel: `❌ Meta Pixel error: ${error.message}`,
      }));
    }
  };

  // Test Meta Conversion API
  const testMetaConversionAPI = async () => {
    try {
      if (!META_ACCESS_TOKEN || !META_PIXEL_ID) {
        setTestResults((prev) => ({
          ...prev,
          metaAPI: "❌ Meta API: Missing access token or pixel ID",
        }));
        return;
      }

      const conversionData = {
        data: [
          {
            event_name: "Test_" + META_CONVERSION_NAME,
            event_time: Math.floor(Date.now() / 1000),
            action_source: "website",
            event_source_url: window.location.href,
            user_data: {
              client_ip_address: null,
              client_user_agent: navigator.userAgent,
              fbc: getCookie("_fbc"),
              fbp: getCookie("_fbp"),
            },
            custom_data: {
              content_category: "Testing",
              content_name: "Meta Conversion API Test",
              value: 1,
              currency: "BRL",
              test_mode: true,
            },
            event_id: "test_" + Date.now(),
          },
        ],
        access_token: META_ACCESS_TOKEN,
        test_event_code: META_TEST_EVENT_CODE,
      };

      console.log("Testing Meta Conversion API with data:", conversionData);

      const response = await fetch(
        `https://graph.facebook.com/${META_API_VERSION}/${META_PIXEL_ID}/events`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(conversionData),
          mode: "cors", // Explicitly set CORS mode
          credentials: "omit",
        },
      );

      // Handle CORS issues - Meta API may block browser requests
      let responseData: string = "";
      let canReadResponse = true;

      try {
        // Try to read response - may fail due to CORS
        responseData = await response.text();
      } catch (readError) {
        canReadResponse = false;
        console.warn("CORS blocked response reading:", readError);

        // If it's a CORS error but request went through, consider it potentially successful
        if (response.type === "opaque" || response.type === "opaqueredirect") {
          responseData = "Request sent (CORS blocked response reading)";
        } else {
          responseData = `CORS Error: ${readError.message}`;
        }
      }

      // Evaluate success based on what we can determine
      if (response.ok && canReadResponse) {
        setTestResults((prev) => ({
          ...prev,
          metaAPI: `✅ Meta Conversion API: Success - ${responseData}`,
        }));
        console.log("Meta Conversion API test success:", responseData);
      } else if (!canReadResponse && response.status === 0) {
        // Status 0 usually means CORS blocked the request entirely
        setTestResults((prev) => ({
          ...prev,
          metaAPI: `⚠️ Meta Conversion API: CORS blocked request. Use server-side testing or disable CORS in browser for testing.`,
        }));
        console.warn("Meta Conversion API blocked by CORS policy");
      } else if (!canReadResponse) {
        // Request may have gone through but response is blocked
        setTestResults((prev) => ({
          ...prev,
          metaAPI: `⚠️ Meta Conversion API: Request sent but response blocked by CORS. Check Meta Events Manager for delivery.`,
        }));
        console.warn("Meta Conversion API response blocked by CORS");
      } else {
        setTestResults((prev) => ({
          ...prev,
          metaAPI: `❌ Meta Conversion API: Error ${response.status} - ${responseData}`,
        }));
        console.error("Meta Conversion API test error:", responseData);
      }
    } catch (error) {
      setTestResults((prev) => ({
        ...prev,
        metaAPI: `❌ Meta Conversion API: Network error - ${error.message}`,
      }));
      console.error("Meta Conversion API test network error:", error);
    }
  };

  // Test Google Ads
  const testGoogleAds = () => {
    try {
      if (GOOGLE_ADS_CONVERSION_ID && window.gtag) {
        window.gtag("event", "conversion", {
          send_to: `${GOOGLE_ADS_CONVERSION_ID}/test_conversion`,
          value: 1,
          currency: "BRL",
          transaction_id: "test_" + Date.now(),
        });
        setTestResults((prev) => ({
          ...prev,
          googleAds: "✅ Google Ads conversion sent successfully",
        }));
        console.log("Google Ads test conversion sent");
      } else {
        setTestResults((prev) => ({
          ...prev,
          googleAds: "❌ Google Ads not configured or gtag not available",
        }));
      }
    } catch (error) {
      setTestResults((prev) => ({
        ...prev,
        googleAds: `❌ Google Ads error: ${error.message}`,
      }));
    }
  };

  // Clear all results
  const clearResults = () => {
    setTestResults({});
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-black text-gray-900 mb-4">
              🧪 Página de Teste - Tracking Systems
            </h1>
            <p className="text-lg text-gray-600">
              Teste todos os sistemas de rastreamento configurados
            </p>
          </div>

          {/* Environment Info */}
          <div className="bg-gray-100 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              📊 Configurações Atuais
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <strong>GA4 ID:</strong>{" "}
                {GA4_MEASUREMENT_ID || "❌ Não configurado"}
              </div>
              <div>
                <strong>GTM ID:</strong> {GTM_ID || "❌ Não configurado"}
              </div>
              <div>
                <strong>Meta Pixel ID:</strong>{" "}
                {META_PIXEL_ID || "❌ Não configurado"}
              </div>
              <div>
                <strong>Meta Access Token:</strong>{" "}
                {META_ACCESS_TOKEN ? "✅ Configurado" : "❌ Não configurado"}
              </div>
              <div>
                <strong>Meta Conversion Name:</strong> {META_CONVERSION_NAME}
              </div>
              <div>
                <strong>Meta Test Event Code:</strong> {META_TEST_EVENT_CODE}
              </div>
              <div>
                <strong>Google Ads ID:</strong>{" "}
                {GOOGLE_ADS_CONVERSION_ID || "��� Não configurado"}
              </div>
            </div>
          </div>

          {/* Test Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* GA4 Test */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="text-lg font-bold text-blue-800 mb-4 flex items-center gap-2">
                📈 Google Analytics 4
              </h3>
              <button
                onClick={testGA4}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
              >
                <FaPlay className="w-4 h-4" />
                Testar GA4
              </button>
              {testResults.ga4 && (
                <div className="mt-3 p-3 bg-white rounded-lg text-sm">
                  {testResults.ga4}
                </div>
              )}
            </div>

            {/* GTM Test */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <h3 className="text-lg font-bold text-green-800 mb-4 flex items-center gap-2">
                🏷️ Google Tag Manager
              </h3>
              <button
                onClick={testGTM}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
              >
                <FaPlay className="w-4 h-4" />
                Testar GTM
              </button>
              {testResults.gtm && (
                <div className="mt-3 p-3 bg-white rounded-lg text-sm">
                  {testResults.gtm}
                </div>
              )}
            </div>

            {/* Meta Pixel Test */}
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
              <h3 className="text-lg font-bold text-purple-800 mb-4 flex items-center gap-2">
                👁️ Meta Pixel
              </h3>
              <button
                onClick={testMetaPixel}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
              >
                <FaPlay className="w-4 h-4" />
                Testar Meta Pixel
              </button>
              {testResults.metaPixel && (
                <div className="mt-3 p-3 bg-white rounded-lg text-sm">
                  {testResults.metaPixel}
                </div>
              )}
            </div>

            {/* Meta Conversion API Test */}
            <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6">
              <h3 className="text-lg font-bold text-indigo-800 mb-4 flex items-center gap-2">
                🔄 Meta Conversion API
              </h3>
              <button
                onClick={testMetaConversionAPI}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
              >
                <FaPlay className="w-4 h-4" />
                Testar Meta API
              </button>
              {testResults.metaAPI && (
                <div className="mt-3 p-3 bg-white rounded-lg text-sm break-words">
                  {testResults.metaAPI}
                </div>
              )}
            </div>

            {/* Google Ads Test */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
              <h3 className="text-lg font-bold text-yellow-800 mb-4 flex items-center gap-2">
                💰 Google Ads
              </h3>
              <button
                onClick={testGoogleAds}
                className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
              >
                <FaPlay className="w-4 h-4" />
                Testar Google Ads
              </button>
              {testResults.googleAds && (
                <div className="mt-3 p-3 bg-white rounded-lg text-sm">
                  {testResults.googleAds}
                </div>
              )}
            </div>

            {/* Clear Results */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                🧹 Limpar Resultados
              </h3>
              <button
                onClick={clearResults}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
              >
                <FaExclamationTriangle className="w-4 h-4" />
                Limpar Tudo
              </button>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-blue-800 mb-4">
              📋 Instruções de Teste
            </h2>
            <div className="text-blue-700 space-y-2">
              <p>
                <strong>1. Meta Conversion API:</strong> Use o test event code "
                {META_TEST_EVENT_CODE}" no Events Manager
              </p>
              <p className="text-sm ml-4">
                ⚠️{" "}
                <em>
                  Nota: CORS pode bloquear respostas do navegador. Verifique
                  eventos no Events Manager mesmo com erro de CORS.
                </em>
              </p>
              <p>
                <strong>2. GA4:</strong> Verifique os eventos no Real-time
                reports do Google Analytics
              </p>
              <p>
                <strong>3. GTM:</strong> Use o Preview mode do GTM para ver os
                eventos
              </p>
              <p>
                <strong>4. Meta Pixel:</strong> Use o Facebook Pixel Helper
                extension
              </p>
              <p>
                <strong>5. Google Ads:</strong> Verifique as conversões no
                painel do Google Ads
              </p>
            </div>
          </div>

          {/* Back to Home */}
          <div className="text-center mt-8">
            <a
              href="/"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              ← Voltar para Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
