import { LiturgicalHour } from '../schema';

export const defaultLiturgicalHours: LiturgicalHour[] = [
  {
    id: 'lauds',
    hour: 'lauds',
    title: 'Morning Prayer (Lauds)',
    time: 'Morning',
    prayers: ['Our Father', 'Hail Mary', 'Glory Be', 'Morning Offering'],
    psalms: [63, 67, 100],
    reading: 'Isaiah 60:1-3',
    canticle: 'Benedictus (Luke 1:68-79)'
  },
  {
    id: 'vespers',
    hour: 'vespers',
    title: 'Evening Prayer (Vespers)',
    time: 'Evening',
    prayers: ['Our Father', 'Hail Mary', 'Glory Be', 'Examination of Conscience'],
    psalms: [141, 142, 143],
    reading: 'Philippians 2:6-11',
    canticle: 'Magnificat (Luke 1:46-55)'
  },
  {
    id: 'compline',
    hour: 'compline',
    title: 'Night Prayer (Compline)',
    time: 'Night',
    prayers: ['Our Father', 'Hail Mary', 'Glory Be', 'Act of Contrition'],
    psalms: [4, 91, 134],
    reading: '1 Peter 5:8-9',
    canticle: 'Nunc Dimittis (Luke 2:29-32)'
  }
];
