import axios from 'axios';
import { format, parseISO } from 'date-fns';

// Types
export interface DailyReading {
  date: string;
  weekday: string;
  season: string;
  color: string;
  feast?: string;
  feastRank?: string;
  firstReading: {
    citation: string;
    text: string;
    book: string;
    chapter: number;
    verses: string;
  };
  psalm: {
    citation: string;
    number: number;
    text: string;
    antiphon: string;
    refrain?: string;
  };
  secondReading?: {
    citation: string;
    text: string;
    book: string;
    chapter: number;
    verses: string;
  };
  gospel: {
    citation: string;
    text: string;
    book: string;
    chapter: number;
    verses: string;
  };
  saint?: string;
}

export interface Saint {
  id: string;
  name: string;
  feastDay: string;
  description: string;
  patronage: string[];
  prayer: string;
  image?: string;
}

export interface Prayer {
  id: string;
  title: string;
  text: string;
  category: string;
  language: string;
  length: 'short' | 'medium' | 'long';
  tags: string[];
  favorite?: boolean;
}

export interface LiturgicalCalendar {
  date: string;
  season: string;
  seasonWeek: number;
  weekday: string;
  feast: string;
  feastType: string;
  color: string;
}

// Free Catholic APIs that don't require keys
class CatholicApiService {
  private readonly BIBLE_API = 'https://bible-api.com';
  private readonly UNIVERSALIS_CORS_PROXY = 'https://api.allorigins.win/raw?url=';
  
  // Cache for API responses
  private cache: Map<string, any> = new Map();

  constructor() {
    // Clear cache after 1 hour
    setInterval(() => {
      this.cache.clear();
    }, 60 * 60 * 1000);
  }

  // ========== BIBLE READINGS ==========

  async getBibleVerse(reference: string): Promise<string> {
    const cacheKey = `bible_${reference}`;
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      const response = await axios.get(`${this.BIBLE_API}/${reference}`, {
        timeout: 5000
      });
      
      const text = response.data.text || response.data.verses?.[0]?.text || '';
      this.cache.set(cacheKey, text);
      return text;
    } catch (error) {
      console.error('Error fetching Bible verse:', error);
      return `Reading from ${reference}`;
    }
  }

  // ========== DAILY READINGS ==========

  async getDailyReadings(date?: string): Promise<DailyReading> {
    const targetDate = date || format(new Date(), 'yyyy-MM-dd');
    const cacheKey = `readings_${targetDate}`;

    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      // Get readings based on date (simplified logic)
      const readings = await this.generateDailyReadings(targetDate);
      this.cache.set(cacheKey, readings);
      return readings;
    } catch (error) {
      console.error('Error generating readings:', error);
      return this.getFallbackReadings(targetDate);
    }
  }

  private async generateDailyReadings(date: string): Promise<DailyReading> {
    const currentDate = parseISO(date);
    const weekday = format(currentDate, 'EEEE');
    
    // Simple algorithm to rotate through readings
    // In a real app, you'd use a proper liturgical calendar
    const dayOfYear = currentDate.getDay();
    
    const readingsList = [
      {
        firstReading: { citation: 'Isaiah 40:1-5', book: 'Isaiah', chapter: 40, verses: '1-5' },
        psalm: { citation: 'Psalm 85', number: 85, antiphon: 'Lord, let us see your kindness.' },
        gospel: { citation: 'John 1:19-28', book: 'John', chapter: 1, verses: '19-28' }
      },
      {
        firstReading: { citation: '1 John 4:7-10', book: '1 John', chapter: 4, verses: '7-10' },
        psalm: { citation: 'Psalm 72:1-2, 3-4, 7-8', number: 72, antiphon: 'Lord, every nation on earth will adore you.' },
        gospel: { citation: 'Mark 6:34-44', book: 'Mark', chapter: 6, verses: '34-44' }
      },
      {
        firstReading: { citation: 'Genesis 1:1-19', book: 'Genesis', chapter: 1, verses: '1-19' },
        psalm: { citation: 'Psalm 104', number: 104, antiphon: 'Lord, send out your Spirit.' },
        gospel: { citation: 'Matthew 5:1-12', book: 'Matthew', chapter: 5, verses: '1-12' }
      }
    ];

    const selected = readingsList[dayOfYear % readingsList.length];
    
    // Fetch actual text from Bible API
    const [firstReadingText, psalmText, gospelText] = await Promise.all([
      this.getBibleVerse(selected.firstReading.citation),
      this.getBibleVerse(`Psalm ${selected.psalm.number}:1-10`),
      this.getBibleVerse(selected.gospel.citation)
    ]);

    return {
      date,
      weekday,
      season: this.getSeason(currentDate),
      color: this.getSeasonColor(currentDate),
      firstReading: {
        ...selected.firstReading,
        text: firstReadingText
      },
      psalm: {
        ...selected.psalm,
        text: psalmText
      },
      gospel: {
        ...selected.gospel,
        text: gospelText
      },
      saint: await this.getSaintName(date)
    };
  }

  // ========== LITURGICAL CALENDAR ==========

  private getSeason(date: Date): string {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    
    if ((month === 12 && day >= 25) || (month === 1 && day <= 6)) return 'Christmas';
    if (month === 12 && day >= 1 && day <= 24) return 'Advent';
    if (month === 1 && day >= 7) return 'Ordinary Time';
    if (month >= 2 && month <= 3) {
      // Simplified Lent calculation
      const easter = this.calculateEaster(date.getFullYear());
      const ashWednesday = new Date(easter);
      ashWednesday.setDate(easter.getDate() - 46);
      
      if (date >= ashWednesday && date < easter) return 'Lent';
    }
    if (month >= 4 && month <= 5) {
      const easter = this.calculateEaster(date.getFullYear());
      const pentecost = new Date(easter);
      pentecost.setDate(easter.getDate() + 49);
      
      if (date >= easter && date < pentecost) return 'Easter';
    }
    
    return 'Ordinary Time';
  }

  private getSeasonColor(date: Date): string {
    const season = this.getSeason(date);
    
    const colors: Record<string, string> = {
      'Advent': 'purple',
      'Christmas': 'white',
      'Lent': 'purple',
      'Easter': 'white',
      'Ordinary Time': 'green'
    };
    
    return colors[season] || 'green';
  }

  private calculateEaster(year: number): Date {
    // Simplified Easter calculation (Gauss algorithm)
    const a = year % 19;
    const b = Math.floor(year / 100);
    const c = year % 100;
    const d = Math.floor(b / 4);
    const e = b % 4;
    const f = Math.floor((b + 8) / 25);
    const g = Math.floor((b - f + 1) / 3);
    const h = (19 * a + b - d - g + 15) % 30;
    const i = Math.floor(c / 4);
    const k = c % 4;
    const l = (32 + 2 * e + 2 * i - h - k) % 7;
    const m = Math.floor((a + 11 * h + 22 * l) / 451);
    const month = Math.floor((h + l - 7 * m + 114) / 31);
    const day = ((h + l - 7 * m + 114) % 31) + 1;
    
    return new Date(year, month - 1, day);
  }

  // ========== SAINTS ==========

  private async getSaintName(date: string): Promise<string> {
    const saintsByDate: Record<string, string> = {
      '01-01': 'Mary, Mother of God',
      '01-02': 'Saints Basil the Great and Gregory Nazianzen',
      '01-03': 'Most Holy Name of Jesus',
      '01-04': 'Saint Elizabeth Ann Seton',
      '01-05': 'Saint John Neumann',
      '01-06': 'Saint André Bessette',
      '01-07': 'Saint Raymond of Peñafort',
      // Add more saints...
    };

    const monthDay = format(parseISO(date), 'MM-dd');
    return saintsByDate[monthDay] || 'Saint of the Day';
  }

  // ========== FALLBACK DATA ==========

  private getFallbackReadings(date: string): DailyReading {
    return {
      date,
      weekday: format(parseISO(date), 'EEEE'),
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

  // ========== PUBLIC METHODS ==========

  async getTodaysInfo() {
    const date = format(new Date(), 'yyyy-MM-dd');
    const readings = await this.getDailyReadings(date);
    const saintName = await this.getSaintName(date);
    
    return {
      readings,
      saint: {
        id: `saint-${date}`,
        name: saintName,
        feastDay: format(new Date(), 'MM-dd'),
        description: `Today we celebrate ${saintName}, who inspires us in our faith journey.`,
        patronage: ['universal church'],
        prayer: `Holy ${saintName}, pray for us that we may follow your example of holiness. Amen.`
      },
      calendar: {
        date,
        season: this.getSeason(new Date()),
        seasonWeek: 1,
        weekday: format(new Date(), 'EEEE'),
        feast: saintName,
        feastType: 'memorial',
        color: this.getSeasonColor(new Date())
      }
    };
  }

  clearCache(): void {
    this.cache.clear();
  }
}

export const catholicApiService = new CatholicApiService();
