import { useState, useEffect } from 'react';
import './Statistics.css';

function Statistics({ stats }) {
  const [logs, setLogs] = useState([]);
  const [dailyHistory, setDailyHistory] = useState([]);

  useEffect(() => {
    fetchLogs();
  }, [stats]);

  const fetchLogs = async () => {
    try {
      const response = await fetch('/api/logs');
      const data = await response.json();
      setLogs(data.logs || []);
      calculateDailyHistory(data.logs || []);
    } catch (error) {
      console.error('Error fetching logs:', error);
    }
  };

  const calculateDailyHistory = (allLogs) => {
    const dailyMap = {};

    allLogs.forEach(log => {
      const date = log.date;
      if (!dailyMap[date]) {
        dailyMap[date] = 0;
      }
      dailyMap[date]++;
    });

    const sortedDates = Object.keys(dailyMap).sort().reverse();
    const history = sortedDates.slice(0, 7).map(date => ({
      date,
      count: dailyMap[date]
    }));

    setDailyHistory(history);
  };

  const getTrend = () => {
    if (dailyHistory.length < 2) return null;
    const today = dailyHistory[0]?.count || 0;
    const yesterday = dailyHistory[1]?.count || 0;
    const diff = yesterday - today;

    if (diff > 0) {
      return { text: `${diff} fewer than yesterday — keep going!`, type: 'positive' };
    } else if (diff < 0) {
      return { text: `${Math.abs(diff)} more than yesterday — you can do better!`, type: 'warning' };
    }
    return { text: 'Same as yesterday — stay consistent!', type: 'neutral' };
  };

  const trend = getTrend();
  const recentLogs = logs.slice(0, 10);

  return (
    <div className="statistics">
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-title">Today</div>
          <div className="stat-number">{stats.todayCount}</div>
          <div className="stat-label">cigarettes</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">This Week</div>
          <div className="stat-number">{stats.weekCount}</div>
          <div className="stat-label">cigarettes</div>
        </div>
      </div>

      {trend && (
        <div className={`trend-card ${trend.type}`}>
          <div className="trend-icon">📊</div>
          <div className="trend-text">{trend.text}</div>
        </div>
      )}

      <div className="history-section">
        <h3>📅 Last 7 Days</h3>
        <div className="history-list">
          {dailyHistory.length > 0 ? (
            dailyHistory.map((day, index) => (
              <div key={index} className="history-item">
                <div className="history-date">{formatDate(day.date)}</div>
                <div className="history-count">{day.count} cigarettes</div>
              </div>
            ))
          ) : (
            <div className="empty-message">No data yet</div>
          )}
        </div>
      </div>

      <div className="recent-section">
        <h3>🕐 Recent Activity</h3>
        <div className="recent-list">
          {recentLogs.length > 0 ? (
            recentLogs.map((log, index) => (
              <div key={index} className="recent-item">
                <div className="recent-time">{formatTime(log.timestamp)}</div>
                <div className="recent-date">{log.date}</div>
              </div>
            ))
          ) : (
            <div className="empty-message">No activity yet</div>
          )}
        </div>
      </div>

      <div className="encouragement-section">
        <div className="encouragement-box">
          <div className="encouragement-emoji">💪</div>
          <div className="encouragement-text">
            Every break you skip is a step toward your goal. You've got this!
          </div>
        </div>
      </div>
    </div>
  );
}

function formatDate(dateString) {
  const date = new Date(dateString + 'T00:00:00');
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (dateString === today.toISOString().split('T')[0]) {
    return 'Today';
  } else if (dateString === yesterday.toISOString().split('T')[0]) {
    return 'Yesterday';
  }

  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function formatTime(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

export default Statistics;

