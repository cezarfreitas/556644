import { useState, useEffect } from "react";
import { MdStar, MdAttachMoney } from "react-icons/md";
import {
  FaFacebook,
  FaInstagram,
  FaStore,
  FaArrowRight,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaCheck,
  FaExclamationTriangle,
  FaGift,
  FaRocket,
} from "react-icons/fa";

export default function Index() {
  const [showCnpjField, setShowCnpjField] = useState(false);
  const [selectedCnpj, setSelectedCnpj] = useState("");
  const [showCouponMessage, setShowCouponMessage] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Estados para validação de formulário
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [formValues, setFormValues] = useState({
    name: "",
    whatsapp: "",
    cnpj: "",
  });

  // Estados para controle de submissão
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  // Configurações de tracking via .env
  const GA4_MEASUREMENT_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID;
  const META_PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID;
  const META_ACCESS_TOKEN = import.meta.env.VITE_META_ACCESS_TOKEN;
  const META_CONVERSION_NAME =
    import.meta.env.VITE_META_CONVERSION_NAME || "Lead";
  const META_API_VERSION = import.meta.env.VITE_META_API_VERSION || "v18.0";
  const GOOGLE_ADS_CONVERSION_ID = import.meta.env
    .VITE_GOOGLE_ADS_CONVERSION_ID;
  const GOOGLE_ADS_CONVERSION_LABEL = import.meta.env
    .VITE_GOOGLE_ADS_CONVERSION_LABEL;

  // Inicializar tracking na página
  useEffect(() => {
    // Marcar início do tempo para cálculo de completion time
    window.formStartTime = performance.now();

    // Inicializar Google Analytics 4 com defer para evitar blocking
    if (GA4_MEASUREMENT_ID) {
      // Usar requestIdleCallback para carregar scripts não críticos
      const loadGA4 = () => {
        const gaScript = document.createElement("script");
        gaScript.async = true;
        gaScript.defer = true;
        gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`;
        document.head.appendChild(gaScript);
      };

      if ("requestIdleCallback" in window) {
        requestIdleCallback(loadGA4, { timeout: 5000 });
      } else {
        setTimeout(loadGA4, 2000); // Delay maior para permitir LCP
      }

      // Configurar gtag
      window.dataLayer = window.dataLayer || [];
      window.gtag = function (...args: any[]) {
        window.dataLayer.push(args);
      };
      window.gtag("js", new Date());
      window.gtag("config", GA4_MEASUREMENT_ID, {
        page_title: "Seja Lojista Oficial Ecko",
        page_location: window.location.href,
        custom_map: {
          custom_parameter_1: "traffic_source",
          custom_parameter_2: "lead_type",
          custom_parameter_3: "lead_quality",
        },
      });
    }

    // Inicializar Facebook Pixel com carregamento otimizado
    if (META_PIXEL_ID) {
      const loadFacebookPixel = () => {
        // Carregar script do Facebook Pixel de forma não bloqueante
        (function (f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
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
          t.defer = !0;
          t.src = v;
          s = b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t, s);
        })(
          window,
          document,
          "script",
          "https://connect.facebook.net/en_US/fbevents.js",
        );

        // Aguardar script carregar e inicializar
        setTimeout(() => {
          if (window.fbq) {
            window.fbq("init", META_PIXEL_ID);
            window.fbq("track", "PageView");
          }
        }, 100);
      };

      // Usar requestIdleCallback para carregar de forma não bloqueante
      if ("requestIdleCallback" in window) {
        requestIdleCallback(loadFacebookPixel, { timeout: 5000 });
      } else {
        setTimeout(loadFacebookPixel, 3000);
      }
    }

    // Registrar pageview customizado
    const pageviewData = {
      event: "pageview",
      page: "/",
      title: "Seja Lojista Oficial Ecko",
      ...getAnalyticsData(),
    };

    // Log para debug
    console.log("Pageview tracked:", pageviewData);

    // Enviar pageview customizado
    trackEvent("pageview", pageviewData);

    // Cleanup no unmount
    return () => {
      delete window.formStartTime;
    };
  }, [GA4_MEASUREMENT_ID, META_PIXEL_ID]);

  // Form API endpoint from environment variable
  const API_FORM_ENDPOINT =
    import.meta.env.VITE_api_form ||
    "https://470187c48f0a4640803d23a0491ae11b-a421d35e00a9431bb90c3d034.fly.dev/api/leads";

  // Validate endpoint URL
  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return !url.includes("your-api-endpoint.com"); // Exclude placeholder URLs
    } catch {
      return false;
    }
  };

  // Log endpoint being used (for debugging)
  console.log("Form API Endpoint:", API_FORM_ENDPOINT);

  // Função para capturar dados de visitação e analytics
  const getAnalyticsData = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const referrer = document.referrer || "direct";

    return {
      // UTM Parameters
      utm_source: urlParams.get("utm_source") || null,
      utm_medium: urlParams.get("utm_medium") || null,
      utm_campaign: urlParams.get("utm_campaign") || null,
      utm_term: urlParams.get("utm_term") || null,
      utm_content: urlParams.get("utm_content") || null,

      // Traffic Source
      referrer: referrer,
      traffic_source:
        referrer === ""
          ? "direct"
          : referrer.includes("google")
            ? "google_organic"
            : referrer.includes("facebook")
              ? "facebook"
              : referrer.includes("instagram")
                ? "instagram"
                : referrer.includes("whatsapp")
                  ? "whatsapp"
                  : referrer.includes("youtube")
                    ? "youtube"
                    : referrer.includes("tiktok")
                      ? "tiktok"
                      : urlParams.get("utm_source")
                        ? "paid_campaign"
                        : "referral",

      // Page Information
      page_url: window.location.href,
      page_title: document.title,
      landing_page: window.location.pathname,

      // Device/Browser Information
      user_agent: navigator.userAgent,
      language: navigator.language || navigator.languages?.[0] || "pt-BR",
      screen_resolution: `${screen.width}x${screen.height}`,
      viewport_size: `${window.innerWidth}x${window.innerHeight}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,

      // Session Information
      session_id:
        sessionStorage.getItem("session_id") ||
        (() => {
          const id =
            Date.now().toString(36) + Math.random().toString(36).substr(2);
          sessionStorage.setItem("session_id", id);
          return id;
        })(),

      // Timing
      page_load_time: performance.now(),
      timestamp: new Date().toISOString(),
      local_time: new Date().toLocaleString("pt-BR"),

      // Additional tracking
      is_mobile: /Mobi|Android/i.test(navigator.userAgent),
      is_tablet: /Tablet|iPad/i.test(navigator.userAgent),
      is_desktop: !/Mobi|Android|Tablet|iPad/i.test(navigator.userAgent),
      browser: navigator.userAgent.includes("Chrome")
        ? "Chrome"
        : navigator.userAgent.includes("Firefox")
          ? "Firefox"
          : navigator.userAgent.includes("Safari")
            ? "Safari"
            : navigator.userAgent.includes("Edge")
              ? "Edge"
              : "Other",

      // Marketing tags
      gclid: urlParams.get("gclid") || null, // Google Ads
      fbclid: urlParams.get("fbclid") || null, // Facebook Ads

      // Cookie consent (se houver)
      cookie_consent: localStorage.getItem("cookie_consent") || null,
    };
  };

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Marcos Silva",
      store: "Street Style Store - São Paulo, SP",
      avatar: "M",
      text: "Trabalhar com a Ecko foi um divisor de águas para minha loja. As margens são excelentes e os produtos saem rapidamente. Meus clientes sempre perguntam pelos lançamentos da marca.",
    },
    {
      id: 2,
      name: "Amanda Costa",
      store: "Urban Fashion - Rio de Janeiro, RJ",
      avatar: "A",
      text: "O suporte da equipe Ecko é incrível. Eles nos ajudam com materiais de marketing e sempre estão disponíveis para dúvidas. Recomendo para qualquer lojista sério.",
    },
    {
      id: 3,
      name: "Rafael Oliveira",
      store: "Streetwear BH - Belo Horizonte, MG",
      avatar: "R",
      text: "Em 2 anos como parceiro Ecko, tripliquei meu faturamento. A marca tem um apelo incrível com o público jovem e as peças têm qualidade excepcional.",
    },
    {
      id: 4,
      name: "Carla Santos",
      store: "Fashion Hub - Curitiba, PR",
      avatar: "C",
      text: "A Ecko transformou minha loja multimarca. Agora somos referência em streetwear na cidade. O processo de se tornar parceiro foi super tranquilo e rápido.",
    },
  ];

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        const isMobile = window.innerWidth < 768;
        const maxSlides = isMobile
          ? testimonials.length
          : Math.ceil(testimonials.length / 2);
        return (prev + 1) % maxSlides;
      });
    }, 5000); // Auto advance every 5 seconds

    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Optimized slider functions with unified behavior
  const nextSlide = () => {
    const isMobile = window.innerWidth < 768;
    const maxSlides = isMobile
      ? testimonials.length
      : Math.ceil(testimonials.length / 2);
    setCurrentSlide((prev) => (prev + 1) % maxSlides);
  };

  const prevSlide = () => {
    const isMobile = window.innerWidth < 768;
    const maxSlides = isMobile
      ? testimonials.length
      : Math.ceil(testimonials.length / 2);
    setCurrentSlide((prev) => (prev === 0 ? maxSlides - 1 : prev - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Touch/Swipe handlers for mobile optimization
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  // Função para trackear eventos específicos
  const trackEvent = (eventName: string, eventData: any = {}) => {
    const fullEventData = {
      event: eventName,
      timestamp: new Date().toISOString(),
      session_id: sessionStorage.getItem("session_id"),
      page: window.location.pathname,
      ...eventData,
    };

    console.log(`Event tracked: ${eventName}`, fullEventData);

    // Google Analytics 4
    if (GA4_MEASUREMENT_ID && window.gtag) {
      window.gtag("event", eventName, {
        event_category: "Lead Generation",
        event_label: fullEventData.lead_type || "unknown",
        value: fullEventData.engagement_score || 1,
        custom_parameters: fullEventData,
        session_id: fullEventData.session_id,
        traffic_source: fullEventData.traffic_source,
        lead_quality: fullEventData.lead_quality,
      });

      // Google Ads Conversion Tracking
      if (
        eventName === "form_submission_success" &&
        GOOGLE_ADS_CONVERSION_ID &&
        GOOGLE_ADS_CONVERSION_LABEL
      ) {
        window.gtag("event", "conversion", {
          send_to: `${GOOGLE_ADS_CONVERSION_ID}/${GOOGLE_ADS_CONVERSION_LABEL}`,
          value: fullEventData.engagement_score || 1,
          currency: "BRL",
          transaction_id: fullEventData.session_id,
          custom_parameters: {
            lead_type: fullEventData.lead_type,
            traffic_source: fullEventData.traffic_source,
            lead_quality: fullEventData.lead_quality,
          },
        });
      }
    }

    // Facebook Pixel
    if (META_PIXEL_ID && window.fbq) {
      const pixelData = {
        content_category: "Lojistas",
        content_name: "Ecko Lojista Registration",
        lead_type: fullEventData.lead_type || "unknown",
        traffic_source: fullEventData.traffic_source || "unknown",
        value: fullEventData.engagement_score || 1,
        currency: "BRL",
        custom_data: fullEventData,
      };

      // Eventos específicos do Facebook
      if (eventName === "form_submission_success") {
        window.fbq("track", META_CONVERSION_NAME, pixelData);
        // Também enviar via API de conversão
        sendMetaConversionAPI(eventName, pixelData, fullEventData);
      } else {
        window.fbq("trackCustom", eventName, pixelData);
      }
    }
  };

  // Função para API de conversão Meta
  const sendMetaConversionAPI = async (
    eventName: string,
    pixelData: any,
    fullEventData: any,
  ) => {
    if (!META_ACCESS_TOKEN || !META_PIXEL_ID) return;

    try {
      const conversionData = {
        data: [
          {
            event_name: META_CONVERSION_NAME,
            event_time: Math.floor(Date.now() / 1000),
            action_source: "website",
            event_source_url: window.location.href,
            user_data: {
              client_ip_address: null, // Será preenchido automaticamente
              client_user_agent: navigator.userAgent,
              fbc: getCookie("_fbc"), // Facebook click ID
              fbp: getCookie("_fbp"), // Facebook browser ID
            },
            custom_data: {
              content_category: "Lojistas",
              content_name: "Ecko Lojista Registration",
              lead_type: fullEventData.lead_type,
              traffic_source: fullEventData.traffic_source,
              value: fullEventData.engagement_score || 1,
              currency: "BRL",
            },
            event_id: fullEventData.session_id + "_" + Date.now(), // Para deduplicação
          },
        ],
        access_token: META_ACCESS_TOKEN,
      };

      const response = await fetch(
        `https://graph.facebook.com/${META_API_VERSION}/${META_PIXEL_ID}/events`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(conversionData),
        },
      );

      if (response.ok) {
        console.log("Meta Conversion API: Success");
      } else {
        console.error("Meta Conversion API: Error", await response.text());
      }
    } catch (error) {
      console.error("Meta Conversion API: Network error", error);
    }
  };

  // Função auxiliar para pegar cookies
  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
    return null;
  };

  // Funções de formatação
  const formatWhatsApp = (value: string) => {
    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, "");

    // Aplica a máscara (XX) XXXXX-XXXX
    if (numbers.length <= 2) {
      return `(${numbers}`;
    } else if (numbers.length <= 7) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    } else {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
    }
  };

  const formatCNPJ = (value: string) => {
    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, "");

    // Aplica a máscara XX.XXX.XXX/XXXX-XX
    if (numbers.length <= 2) {
      return numbers;
    } else if (numbers.length <= 5) {
      return `${numbers.slice(0, 2)}.${numbers.slice(2)}`;
    } else if (numbers.length <= 8) {
      return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5)}`;
    } else if (numbers.length <= 12) {
      return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5, 8)}/${numbers.slice(8)}`;
    } else {
      return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5, 8)}/${numbers.slice(8, 12)}-${numbers.slice(12, 14)}`;
    }
  };

  // Funções de validação
  const validateName = (name: string) => {
    if (!name.trim()) return "Nome é obrigatório";
    if (name.trim().length < 2) return "Nome deve ter pelo menos 2 caracteres";
    if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(name)) return "Nome deve conter apenas letras";
    return "";
  };

  const validateWhatsApp = (phone: string) => {
    const numbers = phone.replace(/\D/g, "");
    if (!numbers) return "WhatsApp é obrigatório";
    if (numbers.length < 10) return "WhatsApp deve ter pelo menos 10 dígitos";
    if (numbers.length < 11 && !numbers.startsWith("11"))
      return "WhatsApp deve ter 11 dígitos para celular";
    if (numbers.length > 11) return "WhatsApp não pode ter mais de 11 dígitos";
    return "";
  };

  const validateCNPJ = (cnpj: string) => {
    const numbers = cnpj.replace(/\D/g, "");
    if (!numbers) return "CNPJ é obrigatório";
    if (numbers.length !== 14) return "CNPJ deve ter 14 dígitos";

    // Validação de CNPJ
    if (numbers === "00000000000000") return "CNPJ inválido";

    // Algoritmo de validação de CNPJ
    let sum = 0;
    let weight = 2;

    for (let i = 11; i >= 0; i--) {
      sum += parseInt(numbers.charAt(i)) * weight;
      weight = weight === 9 ? 2 : weight + 1;
    }

    const digit1 = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (parseInt(numbers.charAt(12)) !== digit1) return "CNPJ inválido";

    sum = 0;
    weight = 2;

    for (let i = 12; i >= 0; i--) {
      sum += parseInt(numbers.charAt(i)) * weight;
      weight = weight === 9 ? 2 : weight + 1;
    }

    const digit2 = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (parseInt(numbers.charAt(13)) !== digit2) return "CNPJ inválido";

    return "";
  };

  const handleCnpjRadioChange = (value: string) => {
    setSelectedCnpj(value);
    setShowCnpjField(value === "sim");
    setShowCouponMessage(value === "nao-consumidor");

    // Track evento de seleção CNPJ
    trackEvent("cnpj_selection", {
      selection: value,
      has_cnpj: value === "sim",
      lead_type: value === "sim" ? "business" : "consumer",
    });
  };

  // Handlers para campos do formulário
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormValues((prev) => ({ ...prev, name: value }));

    // Removido validação em tempo real
  };

  const handleWhatsAppChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formatted = formatWhatsApp(value);

    // Prevenir input além do limite
    if (formatted.length <= 15) {
      e.target.value = formatted;
      setFormValues((prev) => ({ ...prev, whatsapp: formatted }));

      // Removido validação em tempo real
    } else {
      e.preventDefault();
    }
  };

  const handleCnpjChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formatted = formatCNPJ(value);

    // Prevenir input além do limite
    if (formatted.length <= 18) {
      e.target.value = formatted;
      setFormValues((prev) => ({ ...prev, cnpj: formatted }));

      // Removido validação em tempo real
    } else {
      e.preventDefault();
    }
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Prevenir dupla submissão
    if (isSubmitting) {
      console.log("Form already submitting, preventing double submission");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    const formData = new FormData(e.currentTarget);

    // Validar todos os campos antes de enviar
    const nameValue = formData.get("name") as string;
    const whatsappValue = formData.get("whatsapp") as string;
    const cnpjValue = formData.get("cnpj-number") as string;

    const nameError = validateName(nameValue);
    const whatsappError = validateWhatsApp(whatsappValue);
    const cnpjError = showCnpjField ? validateCNPJ(cnpjValue) : "";

    // Atualizar erros
    setFormErrors({
      name: nameError,
      whatsapp: whatsappError,
      cnpj: cnpjError,
    });

    // Se houver erros, não enviar
    if (nameError || whatsappError || cnpjError) {
      trackEvent("form_validation_error", {
        errors: {
          name: !!nameError,
          whatsapp: !!whatsappError,
          cnpj: !!cnpjError,
        },
      });

      // Rolar para o primeiro campo com erro
      setTimeout(() => {
        if (nameError) {
          document.getElementById("name")?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        } else if (whatsappError) {
          document.getElementById("whatsapp")?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        } else if (cnpjError) {
          document.getElementById("cnpj-number")?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }, 100);

      setIsSubmitting(false);
      return;
    }

    const analyticsData = getAnalyticsData();

    const payload = {
      // Dados do formulário
      name: formData.get("name"),
      whatsapp: formData.get("whatsapp"),
      hasCnpj: selectedCnpj,
      cnpj: showCnpjField ? formData.get("cnpj-number") : null,

      // Dados da marca/campanha
      marca: "Ecko",
      origem: "Landing Page Lojistas",
      campaign_type: "Lead Generation",
      lead_source: "Website Form",

      // Analytics e tracking completo
      ...analyticsData,

      // Dados específicos do lead
      lead_quality: selectedCnpj === "sim" ? "high" : "medium",
      lead_type: selectedCnpj === "sim" ? "business" : "consumer",
      form_completion_time:
        performance.now() - (window.formStartTime || performance.now()),

      // Informações de conversão
      conversion_page: "/",
      conversion_element: "main_form",
      conversion_position: "hero_section",

      // Dados de interesse
      interest_level: "high", // Preencheu formulário completo
      engagement_score: selectedCnpj === "sim" ? 10 : 7, // Score baseado no tipo

      // Timestamps diferentes
      form_timestamp: new Date().toISOString(),
      server_timestamp: null, // Será preenchido no backend
    };

    console.log("Payload sendo enviado:", payload);

    try {
      console.log("Submitting form to:", API_FORM_ENDPOINT);

      // Create a more robust fetch request with better error handling
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

      const response = await fetch(API_FORM_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
        mode: "cors", // Explicitly set CORS mode
        credentials: "omit", // Don't send credentials to avoid CORS issues
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        // Track sucesso do envio
        trackEvent("form_submission_success", {
          lead_type: selectedCnpj === "sim" ? "business" : "consumer",
          form_completion_time: performance.now() - (window.formStartTime || 0),
          has_cnpj: selectedCnpj === "sim",
        });

        setSubmitStatus("success");

        // Mensagem de sucesso simples
        setSubmitMessage(
          "✅ Formulário enviado com sucesso! Nossa equipe entrará em contato em breve com todas as informações sobre a parceria.",
        );

        // Reset form
        e.currentTarget.reset();
        setSelectedCnpj("");
        setShowCnpjField(false);
        setShowCouponMessage(false);
        setFormErrors({});
      } else {
        // Track erro do envio
        trackEvent("form_submission_error", {
          error_status: response.status,
          error_type: "http_error",
          form_data: {
            has_name: !!formData.get("name"),
            has_whatsapp: !!formData.get("whatsapp"),
            cnpj_selection: selectedCnpj,
          },
        });

        setSubmitStatus("error");
        setSubmitMessage(
          "❌ Erro ao enviar formulário. Por favor, verifique os dados e tente novamente.",
        );
      }
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);

      // Detect specific error types for better user messaging
      let errorType = "network_error";
      let userMessage =
        "🔌 Erro de conexão. Verifique sua internet e tente novamente.";

      if (error.name === "AbortError") {
        errorType = "timeout_error";
        userMessage = "⏱️ Tempo limite excedido. Tente novamente.";
      } else if (error.message?.includes("CORS")) {
        errorType = "cors_error";
        userMessage =
          "🔒 Erro de segurança. Recarregue a página e tente novamente.";
      }

      // Track erro de conexão
      trackEvent("form_submission_error", {
        error_type: errorType,
        error_message: error?.message || "Unknown error",
        error_name: error?.name || "Unknown",
        form_data: {
          has_name: !!formData.get("name"),
          has_whatsapp: !!formData.get("whatsapp"),
          cnpj_selection: selectedCnpj,
        },
      });

      setSubmitStatus("error");
      setSubmitMessage(userMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Função para voltar ao formulário
  const handleBackToForm = () => {
    setSubmitStatus("idle");
    setSubmitMessage("");
    setIsSubmitting(false);
  };
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section - Mobile & Desktop Optimized */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/images/hero/hero-background.webp"
            alt="Ecko Streetwear Background"
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
          />
        </div>

        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Additional gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-black/60"></div>

        {/* Mobile Layout (< md) */}
        <div className="md:hidden flex flex-col items-center justify-center h-full px-6 py-8 text-center relative z-10">
          {/* Mobile Logo */}
          <div className="mb-6">
            <img
              src="/images/brand/ecko-logo.webp"
              alt="Logo Ecko"
              className="h-20 w-auto mx-auto"
              loading="eager"
              fetchPriority="high"
            />
          </div>

          {/* Mobile Intro Text */}
          <p className="text-xs text-white/80 text-center mb-4 px-3 drop-shadow-md">
            Aproveite a oportunidade de vender uma das maiores marcas do Brasil
            e do mundo.
          </p>

          {/* Mobile Heading */}
          <div className="mb-6">
            <h1 className="text-2xl font-black text-white leading-tight drop-shadow-2xl">
              <span className="block mb-1">SEJA UM</span>
              <span className="block bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent mb-1">
                LOJISTA OFICIAL
              </span>
              <span className="block">ECKO</span>
            </h1>
          </div>

          {/* Mobile Subtitle */}
          <p className="text-sm text-white/90 leading-relaxed mb-8 px-2 drop-shadow-lg">
            <span className="font-bold text-white">Cadastre-se agora</span> e
            tenha acesso à nossa plataforma digital com preços exclusivos para
            lojistas.
          </p>

          {/* Mobile CTA */}
          <a
            href="#cadastro-lojistas"
            className="inline-flex items-center justify-center max-w-xs bg-primary hover:bg-red-600 text-white hover:text-white py-3 px-5 rounded-xl text-sm font-bold transition-all duration-300 shadow-lg hover:shadow-xl border border-white gap-2"
          >
            Começar Agora!
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>

        {/* Desktop Layout (md+) */}
        <div className="hidden md:flex items-center justify-center h-full relative z-10">
          <div className="w-full max-w-5xl mx-auto px-8 flex items-center justify-center">
            {/* Centered Content */}
            <div className="text-center space-y-8">
              {/* Desktop Logo */}
              <div className="mb-8 flex justify-center">
                <img
                  src="/images/brand/ecko-logo.webp"
                  alt="Logo Ecko"
                  className="h-20 lg:h-24 w-auto"
                  loading="eager"
                  fetchPriority="high"
                />
              </div>

              {/* Desktop Intro Text */}
              <p className="text-lg text-white/80 text-center mb-6 drop-shadow-md">
                Aproveite a oportunidade de vender uma das maiores marcas do
                Brasil e do mundo.
              </p>

              {/* Desktop Heading */}
              <div>
                <h1 className="text-4xl lg:text-6xl xl:text-7xl font-black text-white leading-[0.9] drop-shadow-2xl">
                  <span className="block mb-2">SEJA UM</span>
                  <span className="block bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent mb-2">
                    LOJISTA OFICIAL
                  </span>
                  <span className="block">ECKO</span>
                </h1>
              </div>

              {/* Desktop Subtitle */}
              <p className="text-xl lg:text-2xl text-white/90 leading-relaxed max-w-3xl mx-auto drop-shadow-lg">
                <span className="font-bold text-white">Cadastre-se agora</span>{" "}
                e tenha acesso à nossa plataforma digital com preços exclusivos
                para lojistas.
              </p>

              {/* Desktop CTA */}
              <div className="pt-4 flex justify-center">
                <a
                  href="#cadastro-lojistas"
                  className="inline-flex items-center justify-center bg-primary hover:bg-red-600 text-white hover:text-white px-10 py-3 rounded-xl text-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl border border-white gap-2"
                >
                  Começar Agora!
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cadastro de Lojistas - Formulário de Parceria - Otimizado para mobile */}
      <section
        className="py-12 sm:py-20 md:py-32 bg-black"
        id="cadastro-lojistas"
      >
        <div className="container mx-auto px-3 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 max-w-7xl mx-auto items-center">
            {/* Text/CTA Column - Otimizado para mobile */}
            <div className="space-y-6 sm:space-y-10">
              <div className="space-y-6 sm:space-y-8">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-white leading-[0.9] uppercase tracking-wide">
                  <span className="block">SEJA UM</span>
                  <span className="block text-primary">LOJISTA OFICIAL</span>
                  <span className="block text-primary font-black">
                    ECKO AGORA MESMO
                  </span>
                </h2>

                {/* 4 Motivos */}
                <div className="mt-8 space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">1</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">
                        Marca Internacional
                      </h3>
                      <p className="text-gray-300 text-sm">
                        Representa uma marca de streetwear reconhecida
                        mundialmente.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">2</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">
                        Pronta Entrega
                      </h3>
                      <p className="text-gray-300 text-sm">
                        Mais de 100.000 itens disponíveis para envio imediato.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">3</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">
                        Plataforma Online
                      </h3>
                      <p className="text-gray-300 text-sm">
                        Acesse nosso catálogo digital com preços exclusivos para
                        lojistas.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">4</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">
                        Apoio às Vendas
                      </h3>
                      <p className="text-gray-300 text-sm">
                        Treinamento, materiais de marketing e suporte comercial
                        especializado.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Column - Otimizado para mobile */}
            <div className="bg-primary border border-red-700 rounded-2xl p-4 sm:p-6 shadow-lg">
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                    {submitStatus === "idle"
                      ? "Falar no Whatsapp agora!"
                      : submitStatus === "success"
                        ? "Formulário Enviado!"
                        : "Ops! Algo deu errado"}
                  </h3>
                </div>

                {submitStatus === "idle" && (
                  <form
                    className="space-y-3"
                    onSubmit={handleFormSubmit}
                    noValidate
                  >
                    <div className="space-y-1">
                      <label
                        htmlFor="name"
                        className="block text-sm font-semibold text-white"
                      >
                        Nome Completo
                      </label>
                      <div className="relative">
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          autoComplete="name"
                          className={`w-full px-3 py-3 pr-12 rounded-xl border-2 bg-white backdrop-blur-sm text-gray-900 placeholder:text-gray-500 transition-all duration-300 text-base hover:bg-gray-50 ${
                            formErrors.name
                              ? "border-red-500 shadow-red-500/20 shadow-lg"
                              : formValues.name && !formErrors.name
                                ? "border-green-500 shadow-green-500/20 shadow-lg"
                                : "border-gray-300 hover:border-gray-400"
                          }`}
                          placeholder="Digite seu nome completo"
                          value={formValues.name}
                          onChange={handleNameChange}
                          onFocus={() =>
                            trackEvent("form_field_focus", {
                              field: "name",
                              step: 1,
                            })
                          }
                          onBlur={(e) => {
                            e.target.value &&
                              trackEvent("form_field_complete", {
                                field: "name",
                                step: 1,
                              });
                          }}
                        />
                        {/* Ícone de validação */}
                        {formValues.name && (
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            {formErrors.name ? (
                              <FaExclamationTriangle className="w-5 h-5 text-red-500" />
                            ) : (
                              <FaCheck className="w-5 h-5 text-green-500" />
                            )}
                          </div>
                        )}
                      </div>
                      {formErrors.name && (
                        <div className="mt-1 p-2 bg-red-900/20 border border-red-500/30 rounded-lg">
                          <p className="text-red-300 text-sm flex items-center gap-2">
                            <FaExclamationTriangle className="w-4 h-4 flex-shrink-0" />
                            {formErrors.name}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="space-y-1">
                      <label
                        htmlFor="whatsapp"
                        className="block text-sm font-semibold text-white"
                      >
                        WhatsApp para Contato
                      </label>
                      <div className="relative">
                        <input
                          id="whatsapp"
                          name="whatsapp"
                          type="tel"
                          required
                          autoComplete="tel"
                          className={`w-full px-3 py-3 pr-12 rounded-xl border-2 bg-white backdrop-blur-sm text-gray-900 placeholder:text-gray-500 transition-all duration-300 text-base hover:bg-gray-50 ${
                            formErrors.whatsapp
                              ? "border-red-500 shadow-red-500/20 shadow-lg"
                              : formValues.whatsapp && !formErrors.whatsapp
                                ? "border-green-500 shadow-green-500/20 shadow-lg"
                                : "border-gray-300 hover:border-gray-400"
                          }`}
                          placeholder="(11) 99999-9999"
                          maxLength={15}
                          onChange={handleWhatsAppChange}
                          onFocus={() =>
                            trackEvent("form_field_focus", {
                              field: "whatsapp",
                              step: 2,
                            })
                          }
                          onBlur={(e) => {
                            e.target.value &&
                              trackEvent("form_field_complete", {
                                field: "whatsapp",
                                step: 2,
                              });
                          }}
                        />
                        {/* Ícone de validação */}
                        {formValues.whatsapp && (
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            {formErrors.whatsapp ? (
                              <FaExclamationTriangle className="w-5 h-5 text-red-500" />
                            ) : (
                              <FaCheck className="w-5 h-5 text-green-500" />
                            )}
                          </div>
                        )}
                      </div>
                      {formErrors.whatsapp && (
                        <div className="mt-1 p-2 bg-red-900/20 border border-red-500/30 rounded-lg">
                          <p className="text-red-300 text-sm flex items-center gap-2">
                            <FaExclamationTriangle className="w-4 h-4 flex-shrink-0" />
                            {formErrors.whatsapp}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="space-y-3">
                      <label className="block text-sm font-semibold text-white">
                        Tipo de Cadastro
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <label className="flex items-center gap-1 sm:gap-2 p-1 sm:p-2 border-2 border-white/30 rounded-lg cursor-pointer transition-all duration-300 hover:border-white/50 hover:bg-white/10">
                          <input
                            type="radio"
                            name="cnpj"
                            value="sim"
                            className="w-5 h-5 text-primary border-gray-300"
                            required
                            onChange={(e) =>
                              handleCnpjRadioChange(e.target.value)
                            }
                          />
                          <div>
                            <span className="text-sm sm:text-base font-medium text-white block">
                              Sou Lojista (Tenho CNPJ)
                            </span>
                          </div>
                        </label>
                        <label className="flex items-center gap-1 sm:gap-2 p-1 sm:p-2 border-2 border-white/30 rounded-lg cursor-pointer transition-all duration-300 hover:border-white/50 hover:bg-white/10">
                          <input
                            type="radio"
                            name="cnpj"
                            value="nao-consumidor"
                            className="w-5 h-5 text-primary border-gray-300"
                            required
                            onChange={(e) =>
                              handleCnpjRadioChange(e.target.value)
                            }
                          />
                          <div>
                            <span className="text-sm sm:text-base font-medium text-white block">
                              Sou Consumidor Final
                            </span>
                          </div>
                        </label>
                      </div>
                    </div>

                    {/* Mensagem de Cupom para Consumidores */}
                    {showCouponMessage && (
                      <div className="bg-white/10 border border-white/30 rounded-lg p-4">
                        <div className="text-center space-y-1">
                          <p className="text-white font-medium">
                            Este cadastro é exclusivo para lojistas com CNPJ
                          </p>
                          <p className="text-gray-200">
                            Mas não fique triste! Temos um cupom com{" "}
                            <span className="font-bold text-yellow-300">
                              10% de desconto
                            </span>{" "}
                            para você
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Campo CNPJ Condicional */}
                    {showCnpjField && (
                      <div className="space-y-1">
                        <label
                          htmlFor="cnpj-number"
                          className="text-sm font-medium text-white"
                        >
                          Agora precisamos do seu CNPJ *
                        </label>
                        <div className="relative">
                          <input
                            id="cnpj-number"
                            name="cnpj-number"
                            type="text"
                            required
                            className={`w-full px-3 py-3 sm:py-3 pr-12 rounded-lg border bg-white text-gray-900 placeholder:text-gray-500  transition-all text-base sm:text-sm ${
                              formErrors.cnpj
                                ? "border-red-500"
                                : formValues.cnpj && !formErrors.cnpj
                                  ? "border-green-500"
                                  : "border-gray-300"
                            }`}
                            placeholder="00.000.000/0000-00"
                            maxLength={18}
                            onChange={handleCnpjChange}
                            onFocus={() =>
                              trackEvent("form_field_focus", {
                                field: "cnpj",
                                step: 3,
                              })
                            }
                            onBlur={(e) => {
                              e.target.value &&
                                trackEvent("form_field_complete", {
                                  field: "cnpj",
                                  step: 3,
                                });
                            }}
                          />
                          {/* Ícone de validação */}
                          {formValues.cnpj && (
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                              {formErrors.cnpj ? (
                                <FaExclamationTriangle className="w-5 h-5 text-red-500" />
                              ) : (
                                <FaCheck className="w-5 h-5 text-green-500" />
                              )}
                            </div>
                          )}
                        </div>
                        {formErrors.cnpj && (
                          <p className="text-red-500 text-sm mt-1">
                            {formErrors.cnpj}
                          </p>
                        )}
                      </div>
                    )}

                    <div className="pt-1">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`group relative w-full py-3 rounded-xl font-bold text-lg transition-all duration-300 transform shadow-lg overflow-hidden ${
                          isSubmitting
                            ? "bg-gray-600 cursor-not-allowed"
                            : "bg-black hover:bg-gray-900 hover:scale-[1.02] hover:shadow-xl"
                        } text-white`}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        <span className="relative flex items-center justify-center gap-2">
                          {isSubmitting ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              Enviando...
                            </>
                          ) : showCouponMessage ? (
                            <>
                              <FaGift className="w-5 h-5" />
                              Receber Acesso Exclusivo
                            </>
                          ) : (
                            <>
                              <FaRocket className="w-5 h-5" />
                              Começar Agora!
                            </>
                          )}
                        </span>
                      </button>
                    </div>
                  </form>
                )}

                {/* Mensagens de Sucesso/Erro */}
                {submitStatus !== "idle" && (
                  <div
                    className={`text-center p-6 rounded-xl ${
                      submitStatus === "success"
                        ? "bg-green-100 border border-green-300"
                        : "bg-red-100 border border-red-300"
                    }`}
                  >
                    <div
                      className={`text-lg font-semibold mb-4 ${
                        submitStatus === "success"
                          ? "text-green-800"
                          : "text-red-800"
                      }`}
                    >
                      {submitMessage}
                    </div>

                    <button
                      onClick={handleBackToForm}
                      className="mt-4 bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-300"
                    >
                      ← Voltar ao Formulário
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Galeria de Produtos Ecko Streetwear - Otimizado para mobile */}
      <section
        className="py-12 sm:py-20 md:py-32 bg-white"
        id="galeria-produtos"
      >
        <div className="container mx-auto px-3 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center space-y-3 sm:space-y-6 mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900">
                Coleções Exclusivas
                <span className="block text-primary bg-gradient-to-r from-primary to-red-600 bg-clip-text text-transparent">
                  Ecko
                </span>
              </h2>
              <p className="text-gray-600 text-base sm:text-xl max-w-2xl mx-auto px-3">
                Descubra as coleções oficiais Ecko, com design autêntico e
                qualidade premium. Produtos únicos que valorizam sua loja e
                encantam seus clientes.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
              {/* Photo 1 */}
              <div className="group relative overflow-hidden rounded-xl bg-white border border-gray-200 hover:shadow-xl transition-all duration-300">
                <img
                  src="/images/gallery/collection-1.webp"
                  alt="Coleção Ecko Streetwear"
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                  decoding="async"
                  width="300"
                  height="256"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
              </div>

              {/* Photo 2 */}
              <div className="group relative overflow-hidden rounded-xl bg-white border border-gray-200 hover:shadow-xl transition-all duration-300">
                <img
                  src="/images/gallery/urban-style.webp"
                  alt="Estilo Urbano Ecko"
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                  decoding="async"
                  width="300"
                  height="256"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
              </div>

              {/* Photo 3 */}
              <div className="group relative overflow-hidden rounded-xl bg-white border border-gray-200 hover:shadow-xl transition-all duration-300">
                <img
                  src="/images/gallery/urban-fashion.webp"
                  alt="Moda Urbana Ecko"
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                  decoding="async"
                  width="300"
                  height="256"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
              </div>

              {/* Photo 4 */}
              <div className="group relative overflow-hidden rounded-xl bg-white border border-gray-200 hover:shadow-xl transition-all duration-300">
                <img
                  src="/images/gallery/streetwear-premium.webp"
                  alt="Streetwear Premium Ecko"
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                  decoding="async"
                  width="300"
                  height="256"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
              </div>

              {/* Photo 5 */}
              <div className="group relative overflow-hidden rounded-xl bg-white border border-gray-200 hover:shadow-xl transition-all duration-300">
                <img
                  src="/images/gallery/lifestyle.webp"
                  alt="Lifestyle Ecko"
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
              </div>

              {/* Photo 6 */}
              <div className="group relative overflow-hidden rounded-xl bg-white border border-gray-200 hover:shadow-xl transition-all duration-300">
                <img
                  src="/images/gallery/products-exclusive.webp"
                  alt="Produtos Exclusivos Ecko"
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
              </div>

              {/* Photo 7 */}
              <div className="group relative overflow-hidden rounded-xl bg-white border border-gray-200 hover:shadow-xl transition-all duration-300">
                <img
                  src="/images/gallery/complete-collection.webp"
                  alt="Coleção Completa Ecko"
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
              </div>

              {/* Photo 8 */}
              <div className="group relative overflow-hidden rounded-xl bg-white border border-gray-200 hover:shadow-xl transition-all duration-300">
                <img
                  src="/images/gallery/premium-quality.webp"
                  alt="Qualidade Premium Ecko"
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center mt-16">
              <a
                href="#cadastro-lojistas"
                className="inline-block bg-primary hover:bg-red-600 text-white px-10 py-3 rounded-lg font-bold text-lg transition-colors duration-300"
              >
                Quero Ser Lojista Oficial
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Conheça o nosso Show Room - Otimizado para mobile */}
      <section className="py-12 sm:py-20 md:py-32 bg-gray-900" id="showroom">
        <div className="container mx-auto px-3 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center space-y-3 sm:space-y-6 mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white">
                Conheça o nosso
                <span className="block text-primary bg-gradient-to-r from-primary to-red-600 bg-clip-text text-transparent">
                  Show Room
                </span>
              </h2>
              <p className="text-gray-400 text-base sm:text-xl max-w-2xl mx-auto px-3">
                Espaço exclusivo onde você pode tocar, sentir e experimentar
                toda a qualidade e autenticidade dos produtos Ecko antes de
                levar para sua loja.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Content */}
              <div className="space-y-6 sm:space-y-8">
                <div className="space-y-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    Experiência Completa do Produto
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    No nosso showroom, você tem acesso exclusivo a toda nossa
                    coleção. Conheça de perto a qualidade dos tecidos, o
                    acabamento perfeito e os detalhes únicos que fazem da Ecko a
                    marca líder em streetwear.
                  </p>
                </div>
              </div>

              {/* Image */}
              <div className="text-center">
                <div className="relative">
                  <img
                    src="/images/gallery/showroom.webp"
                    alt="Showroom Ecko - Espaço exclusivo para lojistas"
                    className="w-full max-w-lg rounded-2xl shadow-2xl mx-auto"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl"></div>
                </div>
                <div className="mt-6 space-y-3">
                  <p className="text-gray-400 text-sm italic">
                    "Viva a experiência Ecko em nosso showroom exclusivo"
                  </p>
                  <div className="w-16 h-0.5 bg-primary mx-auto"></div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center mt-16">
              <div className="space-y-4">
                <p className="text-lg text-gray-300">
                  Pronto para conhecer de perto a qualidade Ecko?
                </p>
                <div className="flex justify-center">
                  <a
                    href="#cadastro-lojistas"
                    className="inline-flex items-center justify-center bg-primary hover:bg-red-600 text-white px-8 py-3 rounded-lg font-bold text-lg transition-colors duration-300 gap-2"
                  >
                    <FaArrowRight className="w-5 h-5" />
                    Quero Ser Lojista
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Depoimentos de Lojistas Parceiros Ecko - Otimizado para mobile */}
      <section
        className="py-12 sm:py-20 md:py-32 bg-gray-100"
        id="depoimentos-lojistas"
      >
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center space-y-3 sm:space-y-6 mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900">
                Depoimentos de Lojistas
                <span className="block text-primary bg-gradient-to-r from-primary to-red-600 bg-clip-text text-transparent">
                  Ecko Oficiais
                </span>
              </h2>
              <p className="text-gray-600 text-base sm:text-xl max-w-2xl mx-auto px-3">
                Histórias reais de sucesso de parceiros que triplicaram o
                faturamento com a Ecko
              </p>
            </div>

            {/* Testimonials Carousel */}
            <div
              className="relative"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 bg-white/90 backdrop-blur-sm shadow-lg rounded-full p-3 hover:bg-white hover:scale-110 transition-all duration-300"
                aria-label="Depoimento anterior"
              >
                <FaChevronLeft className="w-5 h-5 text-gray-600 hover:text-primary transition-colors" />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 bg-white/90 backdrop-blur-sm shadow-lg rounded-full p-3 hover:bg-white hover:scale-110 transition-all duration-300"
                aria-label="Próximo depoimento"
              >
                <FaChevronRight className="w-5 h-5 text-gray-600 hover:text-primary transition-colors" />
              </button>

              {/* Desktop Carousel - 2 columns */}
              <div className="hidden md:block overflow-hidden rounded-2xl">
                <div
                  className="flex transition-transform duration-700 ease-out"
                  style={{
                    transform: `translateX(-${currentSlide * 100}%)`,
                  }}
                >
                  {Array.from({
                    length: Math.ceil(testimonials.length / 2),
                  }).map((_, slideIndex) => (
                    <div key={slideIndex} className="w-full flex-shrink-0">
                      <div className="grid grid-cols-2 gap-8">
                        {testimonials
                          .slice(slideIndex * 2, slideIndex * 2 + 2)
                          .map((testimonial) => (
                            <div
                              key={testimonial.id}
                              className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group"
                            >
                              <div className="space-y-6">
                                <div className="flex items-center space-x-1 text-primary">
                                  <span className="text-2xl">★★★★★</span>
                                </div>
                                <blockquote className="text-lg text-gray-700 leading-relaxed italic group-hover:text-gray-900 transition-colors">
                                  "{testimonial.text}"
                                </blockquote>
                                <div className="flex items-center space-x-4">
                                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                                    <span className="text-white font-bold text-lg">
                                      {testimonial.avatar}
                                    </span>
                                  </div>
                                  <div>
                                    <h3 className="font-bold text-gray-900">
                                      {testimonial.name}
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                      {testimonial.store}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mobile Carousel - 1 column */}
              <div className="md:hidden overflow-hidden rounded-2xl">
                <div
                  className="flex transition-transform duration-700 ease-out"
                  style={{
                    transform: `translateX(-${currentSlide * 100}%)`,
                  }}
                >
                  {testimonials.map((testimonial) => (
                    <div
                      key={testimonial.id}
                      className="w-full flex-shrink-0 px-3"
                    >
                      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg">
                        <div className="space-y-6">
                          <div className="flex items-center space-x-1 text-primary">
                            <span className="text-2xl">★★★★★</span>
                          </div>
                          <blockquote className="text-base text-gray-700 leading-relaxed italic">
                            "{testimonial.text}"
                          </blockquote>
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-white font-bold text-lg">
                                {testimonial.avatar}
                              </span>
                            </div>
                            <div>
                              <h3 className="font-bold text-gray-900">
                                {testimonial.name}
                              </h3>
                              <p className="text-sm text-gray-600">
                                {testimonial.store}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dots Navigation */}
              <div className="flex justify-center mt-8 space-x-2">
                {Array.from({
                  length:
                    typeof window !== "undefined" && window.innerWidth < 768
                      ? testimonials.length
                      : Math.ceil(testimonials.length / 2),
                }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      currentSlide === index
                        ? "bg-primary scale-125"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Ir para slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center mt-16">
              <p className="text-lg text-gray-600 mb-6">
                Junte-se a mais de 500 lojistas parceiros de sucesso
              </p>
              <a
                href="#cadastro-lojistas"
                className="inline-block bg-primary hover:bg-red-600 text-white px-10 py-3 rounded-lg font-bold text-lg transition-colors duration-300"
              >
                Quero Ser o Próximo Parceiro de Sucesso
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* História da Marca Ecko - L��der em Streetwear - Otimizado para mobile */}
      <section className="py-12 sm:py-20 md:py-32 bg-white" id="sobre-ecko">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
              {/* Content */}
              <div className="space-y-6 sm:space-y-8">
                <div className="space-y-3 sm:space-y-6">
                  <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight">
                    História da Marca
                    <span className="block text-primary">Ecko</span>
                  </h2>
                  <p className="text-base sm:text-lg md:text-xl text-gray-800 leading-relaxed">
                    Nascida nas ruas de Nova York em 1993, a Ecko Unltd. chegou
                    ao Brasil para revolucionar o streetwear nacional. Mais que
                    uma marca, somos um movimento cultural que une música, arte
                    urbana e moda autêntica.
                  </p>
                  <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
                    De graffitis nas paredes às passarelas, nossa essência
                    permanece a mesma: criar produtos que expressam a identidade
                    e atitude da nova geração. Cada peça conta uma história,
                    cada design carrega a alma das ruas.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 sm:gap-6">
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                      30+
                    </div>
                    <div className="text-gray-600 text-sm">
                      Anos de História
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                      500+
                    </div>
                    <div className="text-gray-600 text-sm">
                      Lojistas Parceiros
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                      1M+
                    </div>
                    <div className="text-gray-600 text-sm">
                      Clientes Satisfeitos
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                      #1
                    </div>
                    <div className="text-gray-600 text-sm">
                      Marca de Streetwear
                    </div>
                  </div>
                </div>
              </div>

              {/* Imagem da Marca */}
              <div className="text-center lg:text-right">
                <div className="inline-block">
                  <img
                    src="/images/gallery/brand-history.webp"
                    alt="Ecko Streetwear - Autenticidade da Marca - Cultura Urbana"
                    className="w-full max-w-md rounded-xl shadow-2xl"
                    loading="lazy"
                  />
                  <div className="mt-8 space-y-3">
                    <p className="text-gray-500 text-sm italic">
                      "Desde 1993, conectando gerações através do streetwear
                      autêntico"
                    </p>
                    <div className="w-16 h-0.5 bg-primary mx-auto"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Accessible Version with Proper Contrast */}
      <footer className="bg-gray-900 text-white py-12 sm:py-16">
        <div className="container mx-auto px-3 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              {/* Brand Section */}
              <div className="space-y-6 max-w-md mx-auto">
                <div className="flex items-center justify-center space-x-3">
                  <img
                    src="/images/brand/ecko-logo.webp"
                    alt="Logo - Marca de Streetwear"
                    className="h-12 w-auto"
                    loading="lazy"
                  />
                </div>
                <p className="text-gray-300 leading-relaxed">
                  A maior marca de streetwear do Brasil. Conectando a cultura
                  urbana através da moda autêntica.
                </p>
                <div className="flex justify-center space-x-4">
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gray-700 hover:bg-primary rounded-lg flex items-center justify-center transition-colors duration-300"
                    aria-label="Siga no Facebook - Abre em nova aba"
                    title="Siga no Facebook"
                  >
                    <FaFacebook className="w-6 h-6 text-white" />
                  </a>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gray-700 hover:bg-primary rounded-lg flex items-center justify-center transition-colors duration-300"
                    aria-label="Siga no Instagram - Abre em nova aba"
                    title="Siga no Instagram"
                  >
                    <FaInstagram className="w-6 h-6 text-white" />
                  </a>
                  <a
                    href="https://wa.me/5511999999999"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gray-700 hover:bg-primary rounded-lg flex items-center justify-center transition-colors duration-300"
                    aria-label="Entre em contato via WhatsApp - Abre em nova aba"
                    title="Entre em contato via WhatsApp"
                  >
                    <FaStore className="w-6 h-6 text-white" />
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-700 pt-8">
              <div className="text-center">
                <div className="text-gray-300 text-sm">
                  �� {new Date().getFullYear()}. Todos os direitos reservados.
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
