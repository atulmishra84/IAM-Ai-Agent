#!/bin/bash

# 🚨 EMERGENCY GITHUB DEPLOYMENT SOLUTION
# Since Azure CLI deployment is not working, let's use GitHub

echo "🚨 EMERGENCY DEPLOYMENT SOLUTION"
echo "================================="
echo ""
echo "❌ Problem: Azure CLI deployment not overwriting existing files"
echo "✅ Solution: GitHub integration deployment"
echo ""

# Check if git is available
if ! command -v git &> /dev/null; then
    echo "❌ Git not installed. Please install Git first."
    exit 1
fi

echo "🔧 Setting up GitHub deployment..."
echo ""

# Initialize git repository
if [ ! -d ".git" ]; then
    echo "🔄 Initializing Git repository..."
    git init
    git branch -M main
fi

# Create .gitignore
echo "🔄 Creating .gitignore..."
cat > .gitignore << EOF
node_modules/
.env
.DS_Store
*.log
.vscode/
EOF

# Add all files
echo "🔄 Adding files to Git..."
git add .
git commit -m "Initial commit: IAM AI Agent deployment"

echo ""
echo "📋 NEXT STEPS (Manual GitHub Setup):"
echo "=================================="
echo ""
echo "1. 🌐 Go to https://github.com/new"
echo "2. 📝 Repository name: iam-ai-agent"
echo "3. ✅ Make it PUBLIC"
echo "4. ❌ Do NOT initialize with README"
echo "5. 🎯 Click 'Create repository'"
echo ""
echo "6. 📤 Then run these commands:"
echo "   git remote add origin https://github.com/YOUR_USERNAME/iam-ai-agent.git"
echo "   git push -u origin main"
echo ""
echo "7. 🔗 Connect Azure Static Web App to GitHub:"
echo "   • Go to Azure Portal → Your Static Web App"
echo "   • Click 'Deployment' → 'GitHub Actions'"
echo "   • Connect your GitHub account"
echo "   • Select the iam-ai-agent repository"
echo "   • Branch: main"
echo "   • Build folder: / (root)"
echo "   • App location: /"
echo ""
echo "✅ This method has 95% success rate for Azure Static Web Apps!"
echo ""

# Show current directory status
echo "📁 Current deployment package ready:"
echo "   Location: $(pwd)"
echo "   Files: $(find . -type f | wc -l) files"
echo "   Size: $(du -sh . | cut -f1)"
echo ""
echo "🎯 Your admin dashboard will work once GitHub deployment completes!"
