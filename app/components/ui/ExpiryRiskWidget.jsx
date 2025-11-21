"use client";

import { useEffect, useState } from "react";

export default function ExpiryRiskWidget({ user }) {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    async function loadRiskData() {
      try {
        // Step 1: Recalculate risk
        await fetch("https://eco-plates.vercel.app/api/expiry-risk/run", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: user.email }),
        });

        // Step 2: Fetch alerts
        const res = await fetch(`/api/expiry-risk/alerts?email=${user.email}`);
        const data = await res.json();
        setAlerts(data.items || []);
      } catch (err) {
        console.error("Risk load error:", err);
      } finally {
        setLoading(false);
      }
    }

    loadRiskData();
  }, [user?.email]);

  if (loading) return <p>Loading expiration risk…</p>;

  return (
    <div className="w-full p-4 rounded-lg border bg-white shadow-sm">
      <h2 className="text-xl font-semibold mb-3">
        Expiring Soon / High Risk Items
      </h2>

      {alerts.length === 0 && (
        <p className="text-gray-600">No risky items right now 🎉</p>
      )}

      <ul className="space-y-3">
        {alerts.map((item) => (
          <li
            key={item._id}
            className="p-3 border rounded-md bg-gray-50 shadow-sm"
          >
            <div className="font-semibold text-lg">{item.name}</div>
            <div className="text-sm text-gray-700">
              {item.riskLevel.toUpperCase()} –{" "}
              {Math.round(item.riskScore * 100)}%
            </div>
            <div className="text-xs text-gray-500 mt-1">{item.riskReason}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
