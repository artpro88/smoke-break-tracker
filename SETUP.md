# 🚀 Setup Instructions

## Quick Start

### 1. Initialize Git Repository
```bash
cd smoke-break-tracker
git init
git config user.email "your-email@example.com"
git config user.name "Your Name"
```

### 2. Add All Files
```bash
git add .
git commit -m "Initial commit: Smoke Break Tracker application"
```

### 3. Create GitHub Repository
1. Go to https://github.com/new
2. Create a new repository named `smoke-break-tracker`
3. Do NOT initialize with README (we already have one)
4. Click "Create repository"

### 4. Push to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/smoke-break-tracker.git
git branch -M main
git push -u origin main
```

### 5. Install Dependencies
```bash
# Backend
npm install

# Frontend
cd client
npm install
cd ..
```

### 6. Run the Application

**Development Mode (Two Terminals):**

Terminal 1:
```bash
npm start
```

Terminal 2:
```bash
npm run client
```

**Production Mode:**
```bash
npm run build
npm start
```

### 7. Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Project Structure

```
smoke-break-tracker/
├── server.js                 # Express backend server
├── package.json             # Backend dependencies
├── smoke_tracker.db         # SQLite database (auto-created)
├── README.md                # Project documentation
├── LICENSE                  # MIT License
├── .gitignore              # Git ignore rules
└── client/                  # React frontend
    ├── package.json        # Frontend dependencies
    ├── vite.config.js      # Vite configuration
    ├── index.html          # HTML entry point
    └── src/
        ├── main.jsx        # React entry point
        ├── App.jsx         # Main App component
        ├── App.css         # App styles
        ├── index.css       # Global styles
        └── components/
            ├── Dashboard.jsx      # Main dashboard
            ├── Dashboard.css      # Dashboard styles
            ├── Statistics.jsx     # Statistics view
            └── Statistics.css     # Statistics styles
```

## Features Implemented

✅ Live countdown timer (1-hour minimum interval)
✅ Smoke button to log cigarette breaks
✅ Daily counter (resets at midnight)
✅ Weekly counter (resets on Monday)
✅ Statistics dashboard with trends
✅ Positive reinforcement messages
✅ Responsive design (desktop, tablet, mobile)
✅ Real-time updates
✅ Data persistence with SQLite
✅ No authentication required (shared device)

## API Endpoints

- `POST /api/smoke` - Log a cigarette break
- `GET /api/last-smoke` - Get last cigarette timestamp
- `GET /api/stats/today` - Get today's count
- `GET /api/stats/week` - Get this week's count
- `GET /api/stats` - Get all statistics
- `GET /api/logs` - Get all cigarette logs

## Troubleshooting

### Port Already in Use
If port 5000 or 3000 is already in use:
```bash
# Change backend port
PORT=5001 npm start

# Change frontend port in vite.config.js
# Change server.port to 3001
```

### Database Issues
To reset the database:
```bash
rm smoke_tracker.db
npm start
```

### Dependencies Not Installing
```bash
# Clear npm cache
npm cache clean --force

# Reinstall
npm install
cd client && npm install && cd ..
```

## Next Steps

1. Push to GitHub
2. Share the repository link with your team
3. Deploy to a server (Heroku, Vercel, etc.)
4. Access from shared workplace device

---

**Happy tracking! One hour at a time. 🎉**

