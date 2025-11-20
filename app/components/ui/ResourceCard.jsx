// components/resource-hub/ResourceCard.jsx
"use client";

const impactColors = {
  Low: "bg-emerald-500/20 text-emerald-200 border-emerald-500/60",
  Medium: "bg-amber-500/20 text-amber-200 border-amber-500/60",
  High: "bg-red-500/20 text-red-200 border-red-500/60",
};

export default function ResourceCard({ resource, onClick }) {
  const impactClass = impactColors[resource.impactLevel] || impactColors.Medium;

  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full text-left rounded-2xl bg-primary-accent text-input-text shadow-md border border-neutral-800 hover:border-neutral-500 hover:-translate-y-0.5 transition transform px-4 sm:px-5 py-4 flex flex-col gap-3 cursor-pointer"
    >
      {/* Type & category */}
      <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-wide">
        <span className="font-semibold text-neutral-400">{resource.type}</span>
        <span className="h-1 w-1 rounded-full bg-neutral-500" />
        <span className="text-neutral-500">{resource.category}</span>
      </div>

      {/* Title */}
      <h3 className="text-sm sm:text-base font-semibold">{resource.title}</h3>

      {/* Description */}
      <p className="text-xs sm:text-sm text-neutral-300 line-clamp-3">
        {resource.description}
      </p>

      {/* Footer pills */}
      <div className="mt-1 flex flex-wrap gap-2 text-[11px]">
        {resource.relatedFoodCategory && (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#202020] border border-neutral-700 text-neutral-200">
            {resource.relatedFoodCategory}
          </span>
        )}
        {resource.impactLevel && (
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-full border ${impactClass}`}
          >
            Impact: {resource.impactLevel}
          </span>
        )}
      </div>
    </button>
  );
}
