import { Saint } from '../database/schema';

export const defaultSaints: Saint[] = [
  {
    id: 'mary-mother-god',
    name: 'Solemnity of Mary, Mother of God',
    feastDay: '01-01',
    description: 'The Blessed Virgin Mary is honored under this title for her role as the mother of Jesus Christ, the Son of God.',
    patronage: ['mothers', 'universal church'],
    prayer: 'Holy Mary, Mother of God, pray for us sinners...',
    image: 'mary.jpg'
  },
  {
    id: 'basil-gregory',
    name: 'Sts. Basil the Great and Gregory Nazianzen',
    feastDay: '01-02',
    description: 'Bishops and Doctors of the Church, known for their theological writings and defense of orthodoxy.',
    patronage: ['theologians', 'education'],
    prayer: 'O God, who were pleased to give light to your Church...',
    image: 'basil-gregory.jpg'
  },
  // Add all saints of the year...
];

export const saintsByMonth: Record<string, Saint[]> = {
  '01': defaultSaints.filter(s => s.feastDay.startsWith('01-')),
  // Add other months...
};
