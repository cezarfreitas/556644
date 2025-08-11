import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Tipos para os dados editáveis
export interface HeroData {
  logo: string;
  introText: string;
  title: string;
  subtitle: string;
  ctaText: string;
  backgroundImage: string;
}

export interface BenefitData {
  title: string;
  description: string;
}

export interface FormData {
  sectionTitle: string;
  benefits: BenefitData[];
  nameLabel: string;
  whatsappLabel: string;
  cnpjLabel: string;
  submitButtonText: string;
}

export interface GalleryData {
  title: string;
  description: string;
  images: string[];
}

export interface ShowroomData {
  title: string;
  location: string;
  description: string;
  experienceTitle: string;
  experienceDescription: string;
  image: string;
  ctaText: string;
}

export interface TestimonialData {
  id: number;
  name: string;
  store: string;
  avatar: string;
  text: string;
}

export interface TestimonialsData {
  title: string;
  description: string;
  testimonials: TestimonialData[];
}

export interface HistoryData {
  title: string;
  paragraphs: string[];
  image: string;
  quote: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQData {
  title: string;
  description: string;
  items: FAQItem[];
}

export interface FooterData {
  description: string;
  socialLinks: {
    facebook: string;
    instagram: string;
    whatsapp: string;
  };
}

export interface LandingPageData {
  hero: HeroData;
  form: FormData;
  gallery: GalleryData;
  showroom: ShowroomData;
  testimonials: TestimonialsData;
  history: HistoryData;
  faq: FAQData;
  footer: FooterData;
}

// Dados padrão da landing page
const defaultData: LandingPageData = {
  hero: {
    logo: "/images/brand/onbongo-logo.webp",
    introText: "Revenda uma das maiores marcas de streetwear e lifestyle do Brasil.",
    title: "SEJA UM LOJISTA OFICIAL ONBONGO",
    subtitle: "Cadastre-se e tenha acesso a produtos exclusivos, preços especiais e coleções com o autêntico esp��rito urbano e esportivo da marca.",
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
    description: "A maior marca de streetwear do Brasil. Conectando a cultura urbana através da moda autêntica.",
    socialLinks: {
      facebook: "https://www.facebook.com/onbongo",
      instagram: "https://www.instagram.com/onbongo_oficial/",
      whatsapp: "https://onbongo.com.br"
    }
  }
};

// Contexto
interface LandingPageContextType {
  data: LandingPageData;
  updateData: (newData: Partial<LandingPageData>) => void;
  resetData: () => void;
}

const LandingPageContext = createContext<LandingPageContextType | undefined>(undefined);

// Provider
interface LandingPageProviderProps {
  children: ReactNode;
}

export const LandingPageProvider: React.FC<LandingPageProviderProps> = ({ children }) => {
  const [data, setData] = useState<LandingPageData>(defaultData);

  // Carregar dados do localStorage na inicialização
  useEffect(() => {
    const savedData = localStorage.getItem('landingPageData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setData({ ...defaultData, ...parsedData });
      } catch (error) {
        console.error('Erro ao carregar dados salvos:', error);
      }
    }
  }, []);

  // Salvar dados no localStorage sempre que mudarem
  useEffect(() => {
    localStorage.setItem('landingPageData', JSON.stringify(data));
  }, [data]);

  const updateData = (newData: Partial<LandingPageData>) => {
    setData(prev => ({
      ...prev,
      ...newData
    }));
  };

  const resetData = () => {
    setData(defaultData);
    localStorage.removeItem('landingPageData');
  };

  return (
    <LandingPageContext.Provider value={{ data, updateData, resetData }}>
      {children}
    </LandingPageContext.Provider>
  );
};

// Hook para usar o contexto
export const useLandingPageData = () => {
  const context = useContext(LandingPageContext);
  if (context === undefined) {
    throw new Error('useLandingPageData deve ser usado dentro de um LandingPageProvider');
  }
  return context;
};
