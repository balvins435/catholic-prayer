import React, { useState, useEffect } from 'react';
import { 
  fetchPrayers, 
  prayerCategories, 
  Prayer, 
  PrayerCategory,
  generateCustomPrayer,
  searchPrayers
} from '../services/geminiService';


const PrayersView: React.FC = () => {
  const [prayers, setPrayers] = useState<Prayer[]>([]);
  const [filteredPrayers, setFilteredPrayers] = useState<Prayer[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [customIntention, setCustomIntention] = useState('');
  const [customPrayer, setCustomPrayer] = useState('');
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    loadPrayers();
  }, []);

  useEffect(() => {
    filterPrayers();
  }, [selectedCategory, searchQuery, prayers]);

  const loadPrayers = async () => {
    try {
      setLoading(true);
      const data = await fetchPrayers();
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
      filtered = filtered.filter(prayer => 
        prayer.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (searchQuery.trim()) {
      filtered = filtered.filter(prayer =>
        prayer.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prayer.text.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredPrayers(filtered);
  };

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      setLoading(true);
      try {
        const results = await searchPrayers(searchQuery);
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

  const handleGenerateCustomPrayer = async () => {
    if (!customIntention.trim()) return;
    
    setGenerating(true);
    try {
      const prayer = await generateCustomPrayer(customIntention);
      setCustomPrayer(prayer);
    } catch (error) {
      console.error('Error generating prayer:', error);
      setCustomPrayer('Lord, hear our prayer. Amen.');
    } finally {
      setGenerating(false);
    }
  };

  const handleCopyPrayer = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Prayer copied to clipboard!');
  };

  if (loading) {
    return (
      <div className="prayers-container">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading prayers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="prayers-container">
      <header className="prayers-header">
        <h1>📿 Catholic Prayers</h1>
        <p className="subtitle">Traditional and devotional prayers for every occasion</p>
      </header>

      {/* Search and Filter Section */}
      <div className="controls-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search prayers..."
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
          {prayerCategories.map(category => (
            <button
              key={category.id}
              className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.icon} {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Custom Prayer Generator */}
      <div className="custom-prayer-section">
        <h2>✍️ Create Custom Prayer</h2>
        <div className="custom-prayer-input">
          <textarea
            placeholder="Enter your prayer intention (e.g., for healing, gratitude, guidance)..."
            value={customIntention}
            onChange={(e) => setCustomIntention(e.target.value)}
            rows={3}
          />
          <button 
            onClick={handleGenerateCustomPrayer} 
            disabled={generating || !customIntention.trim()}
            className="generate-btn"
          >
            {generating ? 'Generating...' : 'Generate Prayer'}
          </button>
        </div>
        {customPrayer && (
          <div className="generated-prayer">
            <h3>Your Custom Prayer:</h3>
            <p className="prayer-text">{customPrayer}</p>
            <button 
              onClick={() => handleCopyPrayer(customPrayer)}
              className="copy-btn"
            >
              📋 Copy Prayer
            </button>
          </div>
        )}
      </div>

      {/* Prayers Grid */}
      <div className="prayers-grid">
        {filteredPrayers.length > 0 ? (
          filteredPrayers.map(prayer => (
            <div key={prayer.id} className="prayer-card">
              <div className="prayer-header">
                <h3>{prayer.title}</h3>
                <span className="prayer-category">{prayer.category}</span>
              </div>
              <div className="prayer-content">
                <p className="prayer-text">{prayer.text}</p>
              </div>
              <div className="prayer-actions">
                <button 
                  onClick={() => handleCopyPrayer(prayer.text)}
                  className="action-btn copy"
                >
                  📋 Copy
                </button>
                <button className="action-btn favorite">
                  ⭐ Favorite
                </button>
                <button className="action-btn share">
                  📤 Share
                </button>
              </div>
              {prayer.language && (
                <div className="prayer-footer">
                  <span className="language-tag">Language: {prayer.language}</span>
                  {prayer.length && (
                    <span className="length-tag">Length: {prayer.length}</span>
                  )}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="no-results">
            <p>No prayers found. Try a different search or category.</p>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <button onClick={loadPrayers} className="quick-btn refresh">
          🔄 Refresh Prayers
        </button>
        <button className="quick-btn favorites">
          ⭐ View Favorites
        </button>
        <button className="quick-btn random">
          🎲 Random Prayer
        </button>
      </div>

      {/* Prayer Tips */}
      <div className="prayer-tips">
        <h3>💡 Prayer Tips</h3>
        <ul>
          <li>Find a quiet place to pray</li>
          <li>Speak from your heart - God listens</li>
          <li>Pray regularly to strengthen your faith</li>
          <li>Share prayers with family and friends</li>
        </ul>
      </div>
    </div>
  );
};

export default PrayersView;
