// components/resource-hub/ResourceHub.jsx
"use client";

import { useMemo, useState } from "react";
import ResourceCard from "./ResourceCard";
import ResourceModal from "./ResourceModal";

export default function ResourceHub({ initialResources }) {
  const [search, setSearch] = useState("");
  const [selectedResource, setSelectedResource] = useState(null);

  const filteredResources = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return initialResources;

    return initialResources.filter((item) => {
      return (
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        (item.relatedFoodCategory || "").toLowerCase().includes(q)
      );
    });
  }, [initialResources, search]);

  return (
    <section className="space-y-6">
      {/* Header */}
      <header className="space-y-2">
        <h1 className="font-oswald text-3xl sm:text-4xl text-primary-accent tracking-tight">
          Sustainable Practices Hub
        </h1>
        <p className="text-sm sm:text-base text-neutral-700 max-w-xl">
          Quick guides and tips for better storage, reuse, and kitchen habits.
        </p>
      </header>

      {/* Search bar */}
      <div className="rounded-2xl bg-primary-accent text-input-text shadow-xl p-4 sm:p-5">
        <div className="flex items-center gap-3 rounded-xl bg-[#202020] px-3 sm:px-4 py-2.5 border border-neutral-800">
          <span className="text-neutral-500 text-lg">🔍</span>
          <input
            type="text"
            placeholder="Search by title, category, or food type..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm sm:text-base placeholder:text-neutral-500 text-input-text"
          />
        </div>
      </div>

      {/* Cards grid */}
      <div className="grid gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filteredResources.map((resource) => (
          <ResourceCard
            key={resource._id}
            resource={resource}
            onClick={() => setSelectedResource(resource)}
          />
        ))}

        {filteredResources.length === 0 && (
          <div className="col-span-full rounded-2xl bg-primary-accent text-input-text p-6 text-center text-sm">
            No resources found. Try a different search term.
          </div>
        )}
      </div>

      {/* Modal */}
      <ResourceModal
        resource={selectedResource}
        onClose={() => setSelectedResource(null)}
      />
    </section>
  );
}
