// components/dashboard/DailyFoodUsageForm.jsx
"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function DailyFoodUsageForm() {
  const { data } = useSession();
  const router = useRouter();
  const handleLogEntry = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const itemName = formData.get("itemName");
    const quantity = formData.get("quantity");
    const category = formData.get("category");
    const payload = {
      itemName,
      quantity,
      category,
      email: data.user.email,
      dateLogged: new Date().toISOString().split("T")[0],
    };
    const res = await fetch("http://localhost:3000/api/logs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const result = await res.json();
    if (result.insertedId) {
      toast.success("Log entry added successfully!");
      e.target.reset();
      router.refresh();
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg sm:text-xl font-oswald text-input-text">
        Daily Food Usage
      </h2>

      <form
        onSubmit={handleLogEntry}
        className="flex flex-col gap-4 md:grid md:grid-cols-[1.2fr,0.8fr,0.8fr,auto] md:items-end"
      >
        <label className="flex flex-col gap-1 text-xs sm:text-sm text-neutral-200">
          Item Name
          <input
            type="text"
            placeholder="e.g., Apple"
            name="itemName"
            className="rounded-lg bg-[#262626] border border-neutral-700 px-3 py-2 text-sm text-input-text placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-lime-400"
          />
        </label>

        <label className="flex flex-col gap-1 text-xs sm:text-sm text-neutral-200">
          Quantity
          <input
            type="text"
            name="quantity"
            placeholder="e.g., 2"
            className="rounded-lg bg-[#262626] border border-neutral-700 px-3 py-2 text-sm text-input-text placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-lime-400"
          />
        </label>

        <label className="flex flex-col gap-1 text-xs sm:text-sm text-neutral-200">
          Category
          <select
            defaultValue="vegetable"
            className="rounded-lg bg-[#262626] border border-neutral-700 px-3 py-2 text-sm text-input-text focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-lime-400"
            name="category"
          >
            <option value="vegetable">Vegetable</option>
            <option value="snack">Snack</option>
            <option value="protein">Protein</option>
            <option value="grain">Grain</option>
          </select>
        </label>

        <button
          type="submit"
          className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-semibold shadow-md bg-lime-400 text-black hover:bg-lime-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-300 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-accent cursor-pointer"
        >
          Log Entry
        </button>
      </form>
    </div>
  );
}
