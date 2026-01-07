import { useState, useEffect } from 'react';
import { databaseService } from '../services/databaseService';
import type { Prayer } from '../database/schema';


const DatabaseStats: React.FC = () => {
  const [stats, setStats] = useState({
    totalPrayers: 0,
    totalReadings: 0,
    totalSaints: 0,
    favoritePrayers: 0,
    categories: {} as Record<string, number>,
    languages: {} as Record<string, number>,
    recentPrayers: [] as Prayer[]
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      
      // Get basic stats
      const basicStats = await databaseService.getStats();
      
      // Get all prayers for detailed analysis
      const prayers = await databaseService.getAllPrayers();
      
      // Analyze categories
      const categories: Record<string, number> = {};
      const languages: Record<string, number> = {};
      
      prayers.forEach(prayer => {
        // Count categories
        categories[prayer.category] = (categories[prayer.category] || 0) + 1;
        
        // Count languages
        languages[prayer.language] = (languages[prayer.language] || 0) + 1;
      });
      
      // Get recent prayers (last 5)
      const recentPrayers = prayers
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5);
      
      setStats({
        ...basicStats,
        categories,
        languages,
        recentPrayers
      });
      
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryDisplayName = (category: string): string => {
    const names: Record<string, string> = {
      'daily': 'Daily Prayers',
      'morning': 'Morning Prayers',
      'evening': 'Evening Prayers',
      'rosary': 'Rosary Prayers',
      'divine-mercy': 'Divine Mercy',
      'sacraments': 'Sacraments',
      'saints': 'Saints Prayers',
      'novenas': 'Novenas',
      'litanies': 'Litanies',
      'penitential': 'Penitential',
      'thanksgiving': 'Thanksgiving',
      'petition': 'Petition',
      'healing': 'Healing',
      'protection': 'Protection',
      'guidance': 'Guidance',
      'family': 'Family',
      'vocations': 'Vocations',
      'departed': 'Departed'
    };
    return names[category] || category;
  };

  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="stats-container">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading database statistics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="stats-container">
      <header className="stats-header">
        <h1>📊 Database Statistics</h1>
        <p className="subtitle">Overview of your offline prayer database</p>
      </header>

      {/* Summary Stats */}
      <div className="summary-stats">
        <div className="stat-card large">
          <span className="stat-number">{stats.totalPrayers}</span>
          <span className="stat-label">Total Prayers</span>
          <p className="stat-description">Available offline</p>
        </div>
        
        <div className="stat-card">
          <span className="stat-number">{stats.favoritePrayers}</span>
          <span className="stat-label">Favorites</span>
        </div>
        
        <div className="stat-card">
          <span className="stat-number">{stats.totalReadings}</span>
          <span className="stat-label">Daily Readings</span>
        </div>
        
        <div className="stat-card">
          <span className="stat-number">{stats.totalSaints}</span>
          <span className="stat-label">Saints</span>
        </div>
      </div>

      {/* Categories Distribution */}
      <div className="stats-section">
        <h2>📂 Prayer Categories</h2>
        <div className="categories-grid">
          {Object.entries(stats.categories)
            .sort(([, a], [, b]) => b - a)
            .map(([category, count]) => (
              <div key={category} className="category-item">
                <div className="category-header">
                  <h3>{getCategoryDisplayName(category)}</h3>
                  <span className="category-count">{count}</span>
                </div>
                <div className="category-bar">
                  <div 
                    className="category-fill"
                    style={{ 
                      width: `${(count / stats.totalPrayers) * 100}%`,
                      backgroundColor: getCategoryColor(category)
                    }}
                  ></div>
                </div>
                <p className="category-percentage">
                  {((count / stats.totalPrayers) * 100).toFixed(1)}%
                </p>
              </div>
            ))}
        </div>
      </div>

      {/* Languages Distribution */}
      <div className="stats-section">
        <h2>🌐 Languages</h2>
        <div className="languages-list">
          {Object.entries(stats.languages)
            .sort(([, a], [, b]) => b - a)
            .map(([language, count]) => (
              <div key={language} className="language-item">
                <span className="language-name">{language}</span>
                <div className="language-stats">
                  <span className="language-count">{count} prayers</span>
                  <span className="language-percentage">
                    {((count / stats.totalPrayers) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Recent Additions */}
      <div className="stats-section">
        <h2>🆕 Recently Added Prayers</h2>
        <div className="recent-prayers">
          {stats.recentPrayers.map(prayer => (
            <div key={prayer.id} className="recent-prayer">
              <div className="recent-prayer-header">
                <h3>{prayer.title}</h3>
                <span className="recent-date">Added {formatDate(prayer.createdAt)}</span>
              </div>
              <div className="recent-prayer-details">
                <span className="recent-category">{getCategoryDisplayName(prayer.category)}</span>
                <span className="recent-language">{prayer.language}</span>
                {prayer.favorite && <span className="recent-favorite">⭐ Favorite</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Database Info */}
      <div className="database-info-section">
        <h2>💾 Database Information</h2>
        <div className="info-cards">
          <div className="info-card">
            <h3>Storage Size</h3>
            <p className="info-value">
              ~{(stats.totalPrayers * 0.5).toFixed(1)} MB
            </p>
            <p className="info-description">
              Estimated local storage usage
            </p>
          </div>
          
          <div className="info-card">
            <h3>Last Updated</h3>
            <p className="info-value">
              {new Date().toLocaleDateString()}
            </p>
            <p className="info-description">
              Database last modified
            </p>
          </div>
          
          <div className="info-card">
            <h3>Categories</h3>
            <p className="info-value">
              {Object.keys(stats.categories).length}
            </p>
            <p className="info-description">
              Unique prayer categories
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="stats-actions">
        <button onClick={loadStats} className="refresh-btn">
          🔄 Refresh Statistics
        </button>
        <button className="export-btn" onClick={() => alert('Export feature coming soon!')}>
          📊 Export Statistics
        </button>
      </div>

      {/* Tips */}
      <div className="stats-tips">
        <h3>💡 Database Tips</h3>
        <ul>
          <li>All data is stored locally on your device</li>
          <li>No internet connection required after initial setup</li>
          <li>Regularly backup your favorites using Export feature</li>
          <li>The database updates automatically with app updates</li>
        </ul>
      </div>
    </div>
  );
};

// Helper function for category colors
const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    'daily': '#8B0000',
    'morning': '#FFD700',
    'evening': '#4A90E2',
    'rosary': '#2E8B57',
    'divine-mercy': '#FF6B6B',
    'sacraments': '#8A2BE2',
    'saints': '#FF9800',
    'novenas': '#9C27B0',
    'litanies': '#607D8B',
    'penitential': '#795548',
    'thanksgiving': '#4CAF50',
    'petition': '#2196F3',
    'healing': '#00BCD4',
    'protection': '#3F51B5',
    'guidance': '#009688',
    'family': '#E91E63',
    'vocations': '#673AB7',
    'departed': '#9E9E9E'
  };
  return colors[category] || '#666666';
};

export default DatabaseStats;
