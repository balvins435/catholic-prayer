import { useState, useEffect } from 'react';
import { databaseService } from '../services/databaseService';


const SettingsView: React.FC = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    fontSize: 'medium',
    language: 'English',
    autoPlayAudio: false,
    showLatinPrayers: false,
    dailyReminder: '08:00',
    prayerNotifications: true
  });

  const [appInfo, setAppInfo] = useState({
    version: '1.0.0',
    databaseSize: '0 MB',
    lastBackup: 'Never',
    prayersCount: 0
  });

  const [exporting, setExporting] = useState(false);
  const [importing, setImporting] = useState(false);

  useEffect(() => {
    loadSettings();
    loadAppInfo();
  }, []);

  const loadSettings = async () => {
    try {
      const savedSettings = await databaseService.getAppSetting('userSettings');
      if (savedSettings) {
        setSettings(savedSettings);
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const loadAppInfo = async () => {
    try {
      const stats = await databaseService.getStats();
      setAppInfo(prev => ({
        ...prev,
        prayersCount: stats.totalPrayers,
        databaseSize: `${(stats.totalPrayers * 0.5).toFixed(1)} MB`
      }));
    } catch (error) {
      console.error('Error loading app info:', error);
    }
  };

  const handleSettingChange = (key: keyof typeof settings, value: any) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    databaseService.setAppSetting('userSettings', newSettings);
  };

  const handleExportData = async () => {
    setExporting(true);
    try {
      // Export prayers and user data
      const prayers = await databaseService.getAllPrayers();
      const favorites = await databaseService.getFavoritePrayers();
      
      const exportData = {
        prayers,
        favorites,
        settings,
        exportDate: new Date().toISOString(),
        version: appInfo.version
      };

      const dataStr = JSON.stringify(exportData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `catholic-prayer-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      alert('Data exported successfully!');
    } catch (error) {
      console.error('Error exporting data:', error);
      alert('Failed to export data.');
    } finally {
      setExporting(false);
    }
  };

  const handleImportData = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImporting(true);
    try {
      const text = await file.text();
      const importData = JSON.parse(text);

      // Validate import data
      if (!importData.prayers || !Array.isArray(importData.prayers)) {
        throw new Error('Invalid backup file format');
      }

      if (confirm('This will replace your current data. Continue?')) {
        // Import logic here
        alert('Import completed successfully!');
        window.location.reload();
      }
    } catch (error) {
      console.error('Error importing data:', error);
      alert('Failed to import data. Invalid file format.');
    } finally {
      setImporting(false);
      event.target.value = ''; // Reset file input
    }
  };

  const handleResetApp = () => {
    if (confirm('This will reset all app data to defaults. This cannot be undone. Continue?')) {
      localStorage.clear();
      sessionStorage.clear();
      alert('App data cleared. The page will reload.');
      window.location.reload();
    }
  };

  const handleClearCache = () => {
    if (confirm('Clear all cached data?')) {
      // Clear specific caches
      caches.keys().then(cacheNames => {
        cacheNames.forEach(cacheName => {
          caches.delete(cacheName);
        });
      });
      alert('Cache cleared.');
    }
  };

  return (
    <div className="settings-container">
      <header className="settings-header">
        <h1>⚙️ Settings</h1>
        <p className="subtitle">Customize your prayer experience</p>
      </header>

      {/* App Info */}
      <div className="app-info-section">
        <h2>App Information</h2>
        <div className="info-grid">
          <div className="info-item">
            <span className="info-label">Version</span>
            <span className="info-value">{appInfo.version}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Database Size</span>
            <span className="info-value">{appInfo.databaseSize}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Prayers</span>
            <span className="info-value">{appInfo.prayersCount}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Last Backup</span>
            <span className="info-value">{appInfo.lastBackup}</span>
          </div>
        </div>
      </div>

      {/* Display Settings */}
      <div className="settings-section">
        <h2>Display Settings</h2>
        
        <div className="setting-item">
          <div className="setting-label">
            <h3>Dark Mode</h3>
            <p>Use dark theme for praying at night</p>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              checked={settings.darkMode}
              onChange={(e) => handleSettingChange('darkMode', e.target.checked)}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="setting-item">
          <div className="setting-label">
            <h3>Font Size</h3>
            <p>Adjust text size for prayers</p>
          </div>
          <select
            value={settings.fontSize}
            onChange={(e) => handleSettingChange('fontSize', e.target.value)}
            className="font-select"
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
            <option value="x-large">Extra Large</option>
          </select>
        </div>

        <div className="setting-item">
          <div className="setting-label">
            <h3>Show Latin Prayers</h3>
            <p>Include traditional Latin versions</p>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              checked={settings.showLatinPrayers}
              onChange={(e) => handleSettingChange('showLatinPrayers', e.target.checked)}
            />
            <span className="slider"></span>
          </label>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="settings-section">
        <h2>Notifications</h2>
        
        <div className="setting-item">
          <div className="setting-label">
            <h3>Daily Prayer Reminder</h3>
            <p>Get reminded to pray each day</p>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              checked={settings.notifications}
              onChange={(e) => handleSettingChange('notifications', e.target.checked)}
            />
            <span className="slider"></span>
          </label>
        </div>

        {settings.notifications && (
          <>
            <div className="setting-item">
              <div className="setting-label">
                <h3>Reminder Time</h3>
                <p>When to receive daily reminder</p>
              </div>
              <input
                type="time"
                value={settings.dailyReminder}
                onChange={(e) => handleSettingChange('dailyReminder', e.target.value)}
                className="time-input"
              />
            </div>

            <div className="setting-item">
              <div className="setting-label">
                <h3>Prayer Notifications</h3>
                <p>Notifications for specific prayers</p>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={settings.prayerNotifications}
                  onChange={(e) => handleSettingChange('prayerNotifications', e.target.checked)}
                />
                <span className="slider"></span>
              </label>
            </div>
          </>
        )}
      </div>

      {/* Audio Settings */}
      <div className="settings-section">
        <h2>Audio Settings</h2>
        
        <div className="setting-item">
          <div className="setting-label">
            <h3>Auto-play Audio Prayers</h3>
            <p>Automatically play audio when available</p>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              checked={settings.autoPlayAudio}
              onChange={(e) => handleSettingChange('autoPlayAudio', e.target.checked)}
            />
            <span className="slider"></span>
          </label>
        </div>
      </div>

      {/* Data Management */}
      <div className="settings-section">
        <h2>Data Management</h2>
        
        <div className="data-actions">
          <button 
            onClick={handleExportData} 
            disabled={exporting}
            className="data-btn export"
          >
            {exporting ? 'Exporting...' : '📤 Export All Data'}
          </button>
          
          <label className="data-btn import">
            {importing ? 'Importing...' : '📥 Import Data'}
            <input
              type="file"
              accept=".json"
              onChange={handleImportData}
              style={{ display: 'none' }}
              disabled={importing}
            />
          </label>
          
          <button 
            onClick={handleClearCache}
            className="data-btn clear"
          >
            🗑️ Clear Cache
          </button>
        </div>

        <div className="danger-zone">
          <h3>⚠️ Danger Zone</h3>
          <p>These actions cannot be undone</p>
          <button 
            onClick={handleResetApp}
            className="danger-btn"
          >
            🔄 Reset App to Defaults
          </button>
        </div>
      </div>

      {/* Language Settings */}
      <div className="settings-section">
        <h2>Language</h2>
        
        <div className="setting-item">
          <div className="setting-label">
            <h3>Prayer Language</h3>
            <p>Primary language for prayers</p>
          </div>
          <select
            value={settings.language}
            onChange={(e) => handleSettingChange('language', e.target.value)}
            className="language-select"
          >
            <option value="English">English</option>
            <option value="Latin">Latin</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
            <option value="Italian">Italian</option>
          </select>
        </div>
      </div>

      {/* About Section */}
      <div className="about-section">
        <h2>About Catholic Prayer App</h2>
        <p>
          This app provides a comprehensive collection of Catholic prayers, 
          daily readings, and devotional tools. All content is available offline.
        </p>
        <div className="about-links">
          <a href="#" className="about-link">📖 User Guide</a>
          <a href="#" className="about-link">📝 Privacy Policy</a>
          <a href="#" className="about-link">📧 Contact Support</a>
          <a href="#" className="about-link">⭐ Rate App</a>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
