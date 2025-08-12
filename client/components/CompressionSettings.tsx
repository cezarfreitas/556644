import React from "react";
import { FaCog, FaInfoCircle } from "react-icons/fa";

interface CompressionSettings {
  quality: number;
  maxWidth: number;
  maxHeight: number;
  maxSizeMB: number;
}

interface CompressionSettingsProps {
  settings: CompressionSettings;
  onChange: (settings: CompressionSettings) => void;
  isOpen: boolean;
  onToggle: () => void;
  lastSaved?: Date | null;
}

export default function CompressionSettingsComponent({
  settings,
  onChange,
  isOpen,
  onToggle,
  lastSaved,
}: CompressionSettingsProps) {
  const updateSetting = (key: keyof CompressionSettings, value: number) => {
    onChange({
      ...settings,
      [key]: value,
    });
  };

  return (
    <div className="border border-gray-200 rounded-lg">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-t-lg transition-colors"
        type="button"
      >
        <div className="flex items-center space-x-2">
          <FaCog className="text-gray-600" />
          <span className="font-medium text-gray-900">
            Configurações de Compressão
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-500">
            {Math.round(settings.quality * 100)}% • {settings.maxWidth}x
            {settings.maxHeight} • {settings.maxSizeMB}MB
          </span>
          <svg
            className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </button>

      {isOpen && (
        <div className="p-4 space-y-4">
          <div className="flex items-start space-x-2 text-sm text-blue-600 bg-blue-50 p-3 rounded-md">
            <FaInfoCircle className="mt-0.5 flex-shrink-0" />
            <p>
              Estas configurações são aplicadas automaticamente no servidor
              quando você faz upload de imagens. As imagens são salvas na pasta
              'imagens' com compressão otimizada para web.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Qualidade da Compressão
              </label>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0.1"
                  max="1"
                  step="0.1"
                  value={settings.quality}
                  onChange={(e) =>
                    updateSetting("quality", parseFloat(e.target.value))
                  }
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Baixa (10%)</span>
                  <span className="font-medium">
                    {Math.round(settings.quality * 100)}%
                  </span>
                  <span>Alta (100%)</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tamanho Máximo do Arquivo (MB)
              </label>
              <input
                type="number"
                min="0.5"
                max="10"
                step="0.5"
                value={settings.maxSizeMB}
                onChange={(e) =>
                  updateSetting("maxSizeMB", parseFloat(e.target.value))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Largura Máxima (px)
              </label>
              <select
                value={settings.maxWidth}
                onChange={(e) =>
                  updateSetting("maxWidth", parseInt(e.target.value))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value={400}>400px (Pequeno)</option>
                <option value={800}>800px (Médio)</option>
                <option value={1200}>1200px (Grande)</option>
                <option value={1920}>1920px (Full HD)</option>
                <option value={2560}>2560px (2K)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Altura Máxima (px)
              </label>
              <select
                value={settings.maxHeight}
                onChange={(e) =>
                  updateSetting("maxHeight", parseInt(e.target.value))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value={300}>300px (Pequeno)</option>
                <option value={600}>600px (Médio)</option>
                <option value={800}>800px (Grande)</option>
                <option value={1080}>1080px (Full HD)</option>
                <option value={1440}>1440px (2K)</option>
              </select>
            </div>
          </div>

          <div className="text-xs text-gray-500 space-y-1">
            <p>
              <strong>Dica:</strong> Para logos e ícones, use qualidade alta
              (80-100%) e dimensões menores.
            </p>
            <p>
              <strong>Dica:</strong> Para fotos de fundo, você pode usar
              qualidade menor (60-80%) para reduzir o tamanho do arquivo.
            </p>
            <p>
              <strong>Dica:</strong> Imagens maiores que as dimensões máximas
              serão redimensionadas proporcionalmente.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
