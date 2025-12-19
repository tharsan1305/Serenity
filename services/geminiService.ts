
import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = process.env.API_KEY || "";
const ai = new GoogleGenAI({ apiKey: API_KEY });

export const summarizeJournal = async (content: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Summarize the following personal journal entry and provide a supportive, empathetic insight in 2 sentences: "${content}"`,
      config: {
        temperature: 0.7,
        maxOutputTokens: 150,
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Your feelings are valid. Take a moment to breathe deeply.";
  }
};

export const getMoodRecommendation = async (mood: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `A user is feeling ${mood} today. Recommend one simple wellness activity in 10 words or less.`,
      config: {
        temperature: 0.8,
      }
    });
    return response.text;
  } catch (error) {
    return "Try a 5-minute deep breathing exercise.";
  }
};
