import { db, initializeDatabase } from '../database/db';
import type { 
  Prayer, Reading, RosaryMystery, Saint, LiturgicalHour,
  PrayerCategory, LiturgicalSeason, RosaryMysteryType, LiturgicalHourType
} from '../database/schema';

class DatabaseService {
  // Initialization
  async init() {
    return await initializeDatabase();
  }

  // Prayers
  async getAllPrayers(): Promise<Prayer[]> {
    return await db.prayers.toArray();
  }

  async getPrayersByCategory(category: PrayerCategory): Promise<Prayer[]> {
    return await db.getPrayersByCategory(category);
  }

  async getFavoritePrayers(): Promise<Prayer[]> {
    return await db.getFavoritePrayers();
  }

  async searchPrayers(query: string): Promise<Prayer[]> {
    return await db.searchPrayers(query);
  }

  async toggleFavorite(prayerId: string): Promise<void> {
    await db.toggleFavorite(prayerId);
  }

  async addCustomPrayer(prayer: Omit<Prayer, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const id = `custom-${Date.now()}`;
    await db.prayers.add({
      id,
      ...prayer,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return id;
  }

  // Readings
  async getTodaysReading(): Promise<Reading | undefined> {
    const today = new Date().toISOString().split('T')[0];
    return await db.getTodaysReading(today);
  }

  async getReadingByDate(date: string): Promise<Reading | undefined> {
    return await db.readings.where('date').equals(date).first();
  }

  async getReadingsBySeason(season: LiturgicalSeason): Promise<Reading[]> {
    return await db.getReadingsBySeason(season);
  }

  // Rosary
  async getRosaryMysteries(type: RosaryMysteryType): Promise<RosaryMystery[]> {
    return await db.getRosaryMysteries(type);
  }

  async getTodaysRosaryMystery(): Promise<RosaryMysteryType> {
    const day = new Date().getDay();
    const days = ['glorious', 'joyful', 'sorrowful', 'glorious', 'luminous', 'sorrowful', 'joyful'];
    return days[day] as RosaryMysteryType;
  }

  // Saints
  async getSaintByDate(date?: string): Promise<Saint | undefined> {
    const targetDate = date || new Date().toISOString().split('T')[0];
    return await db.getSaintByDate(targetDate);
  }

  async getSaintsByMonth(month: number): Promise<Saint[]> {
    const monthStr = month.toString().padStart(2, '0');
    return await db.saints
      .where('feastDay')
      .startsWith(monthStr)
      .toArray();
  }

  // Liturgical Hours
  async getLiturgicalHour(hour: LiturgicalHourType): Promise<LiturgicalHour | undefined> {
    return await db.liturgicalHours.where('hour').equals(hour).first();
  }

  async getCurrentLiturgicalHour(): Promise<LiturgicalHourType> {
    const hour = new Date().getHours();
    if (hour >= 21 || hour < 3) return 'compline';
    if (hour < 9) return 'lauds';
    if (hour < 12) return 'terce';
    if (hour < 15) return 'sext';
    if (hour < 18) return 'none';
    return 'vespers';
  }

  // User Data
  async addUserNote(type: string, itemId: string, note: string): Promise<void> {
    await db.addUserNote(type, itemId, note);
  }

  async getUserNotes(type: string, itemId: string): Promise<{note: string, createdAt: Date}[]> {
    return await db.userNotes
      .where('[type+itemId]')
      .equals([type, itemId])
      .sortBy('createdAt');
  }

  // App Settings
  async getAppSetting(key: string): Promise<any> {
    return await db.getAppSetting(key);
  }

  async setAppSetting(key: string, value: any): Promise<void> {
    await db.setAppSetting(key, value);
  }

  // Statistics
  async getStats(): Promise<{
    totalPrayers: number;
    totalReadings: number;
    totalSaints: number;
    favoritePrayers: number;
  }> {
    const [
      totalPrayers,
      totalReadings,
      totalSaints,
      favoritePrayers
    ] = await Promise.all([
      db.prayers.count(),
      db.readings.count(),
      db.saints.count(),
      db.prayers.where('favorite').equals(1).count()
    ]);

    return {
      totalPrayers,
      totalReadings,
      totalSaints,
      favoritePrayers
    };
  }
}

export const databaseService = new DatabaseService();
