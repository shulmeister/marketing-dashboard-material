#!/bin/bash

echo "🔧 Fixing GitHub repository setup..."

# Navigate to the correct directory
cd /Users/jasonshulman/Documents/GitHub/marketing-dashboard/material-dashboard

# Check current status
echo "📋 Current directory:"
pwd

echo "📁 Files in directory:"
ls -la | head -20

# Check git status
echo "🔍 Git status:"
git status

# Add all files
echo "➕ Adding all files to git..."
git add -A

# Check if there's anything to commit
git status

# Commit if there are changes
echo "💾 Committing files..."
git commit -m "Complete Material Dashboard with API integration - ready for deployment"

# Check if we have commits
echo "📝 Recent commits:"
git log --oneline -5

# Remove and re-add remote
echo "🔗 Setting up GitHub remote..."
git remote remove origin 2>/dev/null || true
git remote add origin https://github.com/shulmeister/marketing-dashboard-material.git

# Verify remote
echo "🌐 Remote repositories:"
git remote -v

# Push to GitHub
echo "🚀 Pushing to GitHub..."
git push -u origin main

echo "✅ Done! Check your GitHub repository now."
