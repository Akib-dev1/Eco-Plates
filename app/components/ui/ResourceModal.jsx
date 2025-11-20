// components/resource-hub/ResourceModal.jsx
"use client";

const impactColors = {
  Low: "bg-emerald-500/20 text-emerald-200 border-emerald-500/60",
  Medium: "bg-amber-500/20 text-amber-200 border-amber-500/60",
  High: "bg-red-500/20 text-red-200 border-red-500/60",
};

export default function ResourceModal({ resource, onClose }) {
  if (!resource) return null;

  const impactClass = impactColors[resource.impactLevel] || impactColors.Medium;

  const cleanUrl =
    typeof resource.url === "string"
      ? resource.url
          .replace(/^\[/, "")
          .replace(/\]$/, "")
          .replace(/^\((.*)\)$/, "$1")
      : "";

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="relative w-full max-w-lg rounded-2xl bg-primary-accent text-input-text shadow-2xl border border-neutral-700">
        {/* Header */}
        <div className="flex items-start justify-between px-5 py-4 border-b border-neutral-800">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-wide text-neutral-400">
              <span className="font-semibold">{resource.type}</span>
              <span className="h-1 w-1 rounded-full bg-neutral-500" />
              <span>{resource.category}</span>
              {resource.relatedFoodCategory && (
                <>
                  <span className="h-1 w-1 rounded-full bg-neutral-500" />
                  <span>{resource.relatedFoodCategory}</span>
                </>
              )}
            </div>
            <h2 className="mt-1 text-base sm:text-lg font-semibold">
              {resource.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="ml-3 p-1 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 cursor-pointer"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-4 space-y-4 text-sm">
          <p className="text-neutral-200">{resource.description}</p>

          {/* Impact + tags */}
          <div className="space-y-2">
            {resource.impactLevel && (
              <div className="flex flex-wrap items-center gap-2 text-[11px]">
                <span className="text-neutral-400 uppercase tracking-wide">
                  Impact
                </span>
                <span
                  className={`inline-flex items-center px-2.5 py-1 rounded-full border ${impactClass}`}
                >
                  {resource.impactLevel}
                </span>
              </div>
            )}

            {resource.aiTags && resource.aiTags.length > 0 && (
              <div className="space-y-1">
                <p className="text-[11px] uppercase tracking-wide text-neutral-400">
                  Tags
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {resource.aiTags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 rounded-full bg-[#202020] border border-neutral-700 text-[11px] text-neutral-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* URL */}
          {cleanUrl && (
            <div className="pt-2 border-t border-neutral-800 text-xs text-neutral-400 break-all">
              <span className="font-semibold text-neutral-200 mr-1">
                Source:
              </span>
              {cleanUrl}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 pb-4 pt-2 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-2 rounded-lg text-xs sm:text-sm font-medium bg-[#202020] text-neutral-200 border border-neutral-700 hover:bg-neutral-800 cursor-pointer"
          >
            Close
          </button>

          {cleanUrl && (
            <a
              href={cleanUrl}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold bg-lime-400 text-black hover:bg-lime-300 cursor-pointer"
              onClick={() => console.log("Open resource:", cleanUrl)}
            >
              Open Resource
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
