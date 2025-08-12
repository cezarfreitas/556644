import { memo, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

interface FAQProps {
  data: {
    title: string;
    description: string;
    items: Array<{
      question: string;
      answer: string;
    }>;
  };
}

function FAQSection({ data }: FAQProps) {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{data.title}</h2>
            <p className="text-xl text-gray-600">{data.description}</p>
          </div>

          <div className="space-y-4">
            {data.items.map((item, index) => (
              <div key={index} className="border border-gray-200 rounded-lg">
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
                >
                  <span className="font-semibold text-gray-900">{item.question}</span>
                  {openItems.has(index) ? (
                    <FaChevronUp className="text-orange-600" />
                  ) : (
                    <FaChevronDown className="text-gray-400" />
                  )}
                </button>
                
                {openItems.has(index) && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(FAQSection);
