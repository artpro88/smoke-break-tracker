# 🚬 Smoke Break Tracker

A shared workplace interface designed to help employees track smoking breaks and support the journey toward quitting smoking.

## 🎯 Features

### Core Features
- **Live Countdown Timer**: Shows time remaining until the next allowed cigarette (1-hour minimum interval)
- **Smoke Button**: Large, easy-to-use button to log a cigarette break
- **Daily Counter**: Tracks total cigarettes smoked today (resets at midnight)
- **Weekly Counter**: Tracks total cigarettes smoked this week (resets on Monday)
- **Statistics Dashboard**: View daily and weekly trends with historical data
- **Positive Reinforcement**: Encouraging messages and trend analysis

### Quit-Oriented Features
- **Reduction Tracking**: Compare this week vs last week with percentage change
- **Trend Analysis**: See if you're smoking more or fewer cigarettes than yesterday
- **Motivational Messages**: Celebrate progress and encourage continued effort
- **Historical Data**: View previous days and weeks to track long-term progress

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **Backend**: Node.js + Express
- **Database**: SQLite3
- **Styling**: CSS3 with responsive design

## 📋 Requirements

- Node.js 14+ and npm
- Modern web browser (Chrome, Firefox, Safari, Edge)

## 🚀 Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/smoke-break-tracker.git
cd smoke-break-tracker
```

### 2. Install backend dependencies
```bash
npm install
```

### 3. Install frontend dependencies
```bash
cd client
npm install
cd ..
```

### 4. Start the application

**Option A: Development mode (two terminals)**

Terminal 1 - Backend:
```bash
npm start
```

Terminal 2 - Frontend:
```bash
npm run client
```

**Option B: Production build**
```bash
npm run build
npm start
```

The app will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 📱 Usage

### Dashboard Tab
1. View the countdown timer showing time until next allowed cigarette
2. When ready, click "I'm Going for a Smoke" button
3. The timer resets to 1 hour
4. Daily and weekly counters update automatically

### Statistics Tab
1. View today's and this week's totals
2. See trend analysis (compared to yesterday)
3. Browse last 7 days of activity
4. View recent cigarette logs with timestamps

## 🔄 How It Works

### Time Rule
- Minimum 60-minute interval between cigarettes
- Timer counts down from 60:00 to 00:00
- When timer reaches 00:00, "You can go for a smoke" message appears
- Button is disabled until 1 hour has passed

### Data Persistence
- All data stored in SQLite database
- Survives page refresh and server restart
- Timestamps recorded for each cigarette
- Daily totals reset at midnight
- Weekly totals reset on Monday

### Real-Time Updates
- Timer updates every second
- Statistics refresh every 5 seconds
- Responsive design works on desktop, tablet, and mobile

## 📊 API Endpoints

### POST /api/smoke
Log a new cigarette break
```json
Response: { "success": true, "timestamp": 1234567890, "id": "uuid" }
```

### GET /api/last-smoke
Get timestamp of last cigarette
```json
Response: { "lastSmoke": 1234567890 }
```

### GET /api/stats/today
Get today's cigarette count
```json
Response: { "count": 5 }
```

### GET /api/stats/week
Get this week's cigarette count
```json
Response: { "count": 28 }
```

### GET /api/stats
Get all statistics
```json
Response: { "todayCount": 5, "weekCount": 28, "lastSmoke": 1234567890 }
```

### GET /api/logs
Get all cigarette logs
```json
Response: { "logs": [...] }
```

## 🎨 UI Design

### Color Scheme
- **Primary**: Purple gradient (#667eea to #764ba2)
- **Allowed**: Green gradient (#00d084 to #00a86b)
- **Waiting**: Orange/Yellow gradient (#fa709a to #fee140)
- **Background**: White with shadows

### Responsive Design
- Desktop: Full layout with side-by-side stats
- Tablet: Optimized for touch interaction
- Mobile: Single column, large buttons and text

## 🔐 Security Notes

- No authentication required (shared workplace device)
- All data stored locally in SQLite
- No external API calls
- CORS enabled for local development

## 📈 Future Enhancements

- [ ] Individual user profiles with login
- [ ] Export data to CSV
- [ ] Mobile push notifications
- [ ] Cost saved calculator
- [ ] Health improvement milestones
- [ ] Goal setting with progress bars
- [ ] Dark mode toggle
- [ ] Multi-language support

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 💡 Support

For issues, questions, or suggestions, please open an issue on GitHub.

---

**Remember**: One hour at a time. Let's reduce together! 🎉

