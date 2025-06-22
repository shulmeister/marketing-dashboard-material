#!/bin/bash

# GitHub Setup Script for Material Dashboard
# Run these commands in your terminal

echo "🚀 Setting up GitHub repository for Material Dashboard..."

# Step 1: Ensure we're in the right directory
cd /Users/jasonshulman/Documents/GitHub/marketing-dashboard/material-dashboard

# Step 2: Check git status
echo "📋 Current Git status:"
git status

# Step 3: Add any remaining files
git add .
git commit -m "Final setup: Material Dashboard with API integration ready for deployment"

# Step 4: Create GitHub repository (you'll need to do this manually)
echo ""
echo "🌐 Now create GitHub repository:"
echo "1. Go to: https://github.com/new"
echo "2. Repository name: marketing-dashboard-material"
echo "3. Description: Material Dashboard React with Marketing API Integration"
echo "4. Make it Public"
echo "5. DON'T initialize with README (we already have one)"
echo "6. Click 'Create repository'"
echo ""

# Step 5: Add remote and push (replace YOUR_USERNAME with your GitHub username)
echo "📤 After creating the repo, run these commands:"
echo ""
echo "git remote add origin https://github.com/YOUR_USERNAME/marketing-dashboard-material.git"
echo "git branch -M main"
echo "git push -u origin main"
echo ""

echo "✅ Repository will be ready for Vercel deployment!"
