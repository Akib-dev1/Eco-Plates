"use client";

export default function InventoryList({ items, selectedId, setSelectedId }) {
  if (!items.length) {
    return (
      <div className="rounded-xl bg-primary-accent text-input-text p-4 text-center">
        No items match your filters.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <button
          key={item._id}
          onClick={() => setSelectedId(item._id)}
          className={`w-full cursor-pointer text-left rounded-xl px-4 py-3 bg-primary-accent text-input-text border ${
            selectedId === item._id
              ? "border-lime-400 shadow-lg"
              : "border-neutral-700 hover:border-neutral-500"
          }`}
        >
          <p className="font-medium">{item.name}</p>
          <p className="text-xs text-neutral-300">
            {item.category} — {item.quantity} {item.unit}
          </p>
        </button>
      ))}
    </div>
  );
}
