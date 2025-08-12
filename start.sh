#!/bin/bash

echo "🚀 Starting Onbongo Lojistas application..."
echo "📁 Working directory: $(pwd)"
echo "📦 Node.js version: $(node --version)"
echo "🔧 Environment: $NODE_ENV"
echo "🌐 Port: $PORT"

# Check if build files exist
if [ ! -f "dist/server/node-build.mjs" ]; then
    echo "❌ Server build file not found!"
    echo "🏗️ Running build..."
    npm run build
fi

if [ ! -f "dist/spa/index.html" ]; then
    echo "❌ Client build files not found!"
    echo "🏗️ Running build..."
    npm run build
fi

echo "✅ Build files verified"
echo "🌟 Starting server..."

# Start the application
node dist/server/node-build.mjs
