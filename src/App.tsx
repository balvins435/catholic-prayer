import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { databaseService } from './services/databaseService';
import DailyReadingsView from './components/DailyReadingsView';
import PrayersView from './components/PrayersView';
import RosaryView from './components/RosaryView';
import SaintsView from './components/SaintsView';
import SettingsView from './components/SettingsView';
import DatabaseStats from './components/DatabaseStats';
import './styles/index.css';

function App() {
  const [dbInitialized, setDbInitialized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initDatabase = async () => {
      try {
        console.log('Initializing database...');
        const success = await databaseService.init();
        setDbInitialized(success);
        
        if (success) {
          const stats = await databaseService.getStats();
          console.log('Database stats:', stats);
        }
      } catch (error) {
        console.error('Failed to initialize database:', error);
      } finally {
        setLoading(false);
      }
    };

    initDatabase();
  }, []);

  if (loading) {
    return (
      <div className="app-loading">
        <div className="loading-spinner-large">
          <div className="spinner"></div>
          <p>Loading Catholic Prayer App...</p>
          <p className="loading-sub">Initializing prayer database</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="nav-container">
            <div className="nav-brand">
              <h1>📿 Catholic Prayer App</h1>
              {!dbInitialized && (
                <span className="db-warning">(Offline Mode)</span>
              )}
            </div>
            <div className="nav-links">
              <Link to="/">Home</Link>
              <Link to="/readings">Daily Readings</Link>
              <Link to="/prayers">Prayers</Link>
              <Link to="/rosary">Rosary</Link>
              <Link to="/saints">Saints</Link>
              <Link to="/stats">Stats</Link>
              <Link to="/settings">Settings</Link>
            </div>
          </div>
        </nav>
        
        <main>
          <Routes>
            <Route path="/" element={
              <div className="home-container">
                <div className="home-header">
                  <h2>Welcome to Your Catholic Prayer App</h2>
                  <p className="subtitle">Your complete offline companion for prayer and devotion</p>
                </div>
                
                <div className="features-grid">
                  <div className="feature-card">
                    <h3>📖 Daily Readings</h3>
                    <p>Complete liturgical readings for each day</p>
                    <Link to="/readings" className="feature-link">Explore →</Link>
                  </div>
                  
                  <div className="feature-card">
                    <h3>📿 400+ Prayers</h3>
                    <p>Traditional prayers for every occasion</p>
                    <Link to="/prayers" className="feature-link">Browse →</Link>
                  </div>
                  
                  <div className="feature-card">
                    <h3>🙏 Holy Rosary</h3>
                    <p>Interactive rosary with all mysteries</p>
                    <Link to="/rosary" className="feature-link">Pray →</Link>
                  </div>
                  
                  <div className="feature-card">
                    <h3>🧑‍🦳 Saints</h3>
                    <p>Daily saints and their prayers</p>
                    <Link to="/saints" className="feature-link">Discover →</Link>
                  </div>
                </div>
                
                {!dbInitialized && (
                  <div className="offline-notice">
                    <h3>⚠️ Offline Mode</h3>
                    <p>The app is running with built-in prayer database. All features are available offline.</p>
                  </div>
                )}
              </div>
            } />
            <Route path="/readings" element={<DailyReadingsView />} />
            <Route path="/prayers" element={<PrayersView />} />
            <Route path="/rosary" element={<RosaryView />} />
            <Route path="/saints" element={<SaintsView />} />
            <Route path="/stats" element={<DatabaseStats />} />
            <Route path="/settings" element={<SettingsView />} />
          </Routes>
        </main>
        
        <footer className="footer">
          <p>© {new Date().getFullYear()} Catholic Prayer App. All prayers and readings offline.</p>
          <p className="footer-version">Database: {dbInitialized ? 'Loaded' : 'Offline'}</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
