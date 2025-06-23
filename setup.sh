#!/bin/bash
# Production setup script only. All mock/demo data logic removed.

echo "🚀 Setting up Marketing Analytics Dashboard..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Please run this script from the material-dashboard directory"
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Copy environment file if it doesn't exist
if [ ! -f ".env" ]; then
    echo "⚙️ Setting up environment configuration..."
    cp .env.example .env
    echo "✅ Created .env file"
fi

echo ""
echo "🎉 Setup complete! To start the dashboard:"
echo ""
echo "   npm start           # Start development server"
echo "   npm run build       # Build for production"
echo ""
echo "🌐 Dashboard will be available at: http://localhost:3000"
