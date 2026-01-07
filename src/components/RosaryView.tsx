import { useState, useEffect } from 'react';
import { databaseService } from '../services/databaseService';
import type { RosaryMystery, RosaryMysteryType } from '../database/schema';


const RosaryView: React.FC = () => {
  const [currentMysteryType, setCurrentMysteryType] = useState<RosaryMysteryType>('joyful');
  const [currentMysteryIndex, setCurrentMysteryIndex] = useState(0);
  const [currentBead, setCurrentBead] = useState(0);
  const [mysteries, setMysteries] = useState<RosaryMystery[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPraying, setIsPraying] = useState(false);
  const [prayerCount, setPrayerCount] = useState({
    ourFather: 0,
    hailMary: 0,
    gloryBe: 0
  });

  // Rosary structure: 5 decades, each with 1 Our Father, 10 Hail Marys, 1 Glory Be
  const rosaryStructure = [
    { type: 'cross', prayer: 'Sign of the Cross' },
    { type: 'apostles-creed', prayer: 'Apostles\' Creed' },
    { type: 'our-father', prayer: 'Our Father' },
    { type: 'hail-mary', prayer: 'Hail Mary' },
    { type: 'hail-mary', prayer: 'Hail Mary' },
    { type: 'hail-mary', prayer: 'Hail Mary' },
    { type: 'glory-be', prayer: 'Glory Be' },
    { type: 'fatima-prayer', prayer: 'Fatima Prayer' },
    // Decades...
  ];

  useEffect(() => {
    loadMysteries();
  }, [currentMysteryType]);

  useEffect(() => {
    // Set today's mysteries based on day of week
    const day = new Date().getDay();
    const days: RosaryMysteryType[] = ['glorious', 'joyful', 'sorrowful', 'glorious', 'luminous', 'sorrowful', 'joyful'];
    setCurrentMysteryType(days[day]);
  }, []);

  const loadMysteries = async () => {
    try {
      setLoading(true);
      const data = await databaseService.getRosaryMysteries(currentMysteryType);
      setMysteries(data);
    } catch (error) {
      console.error('Error loading mysteries:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNextBead = () => {
    if (currentBead < rosaryStructure.length - 1) {
      setCurrentBead(prev => prev + 1);
      
      // Update prayer counts
      const currentPrayer = rosaryStructure[currentBead + 1];
      if (currentPrayer.type === 'our-father') {
        setPrayerCount(prev => ({ ...prev, ourFather: prev.ourFather + 1 }));
      } else if (currentPrayer.type === 'hail-mary') {
        setPrayerCount(prev => ({ ...prev, hailMary: prev.hailMary + 1 }));
      } else if (currentPrayer.type === 'glory-be') {
        setPrayerCount(prev => ({ ...prev, gloryBe: prev.gloryBe + 1 }));
      }
    }
  };

  const handlePrevBead = () => {
    if (currentBead > 0) {
      setCurrentBead(prev => prev - 1);
    }
  };

  const handleNextMystery = () => {
    if (currentMysteryIndex < mysteries.length - 1) {
      setCurrentMysteryIndex(prev => prev + 1);
      setCurrentBead(0); // Reset to beginning of decade
    }
  };

  const handlePrevMystery = () => {
    if (currentMysteryIndex > 0) {
      setCurrentMysteryIndex(prev => prev - 1);
      setCurrentBead(0);
    }
  };

  const handleStartPraying = () => {
    setIsPraying(true);
    setCurrentBead(0);
    setCurrentMysteryIndex(0);
    setPrayerCount({ ourFather: 0, hailMary: 0, gloryBe: 0 });
  };

  const handleReset = () => {
    setIsPraying(false);
    setCurrentBead(0);
    setCurrentMysteryIndex(0);
    setPrayerCount({ ourFather: 0, hailMary: 0, gloryBe: 0 });
  };

  const getMysteryTypeName = (type: RosaryMysteryType): string => {
    const names = {
      joyful: 'Joyful Mysteries',
      sorrowful: 'Sorrowful Mysteries',
      glorious: 'Glorious Mysteries',
      luminous: 'Luminous Mysteries'
    };
    return names[type];
  };

  const getPrayerText = (prayerType: string): string => {
    const prayers: Record<string, string> = {
      'our-father': `Our Father, who art in heaven,
hallowed be thy name;
thy kingdom come;
thy will be done on earth as it is in heaven.
Give us this day our daily bread;
and forgive us our trespasses
as we forgive those who trespass against us;
and lead us not into temptation,
but deliver us from evil. Amen.`,
      'hail-mary': `Hail Mary, full of grace,
the Lord is with thee.
Blessed art thou among women,
and blessed is the fruit of thy womb, Jesus.
Holy Mary, Mother of God,
pray for us sinners,
now and at the hour of our death. Amen.`,
      'glory-be': `Glory be to the Father,
and to the Son,
and to the Holy Spirit.
As it was in the beginning,
is now, and ever shall be,
world without end. Amen.`,
      'apostles-creed': `I believe in God, the Father almighty,
Creator of heaven and earth...`,
      'fatima-prayer': `O my Jesus, forgive us our sins,
save us from the fires of hell,
lead all souls to Heaven,
especially those who are in most need of Thy mercy.`
    };
    return prayers[prayerType] || '';
  };

  if (loading) {
    return (
      <div className="rosary-container">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading Rosary mysteries...</p>
        </div>
      </div>
    );
  }

  const currentMystery = mysteries[currentMysteryIndex];
  const currentPrayer = rosaryStructure[currentBead];

  return (
    <div className="rosary-container">
      <header className="rosary-header">
        <h1>📿 Holy Rosary</h1>
        <p className="subtitle">Meditate on the mysteries of our salvation</p>
      </header>

      {/* Mystery Selection */}
      <div className="mystery-selection">
        <h2>Today: {getMysteryTypeName(currentMysteryType)}</h2>
        <div className="mystery-buttons">
          {(['joyful', 'sorrowful', 'glorious', 'luminous'] as RosaryMysteryType[]).map(type => (
            <button
              key={type}
              className={`mystery-btn ${currentMysteryType === type ? 'active' : ''}`}
              onClick={() => setCurrentMysteryType(type)}
            >
              {getMysteryTypeName(type)}
            </button>
          ))}
        </div>
      </div>

      {!isPraying ? (
        /* Start Screen */
        <div className="start-screen">
          <div className="instructions">
            <h3>How to Pray the Rosary</h3>
            <ol>
              <li>Make the Sign of the Cross</li>
              <li>Pray the Apostles' Creed</li>
              <li>Pray 1 Our Father</li>
              <li>Pray 3 Hail Marys</li>
              <li>Pray 1 Glory Be</li>
              <li>Announce the First Mystery</li>
              <li>Pray 1 Our Father</li>
              <li>Pray 10 Hail Marys</li>
              <li>Pray 1 Glory Be and Fatima Prayer</li>
              <li>Repeat for all 5 Mysteries</li>
            </ol>
          </div>
          
          <div className="mysteries-preview">
            <h3>{getMysteryTypeName(currentMysteryType)}</h3>
            <div className="mystery-list">
              {mysteries.map((mystery, index) => (
                <div key={mystery.id} className="mystery-preview">
                  <span className="mystery-number">{index + 1}</span>
                  <div className="mystery-details">
                    <h4>{mystery.title}</h4>
                    <p className="scripture">{mystery.scripture}</p>
                    <p className="fruit">Fruit: {mystery.fruit}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button onClick={handleStartPraying} className="start-btn">
            🙏 Start Praying the Rosary
          </button>
        </div>
      ) : (
        /* Prayer Screen */
        <div className="prayer-screen">
          <div className="prayer-progress">
            <div className="progress-info">
              <span className="progress-text">
                Mystery {currentMysteryIndex + 1} of {mysteries.length}
              </span>
              <span className="progress-text">
                Bead {currentBead + 1} of {rosaryStructure.length}
              </span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${((currentBead + 1) / rosaryStructure.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Current Mystery */}
          <div className="current-mystery">
            <h2>{currentMystery?.title}</h2>
            <p className="scripture">{currentMystery?.scripture}</p>
            <div className="mystery-reflection">
              <h4>Reflection:</h4>
              <p>{currentMystery?.reflection}</p>
              <p className="fruit">Fruit: {currentMystery?.fruit}</p>
            </div>
          </div>

          {/* Current Prayer */}
          <div className="current-prayer">
            <h3 className="prayer-title">{currentPrayer?.prayer}</h3>
            <div className="prayer-text-box">
              <pre>{getPrayerText(currentPrayer?.type)}</pre>
            </div>
          </div>

          {/* Prayer Counters */}
          <div className="prayer-counters">
            <div className="counter">
              <span className="counter-number">{prayerCount.ourFather}</span>
              <span className="counter-label">Our Father</span>
            </div>
            <div className="counter">
              <span className="counter-number">{prayerCount.hailMary}</span>
              <span className="counter-label">Hail Mary</span>
            </div>
            <div className="counter">
              <span className="counter-number">{prayerCount.gloryBe}</span>
              <span className="counter-label">Glory Be</span>
            </div>
          </div>

          {/* Controls */}
          <div className="prayer-controls">
            <button onClick={handlePrevBead} disabled={currentBead === 0} className="control-btn prev">
              ← Previous
            </button>
            
            <div className="main-controls">
              <button onClick={handlePrevMystery} disabled={currentMysteryIndex === 0} className="mystery-control">
                ← Previous Mystery
              </button>
              
              <button onClick={handleNextBead} className="next-btn">
                {currentBead < rosaryStructure.length - 1 ? 'Next Prayer →' : 'Finish Decade'}
              </button>
              
              <button onClick={handleNextMystery} disabled={currentMysteryIndex === mysteries.length - 1} className="mystery-control">
                Next Mystery →
              </button>
            </div>
            
            <button onClick={handleReset} className="control-btn reset">
              Reset Rosary
            </button>
          </div>

          {/* Completion Check */}
          {currentMysteryIndex === mysteries.length - 1 && currentBead === rosaryStructure.length - 1 && (
            <div className="completion-message">
              <h3>🎉 Rosary Complete!</h3>
              <p>You have completed the {getMysteryTypeName(currentMysteryType)}.</p>
              <p>Pray the Hail Holy Queen and concluding prayers.</p>
              <button onClick={handleReset} className="start-again-btn">
                Pray Again
              </button>
            </div>
          )}
        </div>
      )}

      {/* Help Section */}
      <div className="help-section">
        <h3>💡 Tips for Praying the Rosary</h3>
        <ul>
          <li>Find a quiet place to pray</li>
          <li>Hold your rosary beads as you pray</li>
          <li>Meditate on the mystery while praying</li>
          <li>Pray with family when possible</li>
          <li>Add your own intentions to each decade</li>
        </ul>
      </div>
    </div>
  );
};

export default RosaryView;
