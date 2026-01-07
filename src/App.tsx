import { useEffect, useState } from 'react';
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
      <div className="min-h-screen bg-catholic-gradient flex items-center justify-center">
        <div className="text-center">
          <div className="spinner h-16 w-16 mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold text-white mb-2">Loading Catholic Prayer App</h2>
          <p className="text-white/80">Initializing prayer database...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Navigation */}
        <nav className="bg-catholic-gradient shadow-lg">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-3 mb-4 md:mb-0">
                <h1 className="text-2xl font-bold text-white flex items-center">
                  <span className="mr-2">📿</span>
                  Catholic Prayer App
                </h1>
                {!dbInitialized && (
                  <span className="bg-amber-500 text-white text-xs px-2 py-1 rounded">Offline Mode</span>
                )}
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/readings" className="nav-link">Daily Readings</Link>
                <Link to="/prayers" className="nav-link">Prayers</Link>
                <Link to="/rosary" className="nav-link">Rosary</Link>
                <Link to="/saints" className="nav-link">Saints</Link>
                <Link to="/stats" className="nav-link">Stats</Link>
                <Link to="/settings" className="nav-link">Settings</Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={
              <div>
                <div className="text-center mb-12">
                  <h2 className="section-header">Welcome to Your Catholic Prayer App</h2>
                  <p className="section-subtitle">
                    Your complete offline companion for prayer, devotion, and daily readings
                  </p>
                </div>
                
                <div className="feature-grid mb-12">
                  <div className="feature-card">
                    <div className="text-4xl mb-4">📖</div>
                    <h3 className="text-xl font-bold mb-2">Daily Readings</h3>
                    <p className="text-gray-600 mb-4">Complete liturgical readings for each day</p>
                    <Link to="/readings" className="btn-outline inline-block">Explore →</Link>
                  </div>
                  
                  <div className="feature-card">
                    <div className="text-4xl mb-4">📿</div>
                    <h3 className="text-xl font-bold mb-2">400+ Prayers</h3>
                    <p className="text-gray-600 mb-4">Traditional prayers for every occasion</p>
                    <Link to="/prayers" className="btn-outline inline-block">Browse →</Link>
                  </div>
                  
                  <div className="feature-card">
                    <div className="text-4xl mb-4">🙏</div>
                    <h3 className="text-xl font-bold mb-2">Holy Rosary</h3>
                    <p className="text-gray-600 mb-4">Interactive rosary with all mysteries</p>
                    <Link to="/rosary" className="btn-outline inline-block">Pray →</Link>
                  </div>
                  
                  <div className="feature-card">
                    <div className="text-4xl mb-4">🧑‍🦳</div>
                    <h3 className="text-xl font-bold mb-2">Saints</h3>
                    <p className="text-gray-600 mb-4">Daily saints and their prayers</p>
                    <Link to="/saints" className="btn-outline inline-block">Discover →</Link>
                  </div>
                </div>
                
                {!dbInitialized && (
                  <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg mb-8">
                    <div className="flex items-start">
                      <div className="text-amber-500 text-2xl mr-3">⚠️</div>
                      <div>
                        <h3 className="text-lg font-bold text-amber-800 mb-2">Offline Mode</h3>
                        <p className="text-amber-700">
                          The app is running with built-in prayer database. All features are available offline.
                          No internet connection required.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">Quick Start</h3>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-bold text-lg mb-4 text-catholic-red">For Beginners</h4>
                      <ul className="space-y-3">
                        <li className="flex items-center">
                          <span className="text-catholic-green mr-2">✓</span>
                          Start with the Our Father prayer
                        </li>
                        <li className="flex items-center">
                          <span className="text-catholic-green mr-2">✓</span>
                          Explore daily readings
                        </li>
                        <li className="flex items-center">
                          <span className="text-catholic-green mr-2">✓</span>
                          Try the interactive Rosary
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-4 text-catholic-red">Features</h4>
                      <ul className="space-y-3">
                        <li className="flex items-center">
                          <span className="text-catholic-green mr-2">✓</span>
                          400+ Catholic prayers offline
                        </li>
                        <li className="flex items-center">
                          <span className="text-catholic-green mr-2">✓</span>
                          Complete liturgical calendar
                        </li>
                        <li className="flex items-center">
                          <span className="text-catholic-green mr-2">✓</span>
                          Saints database with feast days
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
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

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-6 mt-12">
          <div className="container mx-auto px-4 text-center">
            <p>© {new Date().getFullYear()} Catholic Prayer App. All prayers and readings offline.</p>
            <p className="text-gray-400 mt-2 text-sm">
              Database: <span className={dbInitialized ? 'text-green-400' : 'text-amber-400'}>
                {dbInitialized ? 'Loaded' : 'Offline'}
              </span> | Version 1.0.0
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
