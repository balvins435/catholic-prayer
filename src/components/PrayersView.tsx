import { useState, useEffect } from 'react';
import { databaseService } from '../services/databaseService';
import type { Prayer, PrayerCategory } from '../database/schema';


const PrayersView: React.FC = () => {
  const [prayers, setPrayers] = useState<Prayer[]>([]);
  const [filteredPrayers, setFilteredPrayers] = useState<Prayer[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<PrayerCategory | 'all'>('all');
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categories] = useState<PrayerCategory[]>([
    'daily', 'morning', 'evening', 'rosary', 'divine-mercy',
    'sacraments', 'saints', 'novenas', 'litanies', 'thanksgiving',
    'healing', 'protection', 'guidance', 'family', 'vocations'
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
      'thanksgiving': 'Thanksgiving',
      'healing': 'Healing',
      'protection': 'Protection',
      'guidance': 'Guidance',
      'family': 'Family',
      'vocations': 'Vocations'
    };
    return names[category] || category;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="spinner h-12 w-12 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading prayers from database...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">📿 Catholic Prayers Database</h1>
        <p className="text-xl text-gray-600">{prayers.length}+ traditional prayers available offline</p>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Search prayers by title, text, or tags..."
            className="input-primary flex-grow"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button onClick={handleSearch} className="btn-primary whitespace-nowrap">
            �� Search Prayers
          </button>
        </div>

        {/* Category Filter */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Filter by Category:</h3>
          <div className="flex flex-wrap gap-2">
            <button
              className={`px-4 py-2 rounded-lg transition-all ${selectedCategory === 'all' 
                ? 'bg-catholic-red text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              onClick={() => setSelectedCategory('all')}
            >
              All Prayers
            </button>
            {categories.map(category => (
              <button
                key={category}
                className={`px-4 py-2 rounded-lg transition-all ${selectedCategory === category 
                  ? 'bg-catholic-red text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                onClick={() => setSelectedCategory(category)}
              >
                {getCategoryDisplayName(category)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="stat-card">
          <div className="stat-number">{prayers.length}</div>
          <div className="stat-label">Total Prayers</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{prayers.filter(p => p.favorite).length}</div>
          <div className="stat-label">Favorites</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{filteredPrayers.length}</div>
          <div className="stat-label">Showing</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{categories.length}</div>
          <div className="stat-label">Categories</div>
        </div>
      </div>

      {/* Prayers Grid */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Prayers ({filteredPrayers.length})</h2>
        
        {filteredPrayers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrayers.map(prayer => (
              <div key={prayer.id} className="card-catholic">
                {/* Prayer Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{prayer.title}</h3>
                    <span className="tag-category">
                      {getCategoryDisplayName(prayer.category)}
                    </span>
                  </div>
                  <button
                    onClick={() => handleToggleFavorite(prayer.id)}
                    className={`text-2xl ${prayer.favorite ? 'text-yellow-500' : 'text-gray-300'} hover:text-yellow-400`}
                  >
                    {prayer.favorite ? '★' : '☆'}
                  </button>
                </div>

                {/* Prayer Text Preview */}
                <div className="mb-4">
                  <p className="prayer-text line-clamp-4">
                    {prayer.text}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {prayer.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="tag bg-blue-100 text-blue-800">
                      {tag}
                    </span>
                  ))}
                  {prayer.tags.length > 3 && (
                    <span className="tag bg-gray-100 text-gray-600">
                      +{prayer.tags.length - 3} more
                    </span>
                  )}
                </div>

                {/* Metadata */}
                <div className="flex justify-between items-center mb-4">
                  <div className="flex gap-2">
                    {prayer.language && (
                      <span className="tag-language">🌐 {prayer.language}</span>
                    )}
                    <span className="tag bg-purple-100 text-purple-800">
                      📏 {prayer.length}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(prayer.createdAt).toLocaleDateString()}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button 
                    onClick={() => handleCopyPrayer(prayer.text)}
                    className="flex-1 btn-outline py-2"
                  >
                    📋 Copy
                  </button>
                  <button className="flex-1 btn-secondary py-2">
                    🙏 Pray Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl shadow">
            <div className="text-6xl mb-4">📖</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No prayers found</h3>
            <p className="text-gray-600 mb-6">Try a different search term or category</p>
            <button 
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="btn-primary"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Database Info */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">📦 Local Database</h3>
        <p className="text-gray-700 mb-4">
          All prayers are stored locally on your device. No internet connection required after initial setup.
          Your favorites and custom prayers are saved automatically.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
          <div className="flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            Total: {prayers.length} prayers
          </div>
          <div className="flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            Storage: ~{(prayers.length * 0.5).toFixed(1)}MB
          </div>
          <div className="flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            Last updated: {new Date().toLocaleDateString()}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-4 justify-center mb-12">
        <button onClick={loadPrayers} className="btn-outline">
          🔄 Refresh Prayers
        </button>
        <button className="btn-outline">
          ⭐ View Favorites ({prayers.filter(p => p.favorite).length})
        </button>
        <button className="btn-outline">
          🎲 Random Prayer
        </button>
        <button className="btn-primary">
          ✍️ Add Custom Prayer
        </button>
      </div>

      {/* Tips */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-8 border-l-4 border-amber-500">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">💡 Prayer Tips</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-catholic-green mr-2 mt-1">✓</span>
              <span>Find a quiet place to pray without distractions</span>
            </li>
            <li className="flex items-start">
              <span className="text-catholic-green mr-2 mt-1">✓</span>
              <span>Speak from your heart - God listens to sincere prayers</span>
            </li>
            <li className="flex items-start">
              <span className="text-catholic-green mr-2 mt-1">✓</span>
              <span>Pray regularly to strengthen your relationship with God</span>
            </li>
          </ul>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-catholic-green mr-2 mt-1">✓</span>
              <span>Use prayer as a way to reflect on your day</span>
            </li>
            <li className="flex items-start">
              <span className="text-catholic-green mr-2 mt-1">✓</span>
              <span>Share prayers with family and friends</span>
            </li>
            <li className="flex items-start">
              <span className="text-catholic-green mr-2 mt-1">✓</span>
              <span>Combine prayer with scripture reading for deeper reflection</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PrayersView;
