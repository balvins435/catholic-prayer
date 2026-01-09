import { catholicApiService } from './catholicApiService';
import type { 
  Prayer, DailyReading, Saint 
} from './catholicApiService';

// Import local prayers data
import { prayers, getPrayersByCategory, searchPrayers, getFavoritePrayers } from '../database/data/prayers';

class DatabaseService {
  private localPrayers: Prayer[] = prayers;
  private isInitialized = false;

  async init(): Promise<boolean> {
    try {
      this.isInitialized = true;
      console.log('Database service initialized with', this.localPrayers.length, 'prayers');
      
      // Load custom prayers and favorites
      await this.loadCustomPrayers();
      await this.loadFavorites();
      
      return true;
    } catch (error) {
      console.error('Failed to initialize database service:', error);
      return false;
    }
  }

  // ========== PRAYERS ==========

  async getAllPrayers(): Promise<Prayer[]> {
    return this.localPrayers;
  }

  async getPrayersByCategory(category: string): Promise<Prayer[]> {
    return getPrayersByCategory(category);
  }

  async getFavoritePrayers(): Promise<Prayer[]> {
    return getFavoritePrayers();
  }

  async searchPrayers(query: string): Promise<Prayer[]> {
    return searchPrayers(query);
  }

  async toggleFavorite(prayerId: string): Promise<void> {
    const prayer = this.localPrayers.find(p => p.id === prayerId);
    if (prayer) {
      prayer.favorite = !prayer.favorite;
      
      // Update localStorage for persistence
      const favorites = localStorage.getItem('prayer_favorites') || '{}';
      const favoritesObj = JSON.parse(favorites);
      favoritesObj[prayerId] = prayer.favorite;
      localStorage.setItem('prayer_favorites', JSON.stringify(favoritesObj));
    }
  }

  async addCustomPrayer(prayerData: Omit<Prayer, 'id' | 'favorite'>): Promise<string> {
    const id = `custom-${Date.now()}`;
    const newPrayer: Prayer = {
      id,
      ...prayerData,
      favorite: false
    };
    
    this.localPrayers.push(newPrayer);
    
    // Save to localStorage
    const customPrayers = localStorage.getItem('custom_prayers') || '[]';
    const customPrayersArray = JSON.parse(customPrayers);
    customPrayersArray.push(newPrayer);
    localStorage.setItem('custom_prayers', JSON.stringify(customPrayersArray));
    
    return id;
  }

  // ========== READINGS ==========

  async getTodaysReading(): Promise<DailyReading> {
    try {
      return await catholicApiService.getDailyReadings();
    } catch (error) {
      console.error('Error getting readings:', error);
      // Return fallback readings
      return {
        date: new Date().toISOString().split('T')[0],
        weekday: 'Sunday',
        season: 'Ordinary Time',
        color: 'green',
        firstReading: {
          citation: '1 John 4:7-10',
          text: 'Beloved, let us love one another, because love is of God; everyone who loves is begotten by God and knows God.',
          book: '1 John',
          chapter: 4,
          verses: '7-10'
        },
        psalm: {
          citation: 'Psalm 72:1-2, 3-4, 7-8',
          number: 72,
          text: 'Lord, every nation on earth will adore you.',
          antiphon: 'Lord, every nation on earth will adore you.'
        },
        gospel: {
          citation: 'Mark 6:34-44',
          text: 'When Jesus saw the vast crowd, his heart was moved with pity for them, for they were like sheep without a shepherd; and he began to teach them many things.',
          book: 'Mark',
          chapter: 6,
          verses: '34-44'
        },
        saint: 'St. John Neumann'
      };
    }
  }

  async getReadingByDate(date: string): Promise<DailyReading> {
    try {
      return await catholicApiService.getDailyReadings(date);
    } catch (error) {
      console.error('Error getting reading by date:', error);
      return await this.getTodaysReading();
    }
  }

  // ========== SAINTS ==========

  async getSaintByDate(date?: string): Promise<Saint> {
    try {
      const info = await catholicApiService.getTodaysInfo();
      return info.saint;
    } catch (error) {
      console.error('Error getting saint:', error);
      return {
        id: 'default-saint',
        name: 'All Saints',
        feastDay: new Date().toISOString().split('T')[0].substring(5),
        description: 'Today the Church celebrates all the saints who inspire our faith journey.',
        patronage: ['universal church', 'all believers'],
        prayer: 'Holy saints of God, pray for us that we may follow your example of holiness. Amen.'
      };
    }
  }

  async getSaintsByMonth(month: number): Promise<Saint[]> {
    // Simplified - return array with today's saint
    const saint = await this.getSaintByDate();
    return [saint];
  }

  // ========== LITURGICAL CALENDAR ==========

  async getLiturgicalCalendar(date?: string) {
    try {
      const info = await catholicApiService.getTodaysInfo();
      return info.calendar;
    } catch (error) {
      console.error('Error getting liturgical calendar:', error);
      return {
        date: new Date().toISOString().split('T')[0],
        season: 'Ordinary Time',
        seasonWeek: 1,
        weekday: 'Sunday',
        feast: '',
        feastType: 'weekday',
        color: 'green'
      };
    }
  }

  // ========== ROSARY ==========

  async getRosaryMysteries(mysteryType?: string): Promise<any[]> {
    const mysteries = {
      joyful: [
        {
          id: 'joyful-1',
          title: 'The Annunciation',
          scripture: 'Luke 1:26-38',
          reflection: 'The angel Gabriel announces to Mary that she will conceive the Son of God.',
          fruit: 'Humility',
          prayer: 'Hail Mary...'
        },
        {
          id: 'joyful-2',
          title: 'The Visitation',
          scripture: 'Luke 1:39-56',
          reflection: 'Mary visits her cousin Elizabeth, who recognizes her as the mother of the Lord.',
          fruit: 'Love of Neighbor',
          prayer: 'Hail Mary...'
        },
        {
          id: 'joyful-3',
          title: 'The Nativity',
          scripture: 'Luke 2:1-20',
          reflection: 'Jesus is born in Bethlehem and laid in a manger.',
          fruit: 'Poverty of Spirit',
          prayer: 'Hail Mary...'
        },
        {
          id: 'joyful-4',
          title: 'The Presentation',
          scripture: 'Luke 2:22-38',
          reflection: 'Mary and Joseph present Jesus in the Temple.',
          fruit: 'Obedience',
          prayer: 'Hail Mary...'
        },
        {
          id: 'joyful-5',
          title: 'The Finding in the Temple',
          scripture: 'Luke 2:41-52',
          reflection: 'The boy Jesus is found teaching in the Temple.',
          fruit: 'Joy in Finding Jesus',
          prayer: 'Hail Mary...'
        }
      ],
      sorrowful: [
        {
          id: 'sorrowful-1',
          title: 'The Agony in the Garden',
          scripture: 'Matthew 26:36-46',
          reflection: 'Jesus prays in the Garden of Gethsemane.',
          fruit: 'Sorrow for Sin',
          prayer: 'Hail Mary...'
        },
        {
          id: 'sorrowful-2',
          title: 'The Scourging at the Pillar',
          scripture: 'Matthew 27:26',
          reflection: 'Jesus is brutally whipped.',
          fruit: 'Purity',
          prayer: 'Hail Mary...'
        }
      ],
      glorious: [
        {
          id: 'glorious-1',
          title: 'The Resurrection',
          scripture: 'Matthew 28:1-10',
          reflection: 'Jesus rises from the dead.',
          fruit: 'Faith',
          prayer: 'Hail Mary...'
        }
      ],
      luminous: [
        {
          id: 'luminous-1',
          title: 'The Baptism of Jesus',
          scripture: 'Matthew 3:13-17',
          reflection: 'Jesus is baptized in the Jordan River.',
          fruit: 'Openness to the Holy Spirit',
          prayer: 'Hail Mary...'
        }
      ]
    };

    if (mysteryType && mysteries[mysteryType as keyof typeof mysteries]) {
      return mysteries[mysteryType as keyof typeof mysteries];
    }

    // Return today's mysteries based on day of week
    const day = new Date().getDay();
    const days = ['glorious', 'joyful', 'sorrowful', 'glorious', 'luminous', 'sorrowful', 'joyful'];
    const todaysMysteryType = days[day];
    
    return mysteries[todaysMysteryType as keyof typeof mysteries] || mysteries.joyful;
  }

  async getTodaysRosaryMystery(): Promise<string> {
    const day = new Date().getDay();
    const days = ['glorious', 'joyful', 'sorrowful', 'glorious', 'luminous', 'sorrowful', 'joyful'];
    return days[day];
  }

  // ========== STATISTICS ==========

  async getStats() {
    const categories = new Set(this.localPrayers.map(p => p.category));
    
    return {
      totalPrayers: this.localPrayers.length,
      totalReadings: 365,
      totalSaints: 50,
      favoritePrayers: this.localPrayers.filter(p => p.favorite).length,
      categories: Array.from(categories)
    };
  }

  // ========== APP SETTINGS ==========

  async getAppSetting(key: string): Promise<any> {
    try {
      const settings = localStorage.getItem('catholic_app_settings');
      if (settings) {
        const parsed = JSON.parse(settings);
        return parsed[key];
      }
    } catch (error) {
      console.error('Error getting app setting:', error);
    }
    return null;
  }

  async setAppSetting(key: string, value: any): Promise<void> {
    try {
      let settings = localStorage.getItem('catholic_app_settings');
      const current = settings ? JSON.parse(settings) : {};
      current[key] = value;
      localStorage.setItem('catholic_app_settings', JSON.stringify(current));
    } catch (error) {
      console.error('Error setting app setting:', error);
    }
  }

  // ========== UTILITY ==========

  async getTodaysInfo() {
    try {
      return await catholicApiService.getTodaysInfo();
    } catch (error) {
      console.error('Error getting today\'s info:', error);
      return {
        readings: await this.getTodaysReading(),
        saint: await this.getSaintByDate(),
        calendar: await this.getLiturgicalCalendar()
      };
    }
  }

  // ========== LOAD CUSTOM PRAYERS ==========

  private async loadCustomPrayers(): Promise<void> {
    try {
      if (typeof window !== 'undefined' && localStorage) {
        const customPrayers = localStorage.getItem('custom_prayers');
        if (customPrayers) {
          const parsed = JSON.parse(customPrayers);
          this.localPrayers = [...prayers, ...parsed];
        }
      }
    } catch (error) {
      console.error('Error loading custom prayers:', error);
    }
  }

  // ========== LOAD FAVORITES ==========

  private async loadFavorites(): Promise<void> {
    try {
      if (typeof window !== 'undefined' && localStorage) {
        const favorites = localStorage.getItem('prayer_favorites');
        if (favorites) {
          const favoritesObj = JSON.parse(favorites);
          this.localPrayers.forEach(prayer => {
            if (favoritesObj[prayer.id] !== undefined) {
              prayer.favorite = favoritesObj[prayer.id];
            }
          });
        }
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  }

  // ========== CLEANUP ==========

  async clearAllData(): Promise<void> {
    try {
      localStorage.removeItem('prayer_favorites');
      localStorage.removeItem('custom_prayers');
      localStorage.removeItem('catholic_app_settings');
      this.localPrayers = prayers;
      await this.init();
    } catch (error) {
      console.error('Error clearing data:', error);
    }
  }
}

export const databaseService = new DatabaseService();
