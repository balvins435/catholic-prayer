
import { GoogleGenAI, Type, GenerateContentResponse } from '@google/genai';
// FIX: Use a relative path to import from the parent directory.
import { Prayer, DailyReadings } from '../types.ts';

const API_KEY = (window as any).process.env.API_KEY;

if (!API_KEY || API_KEY === "YOUR_GEMINI_API_KEY_HERE") {
  // Don't throw an error, as it crashes the app. The UI will show an error state.
  console.error("API_KEY environment variable not set in index.html.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY, vertexai: true });

const PRAYER_SCHEMA = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      title: { type: Type.STRING, description: "The title of the prayer." },
      category: { type: Type.STRING, description: "The category of the prayer (e.g., Basic Prayers, Marian Prayers, Prayers to Saints)." },
      text: { type: Type.STRING, description: "The full text of the prayer." },
    },
    required: ["title", "category", "text"],
  },
};

const DAILY_READINGS_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    date: { type: Type.STRING, description: "The date of the readings in 'Month Day, Year' format." },
    feast: { type: Type.STRING, description: "The feast or liturgical day (e.g., 'Tuesday of the Thirteenth Week in Ordinary Time')." },
    firstReading: {
      type: Type.OBJECT,
      properties: {
        citation: { type: Type.STRING, description: "The biblical citation (e.g., 'Genesis 19:15-29')." },
        text: { type: Type.STRING, description: "The full text of the first reading." },
      },
      required: ["citation", "text"],
    },
    responsorialPsalm: {
      type: Type.OBJECT,
      properties: {
        citation: { type: Type.STRING, description: "The psalm citation (e.g., 'Psalm 26:2-3, 9-12')." },
        text: { type: Type.STRING, description: "The full text of the responsorial psalm, including responses." },
      },
      required: ["citation", "text"],
    },
    secondReading: {
      type: Type.OBJECT,
      nullable: true,
      properties: {
        citation: { type: Type.STRING, description: "The biblical citation for the second reading." },
        text: { type: Type.STRING, description: "The full text of the second reading." },
      },
    },
    gospel: {
      type: Type.OBJECT,
      properties: {
        citation: { type: Type.STRING, description: "The gospel citation (e.g., 'Matthew 8:23-27')." },
        text: { type: Type.STRING, description: "The full text of the gospel reading." },
      },
      required: ["citation", "text"],
    },
  },
  required: ["date", "feast", "firstReading", "responsorialPsalm", "gospel"],
};

const parseJsonResponse = <T>(response: GenerateContentResponse): T | null => {
  try {
    const text = response.text.trim();
    return JSON.parse(text) as T;
  } catch (e) {
    console.error("Failed to parse JSON response:", e);
    return null;
  }
};

const createApiCall = async <T>(prompt: string, schema: object): Promise<T> => {
  if (!API_KEY || API_KEY === "YOUR_GEMINI_API_KEY_HERE") {
    throw new Error("Gemini API key is not configured. Please add it to index.html.");
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: { role: 'user', parts: [{ text: prompt }] },
      config: { responseMimeType: 'application/json', responseSchema: schema },
    });

    const parsedData = parseJsonResponse<T>(response);
    if (!parsedData) {
      throw new Error("Failed to parse a valid response from the API.");
    }
    return parsedData;
  } catch (error) {
    console.error("Gemini API call failed:", error);
    // Re-throw a more user-friendly error message.
    throw new Error("There was a problem communicating with the AI service. Please check your API key and network connection.");
  }
};

export const fetchPrayers = (): Promise<Prayer[]> => {
  const prompt = "Generate a comprehensive list of 50 popular and essential Catholic prayers. Include basic prayers like the Our Father, prayers to Mary like the Hail Mary, and prayers to various saints. Structure the output as a JSON array.";
  return createApiCall<Prayer[]>(prompt, PRAYER_SCHEMA);
};

export const fetchDailyReadings = (): Promise<DailyReadings> => {
  const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const prompt = `Provide the Catholic Mass readings for today, ${today}. Include the first reading, responsorial psalm, second reading (if applicable for a Sunday or Solemnity), and the Gospel. If there is no second reading, the value for it should be null.`;
  return createApiCall<DailyReadings>(prompt, DAILY_READINGS_SCHEMA);
};
