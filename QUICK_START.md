# ⚡ Quick Start Guide

## 🎯 5-Minute Setup

### 1. Install Dependencies (2 min)
```bash
cd smoke-break-tracker
npm install
cd client && npm install && cd ..
```

### 2. Start Backend (1 min)
```bash
npm start
```
You should see: `🚀 Server running on http://localhost:5000`

### 3. Start Frontend (1 min)
In a new terminal:
```bash
npm run client
```
You should see: `VITE v4.x.x ready in xxx ms`

### 4. Open App (1 min)
Visit: http://localhost:3000

## 🎮 Using the App

### Dashboard Tab
1. **View Timer**: Shows countdown to next allowed cigarette
2. **Press Button**: Click "I'm Going for a Smoke" when ready
3. **See Stats**: Daily and weekly counts update automatically

### Statistics Tab
1. **View Totals**: Today's and this week's counts
2. **Check Trends**: Compare to yesterday
3. **Browse History**: Last 7 days of activity

## 📊 How It Works

| Action | Result |
|--------|--------|
| Press smoke button | Timer resets to 1 hour |
| Wait 60 minutes | Button becomes enabled |
| Midnight | Daily counter resets |
| Monday | Weekly counter resets |
| Page refresh | Data persists |

## 🔧 Troubleshooting

### Port Already in Use
```bash
# Use different port
PORT=5001 npm start
```

### Dependencies Error
```bash
npm cache clean --force
npm install
cd client && npm install && cd ..
```

### Database Error
```bash
rm smoke_tracker.db
npm start
```

## 📤 Push to GitHub

See `GITHUB_SETUP.md` for detailed instructions.

Quick version:
```bash
git init
git add .
git commit -m "Initial commit: Smoke Break Tracker"
git remote add origin https://github.com/YOUR_USERNAME/smoke-break-tracker.git
git branch -M main
git push -u origin main
```

## 🚀 Deploy to Production

See `DEPLOYMENT.md` for options:
- Heroku (easiest)
- Railway
- Vercel
- Docker

## 📚 Full Documentation

- `README.md` - Complete feature documentation
- `SETUP.md` - Detailed setup instructions
- `GITHUB_SETUP.md` - GitHub push instructions
- `DEPLOYMENT.md` - Production deployment guide

## 🎉 You're Ready!

Your Smoke Break Tracker is now running. Start logging cigarettes and tracking your progress!

---

**One hour at a time. Let's reduce together! 🚬**

