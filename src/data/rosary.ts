import { RosaryMystery, RosaryMysteryType } from '../database/schema';

export const defaultRosaryMysteries: RosaryMystery[] = [
  // Joyful Mysteries
  {
    id: 'joyful-1',
    mysteryType: 'joyful',
    number: 1,
    title: 'The Annunciation',
    scripture: 'Luke 1:26-38',
    reflection: 'The angel Gabriel announces to Mary that she will conceive the Son of God.',
    fruit: 'Humility',
    prayer: 'Hail Mary...'
  },
  {
    id: 'joyful-2',
    mysteryType: 'joyful',
    number: 2,
    title: 'The Visitation',
    scripture: 'Luke 1:39-56',
    reflection: 'Mary visits her cousin Elizabeth, who recognizes her as the mother of the Lord.',
    fruit: 'Love of Neighbor',
    prayer: 'Hail Mary...'
  },
  // Add all 20 mysteries...
];

export const rosaryStructure = {
  joyful: [1, 2, 3, 4, 5],
  sorrowful: [6, 7, 8, 9, 10],
  glorious: [11, 12, 13, 14, 15],
  luminous: [16, 17, 18, 19, 20]
};

export const daysOfWeekMysteries = {
  0: 'glorious', // Sunday
  1: 'joyful',   // Monday
  2: 'sorrowful',// Tuesday
  3: 'glorious', // Wednesday
  4: 'luminous', // Thursday
  5: 'sorrowful',// Friday
  6: 'joyful'    // Saturday
};
