import { GoogleGenerativeAI } from "@google/generative-ai";

// Use environment variable from Vite
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "your-api-key-here";

// Check if API key is set
if (!API_KEY || API_KEY === "your-api-key-here") {
  console.warn("⚠️ Please set your Gemini API key in .env file");
  console.info("Get one from: https://makersuite.google.com/app/apikey");
}

// Initialize Gemini with correct configuration
const genAI = new GoogleGenerativeAI(API_KEY);

// Use gemini-pro-vision or gemini-1.5-pro model (updated model names)
const model = genAI.getGenerativeModel({ 
  model: "gemini-1.5-pro-latest", // Updated model name
  generationConfig: {
    temperature: 0.7,
    topP: 0.8,
    topK: 40,
    maxOutputTokens: 2048,
  }
});

// Types
export interface PrayerRequest {
  prayerType: string;
  intention?: string;
  length?: "short" | "medium" | "long";
}

export interface ReadingRequest {
  date?: string;
  type: "first" | "second" | "gospel" | "psalm";
}

export interface DailyReading {
  date: string;
  firstReading: Reading;
  psalm: Reading;
  secondReading?: Reading;
  gospel: Reading;
  saint?: string;
}

export interface Reading {
  citation: string;
  text: string;
  title?: string;
  antiphon?: string;
}

export interface Prayer {
  id: string;
  title: string;
  text: string;
  category: string;
  language?: string;
  length?: "short" | "medium" | "long";
}

export interface PrayerCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
}

// Prayer categories
export const prayerCategories: PrayerCategory[] = [
  { id: "morning", name: "Morning Prayers", description: "Start your day with God", icon: "🌅" },
  { id: "evening", name: "Evening Prayers", description: "End your day in gratitude", icon: "🌙" },
  { id: "rosary", name: "Holy Rosary", description: "Meditate on the mysteries", icon: "📿" },
  { id: "divine-mercy", name: "Divine Mercy", description: "Chaplet and prayers", icon: "❤️" },
  { id: "liturgy-hours", name: "Liturgy of the Hours", description: "Prayers throughout the day", icon: "⛪" },
  { id: "saints", name: "Saints Prayers", description: "Intercessory prayers", icon: "🙏" },
  { id: "novenas", name: "Novenas", description: "Nine-day prayer devotions", icon: "9️⃣" },
  { id: "litanies", name: "Litanies", description: "Responsive prayer forms", icon: "📜" },
];

// ========== FALLBACK DATA (Use when API fails) ==========

export function getFallbackReadings(date?: string): DailyReading {
  const today = date || new Date().toISOString().split('T')[0];
  return {
    date: today,
    firstReading: {
      citation: "1 John 4:7-10",
      text: "Beloved, let us love one another, because love is of God; everyone who loves is begotten by God and knows God."
    },
    psalm: {
      citation: "Psalm 72:1-2, 3-4, 7-8",
      text: "Lord, every nation on earth will adore you.",
      antiphon: "Lord, every nation on earth will adore you."
    },
    gospel: {
      citation: "Mark 6:34-44",
      text: "When Jesus saw the vast crowd, his heart was moved with pity for them, for they were like sheep without a shepherd; and he began to teach them many things."
    },
    saint: "St. John Neumann - Bishop and missionary"
  };
}

export function getFallbackPrayers(): Prayer[] {
  return [
    {
      id: "our-father",
      title: "Our Father",
      text: "Our Father, who art in heaven, hallowed be thy name; thy kingdom come; thy will be done on earth as it is in heaven. Give us this day our daily bread; and forgive us our trespasses as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. Amen.",
      category: "basic",
      language: "English"
    },
    {
      id: "hail-mary",
      title: "Hail Mary",
      text: "Hail Mary, full of grace, the Lord is with thee; blessed art thou among women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.",
      category: "basic",
      language: "English"
    },
    {
      id: "glory-be",
      title: "Glory Be",
      text: "Glory be to the Father, and to the Son, and to the Holy Spirit. As it was in the beginning, is now, and ever shall be, world without end. Amen.",
      category: "basic",
      language: "English"
    },
    {
      id: "apostles-creed",
      title: "Apostles' Creed",
      text: "I believe in God, the Father almighty, Creator of heaven and earth, and in Jesus Christ, his only Son, our Lord, who was conceived by the Holy Spirit, born of the Virgin Mary, suffered under Pontius Pilate, was crucified, died and was buried; he descended into hell; on the third day he rose again from the dead; he ascended into heaven, and is seated at the right hand of God the Father almighty; from there he will come to judge the living and the dead. I believe in the Holy Spirit, the holy catholic Church, the communion of saints, the forgiveness of sins, the resurrection of the body, and life everlasting. Amen.",
      category: "creeds",
      language: "English"
    },
    {
      id: "morning-offering",
      title: "Morning Offering",
      text: "O Jesus, through the Immaculate Heart of Mary, I offer you my prayers, works, joys, and sufferings of this day for all the intentions of your Sacred Heart, in union with the Holy Sacrifice of the Mass throughout the world, for the salvation of souls, the reparation of sins, the reunion of all Christians, and in particular for the intentions of the Holy Father this month. Amen.",
      category: "morning",
      language: "English"
    },
    {
      id: "evening-prayer",
      title: "Evening Prayer",
      text: "Lord, thank you for the blessings of this day. Forgive me for any wrong I have done. Watch over me and my loved ones through the night. May your angels protect us, and may I wake refreshed to serve you tomorrow. Amen.",
      category: "evening",
      language: "English"
    }
  ];
}

// ========== API FUNCTIONS WITH FALLBACK ==========

// Check if API is available
export async function isApiAvailable(): Promise<boolean> {
  if (!API_KEY || API_KEY === "your-api-key-here") {
    return false;
  }
  
  try {
    // Try a simple request to check API availability
    const testResult = await model.generateContent("test");
    return testResult.response !== undefined;
  } catch (error) {
    console.warn("Gemini API not available, using fallback data:", error);
    return false;
  }
}

// Get daily readings
export async function getDailyReadings(date?: string): Promise<DailyReading> {
  const apiAvailable = await isApiAvailable();
  
  if (!apiAvailable) {
    console.log("Using fallback readings (API not available)");
    return getFallbackReadings(date);
  }

  try {
    const today = date || new Date().toISOString().split('T')[0];
    const prompt = `Provide the Catholic daily readings for ${today}. 
    Format as JSON with: date, firstReading{citation, text}, psalm{citation, text, antiphon}, 
    gospel{citation, text}, saint. Keep responses concise.`;
    
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    
    // Try to extract JSON
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    } catch (parseError) {
      console.log("Could not parse JSON, using text response:", text);
    }
    
    return getFallbackReadings(date);
  } catch (error) {
    console.error("Error getting readings:", error);
    return getFallbackReadings(date);
  }
}

// Alias for fetchDailyReadings
export const fetchDailyReadings = getDailyReadings;

// Fetch prayers (with fallback)
export async function fetchPrayers(category?: string): Promise<Prayer[]> {
  const apiAvailable = await isApiAvailable();
  
  if (!apiAvailable) {
    console.log("Using fallback prayers (API not available)");
    const prayers = getFallbackPrayers();
    if (category) {
      return prayers.filter(p => p.category === category);
    }
    return prayers;
  }

  try {
    const prompt = category 
      ? `List 3 Catholic prayers in the ${category} category with full text. Format as JSON array.`
      : `List 5 common Catholic prayers with full text. Format as JSON array.`;
    
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    
    try {
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    } catch (parseError) {
      console.log("Could not parse JSON, using fallback");
    }
    
    return getFallbackPrayers();
  } catch (error) {
    console.error("Error fetching prayers:", error);
    return getFallbackPrayers();
  }
}

// Get all prayers
export const getAllPrayers = fetchPrayers;

// Get prayers by category
export async function getPrayersByCategory(category: string): Promise<Prayer[]> {
  return fetchPrayers(category);
}

// Get prayer by ID
export async function getPrayerById(id: string): Promise<Prayer | null> {
  const prayers = await fetchPrayers();
  return prayers.find(prayer => prayer.id === id) || null;
}

// Generate custom prayer
export async function generateCustomPrayer(intention: string, style?: string): Promise<string> {
  const apiAvailable = await isApiAvailable();
  
  if (!apiAvailable) {
    return `Lord, we pray for ${intention}. Hear our prayer and grant us your grace. Amen.`;
  }

  try {
    const prompt = `Generate a Catholic prayer for: "${intention}". ${style ? `Style: ${style}` : ''}`;
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Error generating prayer:", error);
    return `Heavenly Father, we lift up ${intention} to you. Guide and protect us. Amen.`;
  }
}

// Get reading explanation
export async function getReadingExplanation(citation: string): Promise<string> {
  const apiAvailable = await isApiAvailable();
  
  if (!apiAvailable) {
    return `This reading from ${citation} invites us to reflect on God's word and apply it to our lives.`;
  }

  try {
    const prompt = `Briefly explain the Catholic meaning of ${citation} (2-3 sentences).`;
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Error getting explanation:", error);
    return `This passage from ${citation} teaches us about God's love and guidance.`;
  }
}

// Get saint of the day
export async function getSaintOfDay(date?: string): Promise<string> {
  const apiAvailable = await isApiAvailable();
  
  if (!apiAvailable) {
    return "Today the Church honors the saints who inspire our faith journey.";
  }

  try {
    const today = date || new Date().toLocaleDateString();
    const prompt = `Who is the Catholic saint for ${today}? Brief description only.`;
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Error getting saint:", error);
    return "The saints remind us to live holy lives.";
  }
}

// Search prayers
export async function searchPrayers(keyword: string): Promise<Prayer[]> {
  const prayers = await fetchPrayers();
  return prayers.filter(prayer => 
    prayer.title.toLowerCase().includes(keyword.toLowerCase()) ||
    prayer.text.toLowerCase().includes(keyword.toLowerCase())
  );
}

// Get favorite prayers
export function getFavoritePrayers(): Prayer[] {
  return getFallbackPrayers().slice(0, 3);
}

// Get prayer of the day
export async function getPrayerOfDay(): Promise<string> {
  const apiAvailable = await isApiAvailable();
  
  if (!apiAvailable) {
    return "Lord, grant us your peace and guide us through this day. Amen.";
  }

  try {
    const prompt = "Provide a traditional Catholic prayer for today.";
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Error getting prayer of day:", error);
    return "May God bless and keep us today. Amen.";
  }
}
