# Deploy no EasyPanel - Onbongo Landing Page

## 🚀 Guia de Deploy

Este projeto está configurado para deploy automático no EasyPanel usando Docker.

### ⚡ Deploy Rápido

1. **Conecte seu repositório Git ao EasyPanel**
2. **Crie um novo serviço no EasyPanel**
3. **Aponte para este repositório**
4. **O EasyPanel detectará automaticamente o Dockerfile**

### 🔧 Configurações Automáticas

O Dockerfile já está configurado com:

- ✅ **Porta**: 80 (padrão para produção)
- ✅ **Health Check**: `/health` endpoint
- ✅ **Otimizações**: Build multi-stage otimizado
- ✅ **Segurança**: Usuário não-root
- ✅ **Performance**: Prune de dependências dev

### 📝 Variáveis de Ambiente

Estas variáveis já estão configuradas no Dockerfile:

```bash
VITE_api_form=https://api.idenegociosdigitais.com.br/webhook/ntk-leads
VITE_GA4_MEASUREMENT_ID=G-GSDX6XV3V6
VITE_META_PIXEL_ID=1052506589717984
VITE_META_CONVERSION_NAME=Lead_Onbongo
VITE_META_API_VERSION=v18.0
VITE_META_TEST_EVENT_CODE=TEST48830
VITE_GTM_ID=GTM-XXXXXXX
VITE_COMPANY_NAME="IDE | Negócios digitais"
VITE_PAGE_TITLE="Seja Lojista Oficial Onbongo"
NODE_ENV=production
PORT=80
```

### 📁 Volumes Persistentes

Configure estes volumes no EasyPanel para persistir dados:

```yaml
volumes:
  - ./dados:/app/dados              # Dados da landing page
  - ./public/imagens:/app/public/imagens  # Imagens uploaded
```

### 🏥 Health Check

O health check está configurado para:
- **Endpoint**: `http://localhost:80/health`
- **Intervalo**: 30s
- **Timeout**: 10s
- **Retries**: 3

### 🔍 Verificação de Deploy

Após o deploy, verifique:

1. **Health Check**: `https://seu-dominio.com/health`
2. **Landing Page**: `https://seu-dominio.com/`
3. **Admin Panel**: `https://seu-dominio.com/admin`

### 🚨 Problemas Comuns

**Build falha:**
- Verifique se todas as dependências estão no package.json
- Confirme que o Node.js 18 está sendo usado

**Aplicação não inicia:**
- Verifique se a porta 80 está exposta
- Confirme que o build foi criado corretamente

**Upload de imagens não funciona:**
- Verifique se o volume `./public/imagens` está montado
- Confirme permissões de escrita no volume

### 🛠️ Build Local (Opcional)

Para testar localmente antes do deploy:

```bash
# Build da imagem
docker build -t onbongo-landing .

# Run local
docker run -p 80:80 onbongo-landing

# Acesse: http://localhost
```

### 📊 Métricas de Performance

O projeto inclui:
- ⚡ **Lazy Loading**: Componentes carregados sob demanda
- 🗜️ **Compressão**: Imagens otimizadas automaticamente
- 📦 **Code Splitting**: Bundle otimizado por seção
- 🔄 **Cache**: Headers de cache configurados

### 🔐 Segurança

- ✅ Usuário não-root no container
- ✅ Dependências de desenvolvimento removidas
- ✅ Health check para monitoramento
- ✅ Variables de ambiente protegidas

---

**✨ Deploy automatizado - basta conectar seu Git ao EasyPanel!**
