// inside app/api/expiry-risk/run/route.js

import { getAiRiskExplanations } from "@/app/lib/aiExplain";
import dbConnect from "@/app/lib/dbConnect";

export async function POST(req) {
  // ...existing code...

  const userCol = await dbConnect("users");
  const userDoc = await userCol.findOne({ email });

  const userProfile = {
    householdSize: userDoc?.householdSize || 1,
    dietaryPreferences:
      userDoc?.dietaryPrefs || userDoc?.dietaryPreferences || [],
    budgetLimit: userDoc?.budgetLimit || "",
    location: userDoc?.location || "",
  };

  // existing loop: build updatedItems[]
  const updatedItems = [];

  // ...fill updatedItems with:
  // { _id, name, category, quantity, unit, riskScore, riskLevel, riskReason, predictedExpiryDate, fifoScore, priorityScore, ... }

  // ---- AI STEP: ask for better reasons for top risky items ----
  const aiInput = updatedItems
    .filter((i) => i.riskScore >= 0.4) // only medium+ to save tokens
    .map((i) => ({
      name: i.name,
      category: i.category,
      quantity: i.quantity + " " + (i.unit || ""),
      riskScore: i.riskScore,
      daysToExpiry: Math.round(
        (new Date(i.predictedExpiryDate) - new Date()) / (1000 * 60 * 60 * 24)
      ),
    }));

  let aiReasons = [];
  if (aiInput.length) {
    aiReasons = await getAiRiskExplanations(aiInput, userProfile);
  }

  // merge AI reasons into updatedItems
  for (const item of updatedItems) {
    const match = aiReasons.find((a) => a.name === item.name);
    if (match?.aiReason) {
      item.riskReason = match.aiReason; // override simple reason
    }
  }

  // then update DB and return as before
}
