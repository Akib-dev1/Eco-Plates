"use client";

import { useRouter } from "next/navigation";
import { use, useState } from "react";
import toast from "react-hot-toast";

export default function MyDetailsForm({ userData }) {
  const route = useRouter();
  const [location, setLocation] = useState(userData?.location || "");
  const [budget, setBudget] = useState(userData?.budgetLimit || "");
  const [dietaryPrefs, setDietaryPrefs] = useState(
    userData?.dietaryPreferences || []
  );

  const allPrefs = ["Vegetarian", "Halal", "Gluten-Free", "Keto"];

  const togglePref = (pref) => {
    setDietaryPrefs((prev) =>
      prev.includes(pref) ? prev.filter((p) => p !== pref) : [...prev, pref]
    );
  };

  const handleSaveDetails = async (e) => {
    e.preventDefault();

    const payload = {
      location,
      budgetLimit: budget,
      dietaryPreferences: dietaryPrefs,
    };

    console.log("Submitting user details:", payload);
    const res = await fetch(
      `https://eco-plates.vercel.app/api/users/${userData?.email}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    const data = await res.json();
    if (data.acknowledged) {
      toast.success("Details updated successfully!");
      route.refresh();
    }
    // TODO: Replace with real API call
    // await updateUserDetails(payload);
  };

  return (
    <div>
      <h2 className="text-lg sm:text-xl mb-4 font-oswald text-input-text">
        My Details
      </h2>

      <form
        onSubmit={handleSaveDetails}
        className="space-y-5 text-sm sm:text-base"
      >
        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Location */}
          <label className="flex flex-col gap-1 text-xs sm:text-sm text-neutral-200">
            Location
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., San Francisco, CA"
              className="rounded-lg bg-[#262626] border border-neutral-700 px-3 py-2 text-input-text placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-lime-400"
            />
          </label>

          {/* Budget */}
          <label className="flex flex-col gap-1 text-xs sm:text-sm text-neutral-200">
            Weekly Budget ($)
            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="e.g., 600"
              className="rounded-lg bg-[#262626] border border-neutral-700 px-3 py-2 text-input-text placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-lime-400"
            />
          </label>
        </div>

        {/* Dietary Preferences */}
        <div className="space-y-2">
          <p className="text-xs sm:text-sm text-neutral-200">
            Dietary Preferences
          </p>

          <div className="flex flex-wrap gap-2">
            {allPrefs.map((pref) => {
              const isActive = dietaryPrefs.includes(pref);
              return (
                <button
                  key={pref}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => togglePref(pref)}
                  className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium cursor-pointer transition
                    ${
                      isActive
                        ? "bg-lime-400 text-black shadow-sm hover:bg-lime-300"
                        : "bg-[#262626] text-neutral-200 border border-neutral-600 hover:bg-neutral-800 hover:border-neutral-400"
                    }
                  `}
                >
                  {pref}
                </button>
              );
            })}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-semibold shadow-md bg-primary-btn-bg text-primary-btn-text border border-neutral-600 hover:bg-neutral-900 hover:border-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 cursor-pointer"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
