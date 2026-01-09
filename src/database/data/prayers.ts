import { Prayer } from '../schema';

export const prayers: Prayer[] = [
  // Basic Prayers
  {
    id: 'our-father',
    title: 'Our Father (The Lord\'s Prayer)',
    text: `Our Father, who art in heaven,
hallowed be thy name;
thy kingdom come;
thy will be done on earth as it is in heaven.
Give us this day our daily bread;
and forgive us our trespasses
as we forgive those who trespass against us;
and lead us not into temptation,
but deliver us from evil. Amen.`,
    category: 'daily',
    language: 'English',
    length: 'short',
    tags: ['basic', 'essential', 'mass', 'rosary'],
    favorite: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'hail-mary',
    title: 'Hail Mary',
    text: `Hail Mary, full of grace,
the Lord is with thee.
Blessed art thou among women,
and blessed is the fruit of thy womb, Jesus.
Holy Mary, Mother of God,
pray for us sinners,
now and at the hour of our death. Amen.`,
    category: 'daily',
    language: 'English',
    length: 'short',
    tags: ['basic', 'essential', 'rosary', 'marian'],
    favorite: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'glory-be',
    title: 'Glory Be (Doxology)',
    text: `Glory be to the Father,
and to the Son,
and to the Holy Spirit.
As it was in the beginning,
is now, and ever shall be,
world without end. Amen.`,
    category: 'daily',
    language: 'English',
    length: 'short',
    tags: ['basic', 'trinity', 'mass', 'rosary'],
    favorite: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'apostles-creed',
    title: 'Apostles\' Creed',
    text: `I believe in God, the Father almighty,
Creator of heaven and earth,
and in Jesus Christ, his only Son, our Lord,
who was conceived by the Holy Spirit,
born of the Virgin Mary,
suffered under Pontius Pilate,
was crucified, died and was buried;
he descended into hell;
on the third day he rose again from the dead;
he ascended into heaven,
and is seated at the right hand of God the Father almighty;
from there he will come to judge the living and the dead.

I believe in the Holy Spirit,
the holy catholic Church,
the communion of saints,
the forgiveness of sins,
the resurrection of the body,
and life everlasting. Amen.`,
    category: 'daily',
    language: 'English',
    length: 'medium',
    tags: ['creed', 'belief', 'rosary', 'mass'],
    favorite: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'act-of-contrition',
    title: 'Act of Contrition',
    text: `O my God, I am heartily sorry for having offended Thee,
and I detest all my sins because of thy just punishments,
but most of all because they offend Thee, my God,
who art all good and deserving of all my love.
I firmly resolve, with the help of Thy grace,
to sin no more and to avoid the near occasion of sin. Amen.`,
    category: 'sacraments',
    language: 'English',
    length: 'medium',
    tags: ['confession', 'penance', 'contrition'],
    favorite: false,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'morning-offering',
    title: 'Morning Offering',
    text: `O Jesus, through the Immaculate Heart of Mary,
I offer you my prayers, works, joys, and sufferings of this day
for all the intentions of your Sacred Heart,
in union with the Holy Sacrifice of the Mass throughout the world,
for the salvation of souls, the reparation of sins,
the reunion of all Christians,
and in particular for the intentions of the Holy Father this month. Amen.`,
    category: 'morning',
    language: 'English',
    length: 'medium',
    tags: ['offering', 'consecration', 'daily'],
    favorite: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'evening-prayer',
    title: 'Evening Prayer',
    text: `Lord, thank you for the blessings of this day.
Forgive me for any wrong I have done.
Watch over me and my loved ones through the night.
May your angels protect us,
and may I wake refreshed to serve you tomorrow.
In Jesus' name. Amen.`,
    category: 'evening',
    language: 'English',
    length: 'short',
    tags: ['night', 'protection', 'thanksgiving'],
    favorite: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  }
];

// Helper function to get favorite prayers
export function getFavoritePrayers(): Prayer[] {
  return prayers.filter(prayer => prayer.favorite);
}

// Helper function to get prayers by category
export function getPrayersByCategory(category: string): Prayer[] {
  return prayers.filter(prayer => prayer.category === category);
}

// Helper function to get fallback prayers
export function getFallbackPrayers(): Prayer[] {
  return prayers;
}
