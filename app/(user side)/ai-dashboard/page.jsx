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
    <div className="min-h-screen bg-main-bg py-10">
      <div className="max-w-6xl mx-auto px-8 py-12">
        {/* Page title */}
        <h1 className="text-4xl font-semibold tracking-tight text-slate-900">
          Eco-Plates AI Assistant
        </h1>
        <div className="mt-4 h-px w-full bg-slate-300/70" />

        {/* AI Section */}
        <section className="mt-8">
          <div className="flex items-center justify-between rounded-2xl bg-neutral-900 px-10 py-7 shadow-xl gap-8">
            <div className="text-white">
              <h2 className="text-lg font-semibold">
                Ask AI: What to Eat the whole week?
              </h2>

              {!aiSuggestions && (
                <p className="mt-2 text-xs text-gray-300 max-w-xl">
                  Click the button to get simple meal ideas using your
                  top-priority items.
                </p>
              )}
            </div>

            <button
              onClick={handleAskAI}
              disabled={loadingAI || !user?.email}
              className="inline-flex items-center justify-center rounded-xl border-2 border-neutral-900 bg-white px-8 py-3 text-sm font-semibold text-neutral-900 shadow-[0_6px_0_rgba(23,23,23,1)] disabled:opacity-60"
            >
              {loadingAI ? "Thinking…" : "Get Suggestions"}
            </button>
          </div>

          {aiSuggestions && (
            <div className="mt-4 text-sm text-gray-800 bg-white border rounded-lg p-4 shadow-sm">
              {/* Gemini returns markdown-ish text; simple render */}
              <pre className="whitespace-pre-wrap text-sm">{aiSuggestions}</pre>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
