import { memo, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import OptimizedImage from "../OptimizedImage";
import IconLoader from "../IconLoader";

interface HeroSectionProps {
  data: {
    logo: string;
    introText: string;
    title: string;
    subtitle: string;
    ctaText: string;
    backgroundImage?: string;
  };
  onCtaClick: () => void;
}

// Generate hero blur placeholder
const heroBlurPlaceholder = `data:image/svg+xml;base64,${btoa(
  `<svg width="1200" height="800" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#1f2937"/>
        <stop offset="100%" style="stop-color:#374151"/>
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#bg)"/>
  </svg>`,
)}`;

function HeroSection({ data, onCtaClick }: HeroSectionProps) {
  // Preload critical images immediately
  useEffect(() => {
    if (data.backgroundImage) {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = data.backgroundImage;
      link.setAttribute("fetchpriority", "high");
      document.head.appendChild(link);
    }

    if (data.logo) {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = data.logo;
      link.setAttribute("fetchpriority", "high");
      document.head.appendChild(link);
    }
  }, [data.backgroundImage, data.logo]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-900">
      {/* Background Image */}
      {data.backgroundImage && (
        <div className="absolute inset-0 z-0">
          <OptimizedImage
            src={data.backgroundImage}
            alt="Onbongo Background"
            className="w-full h-full object-cover"
            priority={true}
            blurDataURL={heroBlurPlaceholder}
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        {/* Logo */}
        {data.logo && (
          <div className="mb-8 flex justify-center">
            <OptimizedImage
              src={data.logo}
              alt="Onbongo Logo"
              className="h-16 w-auto"
              priority={true}
              width={200}
              height={64}
            />
          </div>
        )}

        {/* Intro Text */}
        <p className="text-lg md:text-xl text-orange-300 mb-6 animate-fade-in">
          {data.introText}
        </p>

        {/* Main Title */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-slide-up">
          {data.title}
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-3xl mx-auto leading-relaxed animate-slide-up">
          {data.subtitle}
        </p>

        {/* CTA Button */}
        <button
          onClick={onCtaClick}
          className="group inline-flex items-center bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 hover:scale-105 animate-slide-up"
        >
          {data.ctaText}
          <span className="ml-2 text-xl transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </button>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="animate-scroll-bounce">
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(HeroSection);
