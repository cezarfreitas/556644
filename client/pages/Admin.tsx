import React, { useState, useEffect } from "react";
import {
  FaSave,
  FaDownload,
  FaUpload,
  FaUndo,
  FaImage,
  FaEdit,
  FaPlus,
  FaTrash,
  FaHome,
  FaEye
} from "react-icons/fa";
import ImageUpload from "../components/ImageUpload";
import MultipleImageUpload from "../components/MultipleImageUpload";
import CompressionSettings from "../components/CompressionSettings";

interface LandingPageData {
  hero: {
    logo: string;
    introText: string;
    title: string;
    subtitle: string;
    ctaText: string;
    backgroundImage: string;
  };
  form: {
    sectionTitle: string;
    benefits: Array<{
      title: string;
      description: string;
    }>;
    nameLabel: string;
    whatsappLabel: string;
    cnpjLabel: string;
    submitButtonText: string;
  };
  gallery: {
    title: string;
    description: string;
    images: string[];
  };
  showroom: {
    title: string;
    location: string;
    description: string;
    experienceTitle: string;
    experienceDescription: string;
    image: string;
    ctaText: string;
  };
  testimonials: {
    title: string;
    description: string;
    testimonials: Array<{
      id: number;
      name: string;
      store: string;
      avatar: string;
      text: string;
    }>;
  };
  history: {
    title: string;
    paragraphs: string[];
    image: string;
    quote: string;
  };
  faq: {
    title: string;
    description: string;
    items: Array<{
      question: string;
      answer: string;
    }>;
  };
  footer: {
    logo: string;
    description: string;
    socialLinks: {
      facebook: string;
      instagram: string;
      whatsapp: string;
    };
    hubMultimarcas: {
      url: string;
      logoUrl: string;
      description: string;
      companyName: string;
    };
    copyright: string;
    developedBy: {
      name: string;
      url: string;
    };
  };
  integrations: {
    formApi: string;
    googleAnalytics: {
      measurementId: string;
    };
    metaPixel: {
      pixelId: string;
      conversionName: string;
      apiVersion: string;
      testEventCode: string;
      accessToken: string;
    };
    googleTagManager: {
      containerId: string;
    };
    googleAds: {
      conversionId: string;
      conversionLabel: string;
    };
  };
  seo: {
    title: string;
    description: string;
    keywords: string;
    author: string;
    canonicalUrl: string;
    favicon: string;
    appleTouchIcon: string;
    openGraph: {
      title: string;
      description: string;
      image: string;
      url: string;
      type: string;
      siteName: string;
    };
    twitter: {
      card: string;
      title: string;
      description: string;
      image: string;
      creator: string;
      site: string;
    };
    structured: {
      organizationName: string;
      organizationLogo: string;
      organizationUrl: string;
      contactPhone: string;
      contactEmail: string;
    };
  };
  colors: {
    primary: string;
    primaryDark: string;
    primaryLight: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: {
      primary: string;
      secondary: string;
      inverse: string;
    };
    button: {
      primary: string;
      primaryHover: string;
      secondary: string;
      secondaryHover: string;
    };
    border: string;
    overlay: string;
  };
}

const defaultData: LandingPageData = {
  hero: {
    logo: "/images/brand/onbongo-logo.webp",
    introText: "Revenda uma das maiores marcas de streetwear e lifestyle do Brasil.",
    title: "SEJA UM LOJISTA OFICIAL ONBONGO",
    subtitle: "Cadastre-se e tenha acesso a produtos exclusivos, preços especiais e coleções com o autêntico espírito urbano e esportivo da marca.",
    ctaText: "Começar Agora!",
    backgroundImage: "/images/hero/onbongo-background.webp"
  },
  form: {
    sectionTitle: "SEJA UM LOJISTA OFICIAL ONBONGO AGORA MESMO",
    benefits: [
      {
        title: "Marca Internacional",
        description: "Revenda uma marca brasileira de streetwear com reconhecimento mundial e mais de três décadas de história."
      },
      {
        title: "Pronta Entrega",
        description: "Mais de 100.000 peças disponíveis para envio imediato, garantindo giro rápido e novidades constantes na sua loja."
      },
      {
        title: "Plataforma Online",
        description: "Acesse nosso catálogo digital com preços exclusivos para lojistas e coleções que respiram o espírito urbano e esportivo."
      },
      {
        title: "Apoio às Vendas",
        description: "Conte com treinamento, materiais de marketing e suporte comercial especializado para aumentar suas vendas e fortalecer sua vitrine."
      }
    ],
    nameLabel: "Nome Completo",
    whatsappLabel: "WhatsApp para Contato", 
    cnpjLabel: "Agora precisamos do seu CNPJ",
    submitButtonText: "Começar Agora!"
  },
  gallery: {
    title: "Coleções Exclusivas Onbongo",
    description: "Descubra as coleções oficiais Onbongo, com design autêntico e qualidade premium. Produtos únicos que valorizam sua loja e encantam seus clientes.",
    images: [
      "/images/gallery/onbongo-1.webp",
      "/images/gallery/onbongo-2.webp",
      "/images/gallery/onbongo-3.webp",
      "/images/gallery/onbongo-4.webp",
      "/images/gallery/onbongo-5.webp",
      "/images/gallery/onbongo-6.webp",
      "/images/gallery/onbongo-7.webp",
      "/images/gallery/onbongo-8.webp"
    ]
  },
  showroom: {
    title: "Conheça o Show Room da Onbongo em SP",
    location: "São Paulo - Capital",
    description: "Visite nosso showroom no coração de São Paulo e descubra pessoalmente toda a coleção Onbongo. Um espaço moderno e exclusivo para lojistas conhecerem de perto o que há de melhor no streetwear brasileiro.",
    experienceTitle: "Experiência Completa do Produto",
    experienceDescription: "No nosso showroom em São Paulo, você tem acesso exclusivo a toda nossa coleção. Toque, sinta e experimente a qualidade dos tecidos, o acabamento perfeito e os detalhes únicos que fazem da Onbongo a marca líder em streetwear e lifestyle.",
    image: "/images/gallery/onbongo-1.webp",
    ctaText: "Quero Ser Lojista"
  },
  testimonials: {
    title: "Depoimentos de Lojistas Onbongo Oficiais",
    description: "Histórias reais de sucesso de parceiros que triplicaram o faturamento com a Onbongo",
    testimonials: [
      {
        id: 1,
        name: "Marcos Silva",
        store: "Street Style Store - São Paulo, SP",
        avatar: "M",
        text: "Trabalhar com a Onbongo foi um divisor de águas para minha loja. As margens são excelentes e os produtos saem rapidamente. Meus clientes sempre perguntam pelos lançamentos da marca."
      },
      {
        id: 2,
        name: "Amanda Costa", 
        store: "Urban Fashion - Rio de Janeiro, RJ",
        avatar: "A",
        text: "O suporte da equipe Onbongo é incrível. Eles nos ajudam com materiais de marketing e sempre estão disponíveis para dúvidas. Recomendo para qualquer lojista sério."
      },
      {
        id: 3,
        name: "Rafael Oliveira",
        store: "Streetwear BH - Belo Horizonte, MG", 
        avatar: "R",
        text: "Em 2 anos como parceiro Onbongo, tripliquei meu faturamento. A marca tem um apelo incrível com o público jovem e as peças têm qualidade excepcional."
      },
      {
        id: 4,
        name: "Carla Santos",
        store: "Fashion Hub - Curitiba, PR",
        avatar: "C", 
        text: "A Onbongo transformou minha loja multimarca. Agora somos referência em surfwear na cidade. O processo de se tornar parceiro foi super tranquilo e rápido."
      }
    ]
  },
  history: {
    title: "História da Marca Onbongo",
    paragraphs: [
      "Desde 1988, a Onbongo é sinônimo de autenticidade e atitude no surfwear e streetwear brasileiro. Nascida nas praias e nas ruas, a marca construiu uma trajetória sólida vestindo surfistas, skatistas e apaixonados pela cultura urbana.",
      "Com mais de três décadas de história, a Onbongo se reinventou a cada geração, mantendo-se sempre à frente em estilo, inovação e conexão com o esporte. A ligação vai muito além do surf - marcou presença no futebol profissional, vestindo grandes nomes como Kaká, Roberto Carlos, Neymar e Amaral.",
      "Essa versatilidade faz da Onbongo uma marca única: capaz de transitar do alto rendimento ao esporte de raiz, e das ondas do mar às ruas das grandes cidades, sempre conectada com a cultura jovem e com quem busca expressar personalidade através da moda."
    ],
    image: "/images/gallery/onbongo-2.webp",
    quote: "Onbongo – Sempre à Frente. Sempre no Jogo. Sempre na Onda."
  },
  faq: {
    title: "Perguntas Frequentes",
    description: "Tire suas dúvidas sobre a parceria com a Onbongo",
    items: [
      {
        question: "Os produtos são oficiais da marca Onbongo?",
        answer: "Sim, os produtos são 100% oficiais da marca Onbongo. Quando você se torna um lojista oficial, você tem a garantia de estar adquirindo produtos autênticos e de qualidade da marca."
      },
      {
        question: "Posso visitar o showroom em São Paulo?",
        answer: "Sim, temos um showroom em São Paulo que está aberto para visitações. É uma ótima oportunidade para conhecer nossos produtos pessoalmente. Faça o cadastro e um representante entrará em contato para agendar sua visita."
      },
      {
        question: "Existe um valor de pedido mínimo?",
        answer: "Sim, existe um valor de pedido mínimo para iniciar sua parceria como lojista oficial Onbongo. Os detalhes específicos sobre valores serão informados em nosso primeiro contato."
      },
      {
        question: "Quais as formas de pagamento?",
        answer: "Aceitamos pagamentos através do PIX e cartão de crédito parcelado. No momento, não aceitamos pagamentos via boleto bancário."
      }
    ]
  },
  footer: {
    logo: "/images/brand/onbongo-logo.webp",
    description: "A maior marca de streetwear do Brasil. Conectando a cultura urbana através da moda autêntica.",
    socialLinks: {
      facebook: "https://www.facebook.com/onbongo",
      instagram: "https://www.instagram.com/onbongo_oficial/",
      whatsapp: "https://onbongo.com.br"
    },
    hubMultimarcas: {
      url: "https://hubmultimarcas.com.br/",
      logoUrl: "https://cdn.builder.io/api/v1/image/assets%2F3a038822502b49b39691cbaf44da5f95%2F8a4c71f1296940d088b5de8207ba30f4?format=webp&width=800",
      description: "Uma iniciativa do NTK Grupo Textil para democratizar o acesso dos lojistas às grandes marcas do mercado. Conectamos empreendedores com as melhores oportunidades de negócio, oferecendo suporte completo para o crescimento do seu comércio.",
      companyName: "NTK Grupo Textil - Conectando marcas e lojistas"
    },
    copyright: "© Todos os direitos reservados.",
    developedBy: {
      name: "IDE | Negócios digitais",
      url: "https://www.idenegociosdigitais.com.br"
    }
  },
  integrations: {
    formApi: "https://api.idenegociosdigitais.com.br/webhook/ntk-leads",
    googleAnalytics: {
      measurementId: "G-GSDX6XV3V6"
    },
    metaPixel: {
      pixelId: "1052506589717984",
      conversionName: "Lead_Ecko",
      apiVersion: "v18.0",
      testEventCode: "TEST48830",
      accessToken: "EAAJpULqxTvgBPEZCvLn9cEgPfIFikaWiBeuia34MFmH0nUn5bq57BHW6vaZAwZCYHiPE3ic6Gb91V6yEFWs8LMktOni9JQbij6M2lPTfSly7ePl5FtQWZBm1Dxp7ICMfR2P4s4gpNjWCuuRZB5Pn21uFCZBe6YZBoqCq0JxcfycaIqhZAHtpMiMatTdw2aH9l63DzQZDZD"
    },
    googleTagManager: {
      containerId: "GTM-XXXXXXX"
    },
    googleAds: {
      conversionId: "",
      conversionLabel: ""
    }
  },
  seo: {
    title: "Seja um Lojista Oficial Onbongo | Revenda Streetwear Premium",
    description: "Torne-se um lojista oficial Onbongo e tenha acesso a produtos exclusivos de streetwear. Mais de 30 anos de história, pronta entrega e suporte especializado.",
    keywords: "onbongo, lojista, revenda, streetwear, surfwear, atacado, moda urbana, franquia",
    author: "Onbongo Brasil",
    canonicalUrl: "https://onbongo.com.br/",
    favicon: "/favicon.ico",
    appleTouchIcon: "/apple-touch-icon.png",
    openGraph: {
      title: "Seja um Lojista Oficial Onbongo | Streetwear Premium",
      description: "Revenda uma das maiores marcas de streetwear do Brasil. Produtos exclusivos, pronta entrega e suporte especializado para lojistas.",
      image: "/images/og-image.jpg",
      url: "https://onbongo.com.br/",
      type: "website",
      siteName: "Onbongo Lojistas"
    },
    twitter: {
      card: "summary_large_image",
      title: "Seja um Lojista Oficial Onbongo",
      description: "Revenda uma das maiores marcas de streetwear do Brasil. Produtos exclusivos, pronta entrega e suporte especializado.",
      image: "/images/twitter-card.jpg",
      creator: "@onbongo_oficial",
      site: "@onbongo_oficial"
    },
    structured: {
      organizationName: "Onbongo Brasil",
      organizationLogo: "/images/brand/onbongo-logo.webp",
      organizationUrl: "https://onbongo.com.br/",
      contactPhone: "+55 11 99999-9999",
      contactEmail: "lojistas@onbongo.com.br"
    }
  },
  colors: {
    primary: "#e86001",
    primaryDark: "#d35400",
    primaryLight: "#f39c12",
    secondary: "#2c3e50",
    accent: "#3498db",
    background: "#ffffff",
    surface: "#f8f9fa",
    text: {
      primary: "#2c3e50",
      secondary: "#7f8c8d",
      inverse: "#ffffff"
    },
    button: {
      primary: "#e86001",
      primaryHover: "#d35400",
      secondary: "#6c757d",
      secondaryHover: "#5a6268"
    },
    border: "#dee2e6",
    overlay: "rgba(0, 0, 0, 0.5)"
  }
};

export default function Admin() {
  const [data, setData] = useState<LandingPageData>(defaultData);
  const [activeTab, setActiveTab] = useState("hero");
  const [message, setMessage] = useState("");
  const [compressionSettings, setCompressionSettings] = useState({
    quality: 0.8,
    maxWidth: 1200,
    maxHeight: 800,
    maxSizeMB: 2
  });
  const [showCompressionSettings, setShowCompressionSettings] = useState(false);

  // Carregar dados do localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('landingPageData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        // Deep merge to ensure all nested objects exist
        const mergedData = {
          ...defaultData,
          ...parsedData,
          footer: {
            ...defaultData.footer,
            ...parsedData.footer,
            socialLinks: {
              ...defaultData.footer.socialLinks,
              ...parsedData.footer?.socialLinks
            },
            hubMultimarcas: {
              ...defaultData.footer.hubMultimarcas,
              ...parsedData.footer?.hubMultimarcas
            },
            developedBy: {
              ...defaultData.footer.developedBy,
              ...parsedData.footer?.developedBy
            }
          },
          integrations: {
            ...defaultData.integrations,
            ...parsedData.integrations,
            googleAnalytics: {
              ...defaultData.integrations.googleAnalytics,
              ...parsedData.integrations?.googleAnalytics
            },
            metaPixel: {
              ...defaultData.integrations.metaPixel,
              ...parsedData.integrations?.metaPixel
            },
            googleTagManager: {
              ...defaultData.integrations.googleTagManager,
              ...parsedData.integrations?.googleTagManager
            },
            googleAds: {
              ...defaultData.integrations.googleAds,
              ...parsedData.integrations?.googleAds
            }
          },
          seo: {
            ...defaultData.seo,
            ...parsedData.seo,
            openGraph: {
              ...defaultData.seo.openGraph,
              ...parsedData.seo?.openGraph
            },
            twitter: {
              ...defaultData.seo.twitter,
              ...parsedData.seo?.twitter
            },
            structured: {
              ...defaultData.seo.structured,
              ...parsedData.seo?.structured
            }
          },
          colors: {
            ...defaultData.colors,
            ...parsedData.colors,
            text: {
              ...defaultData.colors.text,
              ...parsedData.colors?.text
            },
            button: {
              ...defaultData.colors.button,
              ...parsedData.colors?.button
            }
          }
        };
        setData(mergedData);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    }
  }, []);

  // Salvar dados
  const saveData = () => {
    localStorage.setItem('landingPageData', JSON.stringify(data));
    setMessage("✅ Dados salvos com sucesso!");
    setTimeout(() => setMessage(""), 3000);
  };

  // Download JSON
  const downloadJSON = () => {
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'landing-page-data.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  // Upload JSON
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const result = e.target?.result as string;
          const parsedData = JSON.parse(result);
          setData({ ...defaultData, ...parsedData });
          setMessage("✅ Dados carregados do arquivo!");
          setTimeout(() => setMessage(""), 3000);
        } catch (error) {
          setMessage("❌ Erro ao carregar arquivo!");
          setTimeout(() => setMessage(""), 3000);
        }
      };
      reader.readAsText(file);
    }
  };

  // Reset dados
  const resetData = () => {
    if (confirm("Tem certeza que deseja resetar todos os dados?")) {
      setData(defaultData);
      localStorage.removeItem('landingPageData');
      setMessage("🔄 Dados resetados!");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  // Atualizar seção
  const updateSection = (section: string, newData: any) => {
    setData(prev => ({
      ...prev,
      [section]: newData
    }));
  };

  const tabs = [
    { id: "hero", name: "Hero", icon: "🏠" },
    { id: "form", name: "Formulário", icon: "📝" },
    { id: "gallery", name: "Galeria", icon: "🖼️" },
    { id: "showroom", name: "Showroom", icon: "🏢" },
    { id: "testimonials", name: "Depoimentos", icon: "💬" },
    { id: "history", name: "História", icon: "📖" },
    { id: "faq", name: "FAQ", icon: "❓" },
    { id: "footer", name: "Rodapé", icon: "📍" },
    { id: "colors", name: "Cores", icon: "🎨" },
    { id: "seo", name: "SEO", icon: "🔍" },
    { id: "integrations", name: "Integrações", icon: "🔌" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">
                Administração - Landing Page
              </h1>
              {message && (
                <div className="px-4 py-2 bg-green-100 text-green-800 rounded-lg">
                  {message}
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-3">
              <a
                href="/"
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                <FaHome className="mr-2" />
                Ver LP
              </a>
              
              <button
                onClick={saveData}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-onbongo-600"
              >
                <FaSave className="mr-2" />
                Salvar
              </button>
              
              <button
                onClick={downloadJSON}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                <FaDownload className="mr-2" />
                Download JSON
              </button>
              
              <label className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
                <FaUpload className="mr-2" />
                Upload JSON
                <input
                  type="file"
                  accept=".json"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
              
              <button
                onClick={resetData}
                className="inline-flex items-center px-3 py-2 border border-red-300 shadow-sm text-sm leading-4 font-medium rounded-md text-red-700 bg-white hover:bg-red-50"
              >
                <FaUndo className="mr-2" />
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex">
          {/* Sidebar */}
          <div className="w-64 bg-white rounded-lg shadow-sm p-4 h-fit">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? "bg-primary text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span className="mr-3">{tab.icon}</span>
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 ml-8">
            {/* Compression Settings */}
            <div className="mb-6">
              <CompressionSettings
                settings={compressionSettings}
                onChange={setCompressionSettings}
                isOpen={showCompressionSettings}
                onToggle={() => setShowCompressionSettings(!showCompressionSettings)}
              />
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              
              {/* Hero Section */}
              {activeTab === "hero" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900">Seção Hero</h2>
                  
                  <div className="grid grid-cols-1 gap-6">
                    <ImageUpload
                      value={data.hero.logo}
                      onChange={(url) => updateSection("hero", { ...data.hero, logo: url })}
                      label="Logo do Hero"
                      maxSizeMB={compressionSettings.maxSizeMB}
                      maxWidth={compressionSettings.maxWidth}
                      maxHeight={compressionSettings.maxHeight}
                      quality={compressionSettings.quality}
                    />
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Texto Introdutório
                      </label>
                      <input
                        type="text"
                        value={data.hero.introText}
                        onChange={(e) => updateSection("hero", { ...data.hero, introText: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Título Principal
                      </label>
                      <input
                        type="text"
                        value={data.hero.title}
                        onChange={(e) => updateSection("hero", { ...data.hero, title: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subtítulo
                      </label>
                      <textarea
                        value={data.hero.subtitle}
                        onChange={(e) => updateSection("hero", { ...data.hero, subtitle: e.target.value })}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Texto do Botão CTA
                      </label>
                      <input
                        type="text"
                        value={data.hero.ctaText}
                        onChange={(e) => updateSection("hero", { ...data.hero, ctaText: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    
                    <ImageUpload
                      value={data.hero.backgroundImage}
                      onChange={(url) => updateSection("hero", { ...data.hero, backgroundImage: url })}
                      label="Imagem de Fundo do Hero"
                      maxSizeMB={compressionSettings.maxSizeMB}
                      maxWidth={1920}
                      maxHeight={1080}
                      quality={compressionSettings.quality}
                    />
                  </div>
                </div>
              )}

              {/* Form Section */}
              {activeTab === "form" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900">Seção Formulário</h2>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Título da Seção
                    </label>
                    <input
                      type="text"
                      value={data.form.sectionTitle}
                      onChange={(e) => updateSection("form", { ...data.form, sectionTitle: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Benefícios</h3>
                    {data.form.benefits.map((benefit, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="font-medium text-gray-900">Benefício {index + 1}</h4>
                          <button
                            onClick={() => {
                              const newBenefits = data.form.benefits.filter((_, i) => i !== index);
                              updateSection("form", { ...data.form, benefits: newBenefits });
                            }}
                            className="text-red-600 hover:text-red-800"
                          >
                            <FaTrash />
                          </button>
                        </div>
                        <div className="space-y-3">
                          <input
                            type="text"
                            placeholder="Título do benefício"
                            value={benefit.title}
                            onChange={(e) => {
                              const newBenefits = [...data.form.benefits];
                              newBenefits[index].title = e.target.value;
                              updateSection("form", { ...data.form, benefits: newBenefits });
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                          <textarea
                            placeholder="Descrição do benefício"
                            value={benefit.description}
                            onChange={(e) => {
                              const newBenefits = [...data.form.benefits];
                              newBenefits[index].description = e.target.value;
                              updateSection("form", { ...data.form, benefits: newBenefits });
                            }}
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        const newBenefits = [...data.form.benefits, { title: "", description: "" }];
                        updateSection("form", { ...data.form, benefits: newBenefits });
                      }}
                      className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <FaPlus className="mr-2" />
                      Adicionar Benefício
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Label do Campo Nome
                      </label>
                      <input
                        type="text"
                        value={data.form.nameLabel}
                        onChange={(e) => updateSection("form", { ...data.form, nameLabel: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Label do Campo WhatsApp
                      </label>
                      <input
                        type="text"
                        value={data.form.whatsappLabel}
                        onChange={(e) => updateSection("form", { ...data.form, whatsappLabel: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Label do Campo CNPJ
                      </label>
                      <input
                        type="text"
                        value={data.form.cnpjLabel}
                        onChange={(e) => updateSection("form", { ...data.form, cnpjLabel: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Texto do Botão
                      </label>
                      <input
                        type="text"
                        value={data.form.submitButtonText}
                        onChange={(e) => updateSection("form", { ...data.form, submitButtonText: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Gallery Section */}
              {activeTab === "gallery" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900">Seção Galeria</h2>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Título
                    </label>
                    <input
                      type="text"
                      value={data.gallery.title}
                      onChange={(e) => updateSection("gallery", { ...data.gallery, title: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Descrição
                    </label>
                    <textarea
                      value={data.gallery.description}
                      onChange={(e) => updateSection("gallery", { ...data.gallery, description: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Imagens da Galeria</h3>
                    <MultipleImageUpload
                      images={data.gallery.images}
                      onChange={(newImages) => updateSection("gallery", { ...data.gallery, images: newImages })}
                      maxImages={12}
                      maxSizeMB={compressionSettings.maxSizeMB}
                      maxWidth={compressionSettings.maxWidth}
                      maxHeight={compressionSettings.maxHeight}
                      quality={compressionSettings.quality}
                    />
                  </div>
                </div>
              )}

              {/* Showroom Section */}
              {activeTab === "showroom" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900">Seção Showroom</h2>
                  
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Título
                      </label>
                      <input
                        type="text"
                        value={data.showroom.title}
                        onChange={(e) => updateSection("showroom", { ...data.showroom, title: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Localização
                      </label>
                      <input
                        type="text"
                        value={data.showroom.location}
                        onChange={(e) => updateSection("showroom", { ...data.showroom, location: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Descrição
                      </label>
                      <textarea
                        value={data.showroom.description}
                        onChange={(e) => updateSection("showroom", { ...data.showroom, description: e.target.value })}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Título da Experiência
                      </label>
                      <input
                        type="text"
                        value={data.showroom.experienceTitle}
                        onChange={(e) => updateSection("showroom", { ...data.showroom, experienceTitle: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Descrição da Experiência
                      </label>
                      <textarea
                        value={data.showroom.experienceDescription}
                        onChange={(e) => updateSection("showroom", { ...data.showroom, experienceDescription: e.target.value })}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    
                    <ImageUpload
                      value={data.showroom.image}
                      onChange={(url) => updateSection("showroom", { ...data.showroom, image: url })}
                      label="Imagem do Showroom"
                      maxSizeMB={compressionSettings.maxSizeMB}
                      maxWidth={compressionSettings.maxWidth}
                      maxHeight={compressionSettings.maxHeight}
                      quality={compressionSettings.quality}
                    />
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Texto do Botão CTA
                      </label>
                      <input
                        type="text"
                        value={data.showroom.ctaText}
                        onChange={(e) => updateSection("showroom", { ...data.showroom, ctaText: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Testimonials Section */}
              {activeTab === "testimonials" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900">Seção Depoimentos</h2>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Título
                    </label>
                    <input
                      type="text"
                      value={data.testimonials.title}
                      onChange={(e) => updateSection("testimonials", { ...data.testimonials, title: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Descrição
                    </label>
                    <textarea
                      value={data.testimonials.description}
                      onChange={(e) => updateSection("testimonials", { ...data.testimonials, description: e.target.value })}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Depoimentos</h3>
                    {data.testimonials.testimonials.map((testimonial, index) => (
                      <div key={testimonial.id} className="border border-gray-200 rounded-lg p-4 mb-4">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="font-medium text-gray-900">Depoimento {index + 1}</h4>
                          <button
                            onClick={() => {
                              const newTestimonials = data.testimonials.testimonials.filter((_, i) => i !== index);
                              updateSection("testimonials", { ...data.testimonials, testimonials: newTestimonials });
                            }}
                            className="text-red-600 hover:text-red-800"
                          >
                            <FaTrash />
                          </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <input
                            type="text"
                            placeholder="Nome"
                            value={testimonial.name}
                            onChange={(e) => {
                              const newTestimonials = [...data.testimonials.testimonials];
                              newTestimonials[index].name = e.target.value;
                              updateSection("testimonials", { ...data.testimonials, testimonials: newTestimonials });
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                          <input
                            type="text"
                            placeholder="Loja"
                            value={testimonial.store}
                            onChange={(e) => {
                              const newTestimonials = [...data.testimonials.testimonials];
                              newTestimonials[index].store = e.target.value;
                              updateSection("testimonials", { ...data.testimonials, testimonials: newTestimonials });
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                          <input
                            type="text"
                            placeholder="Avatar (letra)"
                            value={testimonial.avatar}
                            onChange={(e) => {
                              const newTestimonials = [...data.testimonials.testimonials];
                              newTestimonials[index].avatar = e.target.value;
                              updateSection("testimonials", { ...data.testimonials, testimonials: newTestimonials });
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                        <textarea
                          placeholder="Depoimento"
                          value={testimonial.text}
                          onChange={(e) => {
                            const newTestimonials = [...data.testimonials.testimonials];
                            newTestimonials[index].text = e.target.value;
                            updateSection("testimonials", { ...data.testimonials, testimonials: newTestimonials });
                          }}
                          rows={3}
                          className="w-full mt-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        const newId = Math.max(...data.testimonials.testimonials.map(t => t.id)) + 1;
                        const newTestimonials = [...data.testimonials.testimonials, {
                          id: newId,
                          name: "",
                          store: "",
                          avatar: "",
                          text: ""
                        }];
                        updateSection("testimonials", { ...data.testimonials, testimonials: newTestimonials });
                      }}
                      className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <FaPlus className="mr-2" />
                      Adicionar Depoimento
                    </button>
                  </div>
                </div>
              )}

              {/* History Section */}
              {activeTab === "history" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900">Seção História</h2>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Título
                    </label>
                    <input
                      type="text"
                      value={data.history.title}
                      onChange={(e) => updateSection("history", { ...data.history, title: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Parágrafos</h3>
                    {data.history.paragraphs.map((paragraph, index) => (
                      <div key={index} className="mb-4">
                        <div className="flex justify-between items-start mb-2">
                          <label className="text-sm font-medium text-gray-700">
                            Parágrafo {index + 1}
                          </label>
                          <button
                            onClick={() => {
                              const newParagraphs = data.history.paragraphs.filter((_, i) => i !== index);
                              updateSection("history", { ...data.history, paragraphs: newParagraphs });
                            }}
                            className="text-red-600 hover:text-red-800"
                          >
                            <FaTrash />
                          </button>
                        </div>
                        <textarea
                          value={paragraph}
                          onChange={(e) => {
                            const newParagraphs = [...data.history.paragraphs];
                            newParagraphs[index] = e.target.value;
                            updateSection("history", { ...data.history, paragraphs: newParagraphs });
                          }}
                          rows={4}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        const newParagraphs = [...data.history.paragraphs, ""];
                        updateSection("history", { ...data.history, paragraphs: newParagraphs });
                      }}
                      className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <FaPlus className="mr-2" />
                      Adicionar Parágrafo
                    </button>
                  </div>
                  
                  <ImageUpload
                    value={data.history.image}
                    onChange={(url) => updateSection("history", { ...data.history, image: url })}
                    label="Imagem da História"
                    maxSizeMB={compressionSettings.maxSizeMB}
                    maxWidth={compressionSettings.maxWidth}
                    maxHeight={compressionSettings.maxHeight}
                    quality={compressionSettings.quality}
                  />
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Citação
                    </label>
                    <input
                      type="text"
                      value={data.history.quote}
                      onChange={(e) => updateSection("history", { ...data.history, quote: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
              )}

              {/* FAQ Section */}
              {activeTab === "faq" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900">Seção FAQ</h2>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Título
                    </label>
                    <input
                      type="text"
                      value={data.faq.title}
                      onChange={(e) => updateSection("faq", { ...data.faq, title: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Descrição
                    </label>
                    <input
                      type="text"
                      value={data.faq.description}
                      onChange={(e) => updateSection("faq", { ...data.faq, description: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Perguntas e Respostas</h3>
                    {data.faq.items.map((item, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="font-medium text-gray-900">FAQ {index + 1}</h4>
                          <button
                            onClick={() => {
                              const newItems = data.faq.items.filter((_, i) => i !== index);
                              updateSection("faq", { ...data.faq, items: newItems });
                            }}
                            className="text-red-600 hover:text-red-800"
                          >
                            <FaTrash />
                          </button>
                        </div>
                        <div className="space-y-3">
                          <input
                            type="text"
                            placeholder="Pergunta"
                            value={item.question}
                            onChange={(e) => {
                              const newItems = [...data.faq.items];
                              newItems[index].question = e.target.value;
                              updateSection("faq", { ...data.faq, items: newItems });
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                          <textarea
                            placeholder="Resposta"
                            value={item.answer}
                            onChange={(e) => {
                              const newItems = [...data.faq.items];
                              newItems[index].answer = e.target.value;
                              updateSection("faq", { ...data.faq, items: newItems });
                            }}
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        const newItems = [...data.faq.items, { question: "", answer: "" }];
                        updateSection("faq", { ...data.faq, items: newItems });
                      }}
                      className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <FaPlus className="mr-2" />
                      Adicionar FAQ
                    </button>
                  </div>
                </div>
              )}

              {/* Footer Section */}
              {activeTab === "footer" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900">Seção Rodapé</h2>

                  <ImageUpload
                    value={data.footer.logo}
                    onChange={(url) => updateSection("footer", { ...data.footer, logo: url })}
                    label="Logo do Rodapé"
                    maxSizeMB={compressionSettings.maxSizeMB}
                    maxWidth={400}
                    maxHeight={200}
                    quality={compressionSettings.quality}
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Descrição
                    </label>
                    <textarea
                      value={data.footer.description}
                      onChange={(e) => updateSection("footer", { ...data.footer, description: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Links Sociais</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Facebook
                        </label>
                        <input
                          type="text"
                          value={data.footer.socialLinks.facebook}
                          onChange={(e) => updateSection("footer", {
                            ...data.footer,
                            socialLinks: { ...data.footer.socialLinks, facebook: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Instagram
                        </label>
                        <input
                          type="text"
                          value={data.footer.socialLinks.instagram}
                          onChange={(e) => updateSection("footer", {
                            ...data.footer,
                            socialLinks: { ...data.footer.socialLinks, instagram: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          WhatsApp / Site
                        </label>
                        <input
                          type="text"
                          value={data.footer.socialLinks.whatsapp}
                          onChange={(e) => updateSection("footer", {
                            ...data.footer,
                            socialLinks: { ...data.footer.socialLinks, whatsapp: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">HUB Multimarcas</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          URL do Site
                        </label>
                        <input
                          type="text"
                          value={data.footer.hubMultimarcas?.url || ""}
                          onChange={(e) => updateSection("footer", {
                            ...data.footer,
                            hubMultimarcas: { ...data.footer.hubMultimarcas, url: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>

                      <ImageUpload
                        value={data.footer.hubMultimarcas?.logoUrl || ""}
                        onChange={(url) => updateSection("footer", {
                          ...data.footer,
                          hubMultimarcas: { ...data.footer.hubMultimarcas, logoUrl: url }
                        })}
                        label="Logo HUB Multimarcas"
                        maxSizeMB={compressionSettings.maxSizeMB}
                        maxWidth={600}
                        maxHeight={300}
                        quality={compressionSettings.quality}
                      />

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Descrição
                        </label>
                        <textarea
                          value={data.footer.hubMultimarcas?.description || ""}
                          onChange={(e) => updateSection("footer", {
                            ...data.footer,
                            hubMultimarcas: { ...data.footer.hubMultimarcas, description: e.target.value }
                          })}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nome da Empresa
                        </label>
                        <input
                          type="text"
                          value={data.footer.hubMultimarcas?.companyName || ""}
                          onChange={(e) => updateSection("footer", {
                            ...data.footer,
                            hubMultimarcas: { ...data.footer.hubMultimarcas, companyName: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Copyright e Créditos</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Texto de Copyright
                        </label>
                        <input
                          type="text"
                          value={data.footer.copyright || ""}
                          onChange={(e) => updateSection("footer", { ...data.footer, copyright: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Desenvolvido por - Nome
                        </label>
                        <input
                          type="text"
                          value={data.footer.developedBy?.name || ""}
                          onChange={(e) => updateSection("footer", {
                            ...data.footer,
                            developedBy: { ...data.footer.developedBy, name: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Desenvolvido por - URL
                        </label>
                        <input
                          type="text"
                          value={data.footer.developedBy?.url || ""}
                          onChange={(e) => updateSection("footer", {
                            ...data.footer,
                            developedBy: { ...data.footer.developedBy, url: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SEO Section */}
              {activeTab === "seo" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900">Configurações de SEO</h2>
                    <div className="flex items-center space-x-2 text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span>Aplicado Automaticamente</span>
                    </div>
                  </div>

                  {/* Basic SEO */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">🔍 Meta Tags Básicas</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Título da Página (Title Tag)
                        </label>
                        <input
                          type="text"
                          value={data.seo?.title || ""}
                          onChange={(e) => updateSection("seo", {
                            ...data.seo,
                            title: e.target.value
                          })}
                          placeholder="Título otimizado para SEO (até 60 caracteres)"
                          maxLength={60}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          {data.seo?.title?.length || 0}/60 caracteres
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Meta Descrição
                        </label>
                        <textarea
                          value={data.seo?.description || ""}
                          onChange={(e) => updateSection("seo", {
                            ...data.seo,
                            description: e.target.value
                          })}
                          placeholder="Descrição da página para resultados de busca (até 160 caracteres)"
                          maxLength={160}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          {data.seo?.description?.length || 0}/160 caracteres
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Palavras-chave (Keywords)
                        </label>
                        <input
                          type="text"
                          value={data.seo?.keywords || ""}
                          onChange={(e) => updateSection("seo", {
                            ...data.seo,
                            keywords: e.target.value
                          })}
                          placeholder="palavra1, palavra2, palavra3"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Autor
                          </label>
                          <input
                            type="text"
                            value={data.seo?.author || ""}
                            onChange={(e) => updateSection("seo", {
                              ...data.seo,
                              author: e.target.value
                            })}
                            placeholder="Nome do autor/empresa"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            URL Canônica
                          </label>
                          <input
                            type="url"
                            value={data.seo?.canonicalUrl || ""}
                            onChange={(e) => updateSection("seo", {
                              ...data.seo,
                              canonicalUrl: e.target.value
                            })}
                            placeholder="https://seusite.com.br/"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Favicon */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">🎯 Favicon e Ícones</h3>
                    <div className="space-y-4">
                      <ImageUpload
                        value={data.seo?.favicon || ""}
                        onChange={(url) => updateSection("seo", {
                          ...data.seo,
                          favicon: url
                        })}
                        label="Favicon (32x32px ou 16x16px)"
                        maxSizeMB={0.5}
                        maxWidth={32}
                        maxHeight={32}
                        quality={1}
                      />

                      <ImageUpload
                        value={data.seo?.appleTouchIcon || ""}
                        onChange={(url) => updateSection("seo", {
                          ...data.seo,
                          appleTouchIcon: url
                        })}
                        label="Apple Touch Icon (180x180px)"
                        maxSizeMB={1}
                        maxWidth={180}
                        maxHeight={180}
                        quality={0.9}
                      />
                    </div>
                  </div>

                  {/* Open Graph */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">📱 Open Graph (Facebook/WhatsApp)</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Título Open Graph
                        </label>
                        <input
                          type="text"
                          value={data.seo?.openGraph?.title || ""}
                          onChange={(e) => updateSection("seo", {
                            ...data.seo,
                            openGraph: {
                              ...data.seo?.openGraph,
                              title: e.target.value
                            }
                          })}
                          placeholder="Título para compartilhamento"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Descrição Open Graph
                        </label>
                        <textarea
                          value={data.seo?.openGraph?.description || ""}
                          onChange={(e) => updateSection("seo", {
                            ...data.seo,
                            openGraph: {
                              ...data.seo?.openGraph,
                              description: e.target.value
                            }
                          })}
                          placeholder="Descrição para compartilhamento"
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>

                      <ImageUpload
                        value={data.seo?.openGraph?.image || ""}
                        onChange={(url) => updateSection("seo", {
                          ...data.seo,
                          openGraph: {
                            ...data.seo?.openGraph,
                            image: url
                          }
                        })}
                        label="Imagem Open Graph (1200x630px)"
                        maxSizeMB={2}
                        maxWidth={1200}
                        maxHeight={630}
                        quality={0.9}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            URL do Site
                          </label>
                          <input
                            type="url"
                            value={data.seo?.openGraph?.url || ""}
                            onChange={(e) => updateSection("seo", {
                              ...data.seo,
                              openGraph: {
                                ...data.seo?.openGraph,
                                url: e.target.value
                              }
                            })}
                            placeholder="https://seusite.com.br/"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Nome do Site
                          </label>
                          <input
                            type="text"
                            value={data.seo?.openGraph?.siteName || ""}
                            onChange={(e) => updateSection("seo", {
                              ...data.seo,
                              openGraph: {
                                ...data.seo?.openGraph,
                                siteName: e.target.value
                              }
                            })}
                            placeholder="Nome do Site"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Twitter Card */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">🐦 Twitter Card</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tipo do Card
                        </label>
                        <select
                          value={data.seo?.twitter?.card || ""}
                          onChange={(e) => updateSection("seo", {
                            ...data.seo,
                            twitter: {
                              ...data.seo?.twitter,
                              card: e.target.value
                            }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          <option value="summary">Summary</option>
                          <option value="summary_large_image">Summary Large Image</option>
                          <option value="app">App</option>
                          <option value="player">Player</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Título Twitter
                        </label>
                        <input
                          type="text"
                          value={data.seo?.twitter?.title || ""}
                          onChange={(e) => updateSection("seo", {
                            ...data.seo,
                            twitter: {
                              ...data.seo?.twitter,
                              title: e.target.value
                            }
                          })}
                          placeholder="Título para Twitter"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Descrição Twitter
                        </label>
                        <textarea
                          value={data.seo?.twitter?.description || ""}
                          onChange={(e) => updateSection("seo", {
                            ...data.seo,
                            twitter: {
                              ...data.seo?.twitter,
                              description: e.target.value
                            }
                          })}
                          placeholder="Descrição para Twitter"
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>

                      <ImageUpload
                        value={data.seo?.twitter?.image || ""}
                        onChange={(url) => updateSection("seo", {
                          ...data.seo,
                          twitter: {
                            ...data.seo?.twitter,
                            image: url
                          }
                        })}
                        label="Imagem Twitter Card"
                        maxSizeMB={2}
                        maxWidth={1200}
                        maxHeight={600}
                        quality={0.9}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            @creator
                          </label>
                          <input
                            type="text"
                            value={data.seo?.twitter?.creator || ""}
                            onChange={(e) => updateSection("seo", {
                              ...data.seo,
                              twitter: {
                                ...data.seo?.twitter,
                                creator: e.target.value
                              }
                            })}
                            placeholder="@usuario_criador"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            @site
                          </label>
                          <input
                            type="text"
                            value={data.seo?.twitter?.site || ""}
                            onChange={(e) => updateSection("seo", {
                              ...data.seo,
                              twitter: {
                                ...data.seo?.twitter,
                                site: e.target.value
                              }
                            })}
                            placeholder="@usuario_site"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Structured Data */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">🏢 Dados Estruturados (Schema.org)</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nome da Organização
                        </label>
                        <input
                          type="text"
                          value={data.seo?.structured?.organizationName || ""}
                          onChange={(e) => updateSection("seo", {
                            ...data.seo,
                            structured: {
                              ...data.seo?.structured,
                              organizationName: e.target.value
                            }
                          })}
                          placeholder="Nome da empresa"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>

                      <ImageUpload
                        value={data.seo?.structured?.organizationLogo || ""}
                        onChange={(url) => updateSection("seo", {
                          ...data.seo,
                          structured: {
                            ...data.seo?.structured,
                            organizationLogo: url
                          }
                        })}
                        label="Logo da Organização"
                        maxSizeMB={1}
                        maxWidth={600}
                        maxHeight={600}
                        quality={0.9}
                      />

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          URL da Organização
                        </label>
                        <input
                          type="url"
                          value={data.seo?.structured?.organizationUrl || ""}
                          onChange={(e) => updateSection("seo", {
                            ...data.seo,
                            structured: {
                              ...data.seo?.structured,
                              organizationUrl: e.target.value
                            }
                          })}
                          placeholder="https://seusite.com.br/"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Telefone de Contato
                          </label>
                          <input
                            type="tel"
                            value={data.seo?.structured?.contactPhone || ""}
                            onChange={(e) => updateSection("seo", {
                              ...data.seo,
                              structured: {
                                ...data.seo?.structured,
                                contactPhone: e.target.value
                              }
                            })}
                            placeholder="+55 11 99999-9999"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email de Contato
                          </label>
                          <input
                            type="email"
                            value={data.seo?.structured?.contactEmail || ""}
                            onChange={(e) => updateSection("seo", {
                              ...data.seo,
                              structured: {
                                ...data.seo?.structured,
                                contactEmail: e.target.value
                              }
                            })}
                            placeholder="contato@empresa.com.br"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Instructions */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-blue-900 mb-2">💡 Dicas de SEO</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• <strong>Título:</strong> Use até 60 caracteres e inclua palavras-chave principais</li>
                      <li>• <strong>Descrição:</strong> Use até 160 caracteres e torne-a atrativa para cliques</li>
                      <li>• <strong>Favicon:</strong> Use formato ICO ou PNG, 32x32px ou 16x16px</li>
                      <li>• <strong>Open Graph:</strong> Imagem ideal 1200x630px para melhor visualização</li>
                      <li>• <strong>Estruturados:</strong> Ajudam o Google a entender melhor seu negócio</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Integrations Section */}
              {activeTab === "integrations" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900">Configurações de Integrações</h2>
                    <div className="flex items-center space-x-2 text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span>Ativo na Landing Page</span>
                    </div>
                  </div>

                  {/* Form API */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">📧 API de Formulário</h3>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Endpoint da API para envio de leads
                      </label>
                      <input
                        type="text"
                        value={data.integrations?.formApi || ""}
                        onChange={(e) => updateSection("integrations", {
                          ...data.integrations,
                          formApi: e.target.value
                        })}
                        placeholder="https://api.exemplo.com.br/webhook/leads"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>

                  {/* Google Analytics */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">📊 Google Analytics 4</h3>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Measurement ID (GA4)
                      </label>
                      <input
                        type="text"
                        value={data.integrations?.googleAnalytics?.measurementId || ""}
                        onChange={(e) => updateSection("integrations", {
                          ...data.integrations,
                          googleAnalytics: {
                            ...data.integrations?.googleAnalytics,
                            measurementId: e.target.value
                          }
                        })}
                        placeholder="G-XXXXXXXXXX"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>

                  {/* Meta Pixel */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">👥 Meta Pixel & Conversions API</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Pixel ID
                        </label>
                        <input
                          type="text"
                          value={data.integrations?.metaPixel?.pixelId || ""}
                          onChange={(e) => updateSection("integrations", {
                            ...data.integrations,
                            metaPixel: {
                              ...data.integrations?.metaPixel,
                              pixelId: e.target.value
                            }
                          })}
                          placeholder="1234567890123456"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Nome da Conversão
                          </label>
                          <input
                            type="text"
                            value={data.integrations?.metaPixel?.conversionName || ""}
                            onChange={(e) => updateSection("integrations", {
                              ...data.integrations,
                              metaPixel: {
                                ...data.integrations?.metaPixel,
                                conversionName: e.target.value
                              }
                            })}
                            placeholder="Lead_Exemplo"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Versão da API
                          </label>
                          <input
                            type="text"
                            value={data.integrations?.metaPixel?.apiVersion || ""}
                            onChange={(e) => updateSection("integrations", {
                              ...data.integrations,
                              metaPixel: {
                                ...data.integrations?.metaPixel,
                                apiVersion: e.target.value
                              }
                            })}
                            placeholder="v18.0"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Código de Teste
                          </label>
                          <input
                            type="text"
                            value={data.integrations?.metaPixel?.testEventCode || ""}
                            onChange={(e) => updateSection("integrations", {
                              ...data.integrations,
                              metaPixel: {
                                ...data.integrations?.metaPixel,
                                testEventCode: e.target.value
                              }
                            })}
                            placeholder="TEST12345"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Access Token (Conversions API)
                        </label>
                        <textarea
                          value={data.integrations?.metaPixel?.accessToken || ""}
                          onChange={(e) => updateSection("integrations", {
                            ...data.integrations,
                            metaPixel: {
                              ...data.integrations?.metaPixel,
                              accessToken: e.target.value
                            }
                          })}
                          placeholder="EAAxxxxxxxxxxxxxxxxxxxxxxxx"
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Google Tag Manager */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">🏷️ Google Tag Manager</h3>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Container ID
                      </label>
                      <input
                        type="text"
                        value={data.integrations?.googleTagManager?.containerId || ""}
                        onChange={(e) => updateSection("integrations", {
                          ...data.integrations,
                          googleTagManager: {
                            ...data.integrations?.googleTagManager,
                            containerId: e.target.value
                          }
                        })}
                        placeholder="GTM-XXXXXXX"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>

                  {/* Google Ads */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">🎯 Google Ads (Opcional)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Conversion ID
                        </label>
                        <input
                          type="text"
                          value={data.integrations?.googleAds?.conversionId || ""}
                          onChange={(e) => updateSection("integrations", {
                            ...data.integrations,
                            googleAds: {
                              ...data.integrations?.googleAds,
                              conversionId: e.target.value
                            }
                          })}
                          placeholder="AW-123456789"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Conversion Label
                        </label>
                        <input
                          type="text"
                          value={data.integrations?.googleAds?.conversionLabel || ""}
                          onChange={(e) => updateSection("integrations", {
                            ...data.integrations,
                            googleAds: {
                              ...data.integrations?.googleAds,
                              conversionLabel: e.target.value
                            }
                          })}
                          placeholder="AbCdEfGhIj_example"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Instructions */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-blue-900 mb-2">💡 Instruções</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• <strong>Form API:</strong> Endpoint para onde os dados do formulário serão enviados</li>
                      <li>• <strong>Google Analytics:</strong> Para rastreamento de tráfego e conversões</li>
                      <li>• <strong>Meta Pixel:</strong> Para rastreamento do Facebook/Instagram</li>
                      <li>• <strong>Google Tag Manager:</strong> Para gerenciar tags de rastreamento</li>
                      <li>• <strong>Google Ads:</strong> Para rastreamento de conversões do Google Ads</li>
                    </ul>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
