import { useState, useEffect } from 'react';
import { databaseService } from '../services/databaseService';
import type { Saint } from '../database/schema';


const SaintsView: React.FC = () => {
  const [saints, setSaints] = useState<Saint[]>([]);
  const [filteredSaints, setFilteredSaints] = useState<Saint[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1);
  const [selectedSaint, setSelectedSaint] = useState<Saint | null>(null);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  useEffect(() => {
    loadSaints();
  }, []);

  useEffect(() => {
    if (selectedMonth) {
      filterSaintsByMonth(selectedMonth);
    }
  }, [selectedMonth, saints]);

  const loadSaints = async () => {
    try {
      setLoading(true);
      // Load saints for current month
      const currentMonth = new Date().getMonth() + 1;
      const data = await databaseService.getSaintsByMonth(currentMonth);
      setSaints(data);
      setFilteredSaints(data);
      setSelectedMonth(currentMonth);
    } catch (error) {
      console.error('Error loading saints:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterSaintsByMonth = async (month: number) => {
    try {
      const data = await databaseService.getSaintsByMonth(month);
      setFilteredSaints(data);
    } catch (error) {
      console.error('Error filtering saints:', error);
    }
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setFilteredSaints(saints);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = saints.filter(saint =>
      saint.name.toLowerCase().includes(query) ||
      saint.description.toLowerCase().includes(query) ||
      saint.patronage.some(patron => patron.toLowerCase().includes(query))
    );
    setFilteredSaints(filtered);
  };

  const handleSaintClick = (saint: Saint) => {
    setSelectedSaint(saint);
  };

  const handleCloseDetail = () => {
    setSelectedSaint(null);
  };

  const getTodaysSaint = async () => {
    const saint = await databaseService.getSaintByDate();
    if (saint) {
      setSelectedSaint(saint);
    }
  };

  const formatFeastDay = (feastDay: string): string => {
    const [month, day] = feastDay.split('-');
    return `${months[parseInt(month) - 1]} ${parseInt(day)}`;
  };

  if (loading) {
    return (
      <div className="saints-container">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading saints database...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="saints-container">
      <header className="saints-header">
        <h1>🧑‍🦳 Catholic Saints</h1>
        <p className="subtitle">Learn about the saints and ask for their intercession</p>
      </header>

      {/* Today's Saint */}
      <div className="todays-saint">
        <h2>Saint of the Day</h2>
        <div className="todays-saint-card">
          <p>Discover today's saint and their significance.</p>
          <button onClick={getTodaysSaint} className="todays-btn">
            🙏 Who is today's saint?
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="controls-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search saints by name, patronage, or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button onClick={handleSearch} className="search-button">
            🔍 Search
          </button>
        </div>

        <div className="month-filter">
          <h3>Browse by Month</h3>
          <div className="month-buttons">
            {months.map((month, index) => (
              <button
                key={month}
                className={`month-btn ${selectedMonth === index + 1 ? 'active' : ''}`}
                onClick={() => setSelectedMonth(index + 1)}
              >
                {month}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Saints Grid */}
      <div className="saints-grid">
        {filteredSaints.length > 0 ? (
          filteredSaints.map(saint => (
            <div 
              key={saint.id} 
              className="saint-card"
              onClick={() => handleSaintClick(saint)}
            >
              <div className="saint-header">
                <h3>{saint.name}</h3>
                <span className="feast-day">🎉 {formatFeastDay(saint.feastDay)}</span>
              </div>
              
              <div className="saint-content">
                <p className="saint-description">
                  {saint.description.length > 150 
                    ? saint.description.substring(0, 150) + '...' 
                    : saint.description}
                </p>
                
                <div className="saint-patronage">
                  <h4>Patronage:</h4>
                  <div className="patronage-tags">
                    {saint.patronage.slice(0, 3).map(patron => (
                      <span key={patron} className="patron-tag">{patron}</span>
                    ))}
                    {saint.patronage.length > 3 && (
                      <span className="patron-tag more">+{saint.patronage.length - 3} more</span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="saint-footer">
                <button className="view-details-btn">
                  View Details →
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <p>No saints found for {months[selectedMonth - 1]}. Try another month or search.</p>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="saints-stats">
        <div className="stat-card">
          <span className="stat-number">{saints.length}</span>
          <span className="stat-label">Saints in Database</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{months[selectedMonth - 1]}</span>
          <span className="stat-label">Current Month</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{filteredSaints.length}</span>
          <span className="stat-label">Showing</span>
        </div>
      </div>

      {/* Saint Detail Modal */}
      {selectedSaint && (
        <div className="saint-modal-overlay" onClick={handleCloseDetail}>
          <div className="saint-modal" onClick={e => e.stopPropagation()}>
            <button className="close-modal" onClick={handleCloseDetail}>×</button>
            
            <div className="saint-modal-header">
              <h2>{selectedSaint.name}</h2>
              <p className="feast-day-large">Feast Day: {formatFeastDay(selectedSaint.feastDay)}</p>
            </div>
            
            <div className="saint-modal-content">
              <div className="saint-description-full">
                <h3>About</h3>
                <p>{selectedSaint.description}</p>
              </div>
              
              <div className="saint-patronage-full">
                <h3>Patronage</h3>
                <div className="patronage-list">
                  {selectedSaint.patronage.map(patron => (
                    <span key={patron} className="patron-tag-large">{patron}</span>
                  ))}
                </div>
              </div>
              
              <div className="saint-prayer">
                <h3>Prayer to St. {selectedSaint.name.split(' ').pop()}</h3>
                <div className="prayer-text">
                  <pre>{selectedSaint.prayer}</pre>
                </div>
                <button className="copy-prayer-btn">
                  📋 Copy Prayer
                </button>
              </div>
            </div>
            
            <div className="saint-modal-footer">
              <button className="add-to-favorites">
                ⭐ Add to Favorites
              </button>
              <button className="share-saint">
                📤 Share
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Learning Section */}
      <div className="learning-section">
        <h3>📚 About Saints in Catholicism</h3>
        <div className="learning-cards">
          <div className="learning-card">
            <h4>What is a Saint?</h4>
            <p>Saints are men and women who lived holy lives and are now in Heaven. They are examples of Christian living and can intercede for us.</p>
          </div>
          <div className="learning-card">
            <h4>Why Pray to Saints?</h4>
            <p>We ask saints to pray for us, just as we ask friends on earth to pray for us. They are close to God and can bring our petitions to Him.</p>
          </div>
          <div className="learning-card">
            <h4>How Saints are Canonized</h4>
            <p>The Church carefully investigates a person's life, writings, and miracles before declaring them a saint through canonization.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaintsView;
