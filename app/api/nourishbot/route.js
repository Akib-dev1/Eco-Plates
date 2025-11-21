// app/api/nourishbot/route.js
import { TIPS } from "@/app/data/nourishTips";
import dbConnect from "@/app/lib/dbConnect";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

const GEMINI_ENDPOINT =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

export async function POST(req) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    if (!GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is missing");
    }

    // TODO: get from real auth/session
    const userEmail = (await getServerSession(authOptions))?.user?.email;

    const usersCol = await dbConnect("users");
    const logsCol = await dbConnect("logs");
    const inventoryCol = await dbConnect("inventoryUsers");
    const chatsCol = await dbConnect("chats");

    // 1) Load user + context
    const user = await usersCol.findOne({ email: userEmail });

    const inventory = await inventoryCol
      .find({ email: userEmail })
      .limit(30)
      .toArray();

    const recentLogs = await logsCol
      .find({ email: userEmail })
      .sort({ dateLogged: -1 })
      .limit(30)
      .toArray();

    // 2) ONE CHAT PER USER (no sessionId from client)
    let chatDoc = await chatsCol.findOne({ userEmail });

    if (!chatDoc) {
      chatDoc = {
        userEmail,
        messages: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const insertResult = await chatsCol.insertOne(chatDoc);
      chatDoc._id = insertResult.insertedId;
    }

    // last messages as memory (e.g., last 6 turns)
    const lastMessages = chatDoc.messages.slice(-6);

    // 3) Build context + history + tips
    const contextText = buildContextText(user, inventory, recentLogs);
    const historyText = buildHistoryText(lastMessages);
    const extraTips = pickRelevantTips(message);

    const fullPrompt = `
You are NourishBot, an assistant helping users with:
- food waste reduction
- nutrition balancing
- budget meal planning
- creative ideas for leftovers
- local food sharing (only generic suggestions)
- environmental impact of food habits

If the user refers to "previous plan", "last plan", or "same as before",
look at the last meal plan you suggested in the conversation history and
modify or reuse it instead of starting from scratch.

User profile:
${contextText}

Extra domain tips (you can use these if helpful):
${extraTips || "No extra tips."}

Conversation so far:
${historyText}

User's new question:
"${message}"

Respond in simple, friendly language.
Give specific, practical tips using their inventory and budget when possible.
Respond in under 250 words.
    `.trim();

    // 4) Call Gemini
    const geminiRes = await fetch(`${GEMINI_ENDPOINT}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: fullPrompt }],
          },
        ],
      }),
    });

    const geminiJson = await geminiRes.json();

    const reply =
      geminiJson?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn't generate a response right now.";

    // 5) Save chat (truncate if too long)
    const newMessages = [
      ...chatDoc.messages,
      { role: "user", content: message },
      { role: "assistant", content: reply },
    ];

    await chatsCol.updateOne(
      { _id: chatDoc._id },
      { $set: { messages: newMessages.slice(-20), updatedAt: new Date() } }
    );

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("NourishBot error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/* ---------- Helpers ---------- */

function buildContextText(user, inventory, logs) {
  const dietary = user?.dietaryPrefs?.join(", ") || "none";
  const budget = user?.budgetLimit || "not set";
  const size = user?.householdSize || "not set";
  const location = user?.location || "unknown";

  const inventorySummary = inventory
    .slice(0, 10)
    .map(
      (item) =>
        `${item.name} (${item.category}) - qty: ${item.quantity} ${
          item.unit || ""
        }`
    )
    .join("\n");

  const logSummary = logs
    .slice(0, 10)
    .map(
      (log) =>
        `${log.itemName} - qty: ${log.quantity} (${log.category}) on ${log.dateLogged}`
    )
    .join("\n");

  return `
Name: ${user?.name || "User"}
Household size: ${size}
Location: ${location}
Dietary preferences: ${dietary}
Budget limit: ${budget}

Current inventory (sample):
${inventorySummary}

Recent consumption logs (sample):
${logSummary}
  `.trim();
}

function buildHistoryText(messages) {
  if (!messages || messages.length === 0) return "No previous conversation.";
  return messages
    .map((m) => `${m.role === "user" ? "User" : "Bot"}: ${m.content}`)
    .join("\n");
}

function pickRelevantTips(message) {
  const text = message.toLowerCase();
  const tips = [];

  if (text.includes("waste") || text.includes("leftover")) {
    tips.push(...TIPS.filter((t) => t.tag === "waste"));
  }
  if (
    text.includes("budget") ||
    text.includes("cheap") ||
    text.includes("low cost")
  ) {
    tips.push(...TIPS.filter((t) => t.tag === "budget"));
  }
  if (
    text.includes("nutrition") ||
    text.includes("healthy") ||
    text.includes("balanced")
  ) {
    tips.push(...TIPS.filter((t) => t.tag === "nutrition"));
  }
  if (text.includes("dhaka") || text.includes("local")) {
    tips.push(...TIPS.filter((t) => t.tag === "dhaka"));
  }

  return tips
    .slice(0, 3)
    .map((t) => `- ${t.text}`)
    .join("\n");
}
