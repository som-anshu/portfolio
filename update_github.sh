#!/bin/bash

# Simple script to update the portfolio on GitHub

# Check if a commit message was provided, otherwise use a default one
COMMIT_MSG=${1:-"Update portfolio: Aesthetics and functionality refinements"}

echo "--- 🚀 Starting GitHub Update ---"

# Add all changes
echo "➕ Adding changes..."
git add .

# Commit changes
echo "📝 Committing: $COMMIT_MSG"
git commit -m "$COMMIT_MSG"

# Push to origin
echo "⬆️ Pushing to GitHub..."
git push origin $(git rev-parse --abbrev-ref HEAD)

echo "--- ✅ Update Complete! ---"
