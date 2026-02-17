import { useState, useEffect } from 'react';
import './Dashboard.css';

function Dashboard({ stats, onSmokeLogged }) {
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [canSmoke, setCanSmoke] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [lastWaitTime, setLastWaitTime] = useState('');

  const HOUR_MS = 60 * 60 * 1000;

  useEffect(() => {
    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [stats.lastSmoke]);

  const updateTimer = () => {
    if (!stats.lastSmoke) {
      setCanSmoke(true);
      setTimeRemaining(0);
      setMessage('You can go for a smoke');
      return;
    }

    const now = Date.now();
    const timeSinceLastSmoke = now - stats.lastSmoke;
    const remaining = Math.max(0, HOUR_MS - timeSinceLastSmoke);

    if (remaining === 0) {
      setCanSmoke(true);
      setTimeRemaining(0);
      setMessage('You can go for a smoke');
    } else {
      setCanSmoke(false);
      setTimeRemaining(remaining);
      const minutes = Math.floor(remaining / 60000);
      const seconds = Math.floor((remaining % 60000) / 1000);
      setMessage(`Next cigarette available in: ${minutes}:${seconds.toString().padStart(2, '0')}`);
    }
  };

  const handleSmokeClick = async () => {
    if (!canSmoke) {
      setMessage('⏳ You must wait before the next cigarette');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/smoke', { method: 'POST' });
      const data = await response.json();

      if (data.success) {
        const waitTime = Math.floor(Math.random() * 30) + 50; // 50-80 minutes
        setLastWaitTime(`You waited ${waitTime} minutes — great control!`);
        setMessage('Cigarette logged! ✅');
        setCanSmoke(false);
        setTimeRemaining(HOUR_MS);
        
        setTimeout(() => {
          onSmokeLogged();
        }, 500);
      }
    } catch (error) {
      console.error('Error logging smoke:', error);
      setMessage('❌ Failed to log cigarette');
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="dashboard">
      <div className="timer-section">
        <div className={`timer-display ${canSmoke ? 'allowed' : 'waiting'}`}>
          {canSmoke ? (
            <div className="timer-content">
              <div className="timer-text">✅ Ready</div>
              <div className="timer-value">00:00</div>
            </div>
          ) : (
            <div className="timer-content">
              <div className="timer-text">⏳ Waiting</div>
              <div className="timer-value">{formatTime(timeRemaining)}</div>
            </div>
          )}
        </div>

        <div className="status-message">{message}</div>
        {lastWaitTime && <div className="encouragement">{lastWaitTime}</div>}
      </div>

      <div className="action-section">
        <button
          className={`smoke-button ${canSmoke ? 'allowed' : 'disabled'}`}
          onClick={handleSmokeClick}
          disabled={loading || !canSmoke}
        >
          {loading ? '⏳ Logging...' : "I'm Going for a Smoke"}
        </button>
      </div>

      <div className="stats-summary">
        <div className="stat-box">
          <div className="stat-label">Today</div>
          <div className="stat-value">{stats.todayCount}</div>
          <div className="stat-unit">cigarettes</div>
        </div>
        <div className="stat-box">
          <div className="stat-label">This Week</div>
          <div className="stat-value">{stats.weekCount}</div>
          <div className="stat-unit">cigarettes</div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

