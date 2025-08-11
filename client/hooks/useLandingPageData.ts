import { useState, useEffect } from "react";

// Mesma interface da página Admin
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
}

// Dados padrão (mesmos da página de admin)
const defaultData: LandingPageData = {
  hero: {
    logo: "",
    introText: "",
    title: "",
    subtitle: "",
    ctaText: "",
    backgroundImage: "",
  },
  form: {
    sectionTitle: "",
    benefits: [],
    nameLabel: "",
    whatsappLabel: "",
    cnpjLabel: "",
    submitButtonText: "",
  },
  gallery: {
    title: "",
    description: "",
    images: [],
  },
  showroom: {
    title: "",
    location: "",
    description: "",
    experienceTitle: "",
    experienceDescription: "",
    image: "",
    ctaText: "",
  },
  testimonials: {
    title: "",
    description: "",
    testimonials: [],
  },
  history: {
    title: "História da Marca Onbongo",
    paragraphs: [
      "Desde 1988, a Onbongo é sinônimo de autenticidade e atitude no surfwear e streetwear brasileiro. Nascida nas praias e nas ruas, a marca construiu uma trajetória sólida vestindo surfistas, skatistas e apaixonados pela cultura urbana.",
      "Com mais de três décadas de história, a Onbongo se reinventou a cada geração, mantendo-se sempre à frente em estilo, inovação e conexão com o esporte. A ligação vai muito além do surf - marcou presença no futebol profissional, vestindo grandes nomes como Kaká, Roberto Carlos, Neymar e Amaral.",
      "Essa versatilidade faz da Onbongo uma marca única: capaz de transitar do alto rendimento ao esporte de raiz, e das ondas do mar às ruas das grandes cidades, sempre conectada com a cultura jovem e com quem busca expressar personalidade através da moda.",
    ],
    image: "/images/gallery/onbongo-2.webp",
    quote: "Onbongo ��� Sempre à Frente. Sempre no Jogo. Sempre na Onda.",
  },
  faq: {
    title: "Perguntas Frequentes",
    description: "Tire suas dúvidas sobre a parceria com a Onbongo",
    items: [
      {
        question: "Os produtos são oficiais da marca Onbongo?",
        answer:
          "Sim, os produtos são 100% oficiais da marca Onbongo. Quando você se torna um lojista oficial, você tem a garantia de estar adquirindo produtos autênticos e de qualidade da marca.",
      },
      {
        question: "Posso visitar o showroom em São Paulo?",
        answer:
          "Sim, temos um showroom em São Paulo que está aberto para visitações. É uma ótima oportunidade para conhecer nossos produtos pessoalmente. Faça o cadastro e um representante entrará em contato para agendar sua visita.",
      },
      {
        question: "Existe um valor de pedido mínimo?",
        answer:
          "Sim, existe um valor de pedido mínimo para iniciar sua parceria como lojista oficial Onbongo. Os detalhes específicos sobre valores serão informados em nosso primeiro contato.",
      },
      {
        question: "Quais as formas de pagamento?",
        answer:
          "Aceitamos pagamentos através do PIX e cartão de crédito parcelado. No momento, não aceitamos pagamentos via boleto bancário.",
      },
    ],
  },
  footer: {
    logo: "",
    description:
      "A maior marca de streetwear do Brasil. Conectando a cultura urbana através da moda autêntica.",
    socialLinks: {
      facebook: "https://www.facebook.com/onbongo",
      instagram: "https://www.instagram.com/onbongo_oficial/",
      whatsapp: "https://onbongo.com.br",
    },
    hubMultimarcas: {
      url: "https://hubmultimarcas.com.br/",
      logoUrl:
        "https://cdn.builder.io/api/v1/image/assets%2F3a038822502b49b39691cbaf44da5f95%2F8a4c71f1296940d088b5de8207ba30f4?format=webp&width=800",
      description:
        "Uma iniciativa do NTK Grupo Textil para democratizar o acesso dos lojistas às grandes marcas do mercado. Conectamos empreendedores com as melhores oportunidades de negócio, oferecendo suporte completo para o crescimento do seu comércio.",
      companyName: "NTK Grupo Textil - Conectando marcas e lojistas",
    },
    copyright: "© Todos os direitos reservados.",
    developedBy: {
      name: "IDE | Negócios digitais",
      url: "https://www.idenegociosdigitais.com.br",
    },
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
};

export const useLandingPageData = () => {
  const [data, setData] = useState<LandingPageData>(defaultData);

  useEffect(() => {
    // Carregar dados do localStorage
    const savedData = localStorage.getItem("landingPageData");
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setData({ ...defaultData, ...parsedData });
      } catch (error) {
        console.error("Erro ao carregar dados da landing page:", error);
      }
    }
  }, []);

  return data;
};

export type { LandingPageData };
