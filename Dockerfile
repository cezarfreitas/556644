# Build stage
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies with fallback for peer dependencies
RUN npm ci || npm ci --legacy-peer-deps

# Copy source code
COPY . .

# Build argument for API URL
ARG VITE_api_form=https://470187c48f0a4640803d23a0491ae11b-a421d35e00a9431bb90c3d034.fly.dev/api/leads
ENV VITE_api_form=$VITE_api_form

# Build the application
RUN npm run build

# Production stage
FROM node:18-alpine AS production

# Install wget for healthcheck
RUN apk add --no-cache wget

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Change ownership of the app directory
RUN chown -R nextjs:nodejs /app
USER nextjs

# Expose port
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000 || exit 1

# Start the application directly with node
CMD ["node", "dist/server/node-build.mjs"]
