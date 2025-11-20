"use client";

export default function InventoryFilters({
  category,
  setCategory,
  expiry,
  setExpiry,
}) {
  const categoryOptions = [
    "All",
    "Grains",
    "Pulses",
    "Oils",
    "Spices",
    "Pantry Staples",
    "Beverages",
    "Snacks",
    "Fresh Essentials",
    "Condiments",
  ];

  return (
    <div className="flex gap-3 flex-wrap text-sm">
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="px-3 py-2 rounded-lg bg-primary-accent text-input-text border border-neutral-700"
      >
        {categoryOptions.map((opt) => (
          <option key={opt} value={opt}>
            Category: {opt}
          </option>
        ))}
      </select>

      <select
        value={expiry}
        onChange={(e) => setExpiry(e.target.value)}
        className="px-3 py-2 rounded-lg bg-primary-accent text-input-text border border-neutral-700"
      >
        <option value="All">Expiry: All</option>
        <option value="0-3">0–3 days</option>
        <option value="4-30">4–30 days</option>
        <option value="30+">30+ days</option>
      </select>
    </div>
  );
}
