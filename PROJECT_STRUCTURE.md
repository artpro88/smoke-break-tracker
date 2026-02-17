# 📁 Project Structure

## Complete Directory Tree

```
smoke-break-tracker/
│
├── 📄 README.md                    # Main project documentation
├── 📄 LICENSE                      # MIT License
├── 📄 QUICK_START.md              # 5-minute setup guide
├── 📄 SETUP.md                    # Detailed setup instructions
├── 📄 GITHUB_SETUP.md             # GitHub push instructions
├── 📄 DEPLOYMENT.md               # Production deployment guide
├── 📄 PROJECT_STRUCTURE.md        # This file
│
├── 📄 package.json                # Backend dependencies
├── 📄 server.js                   # Express backend server
├── 📄 .gitignore                  # Git ignore rules
│
├── 📁 .github/
│   └── 📁 workflows/
│       └── 📄 ci.yml              # GitHub Actions CI/CD
│
├── 📁 client/                     # React frontend
│   ├── 📄 package.json            # Frontend dependencies
│   ├── 📄 vite.config.js          # Vite configuration
│   ├── 📄 index.html              # HTML entry point
│   │
│   └── 📁 src/
│       ├── 📄 main.jsx            # React entry point
│       ├── 📄 App.jsx             # Main App component
│       ├── 📄 App.css             # App styles
│       ├── 📄 index.css           # Global styles
│       │
│       └── 📁 components/
│           ├── 📄 Dashboard.jsx   # Main dashboard component
│           ├── 📄 Dashboard.css   # Dashboard styles
│           ├── 📄 Statistics.jsx  # Statistics view component
│           └── 📄 Statistics.css  # Statistics styles
│
└── 📁 (auto-created)
    └── 📄 smoke_tracker.db        # SQLite database
```

## File Descriptions

### Root Level

| File | Purpose |
|------|---------|
| `README.md` | Complete project documentation with features and API |
| `LICENSE` | MIT License for open-source distribution |
| `QUICK_START.md` | 5-minute setup guide for quick start |
| `SETUP.md` | Detailed setup and installation instructions |
| `GITHUB_SETUP.md` | Step-by-step GitHub repository setup |
| `DEPLOYMENT.md` | Production deployment options and guides |
| `package.json` | Backend dependencies (Express, SQLite, CORS) |
| `server.js` | Express server with API endpoints |
| `.gitignore` | Files to exclude from git |

### Backend (server.js)

**Endpoints:**
- `POST /api/smoke` - Log a cigarette break
- `GET /api/last-smoke` - Get last cigarette timestamp
- `GET /api/stats/today` - Get today's count
- `GET /api/stats/week` - Get this week's count
- `GET /api/stats` - Get all statistics
- `GET /api/logs` - Get all cigarette logs

**Database:**
- `smoke_logs` table - Stores all cigarette logs
- `settings` table - Stores app settings

### Frontend (client/)

**Main Components:**
- `App.jsx` - Main app with tab navigation
- `Dashboard.jsx` - Countdown timer and smoke button
- `Statistics.jsx` - Daily/weekly stats and history

**Styling:**
- `App.css` - Global app styles
- `Dashboard.css` - Dashboard component styles
- `Statistics.css` - Statistics component styles

### GitHub Actions

**CI/CD Pipeline:**
- Runs on push to main/develop
- Tests on Node 16.x and 18.x
- Builds frontend
- Checks for syntax errors

## Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: SQLite3
- **Utilities**: UUID, CORS

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: CSS3
- **HTTP**: Fetch API

### DevOps
- **Version Control**: Git
- **CI/CD**: GitHub Actions
- **Deployment**: Multiple options (Heroku, Railway, Docker, etc.)

## Key Features by File

### Timer Logic (Dashboard.jsx)
- 1-hour minimum interval
- Real-time countdown
- Status messages
- Encouragement messages

### Statistics (Statistics.jsx)
- Daily counter
- Weekly counter
- 7-day history
- Trend analysis
- Recent activity log

### Data Persistence (server.js)
- SQLite database
- Automatic table creation
- Week number calculation
- Date-based queries

## Development Workflow

1. **Local Development**
   - Backend: `npm start` (port 5000)
   - Frontend: `npm run client` (port 3000)

2. **Building**
   - Frontend: `npm run build` (creates dist/)
   - Backend: Serves dist/ as static files

3. **Testing**
   - Manual testing in browser
   - Check browser console for errors
   - Verify database with SQLite viewer

4. **Deployment**
   - Build frontend: `npm run build`
   - Push to GitHub
   - Deploy to hosting platform

## Database Schema

### smoke_logs Table
```sql
CREATE TABLE smoke_logs (
  id TEXT PRIMARY KEY,
  timestamp INTEGER NOT NULL,
  date TEXT NOT NULL,
  week_number INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

### settings Table
```sql
CREATE TABLE settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
)
```

## Environment Variables

```env
NODE_ENV=production
PORT=5000
DATABASE_PATH=./smoke_tracker.db
```

## Performance Considerations

- **Timer Updates**: Every 1 second
- **Stats Refresh**: Every 5 seconds
- **Database Queries**: Optimized with indexes
- **Bundle Size**: ~150KB (gzipped)

## Security Features

- No authentication required (shared device)
- CORS enabled for local development
- Input validation on API endpoints
- SQLite for data isolation

---

**This structure supports easy maintenance, testing, and deployment!**

