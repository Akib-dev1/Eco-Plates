"use client";

import { useState } from "react";

export default function NourishBotChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("https://eco-plates.vercel.app/api/nourishbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.content }),
      });

      const data = await res.json();
      if (data.reply) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.reply },
        ]);
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Error talking to NourishBot." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#AAB874] flex items-center justify-center">
      <div className="w-full max-w-3xl bg-[#3F4630] rounded-2xl shadow-[0_20px_45px_rgba(0,0,0,0.35)] px-6 pt-5 pb-4 flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center gap-2 text-white">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-lg">
            💬
          </span>
          <div className="font-semibold text-lg">NourishBot</div>
        </div>

        {/* Chat area */}
        <div className="flex-1">
          <div className="h-72 bg-white rounded-xl px-8 py-6 text-sm text-slate-800 overflow-y-auto">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={
                  m.role === "user"
                    ? "text-right mb-2"
                    : "text-left mb-2 text-green-900"
                }
              >
                <span className="font-semibold">
                  {m.role === "user" ? "You" : "Bot"}:
                </span>{" "}
                <span>{m.content}</span>
              </div>
            ))}

            {messages.length === 0 && (
              <div className="h-full flex items-center justify-center text-center text-sm text-gray-400">
                Ask me about meals, waste reduction, or your budget.
              </div>
            )}
          </div>
        </div>

        {/* Input row */}
        <form
          onSubmit={sendMessage}
          className="mt-1 flex items-center gap-3 border-t border-black/10 pt-3"
        >
          <input
            className="flex-1 rounded-lg bg-[#D9DEE8] px-4 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500/70"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Send a message..."
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 text-sm font-semibold rounded-lg bg-[#4F7D3A] text-white shadow-[0_4px_0_rgba(53,90,37,1)] disabled:opacity-60"
          >
            {loading ? "Thinking..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
}
