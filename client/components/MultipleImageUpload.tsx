import React, { useState, useRef } from "react";
import { FaUpload, FaPlus, FaTrash, FaCompress } from "react-icons/fa";

interface MultipleImageUploadProps {
  images: string[];
  onChange: (images: string[]) => void;
  maxImages?: number;
  maxSizeMB?: number;
  quality?: number;
  maxWidth?: number;
  maxHeight?: number;
}

export default function MultipleImageUpload({
  images,
  onChange,
  maxImages = 10,
  maxSizeMB = 2,
  quality = 0.8,
  maxWidth = 800,
  maxHeight = 600
}: MultipleImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadImagesToServer = async (files: File[]): Promise<string[]> => {
    const formData = new FormData();

    files.forEach(file => {
      formData.append('images', file);
    });

    formData.append('quality', Math.round(quality * 100).toString());
    formData.append('maxWidth', maxWidth.toString());
    formData.append('maxHeight', maxHeight.toString());

    const response = await fetch('/api/upload/images', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload images');
    }

    const result = await response.json();
    return result.images.map((img: any) => img.url);
  };

  const handleFilesSelect = async (files: FileList) => {
    const validFiles = Array.from(files).filter(file => {
      if (!file.type.startsWith('image/')) {
        alert(`${file.name} não é um arquivo de imagem válido.`);
        return false;
      }
      if (file.size > maxSizeMB * 1024 * 1024) {
        alert(`${file.name} excede o tamanho máximo de ${maxSizeMB}MB.`);
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    if (images.length + validFiles.length > maxImages) {
      alert(`Você pode adicionar no máximo ${maxImages} imagens. Remova algumas antes de adicionar mais.`);
      return;
    }

    setIsUploading(true);

    try {
      const uploadedUrls = await uploadImagesToServer(validFiles);
      onChange([...images, ...uploadedUrls]);
    } catch (error) {
      console.error('Erro ao fazer upload das imagens:', error);
      alert('Erro ao fazer upload das imagens. Tente novamente.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    
    if (e.dataTransfer.files) {
      handleFilesSelect(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFilesSelect(e.target.files);
    }
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onChange(newImages);
  };

  const addEmptyImage = () => {
    onChange([...images, ""]);
  };

  const updateImage = (index: number, url: string) => {
    const newImages = [...images];
    newImages[index] = url;
    onChange(newImages);
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-6 transition-colors ${
          dragActive
            ? 'border-primary bg-primary/5'
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
      >
        <div className="text-center">
          <FaUpload className="mx-auto h-8 w-8 text-gray-400 mb-3" />
          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              Arraste múltiplas imagens aqui ou{' '}
              <button
                onClick={openFileDialog}
                disabled={isUploading || images.length >= maxImages}
                className="text-primary hover:text-primary/80 font-medium disabled:text-gray-400"
                type="button"
              >
                clique para selecionar
              </button>
            </p>
            <p className="text-xs text-gray-500">
              PNG, JPG, WEBP até {maxSizeMB}MB cada • Máximo {maxImages} imagens
            </p>
            <div className="flex items-center justify-center space-x-1 text-xs text-gray-400">
              <FaCompress />
              <span>Auto-compressão para performance</span>
            </div>
          </div>
        </div>

        {isUploading && (
          <div className="text-center mt-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto mb-2"></div>
            <p className="text-sm text-gray-600">Fazendo upload das imagens...</p>
          </div>
        )}
      </div>

      {/* Upload Button */}
      <button
        onClick={openFileDialog}
        disabled={isUploading || images.length >= maxImages}
        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        type="button"
      >
        <FaUpload className="mr-2" />
        {isUploading ? 'Fazendo Upload...' : 'Adicionar Imagens'}
      </button>

      {/* Images Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {images.map((image, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-medium text-gray-900">Imagem {index + 1}</h4>
                <button
                  onClick={() => removeImage(index)}
                  className="text-red-600 hover:text-red-800"
                  type="button"
                >
                  <FaTrash />
                </button>
              </div>

              {/* Image Preview */}
              {image && (
                <div className="mb-3">
                  <img
                    src={image}
                    alt={`Imagem ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                </div>
              )}

              {/* URL Input */}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  URL da Imagem:
                </label>
                <input
                  type="text"
                  value={image}
                  onChange={(e) => updateImage(index, e.target.value)}
                  placeholder="https://example.com/image.jpg ou use upload"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Manual Entry */}
      {images.length < maxImages && (
        <button
          onClick={addEmptyImage}
          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          type="button"
        >
          <FaPlus className="mr-2" />
          Adicionar Campo Manual
        </button>
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileInput}
        className="hidden"
      />
    </div>
  );
}
