export interface Prayer {
  id: string;
  title: string;
  text: string;
  category: PrayerCategory;
  subcategory?: string;
  language: 'English' | 'Latin' | 'Spanish' | 'French' | 'Italian';
  length: 'short' | 'medium' | 'long';
  tags: string[];
  favorite?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Reading {
  id: string;
  date: string; // YYYY-MM-DD
  weekday: string;
  season: LiturgicalSeason;
  color: LiturgicalColor;
  feast?: string;
  feastRank?: FeastRank;
  firstReading: BibleReading;
  psalm: PsalmReading;
  secondReading?: BibleReading;
  gospel: BibleReading;
  saint?: string;
}

export interface BibleReading {
  citation: string;
  text: string;
  book: string;
  chapter: number;
  verses: string;
}

export interface PsalmReading {
  citation: string;
  number: number;
  text: string;
  antiphon: string;
  refrain?: string;
}

export interface RosaryMystery {
  id: string;
  mysteryType: RosaryMysteryType;
  number: number;
  title: string;
  scripture: string;
  reflection: string;
  fruit: string;
  prayer: string;
}

export interface Saint {
  id: string;
  name: string;
  feastDay: string; // MM-DD
  description: string;
  patronage: string[];
  prayer: string;
  image?: string;
}

export interface LiturgicalHour {
  id: string;
  hour: LiturgicalHourType;
  title: string;
  time: string;
  prayers: string[];
  psalms: number[];
  reading?: string;
  canticle?: string;
}

// Enums
export type PrayerCategory = 
  | 'daily' | 'morning' | 'evening' | 'night' 
  | 'rosary' | 'divine-mercy' | 'liturgy-hours'
  | 'sacraments' | 'mass' | 'eucharist'
  | 'saints' | 'novenas' | 'litanies'
  | 'penitential' | 'thanksgiving' | 'petition'
  | 'healing' | 'protection' | 'guidance'
  | 'family' | 'vocations' | 'departed';

export type LiturgicalSeason = 
  | 'advent' | 'christmas' | 'ordinary-time' 
  | 'lent' | 'holy-week' | 'easter' | 'pentecost';

export type LiturgicalColor = 
  | 'white' | 'green' | 'purple' | 'red' | 'rose' | 'gold';

export type FeastRank = 
  | 'solemnity' | 'feast' | 'memorial' | 'optional-memorial';

export type RosaryMysteryType = 
  | 'joyful' | 'sorrowful' | 'glorious' | 'luminous';

export type LiturgicalHourType = 
  | 'matins' | 'lauds' | 'prime' | 'terce' | 'sext' 
  | 'none' | 'vespers' | 'compline';

export type Month = 
  | 'january' | 'february' | 'march' | 'april' | 'may' | 'june'
  | 'july' | 'august' | 'september' | 'october' | 'november' | 'december';
