import { useState, useEffect } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import Statistics from './components/Statistics';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState({
    todayCount: 0,
    weekCount: 0,
    lastSmoke: null
  });
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Keep-alive mechanism to prevent Render spindown
  useEffect(() => {
    const keepAlive = async () => {
      try {
        // Silent background call every 10 minutes to keep server active
        await fetch('/api/stats', { method: 'GET' });
      } catch (error) {
        // Silently fail - this is just to keep server alive
      }
    };

    // Initial keep-alive call
    keepAlive();

    // Set up keep-alive interval (10 minutes = 600000ms)
    const keepAliveInterval = setInterval(keepAlive, 600000);

    return () => clearInterval(keepAliveInterval);
  }, []);

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, [refreshTrigger]);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/stats');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleSmokeLogged = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🚬 Smoke Break Tracker</h1>
        <p className="subtitle">One hour at a time</p>
      </header>

      <nav className="tab-navigation">
        <button
          className={`tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          📊 Dashboard
        </button>
        <button
          className={`tab-btn ${activeTab === 'statistics' ? 'active' : ''}`}
          onClick={() => setActiveTab('statistics')}
        >
          📈 Statistics
        </button>
      </nav>

      <main className="app-content">
        {activeTab === 'dashboard' && (
          <Dashboard stats={stats} onSmokeLogged={handleSmokeLogged} />
        )}
        {activeTab === 'statistics' && (
          <Statistics stats={stats} />
        )}
      </main>
    </div>
  );
}

export default App;

