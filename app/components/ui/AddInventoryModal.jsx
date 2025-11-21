// components/dashboard/AddInventoryModal.jsx
"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";

export default function AddInventoryModal({
  open,
  onClose,
  onAdd,
  mainInventoryData,
}) {
  const [quantity, setQuantity] = useState("");
  const [dateAdded, setDateAdded] = useState("");
  const { data } = useSession();
  const userEmail = data?.user?.email;
  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("item-name");

    const newItem = {
      name,
      quantity,
      dateAdded: dateAdded || new Date().toISOString().slice(0, 10),
      email: userEmail,
    };

    // TODO: replace with API call
    onAdd?.(newItem);
    console.log("New inventory item:", newItem);

    // reset & close
    setQuantity("");
    setDateAdded("");
    onClose?.();
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative w-full max-w-md mx-4 rounded-2xl bg-primary-accent text-input-text shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-800">
          <h3 className="text-base sm:text-lg font-oswald">
            Add New Inventory Item
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 cursor-pointer"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="px-5 py-4 space-y-4 text-sm">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-neutral-300" htmlFor="item-name">
              Item Name
            </label>
            <select
              name="item-name"
              id="item-name"
              className="
    w-full
    bg-white
    text-primary-accent
    px-4 py-2
    rounded-lg
    border border-primary-accent/20
    shadow-sm
    focus:outline-none
    focus:ring-2
    focus:ring-primary-accent/40
    focus:border-primary-accent
    transition-all
    cursor-pointer
  "
            >
              {mainInventoryData.map((item) => (
                <option
                  key={item._id}
                  value={item.name}
                  className="text-primary-accent"
                >
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-neutral-300" htmlFor="item-quantity">
              Quantity
            </label>
            <input
              id="item-quantity"
              type="text"
              required
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="e.g., 1 Gallon"
              className="rounded-lg bg-[#262626] border border-neutral-700 px-3 py-2 text-sm text-input-text placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-lime-400"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-neutral-300" htmlFor="item-date">
              Date Added
            </label>
            <input
              id="item-date"
              type="date"
              value={dateAdded}
              onChange={(e) => setDateAdded(e.target.value)}
              className="rounded-lg bg-[#262626] border border-neutral-700 px-3 py-2 text-sm text-input-text placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-lime-400"
            />
            <span className="text-[0.7rem] text-neutral-400">
              Leave empty to use today&apos;s date.
            </span>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-2 pt-2 pb-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 rounded-lg text-xs sm:text-sm font-medium bg-[#262626] text-neutral-200 border border-neutral-700 hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold bg-lime-400 text-black shadow-md hover:bg-lime-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 cursor-pointer"
            >
              Add Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
