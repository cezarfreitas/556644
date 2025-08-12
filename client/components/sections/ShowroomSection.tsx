import { memo } from "react";
import OptimizedImage from "../OptimizedImage";

interface ShowroomProps {
  data?: {
    title: string;
    location: string;
    description: string;
    experienceTitle: string;
    experienceDescription: string;
    image: string;
    ctaText: string;
  };
  onCtaClick?: () => void;
}

function ShowroomSection({ data, onCtaClick }: ShowroomProps) {
  if (!data) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Carregando showroom...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                {data.title}
              </h2>
              <p className="text-orange-600 font-semibold mb-6">
                {data.location}
              </p>
              <p className="text-lg text-gray-700 mb-8">{data.description}</p>

              <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {data.experienceTitle}
                </h3>
                <p className="text-gray-700">{data.experienceDescription}</p>
              </div>

              <button
                onClick={onCtaClick || (() => {})}
                className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300"
              >
                {data.ctaText}
              </button>
            </div>

            <div className="lg:order-first">
              <OptimizedImage
                src={data.image}
                alt="Showroom Onbongo"
                className="w-full h-96 rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(ShowroomSection);
