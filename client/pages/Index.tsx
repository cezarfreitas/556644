import { useState, useEffect, lazy, Suspense } from "react";
import {
  FaRocket,
  FaCheck,
  FaExclamationTriangle,
  FaGift,
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight,
  FaChevronDown,
  FaFacebook,
  FaInstagram,
  FaStore,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { useLandingPageData } from "../hooks/useLandingPageData";
import DynamicColors from "../components/DynamicColors";
import HeroSection from "../components/sections/HeroSection";
import FormSection from "../components/sections/FormSection";
import LazySection from "../components/LazySection";
import IconLoader from "../components/IconLoader";

// Lazy load non-critical components
const LazyGallery = lazy(() => import("../components/LazyGallery"));

// Lazy load heavy sections
const TestimonialsSection = lazy(
  () => import("../components/sections/TestimonialsSection"),
);
const ShowroomSection = lazy(
  () => import("../components/sections/ShowroomSection"),
);
const HistorySection = lazy(
  () => import("../components/sections/HistorySection"),
);
const FAQSection = lazy(() => import("../components/sections/FAQSection"));
const FooterSection = lazy(
  () => import("../components/sections/FooterSection"),
);

export default function Index() {
  // Carregar dados editáveis do admin
  const { data: landingData, isLoading } = useLandingPageData();

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

  // Social Media URLs
  const FACEBOOK_URL =
    import.meta.env.VITE_FACEBOOK_URL || "https://www.facebook.com/onbongo";
  const INSTAGRAM_URL =
    import.meta.env.VITE_INSTAGRAM_URL ||
    "https://www.instagram.com/onbongo_oficial/";
  const WHATSAPP_URL =
    import.meta.env.VITE_WHATSAPP_URL || "https://onbongo.com.br";

  // Company Configuration (brand name now comes from landing data)
  const COMPANY_NAME =
    import.meta.env.VITE_COMPANY_NAME || "IDE | Negócios digitais";
  const COMPANY_URL =
    import.meta.env.VITE_COMPANY_URL ||
    "https://www.idenegociosdigitais.com.br";

  // Form API endpoint from environment variable
  const API_FORM_ENDPOINT =
    import.meta.env.VITE_api_form ||
    import.meta.env.VITE_FALLBACK_API_FORM ||
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

  // Heartbeat animation fallback using JavaScript
  useEffect(() => {
    const heartElement = document.querySelector('[data-heart="true"]');
    if (!heartElement) return;

    let isAnimating = false;

    const animateHeart = () => {
      if (isAnimating) return;
      isAnimating = true;

      // First gentle beat
      heartElement.style.transform = "scale(1.15)";
      setTimeout(() => {
        heartElement.style.transform = "scale(1)";
        setTimeout(() => {
          // Second gentle beat
          heartElement.style.transform = "scale(1.15)";
          setTimeout(() => {
            heartElement.style.transform = "scale(1)";
            isAnimating = false;
          }, 200);
        }, 280);
      }, 200);
    };

    // Start animation immediately and repeat every 2 seconds (slower)
    animateHeart();
    const interval = setInterval(animateHeart, 2000);

    return () => clearInterval(interval);
  }, []);

  // Testimonials data
  // Use only testimonials from JSON data
  const testimonials = landingData.testimonials?.testimonials || [
    {
      id: 1,
      name: "Marcos Silva",
      store: "Street Style Store - São Paulo, SP",
      avatar: "M",
      text: "Trabalhar com a Onbongo foi um divisor de águas para minha loja. As margens são excelentes e os produtos saem rapidamente. Meus clientes sempre perguntam pelos lançamentos da marca.",
    },
    {
      id: 2,
      name: "Amanda Costa",
      store: "Urban Fashion - Rio de Janeiro, RJ",
      avatar: "A",
      text: "O suporte da equipe Onbongo é incrível. Eles nos ajudam com materiais de marketing e sempre estão disponíveis para dúvidas. Recomendo para qualquer lojista sério.",
    },
    {
      id: 3,
      name: "Rafael Oliveira",
      store: "Streetwear BH - Belo Horizonte, MG",
      avatar: "R",
      text: "Em 2 anos como parceiro Onbongo, tripliquei meu faturamento. A marca tem um apelo incrível com o público jovem e as peças têm qualidade excepcional.",
    },
    {
      id: 4,
      name: "Carla Santos",
      store: "Fashion Hub - Curitiba, PR",
      avatar: "C",
      text: "A Onbongo transformou minha loja multimarca. Agora somos referência em surfwear na cidade. O processo de se tornar parceiro foi super tranquilo e rápido.",
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
    if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(name))
      return "Nome deve conter apenas letras";
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
  };

  // Handlers para campos do formulário
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormValues((prev) => ({ ...prev, name: value }));
  };

  const handleWhatsAppChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formatted = formatWhatsApp(value);

    // Prevenir input além do limite
    if (formatted.length <= 15) {
      e.target.value = formatted;
      setFormValues((prev) => ({ ...prev, whatsapp: formatted }));
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
    setSubmitMessage(""); // Clear any previous messages

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

    // Verificar se uma opção de CNPJ foi selecionada
    if (!selectedCnpj) {
      setFormErrors({
        name: nameError,
        whatsapp: whatsappError,
        cnpj: "Por favor, selecione uma opção de cadastro",
      });
      setIsSubmitting(false);
      return;
    }

    const payload = {
      // Dados do formulário
      name: formData.get("name"),
      whatsapp: formData.get("whatsapp"),
      hasCnpj: selectedCnpj,
      cnpj: showCnpjField ? formData.get("cnpj-number") : null,

      // Dados da marca/campanha
      marca: landingData.brandName,
      origem: "Landing Page Lojistas",
      campaign_type: "Lead Generation",
      lead_source: "Website Form",

      // Dados específicos do lead
      lead_quality: selectedCnpj === "sim" ? "high" : "medium",
      lead_type: selectedCnpj === "sim" ? "business" : "consumer",

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
      const formApiEndpoint = landingData.integrations?.formApi || API_FORM_ENDPOINT;
      console.log("Submitting form to:", formApiEndpoint);

      // Fallback FormData method
      const formData = new FormData();

      // Add essential form fields
      formData.append("name", payload.name || "");
      formData.append("whatsapp", payload.whatsapp || "");
      formData.append("hasCnpj", payload.hasCnpj || "");
      formData.append("cnpj", payload.cnpj || "");
      formData.append("marca", payload.marca || "");
      formData.append("origem", payload.origem || "");

      // Use fetch with FormData (no Content-Type header needed for FormData)
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      const response = await fetch(formApiEndpoint, {
        method: "POST",
        body: formData, // Send as FormData instead of JSON
        signal: controller.signal,
        mode: "no-cors", // Keep no-cors to avoid CORS issues
        credentials: "omit",
      });

      clearTimeout(timeoutId);

      console.log("Form submitted successfully");
      setSubmitStatus("success");
      setSubmitMessage(
        landingData.form.successMessage ||
          "✅ Dados enviados com sucesso! Em breve entraremos em contato.",
      );

      // Reset form
      setFormValues({ name: "", whatsapp: "", cnpj: "" });
      setSelectedCnpj("");
      setShowCnpjField(false);
      setShowCouponMessage(false);
      setFormErrors({});

      // Scroll to success message
      setTimeout(() => {
        document.getElementById("form-status")?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 100);
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
      setSubmitMessage(
        "❌ Erro ao enviar formulário. Tente novamente em alguns instantes.",
      );

      // Scroll to error message
      setTimeout(() => {
        document.getElementById("form-status")?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 100);
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="font-sans">
      {/* Hero Section */}
      <HeroSection
        landingData={landingData}
        isLoading={isLoading}
        onCtaClick={() => {
          document.getElementById("formulario")?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }}
      />

      {/* Form Section */}
      <FormSection
        landingData={landingData}
        showCnpjField={showCnpjField}
        selectedCnpj={selectedCnpj}
        showCouponMessage={showCouponMessage}
        formErrors={formErrors}
        formValues={formValues}
        isSubmitting={isSubmitting}
        submitStatus={submitStatus}
        submitMessage={submitMessage}
        onCnpjRadioChange={handleCnpjRadioChange}
        onNameChange={handleNameChange}
        onWhatsAppChange={handleWhatsAppChange}
        onCnpjChange={handleCnpjChange}
        onFormSubmit={handleFormSubmit}
      />

      {/* Gallery Section */}
      <LazySection>
        <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse" />}>
          <LazyGallery
            title={landingData.gallery?.title || ""}
            description={landingData.gallery?.description || ""}
            images={landingData.gallery?.images || []}
            ctaText="Quero Ser Lojista Oficial"
            onCtaClick={() => {
              document.getElementById("formulario")?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }}
          />
        </Suspense>
      </LazySection>

      {/* Showroom Section */}
      <LazySection>
        <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse" />}>
          <ShowroomSection data={landingData.showroom} />
        </Suspense>
      </LazySection>

      {/* Testimonials Section */}
      <LazySection>
        <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse" />}>
          <TestimonialsSection
            data={landingData.testimonials}
            currentSlide={currentSlide}
            onNextSlide={nextSlide}
            onPrevSlide={prevSlide}
            onGoToSlide={goToSlide}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          />
        </Suspense>
      </LazySection>

      {/* History Section */}
      <LazySection>
        <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse" />}>
          <HistorySection data={landingData.history} />
        </Suspense>
      </LazySection>

      {/* FAQ Section */}
      <LazySection>
        <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse" />}>
          <FAQSection data={landingData.faq} />
        </Suspense>
      </LazySection>

      {/* Footer Section */}
      <LazySection>
        <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse" />}>
          <FooterSection data={landingData.footer} />
        </Suspense>
      </LazySection>

      {/* Dynamic Colors */}
      <DynamicColors colors={landingData.colors} />
    </div>
  );
}
