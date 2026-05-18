import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();
console.log(process.env.GEMINI_API_KEY);

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

export const analyzePrescription = async ({ base64Image, mimeType }) => {
  const prompt = `
You are a strict medical OCR extraction system.

RULES:
- Do NOT guess medicine names
- If unreadable, return "unknown"
- Only extract visible text
- Return valid JSON only

Output format:

{
  "medicines": [
    {
      "name": "string or unknown",
      "dosage": "string or unknown",
      "frequency": "string or unknown",
      "use_case": "string or unknown",
      "confidence": 0-1 number
    }
  ]
}
`;

  const result = await model.generateContent([
    prompt,
    {
      inlineData: {
        data: base64Image,
        mimeType,
      },
    },
  ]);

  const text = result.response.text();

  const cleaned = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch (err) {
    return { raw_response: cleaned };
  }
};
