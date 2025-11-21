// app/api/insights/route.js
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

import { buildItemFeatures } from "@/app/insights/buildItemFeatures";
import { buildPatterns } from "@/app/insights/buildPatterns";
import { getUserInventory } from "@/app/insights/getUserInventory";
import { getUserLogs } from "@/app/insights/getUserLogs";

// --- Gemini setup ---
const genAI = process.env.GEMINI_API_KEY
  ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  : null;

// 2.5 model name – you can change to a Pro variant later if you want
const GEMINI_MODEL = "gemini-2.5-flash";

// Helper to generate AI advice based on insights
async function generateAdvice(categoryAvgPerDay, wastePredictions) {
  if (!genAI) {
    console.warn("GEMINI_API_KEY is not set – skipping AI advice.");
    return null;
  }

  try {
    const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });

    const prompt = `
You are a helpful assistant that gives short, practical tips to reduce food waste.

Here is the user's data in JSON:

Category average consumption per day:
${JSON.stringify(categoryAvgPerDay, null, 2)}

Items likely to be wasted in 3–7 days:
${JSON.stringify(wastePredictions, null, 2)}

Based on this:
- Give 3–6 very concrete, easy-to-follow suggestions.
- Refer to categories or items when useful.
- Keep the answer short and friendly.
    `.trim();

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    return text;
  } catch (err) {
    console.error("Error generating Gemini advice:", err);
    return null; // don't break the API if AI fails
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  // 1. Fetch data
  const logs = await getUserLogs(email);
  const inventory = await getUserInventory(email);

  // 2. Build patterns
  const { categoryTotals, categoryAvgPerDay } = buildPatterns(logs);

  // 3. Build item features
  const itemFeatures = buildItemFeatures(inventory, categoryAvgPerDay);

  // 4. Filter items likely wasted in 3–7 days
  const wastePredictions = itemFeatures.filter(
    (i) => i.daysUntilExpiry >= 3 && i.daysUntilExpiry <= 7
  );

  // 5. Ask Gemini for advice
  const aiAdvice = await generateAdvice(categoryAvgPerDay, wastePredictions);

  // 6. Respond
  return NextResponse.json({
    categoryTotals,
    categoryAvgPerDay,
    wastePredictions,
    aiAdvice,
  });
}
