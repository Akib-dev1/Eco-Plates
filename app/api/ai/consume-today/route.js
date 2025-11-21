// app/api/ai/consume-today/route.js
import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/dbConnect";
import { callGemini } from "@/app/lib/gemini";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ error: "email is required" }, { status: 400 });
    }

    const inventoryCol = await dbConnect("inventoryUsers");
    const usersCol = await dbConnect("users");

    const user = await usersCol.findOne({ email });

    const items = await inventoryCol
      .find({ email, quantity: { $gt: 0 } })
      .sort({ priorityScore: -1 }) // highest priority first
      .limit(10)
      .toArray();

    const prompt = `
You are helping a Bangladeshi household reduce food waste with healthy, budget-conscious meals.

USER PROFILE
- Name: ${user?.name || "User"}
- Household size: ${user?.householdSize || 1}
- Dietary preferences: ${
      (user?.dietaryPrefs || user?.dietaryPreferences || []).join(", ") ||
      "none"
    }
- Location: ${user?.location || "not specified"}
- Weekly budget limit: ${
      user?.budgetLimit || "not specified"
    } (in local currency)

AVAILABLE INVENTORY (use these FIRST to reduce waste)
Each item has: name, category, quantity, unit.
${JSON.stringify(
  items.map((i) => ({
    name: i.name,
    category: i.category,
    quantity: i.quantity,
    unit: i.unit,
  })),
  null,
  2
)}

GOAL
Design an optimized weekly meal plan (7 days) that:
1) Fits within the user's weekly budget.
2) Prioritizes using the available inventory items to minimize waste.
3) Meets simple dummy nutrition rules.
4) Suggests cheaper local alternatives when items are costly.
5) Provides a shopping list with estimated total costs.

DUMMY NUTRITION RULES (approximate and simple)
- Each day should include at least:
  - 2 servings of grains or starchy foods (rice, bread, potatoes, etc.).
  - 1 serving of protein (lentils, eggs, meat, fish, chickpeas, etc.).
  - 2 servings of vegetables and/or fruits.
- Respect dietary preferences when possible (e.g., avoid restricted items).

DUMMY COST RULES (assume local Bangladeshi context)
- You may assume a simple internal price table for common items in BDT.
- If you don't know the price of an item, estimate a reasonable low-cost value.
- When you suggest an item that might be expensive, also suggest a cheaper local alternative in parentheses.
- Keep the total weekly cost roughly within the user's budget limit.

PLANNING LOGIC (rule-based + LLM)
- First, try to build meals using items from the inventory.
- Only add new items to the shopping list if needed for nutrition or variety.
- Avoid planning meals that require large quantities of items not in the inventory.
- Try to re-use leftover ingredients across multiple days.

OUTPUT FORMAT (MARKDOWN ONLY)
Return clear markdown with these sections:

## Weekly Meal Plan
- Day 1:
  - Breakfast: ...
  - Lunch: ...
  - Dinner: ...
- Day 2:
  - ...

(Continue up to Day 7. For each meal, mention which inventory items are used.)

## Shopping List (with Estimated Costs)
- item name – quantity – approx cost (BDT X)
- ...

At the end, include:

## Budget & Nutrition Summary
- Estimated total food cost for the week: BDT ~X
- Very short note on how the plan:
  - Uses existing inventory to reduce waste,
  - Stays within (or near) the budget,
  - Follows the dummy nutrition rules.

Use concise, practical language. Do NOT include any explanations about your internal reasoning, only the markdown result.
`;

    const text = await callGemini(prompt);

    return NextResponse.json({
      suggestions: text || "",
    });
  } catch (err) {
    console.error("consume-today AI error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
