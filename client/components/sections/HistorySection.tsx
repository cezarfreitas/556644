import { memo } from "react";
import OptimizedImage from "../OptimizedImage";

interface HistoryProps {
  data?: {
    title: string;
    paragraphs: string[];
    image: string;
    quote: string;
  };
}

function HistorySection({ data }: HistoryProps) {
  if (!data) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Carregando história...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            {data.title}
          </h2>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              {data.paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-lg text-gray-700 leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}

              {data.quote && (
                <blockquote className="text-xl font-bold text-orange-600 italic border-l-4 border-orange-600 pl-6 mt-8">
                  {data.quote}
                </blockquote>
              )}
            </div>

            <div>
              <OptimizedImage
                src={data.image}
                alt="História da Onbongo"
                className="w-full h-96 rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(HistorySection);
