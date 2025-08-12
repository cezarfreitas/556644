#!/bin/bash

# Deploy script for EasyPanel
echo "🚀 Iniciando deploy para EasyPanel..."

# Verificar se o Docker está rodando
if ! command -v docker &> /dev/null; then
    echo "❌ Docker não encontrado. Instale o Docker primeiro."
    exit 1
fi

# Build da imagem
echo "📦 Construindo imagem Docker..."
docker build -t onbongo-landing:latest \
  --build-arg VITE_api_form="https://api.idenegociosdigitais.com.br/webhook/ntk-leads" \
  --build-arg VITE_GA4_MEASUREMENT_ID="G-GSDX6XV3V6" \
  --build-arg VITE_META_PIXEL_ID="1052506589717984" \
  --build-arg VITE_META_CONVERSION_NAME="Lead_Onbongo" \
  --build-arg VITE_META_API_VERSION="v18.0" \
  --build-arg VITE_META_TEST_EVENT_CODE="TEST48830" \
  --build-arg VITE_GTM_ID="GTM-XXXXXXX" \
  --build-arg VITE_COMPANY_NAME="IDE | Negócios digitais" \
  --build-arg VITE_PAGE_TITLE="Seja Lojista Oficial Onbongo" \
  .

if [ $? -eq 0 ]; then
    echo "✅ Imagem construída com sucesso!"
    echo "📋 Para deploy no EasyPanel:"
    echo "   1. Faça upload dos arquivos para seu repositório Git"
    echo "   2. No EasyPanel, crie um novo serviço"
    echo "   3. Conecte com seu repositório Git"
    echo "   4. Configure as variáveis de ambiente se necessário"
    echo "   5. O EasyPanel irá automaticamente usar o Dockerfile"
    echo ""
    echo "🔧 Variáveis de ambiente configuradas:"
    echo "   - VITE_api_form"
    echo "   - VITE_GA4_MEASUREMENT_ID"
    echo "   - VITE_META_PIXEL_ID"
    echo "   - VITE_META_CONVERSION_NAME"
    echo "   - VITE_META_API_VERSION"
    echo "   - VITE_META_TEST_EVENT_CODE"
    echo "   - VITE_GTM_ID"
    echo "   - VITE_COMPANY_NAME"
    echo "   - VITE_PAGE_TITLE"
    echo ""
    echo "🌐 Porta exposta: 80"
    echo "📁 Volumes persistentes: ./dados e ./public/imagens"
else
    echo "❌ Erro ao construir a imagem Docker"
    exit 1
fi
