import Dexie, { type EntityTable } from 'dexie';
import { 
  Prayer, Reading, RosaryMystery, Saint, LiturgicalHour,
  PrayerCategory, LiturgicalSeason, RosaryMysteryType, LiturgicalHourType
} from './schema';

class CatholicPrayerDB extends Dexie {
  prayers!: EntityTable<Prayer, 'id'>;
  readings!: EntityTable<Reading, 'id'>;
  rosaryMysteries!: EntityTable<RosaryMystery, 'id'>;
  saints!: EntityTable<Saint, 'id'>;
  liturgicalHours!: EntityTable<LiturgicalHour, 'id'>;
  userFavorites!: EntityTable<{id: string, type: string, itemId: string, userId: string, createdAt: Date}, 'id'>;
  userNotes!: EntityTable<{id: string, type: string, itemId: string, userId: string, note: string, createdAt: Date}, 'id'>;
  appSettings!: EntityTable<{id: string, key: string, value: any, updatedAt: Date}, 'id'>;

  constructor() {
    super('CatholicPrayerDB');
    
    this.version(1).stores({
      prayers: '++id, category, language, length, favorite, createdAt',
      readings: '++id, date, weekday, season, feastRank',
      rosaryMysteries: '++id, mysteryType, number',
      saints: '++id, feastDay, name',
      liturgicalHours: '++id, hour, time',
      userFavorites: '++id, type, itemId, userId, createdAt',
      userNotes: '++id, type, itemId, userId, createdAt',
      appSettings: '++id, key, updatedAt'
    });
    
    this.version(2).stores({
      prayers: '++id, category, language, length, favorite, createdAt, [category+favorite]',
      readings: '++id, date, weekday, season, feastRank, [date+season]',
    }).upgrade(tx => {
      // Migration logic if needed
    });
  }
  
  // Helper methods
  async getPrayersByCategory(category: PrayerCategory): Promise<Prayer[]> {
    return await this.prayers
      .where('category')
      .equals(category)
      .sortBy('title');
  }
  
  async getFavoritePrayers(): Promise<Prayer[]> {
    return await this.prayers
      .where('favorite')
      .equals(1)
      .sortBy('title');
  }
  
  async getTodaysReading(dateStr: string = new Date().toISOString().split('T')[0]): Promise<Reading | undefined> {
    return await this.readings
      .where('date')
      .equals(dateStr)
      .first();
  }
  
  async getReadingsBySeason(season: LiturgicalSeason): Promise<Reading[]> {
    return await this.readings
      .where('season')
      .equals(season)
      .sortBy('date');
  }
  
  async getSaintByDate(dateStr: string): Promise<Saint | undefined> {
    const monthDay = dateStr.substring(5); // MM-DD
    return await this.saints
      .where('feastDay')
      .equals(monthDay)
      .first();
  }
  
  async getRosaryMysteries(type: RosaryMysteryType): Promise<RosaryMystery[]> {
    return await this.rosaryMysteries
      .where('mysteryType')
      .equals(type)
      .sortBy('number');
  }
  
  async searchPrayers(query: string): Promise<Prayer[]> {
    const lowerQuery = query.toLowerCase();
    const allPrayers = await this.prayers.toArray();
    return allPrayers.filter(prayer => 
      prayer.title.toLowerCase().includes(lowerQuery) ||
      prayer.text.toLowerCase().includes(lowerQuery) ||
      prayer.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  }
  
  async toggleFavorite(prayerId: string): Promise<void> {
    const prayer = await this.prayers.get(prayerId);
    if (prayer) {
      await this.prayers.update(prayerId, { 
        favorite: !prayer.favorite,
        updatedAt: new Date()
      });
    }
  }
  
  async addUserNote(type: string, itemId: string, note: string): Promise<void> {
    const userId = 'local-user'; // In real app, use actual user ID
    await this.userNotes.add({
      id: `${type}-${itemId}-${Date.now()}`,
      type,
      itemId,
      userId,
      note,
      createdAt: new Date()
    });
  }
  
  async getAppSetting(key: string): Promise<any> {
    const setting = await this.appSettings
      .where('key')
      .equals(key)
      .first();
    return setting?.value;
  }
  
  async setAppSetting(key: string, value: any): Promise<void> {
    await this.appSettings.put({
      id: key,
      key,
      value,
      updatedAt: new Date()
    });
  }
}

export const db = new CatholicPrayerDB();

// Initialize with default data
export async function initializeDatabase() {
  try {
    // Check if database is already initialized
    const isInitialized = await db.getAppSetting('initialized');
    
    if (!isInitialized) {
      console.log('Initializing database with default data...');
      
      // Import and add all default data
      const { defaultPrayers } = await import('./data/prayers');
      const { defaultReadings } = await import('./data/readings');
      const { defaultRosaryMysteries } = await import('./data/rosary');
      const { defaultSaints } = await import('./data/saints');
      const { defaultLiturgicalHours } = await import('./data/liturgicalHours');
      
      await db.transaction('rw', 
        db.prayers, db.readings, db.rosaryMysteries, db.saints, db.liturgicalHours,
        async () => {
          await db.prayers.bulkAdd(defaultPrayers);
          await db.readings.bulkAdd(defaultReadings);
          await db.rosaryMysteries.bulkAdd(defaultRosaryMysteries);
          await db.saints.bulkAdd(defaultSaints);
          await db.liturgicalHours.bulkAdd(defaultLiturgicalHours);
          
          await db.setAppSetting('initialized', true);
          await db.setAppSetting('lastUpdated', new Date().toISOString());
          await db.setAppSetting('version', '1.0.0');
        }
      );
      
      console.log('Database initialized successfully!');
    }
    
    return true;
  } catch (error) {
    console.error('Failed to initialize database:', error);
    return false;
  }
}

// Export helper hooks for React
export { useLiveQuery } from 'dexie-react-hooks';
