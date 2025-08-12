# Optimized for EasyPanel deployment
FROM node:18-alpine

# Install system dependencies
RUN apk add --no-cache wget dumb-init

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install all dependencies first
RUN npm ci --legacy-peer-deps --no-audit --no-fund

# Copy source code
COPY . .

# Build arguments for environment variables
ARG VITE_api_form=https://api.idenegociosdigitais.com.br/webhook/ntk-leads
ARG VITE_GA4_MEASUREMENT_ID=G-GSDX6XV3V6
ARG VITE_META_PIXEL_ID=1052506589717984
ARG VITE_META_CONVERSION_NAME=Lead_Onbongo
ARG VITE_META_API_VERSION=v18.0
ARG VITE_META_TEST_EVENT_CODE=TEST48830
ARG VITE_GTM_ID=GTM-XXXXXXX
ARG VITE_COMPANY_NAME="IDE | Negócios digitais"
ARG VITE_PAGE_TITLE="Seja Lojista Oficial Onbongo"

# Set environment variables
ENV VITE_api_form=$VITE_api_form
ENV VITE_GA4_MEASUREMENT_ID=$VITE_GA4_MEASUREMENT_ID
ENV VITE_META_PIXEL_ID=$VITE_META_PIXEL_ID
ENV VITE_META_CONVERSION_NAME=$VITE_META_CONVERSION_NAME
ENV VITE_META_API_VERSION=$VITE_META_API_VERSION
ENV VITE_META_TEST_EVENT_CODE=$VITE_META_TEST_EVENT_CODE
ENV VITE_GTM_ID=$VITE_GTM_ID
ENV VITE_COMPANY_NAME=$VITE_COMPANY_NAME
ENV VITE_PAGE_TITLE=$VITE_PAGE_TITLE

# Build the application
RUN npm run build

# Remove dev dependencies after build
RUN npm prune --omit=dev

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Change ownership of the app directory
RUN chown -R nextjs:nodejs /app
USER nextjs

# Expose port
EXPOSE 80

# Set environment variables
ENV NODE_ENV=production
ENV PORT=80

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:80/health || exit 1

# Start with proper signal handling for containers
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/server/node-build.mjs"]
