// lib/aiExplain.js
import { callGemini } from "./gemini";

export async function getAiRiskExplanations(items, userProfile) {
  // items: array of { name, category, quantity, unit, riskScore, daysToExpiry }
  // userProfile: { householdSize, dietaryPreferences, budgetLimit, location }

  const prompt = `
You are helping a Bangladeshi household reduce food waste.
User profile:
- Household size: ${userProfile.householdSize}
- Dietary preferences: ${
    userProfile.dietaryPreferences?.join(", ") || "none specified"
  }
- Budget limit: ${userProfile.budgetLimit || "not specified"}
- Location: ${userProfile.location || "not specified"}

For each item below, give:
- one short friendly explanation of why it should be eaten sooner or later
- keep it under 20 words
- very practical, no fluff

Return JSON array only with:
[
  {
    "name": string,
    "aiReason": string
  }
]

Items:
${JSON.stringify(items, null, 2)}
`;

  const text = await callGemini(prompt);
  if (!text) return [];

  // Gemini will answer with JSON; we try to parse
  try {
    const parsed = JSON.parse(text);
    if (Array.isArray(parsed)) return parsed;
  } catch (e) {
    console.error("AI JSON parse error:", e);
  }

  return [];
}
