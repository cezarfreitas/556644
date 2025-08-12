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

// Dados padrão - completamente vazios para não mostrar nada antes do JSON
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
