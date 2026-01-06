import { Prayer } from '../schema';

export const defaultPrayers: Prayer[] = [
  // ========== DAILY PRAYERS ==========
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
    id: 'act-of-faith',
    title: 'Act of Faith',
    text: `O my God, I firmly believe that you are one God in three divine Persons,
Father, Son, and Holy Spirit.
I believe that your divine Son became man and died for our sins,
and that he will come to judge the living and the dead.
I believe these and all the truths which the Holy Catholic Church teaches,
because you have revealed them,
who can neither deceive nor be deceived. Amen.`,
    category: 'daily',
    language: 'English',
    length: 'medium',
    tags: ['faith', 'theological', 'virtues'],
    favorite: false,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },

  // ========== MORNING PRAYERS ==========
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
    id: 'prayer-to-holy-spirit-morning',
    title: 'Prayer to the Holy Spirit (Morning)',
    text: `Come, Holy Spirit, fill the hearts of your faithful
and kindle in them the fire of your love.
Send forth your Spirit and they shall be created,
and you shall renew the face of the earth.

O God, who by the light of the Holy Spirit
instructed the hearts of the faithful,
grant that by the same Holy Spirit
we may be truly wise and ever rejoice in his consolation.
Through Christ our Lord. Amen.`,
    category: 'morning',
    language: 'English',
    length: 'medium',
    tags: ['holy-spirit', 'wisdom', 'guidance'],
    favorite: false,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },

  // ========== EVENING PRAYERS ==========
  {
    id: 'evening-prayer-simple',
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
  },
  {
    id: 'examination-of-conscience',
    title: 'Examination of Conscience',
    text: `My God, I am heartily sorry for having offended you,
and I detest all my sins because of your just punishments,
but most of all because they offend you, my God,
who are all good and deserving of all my love.
I firmly resolve, with the help of your grace,
to sin no more and to avoid the near occasions of sin. Amen.`,
    category: 'evening',
    language: 'English',
    length: 'medium',
    tags: ['examination', 'contrition', 'repentance'],
    favorite: false,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },

  // ========== ROSARY PRAYERS ==========
  {
    id: 'hail-holy-queen',
    title: 'Hail Holy Queen (Salve Regina)',
    text: `Hail, holy Queen, Mother of mercy,
our life, our sweetness, and our hope.
To you do we cry, poor banished children of Eve.
To you do we send up our sighs,
mourning and weeping in this valley of tears.
Turn then, most gracious advocate,
your eyes of mercy toward us,
and after this, our exile,
show unto us the blessed fruit of your womb, Jesus.
O clement, O loving, O sweet Virgin Mary.

Pray for us, O holy Mother of God,
that we may be made worthy of the promises of Christ.`,
    category: 'rosary',
    language: 'English',
    length: 'medium',
    tags: ['marian', 'rosary', 'conclusion'],
    favorite: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'memorare',
    title: 'Memorare',
    text: `Remember, O most gracious Virgin Mary,
that never was it known that anyone who fled to your protection,
implored your help, or sought your intercession was left unaided.
Inspired by this confidence, I fly unto you,
O Virgin of virgins, my mother.
To you do I come, before you I stand, sinful and sorrowful.
O Mother of the Word Incarnate,
despise not my petitions,
but in your mercy hear and answer me. Amen.`,
    category: 'rosary',
    language: 'English',
    length: 'medium',
    tags: ['marian', 'intercession', 'urgent'],
    favorite: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },

  // ========== DIVINE MERCY ==========
  {
    id: 'divine-mercy-chaplet',
    title: 'Divine Mercy Chaplet',
    text: `Eternal Father, I offer you the Body and Blood,
Soul and Divinity of Your Dearly Beloved Son,
Our Lord, Jesus Christ,
in atonement for our sins and those of the whole world.

For the sake of His sorrowful Passion,
have mercy on us and on the whole world.

Holy God, Holy Mighty One, Holy Immortal One,
have mercy on us and on the whole world.`,
    category: 'divine-mercy',
    language: 'English',
    length: 'long',
    tags: ['mercy', 'chaplet', 'saint-faustina'],
    favorite: false,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },

  // ========== MASS PRAYERS ==========
  {
    id: 'act-of-spiritual-communion',
    title: 'Act of Spiritual Communion',
    text: `My Jesus, I believe that You are present in the Most Holy Sacrament.
I love You above all things, and I desire to receive You into my soul.
Since I cannot at this moment receive You sacramentally,
come at least spiritually into my heart.
I embrace You as if You were already there
and unite myself wholly to You.
Never permit me to be separated from You. Amen.`,
    category: 'eucharist',
    language: 'English',
    length: 'medium',
    tags: ['eucharist', 'communion', 'spiritual'],
    favorite: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },

  // ========== SACRAMENTAL PRAYERS ==========
  {
    id: 'act-of-contrition',
    title: 'Act of Contrition (Traditional)',
    text: `O my God, I am heartily sorry for having offended Thee,
and I detest all my sins because of thy just punishments,
but most of all because they offend Thee, my God,
who art all good and deserving of all my love.
I firmly resolve, with the help of Thy grace,
to sin no more and to avoid the near occasion of sin. Amen.`,
    category: 'sacraments',
    subcategory: 'confession',
    language: 'English',
    length: 'medium',
    tags: ['confession', 'penance', 'contrition'],
    favorite: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },

  // ========== SAINTS PRAYERS ==========
  {
    id: 'prayer-to-st-michael',
    title: 'Prayer to St. Michael the Archangel',
    text: `St. Michael the Archangel,
defend us in battle.
Be our protection against the wickedness and snares of the devil.
May God rebuke him, we humbly pray,
and do thou, O Prince of the heavenly hosts,
by the power of God, cast into hell Satan,
and all the evil spirits,
who prowl about the world seeking the ruin of souls. Amen.`,
    category: 'saints',
    language: 'English',
    length: 'short',
    tags: ['st-michael', 'protection', 'spiritual-warfare'],
    favorite: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'prayer-to-st-joseph',
    title: 'Prayer to St. Joseph',
    text: `O St. Joseph, whose protection is so great, so strong, so prompt before the throne of God,
I place in you all my interests and desires.
O St. Joseph, do assist me by your powerful intercession,
and obtain for me from your divine Son all spiritual blessings,
through Jesus Christ, our Lord.
So that, having engaged here below your heavenly power,
I may offer my thanksgiving and homage to the most loving of Fathers.

O St. Joseph, I never weary contemplating you, and Jesus asleep in your arms;
I dare not approach while He reposes near your heart.
Press Him in my name and kiss His fine head for me and ask Him to return the kiss when I draw my dying breath.
St. Joseph, Patron of departing souls, pray for me. Amen.`,
    category: 'saints',
    language: 'English',
    length: 'long',
    tags: ['st-joseph', 'patron', 'family'],
    favorite: false,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },

  // ========== NOVENAS ==========
  {
    id: 'novena-to-sacred-heart',
    title: 'Novena to the Sacred Heart of Jesus',
    text: `O most holy Heart of Jesus, fountain of every blessing,
I adore You, I love You, and with lively sorrow for my sins,
I offer You this poor heart of mine.
Make me humble, patient, pure and wholly obedient to Your will.
Grant, good Jesus, that I may live in You and for You.
Protect me in the midst of danger; comfort me in my afflictions;
give me health of body, assistance in my temporal needs,
Your blessing on all that I do, and the grace of a holy death.
Within Your Heart I place my every care.
In every need let me come to You with humble trust saying,
Heart of Jesus, help me. Amen.`,
    category: 'novenas',
    language: 'English',
    length: 'medium',
    tags: ['sacred-heart', 'novena', 'devotion'],
    favorite: false,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },

  // ========== LITANIES ==========
  {
    id: 'litany-humility',
    title: 'Litany of Humility',
    text: `O Jesus! meek and humble of heart, Hear me.
From the desire of being esteemed, Deliver me, Jesus.
From the desire of being loved, Deliver me, Jesus.
From the desire of being extolled, Deliver me, Jesus.
From the desire of being honored, Deliver me, Jesus.
From the desire of being praised, Deliver me, Jesus.
From the desire of being preferred to others, Deliver me, Jesus.
From the desire of being consulted, Deliver me, Jesus.
From the desire of being approved, Deliver me, Jesus.
From the fear of being humiliated, Deliver me, Jesus.
From the fear of being despised, Deliver me, Jesus.
From the fear of suffering rebukes, Deliver me, Jesus.
From the fear of being calumniated, Deliver me, Jesus.
From the fear of being forgotten, Deliver me, Jesus.
From the fear of being ridiculed, Deliver me, Jesus.
From the fear of being wronged, Deliver me, Jesus.
From the fear of being suspected, Deliver me, Jesus.

That others may be loved more than I, Jesus, grant me the grace to desire it.
That others may be esteemed more than I, Jesus, grant me the grace to desire it.
That, in the opinion of the world, others may increase and I may decrease, Jesus, grant me the grace to desire it.
That others may be chosen and I set aside, Jesus, grant me the grace to desire it.
That others may be praised and I unnoticed, Jesus, grant me the grace to desire it.
That others may be preferred to me in everything, Jesus, grant me the grace to desire it.
That others may become holier than I, provided that I may become as holy as I should, Jesus, grant me the grace to desire it.`,
    category: 'litanies',
    language: 'English',
    length: 'long',
    tags: ['humility', 'virtue', 'self-denial'],
    favorite: false,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },

  // ========== PENITENTIAL PRAYERS ==========
  {
    id: 'miserere',
    title: 'Miserere (Psalm 51)',
    text: `Have mercy on me, O God, in your goodness;
in the greatness of your compassion wipe out my offense.
Thoroughly wash me from my guilt
and of my sin cleanse me.

For I acknowledge my offense,
and my sin is before me always:
"Against you only have I sinned,
and done what is evil in your sight."

A clean heart create for me, O God,
and a steadfast spirit renew within me.
Cast me not out from your presence,
and your Holy Spirit take not from me.

Give me back the joy of your salvation,
and a willing spirit sustain in me.
O Lord, open my lips,
and my mouth shall proclaim your praise.`,
    category: 'penitential',
    language: 'English',
    length: 'medium',
    tags: ['penance', 'psalm', 'forgiveness'],
    favorite: false,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },

  // ========== THANKSGIVING PRAYERS ==========
  {
    id: 'prayer-of-thanksgiving',
    title: 'Prayer of Thanksgiving',
    text: `We give You thanks for all Your gifts, Almighty God,
living and reigning now and for ever. Amen.`,
    category: 'thanksgiving',
    language: 'English',
    length: 'short',
    tags: ['gratitude', 'thanks', 'blessings'],
    favorite: false,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },

  // ========== PETITION PRAYERS ==========
  {
    id: 'prayer-for-guidance',
    title: 'Prayer for Guidance',
    text: `O God, by whom the meek are guided in judgment,
and light rises up in darkness for the godly:
Grant us, in all our doubts and uncertainties,
the grace to ask what you would have us to do,
that the Spirit of wisdom may save us from all false choices,
and that in your light we may see light,
and in your straight path may not stumble;
through Jesus Christ our Lord. Amen.`,
    category: 'guidance',
    language: 'English',
    length: 'medium',
    tags: ['wisdom', 'direction', 'discernment'],
    favorite: false,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },

  // ========== HEALING PRAYERS ==========
  {
    id: 'prayer-for-healing',
    title: 'Prayer for Healing',
    text: `Lord, You are the Divine Physician,
the Healer of our souls and bodies.
I come before You today asking for Your healing touch.
Whatever illness or suffering I am experiencing,
I place it in Your hands.
Grant me patience in my suffering,
and if it be Your will, restore me to health.
But above all, grant me the grace to say,
"Your will be done."
May my suffering be united with Yours on the cross
for the salvation of souls. Amen.`,
    category: 'healing',
    language: 'English',
    length: 'medium',
    tags: ['health', 'sickness', 'suffering'],
    favorite: false,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },

  // ========== FAMILY PRAYERS ==========
  {
    id: 'family-prayer',
    title: 'Family Prayer',
    text: `Heavenly Father, we come before You as a family.
Bless each member of our family.
Keep us safe in Your love.
Help us to love and support one another,
to forgive each other's faults,
and to grow in holiness together.
May our home be a place of peace, joy, and faith.
We ask this through Christ our Lord. Amen.`,
    category: 'family',
    language: 'English',
    length: 'short',
    tags: ['home', 'parents', 'children'],
    favorite: false,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },

  // ========== VOCATIONS PRAYERS ==========
  {
    id: 'prayer-for-vocations',
    title: 'Prayer for Vocations',
    text: `O Holy Spirit, Spirit of wisdom and divine love,
impart Your knowledge, understanding, and counsel to the faithful
that they may know the vocation wherein they can best serve God.
Give them courage and strength to follow God's holy will.
Guide their uncertain steps, strengthen their resolutions,
and shield their chastity. Amen.`,
    category: 'vocations',
    language: 'English',
    length: 'medium',
    tags: ['calling', 'priesthood', 'religious-life'],
    favorite: false,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },

  // ========== DEPARTED PRAYERS ==========
  {
    id: 'eternal-rest',
    title: 'Eternal Rest (Requiem)',
    text: `Eternal rest grant unto them, O Lord,
and let perpetual light shine upon them.
May they rest in peace. Amen.`,
    category: 'departed',
    language: 'English',
    length: 'short',
    tags: ['funeral', 'souls', 'purgatory'],
    favorite: false,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },

  // ========== LATIN PRAYERS ==========
  {
    id: 'pater-noster',
    title: 'Pater Noster (Our Father in Latin)',
    text: `Pater noster, qui es in caelis,
sanctificetur nomen tuum.
Adveniat regnum tuum.
Fiat voluntas tua,
sicut in caelo et in terra.
Panem nostrum quotidianum da nobis hodie,
et dimitte nobis debita nostra,
sicut et nos dimittimus debitoribus nostris.
Et ne nos inducas in tentationem,
sed libera nos a malo. Amen.`,
    category: 'daily',
    language: 'Latin',
    length: 'short',
    tags: ['latin', 'traditional', 'mass'],
    favorite: false,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'ave-maria',
    title: 'Ave Maria (Hail Mary in Latin)',
    text: `Ave Maria, gratia plena,
Dominus tecum.
Benedicta tu in mulieribus,
et benedictus fructus ventris tui, Iesus.
Sancta Maria, Mater Dei,
ora pro nobis peccatoribus,
nunc et in hora mortis nostrae. Amen.`,
    category: 'daily',
    language: 'Latin',
    length: 'short',
    tags: ['latin', 'marian', 'rosary'],
    favorite: false,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  }
];

// Generate more prayers programmatically (total 400+)
export function generateAllPrayers(): Prayer[] {
  const allPrayers = [...defaultPrayers];
  
  // Add more categories and prayers here
  // You can expand this with actual Catholic prayer texts
  
  return allPrayers;
}
