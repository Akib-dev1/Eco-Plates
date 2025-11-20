// components/inventory/InventoryItemCard.jsx
"use client";

const statusToneClasses = {
  warning: "bg-orange-500/15 text-orange-300 border-orange-500/60",
  danger: "bg-red-500/15 text-red-300 border-red-500/70",
  neutral: "bg-slate-500/15 text-slate-200 border-slate-500/60",
};

export default function InventoryItemCard({ item, isSelected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left rounded-xl px-4 sm:px-5 py-3 sm:py-4 bg-primary-accent text-input-text shadow-md flex items-start gap-4 border transition
        ${
          isSelected
            ? "border-lime-400 ring-2 ring-lime-400/60"
            : "border-neutral-800 hover:border-neutral-500 hover:-translate-y-0.5"
        }`}
    >
      {/* Icon/thumbnail placeholder */}
      <div className="mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-neutral-900 border border-neutral-700 text-xs">
        {item.category?.[0] ?? "F"}
      </div>

      {/* Main info */}
      <div className="flex-1 space-y-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="font-semibold text-sm sm:text-base">{item.name}</p>
          <span className="text-xs text-neutral-300">
            {item.quantity} {item.unit}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {item.statusLabel && (
            <span
              className={`inline-flex items-center px-2.5 py-1 rounded-full text-[0.7rem] border ${
                statusToneClasses[item.statusTone]
              }`}
            >
              {item.statusLabel}
            </span>
          )}
          {item.expirationDays != null && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[0.7rem] bg-neutral-800 text-neutral-200 border border-neutral-700">
              Typical expiry: {item.expirationDays} day
              {item.expirationDays === 1 ? "" : "s"}
            </span>
          )}
        </div>

        {item.notes && (
          <p className="text-xs sm:text-sm text-neutral-300 line-clamp-2">
            {item.notes}
          </p>
        )}
      </div>

      {/* Actions (placeholder icons) */}
      <div className="flex flex-col gap-2 items-end ml-2">
        <div className="flex gap-2">
          <span className="h-8 w-8 rounded-full bg-neutral-900 border border-neutral-700 flex items-center justify-center text-xs hover:bg-neutral-800 cursor-pointer">
            ✏️
          </span>
          <span className="h-8 w-8 rounded-full bg-neutral-900 border border-neutral-700 flex items-center justify-center text-xs hover:bg-red-700/70 cursor-pointer">
            🗑
          </span>
        </div>
        {item.costPerUnit != null && (
          <span className="text-xs text-neutral-300">
            Tk {item.costPerUnit.toLocaleString()} / {item.unit}
          </span>
        )}
      </div>
    </button>
  );
}
