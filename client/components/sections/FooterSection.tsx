import { memo } from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import OptimizedImage from "../OptimizedImage";

interface FooterProps {
  data: {
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
}

function FooterSection({ data }: FooterProps) {
  return (
    <footer className="bg-black text-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Brand Column */}
            <div>
              <OptimizedImage
                src={data.logo}
                alt="Onbongo Logo"
                className="h-12 w-auto mb-4"
                width={120}
                height={48}
              />
              <p className="text-gray-300 mb-6">{data.description}</p>
              
              <div className="flex space-x-4">
                <a
                  href={data.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <FaFacebook size={24} />
                </a>
                <a
                  href={data.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <FaInstagram size={24} />
                </a>
              </div>
            </div>

            {/* Hub Multimarcas */}
            <div className="md:col-span-2">
              <div className="flex items-start space-x-4">
                <OptimizedImage
                  src={data.hubMultimarcas.logoUrl}
                  alt="Hub Multimarcas"
                  className="h-16 w-auto"
                  width={120}
                  height={64}
                />
                <div>
                  <h3 className="text-xl font-bold mb-2">{data.hubMultimarcas.companyName}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {data.hubMultimarcas.description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
              <p>{data.copyright}</p>
              <p>
                Desenvolvido por{" "}
                <a
                  href={data.developedBy.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-400 hover:text-orange-300 transition-colors duration-200"
                >
                  {data.developedBy.name}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default memo(FooterSection);
