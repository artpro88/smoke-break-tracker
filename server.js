import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database setup
const db = new sqlite3.Database('./smoke_tracker.db', (err) => {
  if (err) console.error('Database error:', err);
  else console.log('✅ Connected to SQLite database');
});

// Initialize database tables
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS smoke_logs (
      id TEXT PRIMARY KEY,
      timestamp INTEGER NOT NULL,
      date TEXT NOT NULL,
      week_number INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    )
  `);
});

// Helper functions
function getWeekNumber(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

function getTodayDate() {
  const today = new Date();
  return today.toISOString().split('T')[0];
}

// API Endpoints

// 1. Log a smoke break
app.post('/api/smoke', (req, res) => {
  const now = Date.now();
  const today = getTodayDate();
  const weekNumber = getWeekNumber(new Date());
  const id = uuidv4();

  db.run(
    `INSERT INTO smoke_logs (id, timestamp, date, week_number) VALUES (?, ?, ?, ?)`,
    [id, now, today, weekNumber],
    (err) => {
      if (err) {
        console.error('Error logging smoke:', err);
        return res.status(500).json({ error: 'Failed to log smoke break' });
      }
      res.json({ success: true, timestamp: now, id });
    }
  );
});

// 2. Get last smoke break timestamp
app.get('/api/last-smoke', (req, res) => {
  db.get(
    `SELECT timestamp FROM smoke_logs ORDER BY timestamp DESC LIMIT 1`,
    (err, row) => {
      if (err) {
        console.error('Error fetching last smoke:', err);
        return res.status(500).json({ error: 'Failed to fetch data' });
      }
      res.json({ lastSmoke: row ? row.timestamp : null });
    }
  );
});

// 3. Get today's count
app.get('/api/stats/today', (req, res) => {
  const today = getTodayDate();
  db.get(
    `SELECT COUNT(*) as count FROM smoke_logs WHERE date = ?`,
    [today],
    (err, row) => {
      if (err) {
        console.error('Error fetching today stats:', err);
        return res.status(500).json({ error: 'Failed to fetch data' });
      }
      res.json({ count: row.count });
    }
  );
});

// 4. Get this week's count
app.get('/api/stats/week', (req, res) => {
  const weekNumber = getWeekNumber(new Date());
  const year = new Date().getFullYear();
  
  db.get(
    `SELECT COUNT(*) as count FROM smoke_logs WHERE week_number = ? AND strftime('%Y', date) = ?`,
    [weekNumber, year],
    (err, row) => {
      if (err) {
        console.error('Error fetching week stats:', err);
        return res.status(500).json({ error: 'Failed to fetch data' });
      }
      res.json({ count: row.count });
    }
  );
});

// 5. Get all logs
app.get('/api/logs', (req, res) => {
  db.all(
    `SELECT * FROM smoke_logs ORDER BY timestamp DESC LIMIT 100`,
    (err, rows) => {
      if (err) {
        console.error('Error fetching logs:', err);
        return res.status(500).json({ error: 'Failed to fetch logs' });
      }
      res.json({ logs: rows || [] });
    }
  );
});

// 6. Get statistics for dashboard
app.get('/api/stats', (req, res) => {
  const today = getTodayDate();
  const weekNumber = getWeekNumber(new Date());
  const year = new Date().getFullYear();

  db.get(
    `SELECT COUNT(*) as todayCount FROM smoke_logs WHERE date = ?`,
    [today],
    (err, todayRow) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to fetch data' });
      }

      db.get(
        `SELECT COUNT(*) as weekCount FROM smoke_logs WHERE week_number = ? AND strftime('%Y', date) = ?`,
        [weekNumber, year],
        (err, weekRow) => {
          if (err) {
            return res.status(500).json({ error: 'Failed to fetch data' });
          }

          db.get(
            `SELECT timestamp FROM smoke_logs ORDER BY timestamp DESC LIMIT 1`,
            (err, lastRow) => {
              if (err) {
                return res.status(500).json({ error: 'Failed to fetch data' });
              }

              res.json({
                todayCount: todayRow.todayCount,
                weekCount: weekRow.weekCount,
                lastSmoke: lastRow ? lastRow.timestamp : null
              });
            }
          );
        }
      );
    }
  );
});

// Serve static files from client build
app.use(express.static(path.join(__dirname, 'client', 'dist')));

// Fallback to index.html for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

