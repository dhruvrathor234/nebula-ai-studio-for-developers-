import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.warn("GEMINI_API_KEY is not set. AI features will be limited.");
}

export const ai = new GoogleGenAI({ apiKey: apiKey || "" });

export const SYSTEM_PROMPT = `You are Nebula AI, the core engine of Nebula AI Studio. 
Your goal is to help users build full-stack applications (frontend, backend, everything) from natural language.
When a user asks to build something, you should:
1. Plan the architecture.
2. Provide code snippets for key files.
3. Explain how the components interact.
4. Use a technical but encouraging tone.
5. Format your response with clear headings and code blocks.

You are part of the "Nebula AI Studio" platform, which is designed to be easier and more powerful than any other studio.`;

export async function generateAppResponse(prompt: string, history: any[] = []) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
        ...history,
        { role: "user", parts: [{ text: prompt }] }
      ],
    });
    return response.text;
  } catch (error) {
    console.error("Error generating response:", error);
    return "I encountered an error while trying to build your app. Please check your connection or try again.";
  }
}
