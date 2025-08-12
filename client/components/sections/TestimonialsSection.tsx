import { memo } from "react";

interface TestimonialsProps {
  data?: {
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
  currentSlide?: number;
  onNextSlide?: () => void;
  onPrevSlide?: () => void;
  onGoToSlide?: (index: number) => void;
  onTouchStart?: (e: React.TouchEvent) => void;
  onTouchMove?: (e: React.TouchEvent) => void;
  onTouchEnd?: () => void;
}

function TestimonialsSection({
  data,
  currentSlide = 0,
  onNextSlide = () => {},
  onPrevSlide = () => {},
  onGoToSlide = () => {},
  onTouchStart = () => {},
  onTouchMove = () => {},
  onTouchEnd = () => {}
}: TestimonialsProps) {
  if (!data?.testimonials?.length) return null;

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {data.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {data.description}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {data.testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold">
                  {testimonial.avatar}
                </div>
                <div className="ml-4">
                  <h3 className="font-bold">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">{testimonial.store}</p>
                </div>
              </div>
              <p className="text-gray-700 italic">"{testimonial.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(TestimonialsSection);
