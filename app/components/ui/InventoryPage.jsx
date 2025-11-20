"use client";

import { useMemo, useState } from "react";
import InventoryFilters from "./InventoryFilters";
import InventoryList from "./InventoryList";
import InventoryDetails from "./InventoryDetails";

export default function InventoryPage({ initialItems }) {
  const [category, setCategory] = useState("All");
  const [expiry, setExpiry] = useState("All");
  const [selectedId, setSelectedId] = useState(null);

  const filtered = useMemo(() => {
    return initialItems?.filter((item) => {
      let matchCategory = category === "All" || item.category === category;

      let matchExpiry = true;
      const days = item.expirationDays;

      if (expiry === "0-3") matchExpiry = days <= 3;
      if (expiry === "4-30") matchExpiry = days > 3 && days <= 30;
      if (expiry === "30+") matchExpiry = days > 30;

      return matchCategory && matchExpiry;
    });
  }, [initialItems, category, expiry]);

  const selectedItem =
    filtered.find((i) => i._id === selectedId) || filtered[0] || null;

  return (
    <div className="space-y-6">
      <h1 className="font-oswald text-2xl text-primary-accent">
        My Food Inventory
      </h1>

      <InventoryFilters
        category={category}
        setCategory={setCategory}
        expiry={expiry}
        setExpiry={setExpiry}
      />

      <div className="grid gap-4 lg:grid-cols-[1.7fr_1fr]">
        <InventoryList
          items={filtered}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
        />
        <InventoryDetails item={selectedItem} />
      </div>
    </div>
  );
}
