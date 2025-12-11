// import { GoogleGenAI } from "@google/genai";

// let ai: GoogleGenAI | null = null;

// try {
//   // Assuming process.env.API_KEY is available as per instructions
//   if (process.env.API_KEY) {
//     ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
//   }
// } catch (error) {
//   console.error("Failed to initialize GoogleGenAI", error);
// }

// export const sendMessageToGemini = async (message: string): Promise<string> => {
//   if (!ai) {
//     return "I'm sorry, I cannot connect to the AI service at the moment. Please call our office directly.";
//   }

//   try {
//     const response = await ai.models.generateContent({
//       model: 'gemini-2.5-flash',
//       contents: message,
//       config: {
//         systemInstruction: `You are a friendly, professional, and empathetic AI dental assistant for 'Lumina Dental'. 
//         Your goal is to answer general questions about dental procedures, oral hygiene, and the clinic's general policies based on standard dental knowledge.
        
//         Key Info about Lumina Dental:
//         - We offer General, Cosmetic, Orthodontic, Implant, and Emergency dentistry.
//         - We accept most PPO insurance.
//         - We prioritize painless treatments.
        
//         Guidelines:
//         - Keep answers concise (under 100 words).
//         - Be reassuring to anxious patients.
//         - Do NOT give specific medical diagnoses. Always advise the patient to book an appointment for a proper diagnosis.
//         - If asked about booking, tell them to use the form on the website or call (555) 123-4567.
//         `,
//       }
//     });
    
//     return response.text || "I apologize, I couldn't generate a response. Please try again.";
//   } catch (error) {
//     console.error("Gemini API Error:", error);
//     return "I'm having trouble connecting right now. Please try again later or call our office.";
//   }
// };