import { memo } from "react";
import OptimizedImage from "./OptimizedImage";

interface LazyGalleryProps {
  images: string[];
  title: string;
  description: string;
  ctaText?: string;
  onCtaClick?: () => void;
}

// Generate tiny blur placeholder
const generateBlurPlaceholder = (width: number = 40, height: number = 30) => {
  return `data:image/svg+xml;base64,${btoa(
    `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f3f4f6"/>
      <rect width="60%" height="20%" x="20%" y="40%" fill="#e5e7eb" rx="2"/>
    </svg>`,
  )}`;
};

function LazyGallery({ images, title, description, ctaText, onCtaClick }: LazyGalleryProps) {
  if (!images?.length) return null;

  return (
    <section className="py-20 bg-white" id="galeria-produtos">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {images.map((image, index) => (
            <div
              key={index}
              className="aspect-square overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <OptimizedImage
                src={image}
                alt={`Produto Onbongo ${index + 1}`}
                className="w-full h-full"
                priority={index < 4} // Load first 4 images with priority
                blurDataURL={generateBlurPlaceholder()}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(LazyGallery);
