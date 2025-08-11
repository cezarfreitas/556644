import React, { useState, useRef } from "react";
import { FaUpload, FaImage, FaTrash, FaCompress } from "react-icons/fa";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label: string;
  maxSizeMB?: number;
  quality?: number;
  maxWidth?: number;
  maxHeight?: number;
}

export default function ImageUpload({
  value,
  onChange,
  label,
  maxSizeMB = 1,
  quality = 0.8,
  maxWidth = 1920,
  maxHeight = 1080
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(value);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadImageToServer = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('quality', Math.round(quality * 100).toString());
    formData.append('maxWidth', maxWidth.toString());
    formData.append('maxHeight', maxHeight.toString());

    const response = await fetch('/api/upload/image', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload image');
    }

    const result = await response.json();
    return result.url;
  };

  const handleFileSelect = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Por favor, selecione apenas arquivos de imagem.');
      return;
    }

    if (file.size > maxSizeMB * 1024 * 1024) {
      alert(`O arquivo deve ter no máximo ${maxSizeMB}MB.`);
      return;
    }

    setIsUploading(true);

    try {
      const imageUrl = await uploadImageToServer(file);
      setPreviewUrl(imageUrl);
      onChange(imageUrl);
    } catch (error) {
      console.error('Erro ao fazer upload da imagem:', error);
      alert('Erro ao fazer upload da imagem. Tente novamente.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const clearImage = () => {
    setPreviewUrl('');
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      
      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 transition-colors ${
          dragActive
            ? 'border-primary bg-primary/5'
            : previewUrl
            ? 'border-gray-200'
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
      >
        {/* Preview Image */}
        {previewUrl && !isUploading && (
          <div className="relative">
            <img
              src={previewUrl}
              alt="Preview"
              className="max-w-full max-h-48 mx-auto rounded-lg object-contain"
            />
            <div className="absolute top-2 right-2 flex space-x-2">
              <button
                onClick={clearImage}
                className="p-2 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-colors"
                type="button"
              >
                <FaTrash size={12} />
              </button>
            </div>
          </div>
        )}

        {/* Upload UI */}
        {!previewUrl && !isUploading && (
          <div className="text-center">
            <FaImage className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                Arraste uma imagem aqui ou{' '}
                <button
                  onClick={openFileDialog}
                  className="text-primary hover:text-primary/80 font-medium"
                  type="button"
                >
                  clique para selecionar
                </button>
              </p>
              <p className="text-xs text-gray-500">
                PNG, JPG, WEBP até {maxSizeMB}MB
              </p>
              <div className="flex items-center justify-center space-x-1 text-xs text-gray-400">
                <FaCompress />
                <span>Auto-compressão para performance</span>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isUploading && (
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
            <p className="text-sm text-gray-600">Fazendo upload...</p>
          </div>
        )}
      </div>

      {/* Upload Button */}
      <div className="flex space-x-2">
        <button
          onClick={openFileDialog}
          disabled={isUploading}
          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
          type="button"
        >
          <FaUpload className="mr-2" />
          {isUploading ? 'Processando...' : 'Selecionar Arquivo'}
        </button>
        
        {previewUrl && (
          <button
            onClick={clearImage}
            className="inline-flex items-center px-3 py-2 border border-red-300 shadow-sm text-sm leading-4 font-medium rounded-md text-red-700 bg-white hover:bg-red-50"
            type="button"
          >
            <FaTrash className="mr-2" />
            Remover
          </button>
        )}
      </div>

      {/* URL Input (for manual entry) */}
      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1">
          Ou insira uma URL manualmente:
        </label>
        <input
          type="text"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setPreviewUrl(e.target.value);
          }}
          placeholder="https://example.com/image.jpg"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm"
        />
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInput}
        className="hidden"
      />
    </div>
  );
}
