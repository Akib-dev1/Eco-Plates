"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function AIDashboardPage() {
  // TODO: replace with real authenticated user
  const data = useSession();
  const user = data?.data?.user;

  const [priorityItems, setPriorityItems] = useState([]);
  const [loadingItems, setLoadingItems] = useState(true);

  const [aiSuggestions, setAiSuggestions] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);

  // 1) On load: recalc risk + fetch prioritized items
  useEffect(() => {
    if (!user?.email) return;

    async function loadData() {
      try {
        // Recalculate risk + priority scores on backend
        await fetch("https://eco-plates.vercel.app/api/expiry-risk/run", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: user.email }),
        });

        // Get prioritized items for consumption
        const res = await fetch(
          `https://eco-plates.vercel.app/api/consumption-priority?email=${user.email}`
        );
        const data = await res.json();
        setPriorityItems(data.items || []);
      } catch (err) {
        console.error("Error loading priority items:", err);
      } finally {
        setLoadingItems(false);
      }
    }

    loadData();
  }, [user?.email]);

  // 2) Ask AI: "What should I eat today?"
  async function handleAskAI() {
    if (!user?.email) return;
    setLoadingAI(true);
    setAiSuggestions("");

    try {
      const res = await fetch(
        `https://eco-plates.vercel.app/api/ai/consume-today?email=${user.email}`
      );
      const data = await res.json();
      setAiSuggestions(data.suggestions || "No ideas right now.");
    } catch (err) {
      console.error("AI suggestions error:", err);
      setAiSuggestions("Something went wrong asking AI.");
    } finally {
      setLoadingAI(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-2">Eco-Plates AI Assistant</h1>

      {/* Section 2: AI "What to eat today?" */}
      <section className="border-t pt-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-semibold">
            Ask AI: What to Eat the whole week?
          </h2>
          <button
            onClick={handleAskAI}
            disabled={loadingAI || !user?.email}
            className="px-4 py-2 rounded-md bg-green-600 text-white text-sm font-medium disabled:opacity-60"
          >
            {loadingAI ? "Thinking…" : "Get Suggestions"}
          </button>
        </div>

        {!aiSuggestions && (
          <p className="text-xs text-gray-600">
            Click the button to get simple meal ideas using your top-priority
            items.
          </p>
        )}

        {aiSuggestions && (
          <div className="mt-3 text-sm text-gray-800 bg-white border rounded-lg p-4 shadow-sm">
            {/* Gemini returns markdown-ish text; simple render */}
            <pre className="whitespace-pre-wrap text-sm">{aiSuggestions}</pre>
          </div>
        )}
      </section>
    </div>
  );
}
