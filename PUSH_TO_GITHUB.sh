#!/bin/bash

# Smoke Break Tracker - Push to GitHub Script
# This script will initialize git and push your project to GitHub

echo "🚀 Smoke Break Tracker - GitHub Push Script"
echo "==========================================="
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first."
    exit 1
fi

# Initialize git repository
echo "📝 Initializing git repository..."
git init

# Configure git user
echo "👤 Configuring git user..."
read -p "Enter your email: " email
read -p "Enter your name: " name

git config user.email "$email"
git config user.name "$name"

# Add all files
echo "📦 Adding files to git..."
git add .

# Create initial commit
echo "💾 Creating initial commit..."
git commit -m "Initial commit: Smoke Break Tracker application

- Full-stack React + Node.js application
- Live countdown timer for 1-hour minimum interval
- Daily and weekly smoking statistics
- Positive reinforcement messages
- Responsive design for all devices
- SQLite database for data persistence
- Ready for deployment"

# Get GitHub username
echo ""
echo "🔗 Setting up GitHub remote..."
read -p "Enter your GitHub username: " github_user

# Add remote
git remote add origin "https://github.com/$github_user/smoke-break-tracker.git"

# Rename branch to main
git branch -M main

# Push to GitHub
echo ""
echo "📤 Pushing to GitHub..."
echo "You may be prompted for authentication."
echo "Use your GitHub username and a Personal Access Token (not your password)"
echo ""

git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Successfully pushed to GitHub!"
    echo ""
    echo "🎉 Your repository is now available at:"
    echo "   https://github.com/$github_user/smoke-break-tracker"
    echo ""
    echo "📚 Next steps:"
    echo "   1. Visit your repository on GitHub"
    echo "   2. Share the link with your team"
    echo "   3. Follow DEPLOYMENT.md to deploy to production"
else
    echo ""
    echo "❌ Failed to push to GitHub"
    echo ""
    echo "Troubleshooting:"
    echo "1. Make sure you created the repository on GitHub first"
    echo "2. Check your GitHub username and Personal Access Token"
    echo "3. Run: git remote -v (to verify remote URL)"
    echo "4. Run: git push -u origin main (to try again)"
fi

