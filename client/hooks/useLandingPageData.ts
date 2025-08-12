import { useState, useEffect } from "react";

// Mesma interface da página Admin
interface LandingPageData {
  brandName: string;
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
    successMessage: string;
    consumerMessage: {
      title: string;
      description: string;
      discountText: string;
    };
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
    locationIcon?: string;
    titleSuffix?: string;
    ctaQuestion?: string;
    imageUrl?: string;
    imageAlt?: string;
    imageCaption?: string;
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
      creditText?: string;
      defaultCreditText?: string;
      heartTitle?: string;
      byText?: string;
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
    main: {
      primary: string;
      secondary: string;
      tertiary: string;
      quaternary: string;
    };
    sections: {
      hero: string;
      form: string;
      gallery: string;
      showroom: string;
      testimonials: string;
      history: string;
      faq: string;
      footer: string;
    };
  };
}

// Dados padrão - completamente vazios para não mostrar nada antes do JSON
const defaultData: LandingPageData = {
  brandName: "",
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
    successMessage: "",
    consumerMessage: {
      title: "",
      description: "",
      discountText: "",
    },
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
    locationIcon: "",
    titleSuffix: "",
    ctaQuestion: "",
    imageUrl: "",
    imageAlt: "",
    imageCaption: "",
  },
  testimonials: {
    title: "",
    description: "",
    testimonials: [],
  },
  history: {
    title: "",
    paragraphs: [],
    image: "",
    quote: "",
  },
  faq: {
    title: "",
    description: "",
    items: [],
  },
  footer: {
    logo: "",
    description: "",
    socialLinks: {
      facebook: "",
      instagram: "",
      whatsapp: "",
    },
    hubMultimarcas: {
      url: "",
      logoUrl: "",
      description: "",
      companyName: "",
    },
    copyright: "",
    developedBy: {
      name: "",
      url: "",
      creditText: "",
      defaultCreditText: "",
      heartTitle: "",
      byText: "",
    },
  },
  integrations: {
    formApi: "",
    googleAnalytics: {
      measurementId: "",
    },
    metaPixel: {
      pixelId: "",
      conversionName: "",
      apiVersion: "",
      testEventCode: "",
      accessToken: "",
    },
    googleTagManager: {
      containerId: "",
    },
    googleAds: {
      conversionId: "",
      conversionLabel: "",
    },
  },
  seo: {
    title: "",
    description: "",
    keywords: "",
    author: "",
    canonicalUrl: "",
    favicon: "",
    appleTouchIcon: "",
    openGraph: {
      title: "",
      description: "",
      image: "",
      url: "",
      type: "",
      siteName: "",
    },
    twitter: {
      card: "",
      title: "",
      description: "",
      image: "",
      creator: "",
      site: "",
    },
    structured: {
      organizationName: "",
      organizationLogo: "",
      organizationUrl: "",
      contactPhone: "",
      contactEmail: "",
    },
  },
  colors: {
    main: {
      primary: "",
      secondary: "",
      tertiary: "",
      quaternary: "",
    },
    sections: {
      hero: "",
      form: "",
      gallery: "",
      showroom: "",
      testimonials: "",
      history: "",
      faq: "",
      footer: "",
    },
  },
};

export const useLandingPageData = () => {
  const [data, setData] = useState<LandingPageData>(defaultData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch("/api/data");
        if (response.ok) {
          const parsedData = await response.json();

          // Se não há dados salvos, usar dados padrão (vazios)
          if (Object.keys(parsedData).length === 0) {
            console.log(
              "📁 Nenhum dado encontrado no servidor, usando dados padrão vazios",
            );
            setData(defaultData);
            setIsLoading(false);
            return;
          }

          const mergedData = {
            ...defaultData,
            ...parsedData,
            form: {
              ...defaultData.form,
              ...parsedData.form,
              consumerMessage: {
                ...defaultData.form.consumerMessage,
                ...parsedData.form?.consumerMessage,
              },
            },
          };
          console.log("📥 Dados carregados do servidor:", mergedData);
          console.log("🔍 Dados SEO carregados:", mergedData.seo);
          setData(mergedData);
          setIsLoading(false);
        } else {
          console.log(
            "📁 Erro ao carregar dados do servidor, usando dados padrão",
          );
          setData(defaultData);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("❌ Erro ao carregar dados do servidor:", error);
        setData(defaultData);
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  return { data, isLoading };
};

export type { LandingPageData };
