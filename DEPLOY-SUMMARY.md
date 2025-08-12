# 🚀 Deploy EasyPanel - Arquivos Criados

## ✅ Arquivos de Deploy

### 1. **Dockerfile** (otimizado)

- ✅ Node.js 18 Alpine (imagem leve)
- ✅ Multi-stage build otimizado
- ✅ Health check configurado
- ✅ Usuário não-root para segurança
- ✅ Compactação de dependências
- ✅ Signal handling com dumb-init

### 2. **.easypanel.yml**

- ✅ Configuração específica do EasyPanel
- ✅ Build args para variáveis de ambiente
- ✅ Volumes persistentes configurados
- ✅ Health check automático

### 3. **.easypanel/config.yml**

- ✅ Configuração detalhada do serviço
- ✅ Recursos (512MB RAM, 0.5 CPU)
- ✅ Auto-scaling (1-3 instâncias)
- ✅ Health check personalizado

### 4. **docker-compose.yml**

- ✅ Para testing local
- ✅ Mesmas configurações do EasyPanel
- ✅ Volumes para persistência de dados

### 5. **deploy.sh**

- ✅ Script de build local
- ✅ Instruções de deploy
- ✅ Verificações automáticas

### 6. **DEPLOY-EASYPANEL.md**

- ✅ Guia completo de deploy
- ✅ Troubleshooting
- ✅ Configurações detalhadas

## 🎯 Deploy no EasyPanel

### Método 1: Git Deploy (Recomendado)

1. Faça push para seu repositório Git
2. No EasyPanel: New Service → Git Repository
3. Conecte o repositório
4. Deploy automático com Dockerfile

### Método 2: Docker Registry

1. Build local: `docker build -t onbongo-landing .`
2. Push para registry: `docker push seu-registry/onbongo-landing`
3. Deploy no EasyPanel via Docker Registry

## 🔧 Configurações Importantes

- **Porta**: 80 (configurada no container)
- **Health Check**: `/health` endpoint
- **Volumes**: `./dados` e `./public/imagens`
- **Variáveis**: Todas configuradas no Dockerfile

## 📊 Recursos Configurados

- **Memória**: 512MB
- **CPU**: 0.5 cores
- **Scaling**: 1-3 instâncias
- **Restart**: Automático

## ✨ Pronto para Deploy!

Todos os arquivos estão configurados. Basta conectar ao EasyPanel via Git e o deploy será automático.
