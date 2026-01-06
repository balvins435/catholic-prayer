import { Reading, LiturgicalSeason, LiturgicalColor, FeastRank } from '../schema';
import { format, addDays } from 'date-fns';

export const defaultReadings: Reading[] = [
  // Sample readings for a week
  {
    id: '2024-01-01',
    date: '2024-01-01',
    weekday: 'Monday',
    season: 'christmas',
    color: 'white',
    feast: 'Solemnity of Mary, Mother of God',
    feastRank: 'solemnity',
    firstReading: {
      citation: 'Numbers 6:22-27',
      text: 'The Lord said to Moses: "Speak to Aaron and his sons and tell them: This is how you shall bless the Israelites. Say to them: The Lord bless you and keep you! The Lord let his face shine upon you, and be gracious to you! The Lord look upon you kindly and give you peace!"',
      book: 'Numbers',
      chapter: 6,
      verses: '22-27'
    },
    psalm: {
      citation: 'Psalm 67:2-3, 5, 6, 8',
      number: 67,
      text: 'May God bless us in his mercy.',
      antiphon: 'May God bless us in his mercy.'
    },
    gospel: {
      citation: 'Luke 2:16-21',
      text: 'The shepherds went in haste to Bethlehem and found Mary and Joseph, and the infant lying in the manger. When they saw this, they made known the message that had been told them about this child. All who heard it were amazed by what had been told them by the shepherds.',
      book: 'Luke',
      chapter: 2,
      verses: '16-21'
    },
    saint: 'Solemnity of Mary, Mother of God'
  },
  // Add more readings...
];

export function generateYearlyReadings(year: number = 2024): Reading[] {
  const readings: Reading[] = [];
  const startDate = new Date(year, 0, 1);
  
  // Generate readings for the whole year
  // This is a simplified version - in reality you'd need liturgical calendar data
  
  return [...defaultReadings, ...readings];
}
