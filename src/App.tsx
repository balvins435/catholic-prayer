import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { databaseService } from './services/databaseService';
import DailyReadingsView from './components/DailyReadingsView';
import PrayersView from './components/PrayersView';
import './styles/index.css';

function App() {
  const [dbInitialized, setDbInitialized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initDatabase = async () => {
      try {
        console.log('Initializing database...');
        const success = await databaseService.init();
        setDbInitialized(success);
        
        if (!success) {
          setError('Failed to initialize prayer database. Using basic mode.');
        }
      } catch (error) {
        console.error('Failed to initialize database:', error);
        setError('Error loading prayer database. Some features may be limited.');
      } finally {
        setLoading(false);
      }
    };

    initDatabase();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-catholic-red to-red-800 flex items-center justify-center">
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
        <nav className="bg-gradient-to-r from-catholic-red to-red-800 shadow-lg">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-3 mb-4 md:mb-0">
                <h1 className="text-2xl font-bold text-white flex items-center">
                  <span className="mr-2">📿</span>
                  Catholic Prayer App
                </h1>
                {!dbInitialized && (
                  <span className="bg-amber-500 text-white text-xs px-2 py-1 rounded">Basic Mode</span>
                )}
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/readings" className="nav-link">Daily Readings</Link>
                <Link to="/prayers" className="nav-link">Prayers</Link>
                <Link to="/rosary" className="nav-link">Rosary</Link>
                <Link to="/saints" className="nav-link">Saints</Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Error Alert */}
        {error && (
          <div className="container mx-auto px-4 pt-6">
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded">
              <div className="flex">
                <div className="flex-shrink-0">
                  <span className="text-amber-500">⚠️</span>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-amber-700">{error}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={
              <div>
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Welcome to Your Catholic Prayer App
                  </h2>
                  <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                    Your complete companion for prayer, devotion, and daily readings
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                  <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-catholic-red hover:shadow-xl transition-shadow">
                    <div className="text-4xl mb-4">📖</div>
                    <h3 className="text-xl font-bold mb-2">Daily Readings</h3>
                    <p className="text-gray-600 mb-4">Liturgical readings for each day</p>
                    <Link to="/readings" className="inline-block border-2 border-catholic-red text-catholic-red px-4 py-2 rounded-lg font-semibold hover:bg-catholic-red hover:text-white transition">
                      Explore →
                    </Link>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-catholic-green hover:shadow-xl transition-shadow">
                    <div className="text-4xl mb-4">📿</div>
                    <h3 className="text-xl font-bold mb-2">Catholic Prayers</h3>
                    <p className="text-gray-600 mb-4">Essential prayers for every occasion</p>
                    <Link to="/prayers" className="inline-block border-2 border-catholic-green text-catholic-green px-4 py-2 rounded-lg font-semibold hover:bg-catholic-green hover:text-white transition">
                      Browse →
                    </Link>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-amber-500 hover:shadow-xl transition-shadow">
                    <div className="text-4xl mb-4">🙏</div>
                    <h3 className="text-xl font-bold mb-2">Holy Rosary</h3>
                    <p className="text-gray-600 mb-4">Interactive rosary with mysteries</p>
                    <Link to="/rosary" className="inline-block border-2 border-amber-500 text-amber-600 px-4 py-2 rounded-lg font-semibold hover:bg-amber-500 hover:text-white transition">
                      Pray →
                    </Link>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-purple-500 hover:shadow-xl transition-shadow">
                    <div className="text-4xl mb-4">🧑‍🦳</div>
                    <h3 className="text-xl font-bold mb-2">Saints</h3>
                    <p className="text-gray-600 mb-4">Daily saints and their prayers</p>
                    <Link to="/saints" className="inline-block border-2 border-purple-500 text-purple-600 px-4 py-2 rounded-lg font-semibold hover:bg-purple-500 hover:text-white transition">
                      Discover →
                    </Link>
                  </div>
                </div>
                
                {!dbInitialized && (
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 mb-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">🔄 App Status</h3>
                    <p className="text-gray-700 mb-4">
                      The app is running in basic mode. All core features are available, but some advanced features may be limited.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <span className="text-green-500 mr-2">✓</span>
                        Basic prayers available
                      </div>
                      <div className="flex items-center">
                        <span className="text-green-500 mr-2">✓</span>
                        Daily readings working
                      </div>
                      <div className="flex items-center">
                        <span className="text-green-500 mr-2">✓</span>
                        Works offline
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">Quick Start Guide</h3>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-bold text-lg mb-4 text-catholic-red">Getting Started</h4>
                      <ul className="space-y-3">
                        <li className="flex items-center">
                          <span className="text-catholic-green mr-2">✓</span>
                          Start with the Our Father prayer
                        </li>
                        <li className="flex items-center">
                          <span className="text-catholic-green mr-2">✓</span>
                          Check today's readings
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
                          Essential Catholic prayers
                        </li>
                        <li className="flex items-center">
                          <span className="text-catholic-green mr-2">✓</span>
                          Daily liturgical readings
                        </li>
                        <li className="flex items-center">
                          <span className="text-catholic-green mr-2">✓</span>
                          Saints database
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            } />
            <Route path="/readings" element={<DailyReadingsView />} />
            <Route path="/prayers" element={<PrayersView />} />
            <Route path="/rosary" element={<div className="text-center py-12"><h2 className="text-3xl font-bold mb-4">Rosary - Coming Soon</h2><p className="text-gray-600">Interactive rosary feature will be available soon!</p></div>} />
            <Route path="/saints" element={<div className="text-center py-12"><h2 className="text-3xl font-bold mb-4">Saints - Coming Soon</h2><p className="text-gray-600">Saints database feature will be available soon!</p></div>} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-6 mt-12">
          <div className="container mx-auto px-4 text-center">
            <p>© {new Date().getFullYear()} Catholic Prayer App</p>
            <p className="text-gray-400 mt-2 text-sm">
              Status: <span className={dbInitialized ? 'text-green-400' : 'text-amber-400'}>
                {dbInitialized ? 'Full Mode' : 'Basic Mode'}
              </span>
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
