import React, { useState, useEffect } from 'react';
import { fetchDailyReadings, getReadingExplanation, DailyReading } from '../services/geminiService';


const DailyReadingsView: React.FC = () => {
  const [readings, setReadings] = useState<DailyReading | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [explanation, setExplanation] = useState<string>('');

  useEffect(() => {
    loadReadings();
  }, []);

  const loadReadings = async () => {
    try {
      setLoading(true);
      const data = await fetchDailyReadings();
      setReadings(data);
      setError(null);
    } catch (err) {
      setError('Failed to load daily readings. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGetExplanation = async (citation: string) => {
    try {
      const exp = await getReadingExplanation(citation);
      setExplanation(exp);
    } catch (err) {
      setExplanation('Could not load explanation at this time.');
    }
  };

  if (loading) {
    return (
      <div className="readings-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading today's readings...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="readings-container">
        <div className="error-message">
          <h3>⚠️ Error</h3>
          <p>{error}</p>
          <button onClick={loadReadings} className="retry-button">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="readings-container">
      <header className="readings-header">
        <h1>📖 Daily Catholic Readings</h1>
        <p className="date-display">
          {readings?.date ? new Date(readings.date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }) : 'Today'}
        </p>
      </header>

      {readings?.saint && (
        <div className="saint-section">
          <h2>🧑‍🦳 Saint of the Day</h2>
          <p>{readings.saint}</p>
        </div>
      )}

      <div className="reading-sections">
        <section className="reading-card">
          <h2>First Reading</h2>
          <p className="citation">{readings?.firstReading.citation}</p>
          <p className="reading-text">{readings?.firstReading.text}</p>
          <button 
            onClick={() => handleGetExplanation(readings?.firstReading.citation || '')}
            className="explain-button"
          >
            📖 Explanation
          </button>
        </section>

        <section className="reading-card">
          <h2>Responsorial Psalm</h2>
          <p className="citation">{readings?.psalm.citation}</p>
          {readings?.psalm.antiphon && (
            <p className="antiphon">Antiphon: "{readings.psalm.antiphon}"</p>
          )}
          <p className="reading-text">{readings?.psalm.text}</p>
        </section>

        {readings?.secondReading && (
          <section className="reading-card">
            <h2>Second Reading</h2>
            <p className="citation">{readings.secondReading.citation}</p>
            <p className="reading-text">{readings.secondReading.text}</p>
            <button 
              onClick={() => handleGetExplanation(readings.secondReading?.citation || '')}
              className="explain-button"
            >
              📖 Explanation
            </button>
          </section>
        )}

        <section className="reading-card gospel-card">
          <h2>✝️ Gospel Reading</h2>
          <p className="citation">{readings?.gospel.citation}</p>
          <p className="reading-text">{readings?.gospel.text}</p>
          <button 
            onClick={() => handleGetExplanation(readings?.gospel.citation || '')}
            className="explain-button"
          >
            📖 Gospel Reflection
          </button>
        </section>
      </div>

      {explanation && (
        <div className="explanation-section">
          <h3>📚 Explanation</h3>
          <p>{explanation}</p>
        </div>
      )}

      <div className="actions">
        <button onClick={loadReadings} className="refresh-button">
          🔄 Refresh Readings
        </button>
        <button className="share-button">
          �� Share
        </button>
      </div>
    </div>
  );
};

export default DailyReadingsView;
