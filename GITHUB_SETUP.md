# 📤 GitHub Setup & Push Instructions

## Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Fill in the form:
   - **Repository name**: `smoke-break-tracker`
   - **Description**: "A shared workplace interface to track smoking breaks and support quitting goals"
   - **Visibility**: Public (or Private if preferred)
   - **Initialize repository**: Leave unchecked (we have files already)
3. Click **Create repository**

## Step 2: Initialize Local Git Repository

```bash
cd smoke-break-tracker
git init
```

## Step 3: Configure Git User

```bash
git config user.email "your-email@example.com"
git config user.name "Your Name"
```

Or globally:
```bash
git config --global user.email "your-email@example.com"
git config --global user.name "Your Name"
```

## Step 4: Add Files to Git

```bash
git add .
```

Verify files are staged:
```bash
git status
```

## Step 5: Create Initial Commit

```bash
git commit -m "Initial commit: Smoke Break Tracker application

- Full-stack React + Node.js application
- Live countdown timer for 1-hour minimum interval
- Daily and weekly smoking statistics
- Positive reinforcement messages
- Responsive design for all devices
- SQLite database for data persistence
- Ready for deployment"
```

## Step 6: Add Remote Repository

Replace `YOUR_USERNAME` with your GitHub username:

```bash
git remote add origin https://github.com/YOUR_USERNAME/smoke-break-tracker.git
```

Verify remote:
```bash
git remote -v
```

## Step 7: Rename Branch to Main

```bash
git branch -M main
```

## Step 8: Push to GitHub

```bash
git push -u origin main
```

You may be prompted for authentication:
- Use your GitHub username
- Use a Personal Access Token as password (not your GitHub password)

### Create Personal Access Token (if needed)

1. Go to https://github.com/settings/tokens
2. Click "Generate new token"
3. Select scopes: `repo`, `workflow`
4. Copy the token
5. Use as password when pushing

## Step 9: Verify on GitHub

1. Go to https://github.com/YOUR_USERNAME/smoke-break-tracker
2. Verify all files are there
3. Check the commit history

## Step 10: Add GitHub Topics (Optional)

1. Go to repository settings
2. Scroll to "Topics"
3. Add: `smoking`, `health`, `tracker`, `workplace`, `react`, `nodejs`

## Step 11: Enable GitHub Pages (Optional)

To host documentation:

1. Go to Settings → Pages
2. Select "main" branch
3. Select "/root" folder
4. Save

## Subsequent Pushes

After making changes:

```bash
git add .
git commit -m "Your commit message"
git push
```

## Useful Git Commands

```bash
# Check status
git status

# View commit history
git log --oneline

# View changes
git diff

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1

# Create a new branch
git checkout -b feature/new-feature

# Switch branches
git checkout main

# Merge branch
git merge feature/new-feature

# Delete branch
git branch -d feature/new-feature
```

## Troubleshooting

### "fatal: not a git repository"
```bash
git init
```

### "Permission denied (publickey)"
- Generate SSH key: `ssh-keygen -t ed25519 -C "your-email@example.com"`
- Add to GitHub: https://github.com/settings/keys
- Or use HTTPS with Personal Access Token

### "fatal: remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/smoke-break-tracker.git
```

### "Updates were rejected because the tip of your current branch is behind"
```bash
git pull origin main
git push origin main
```

## Next Steps

1. ✅ Push to GitHub
2. Share repository link with team
3. Set up CI/CD (GitHub Actions already configured)
4. Deploy to production
5. Monitor and maintain

---

**Your project is now on GitHub! 🎉**

