import React, { useState, useEffect } from 'react';
import { databaseService } from '../services/databaseService';
import type { Prayer, PrayerCategory } from '../database/schema';
// import './PrayersView.css';

const PrayersView: React.FC = () => {
  const [prayers, setPrayers] = useState<Prayer[]>([]);
  const [filteredPrayers, setFilteredPrayers] = useState<Prayer[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<PrayerCategory | 'all'>('all');
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState<PrayerCategory[]>([
    'daily', 'morning', 'evening', 'rosary', 'divine-mercy',
    'sacraments', 'saints', 'novenas', 'litanies', 'thanksgiving'
  ]);

  useEffect(() => {
    loadPrayers();
  }, []);

  useEffect(() => {
    filterPrayers();
  }, [selectedCategory, searchQuery, prayers]);

  const loadPrayers = async () => {
    try {
      setLoading(true);
      const data = await databaseService.getAllPrayers();
      setPrayers(data);
      setFilteredPrayers(data);
    } catch (error) {
      console.error('Error loading prayers:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterPrayers = () => {
    let filtered = [...prayers];

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(prayer => prayer.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(prayer =>
        prayer.title.toLowerCase().includes(query) ||
        prayer.text.toLowerCase().includes(query) ||
        prayer.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    setFilteredPrayers(filtered);
  };

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      setLoading(true);
      try {
        const results = await databaseService.searchPrayers(searchQuery);
        setFilteredPrayers(results);
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setLoading(false);
      }
    } else {
      filterPrayers();
    }
  };

  const handleToggleFavorite = async (prayerId: string) => {
    await databaseService.toggleFavorite(prayerId);
    loadPrayers(); // Refresh list
  };

  const handleCopyPrayer = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Prayer copied to clipboard!');
  };

  const getCategoryDisplayName = (category: string): string => {
    const names: Record<string, string> = {
      'daily': 'Daily Prayers',
      'morning': 'Morning Prayers',
      'evening': 'Evening Prayers',
      'rosary': 'Holy Rosary',
      'divine-mercy': 'Divine Mercy',
      'sacraments': 'Sacraments',
      'saints': 'Saints Prayers',
      'novenas': 'Novenas',
      'litanies': 'Litanies',
      'thanksgiving': 'Thanksgiving'
    };
    return names[category] || category;
  };

  if (loading) {
    return (
      <div className="prayers-container">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading prayers from database...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="prayers-container">
      <header className="prayers-header">
        <h1>📿 Catholic Prayers Database</h1>
        <p className="subtitle">{prayers.length}+ traditional prayers available offline</p>
      </header>

      {/* Search and Filter */}
      <div className="controls-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search prayers by title, text, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button onClick={handleSearch} className="search-button">
            🔍 Search
          </button>
        </div>

        <div className="category-filter">
          <button
            className={`category-btn ${selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('all')}
          >
            All Prayers
          </button>
          {categories.map(category => (
            <button
              key={category}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {getCategoryDisplayName(category)}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="stats-bar">
        <div className="stat-item">
          <span className="stat-number">{prayers.length}</span>
          <span className="stat-label">Total Prayers</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">
            {prayers.filter(p => p.favorite).length}
          </span>
          <span className="stat-label">Favorites</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{filteredPrayers.length}</span>
          <span className="stat-label">Showing</span>
        </div>
      </div>

      {/* Prayers Grid */}
      <div className="prayers-grid">
        {filteredPrayers.length > 0 ? (
          filteredPrayers.map(prayer => (
            <div key={prayer.id} className="prayer-card">
              <div className="prayer-header">
                <div>
                  <h3>{prayer.title}</h3>
                  <span className="prayer-category">
                    {getCategoryDisplayName(prayer.category)}
                  </span>
                </div>
                <button
                  onClick={() => handleToggleFavorite(prayer.id)}
                  className={`favorite-btn ${prayer.favorite ? 'favorited' : ''}`}
                >
                  {prayer.favorite ? '★' : '☆'}
                </button>
              </div>
              
              <div className="prayer-content">
                <p className="prayer-text">{prayer.text}</p>
              </div>
              
              <div className="prayer-tags">
                {prayer.tags.map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
              
              <div className="prayer-footer">
                <div className="prayer-meta">
                  {prayer.language && (
                    <span className="language-tag">🌐 {prayer.language}</span>
                  )}
                  <span className="length-tag">📏 {prayer.length}</span>
                </div>
                
                <div className="prayer-actions">
                  <button 
                    onClick={() => handleCopyPrayer(prayer.text)}
                    className="action-btn copy"
                  >
                    📋 Copy
                  </button>
                  <button className="action-btn share">
                    📤 Share
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <p>No prayers found. Try a different search or category.</p>
            <button onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }} className="clear-filters">
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Database Info */}
      <div className="database-info">
        <h3>📦 Local Database</h3>
        <p>All prayers are stored locally on your device. No internet connection required.</p>
        <p className="info-note">
          Last updated: {new Date().toLocaleDateString()} | 
          Total: {prayers.length} prayers | 
          Storage: ~{(prayers.length * 0.5).toFixed(1)}MB
        </p>
      </div>
    </div>
  );
};

export default PrayersView;
