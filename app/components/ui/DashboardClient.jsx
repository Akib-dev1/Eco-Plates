// components/dashboard/DashboardClient.jsx
"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";

export default function DashboardClient({
  inventory,
  impact,
  mealsToday,
  recentLogs,
  expiringItems,
  user,
}) {
  const handleAddItem = () => console.log("Add item");
  const handleGeneratePlan = () => console.log("Generate plan");

  return (
    <div className="min-h-screen bg-main-bg text-primary-accent font-plus-jakarta-sans">
      {/* ✅ LOGOUT BUTTON (TOP RIGHT) */}
      <div className="max-w-11/12 sm:max-w-10/12 lg:max-w-9/12 mx-auto flex justify-end py-6">
        <button
          onClick={() => signOut()}
          className="px-4 py-2 rounded-full bg-primary-accent text-input-text text-sm font-medium hover:bg-primary-accent/90"
        >
          Logout
        </button>
      </div>

      {/* MAIN CONTENT */}
      <main className="max-w-11/12 sm:max-w-10/12 lg:max-w-9/12 mx-auto px-4 sm:px-6 lg:px-8 pb-10 space-y-8">
        {/* Greeting */}
        <section>
          <h1 className="font-oswald text-3xl">Welcome, {user?.name}!</h1>
          <p className="text-primary-accent/70 mt-1">
            Your efforts have saved{" "}
            <span className="font-semibold">{impact.wasteSavedKg}kg</span> of
            food this month.
          </p>

          {/* CTA Buttons */}
          <div className="flex gap-3 mt-4">
            <button
              onClick={handleAddItem}
              className="px-4 py-2 rounded-full bg-primary-accent text-input-text text-sm hover:bg-primary-accent/90"
            >
              Add Item
            </button>
            <button
              onClick={handleGeneratePlan}
              className="px-4 py-2 rounded-full bg-nav-panel text-primary-accent border border-primary-accent/10 hover:bg-primary-accent/5"
            >
              Generate Plan
            </button>
            <Link
              href={"/insights"}
              className="px-4 py-2 rounded-full bg-nav-panel text-primary-accent border border-primary-accent/10 hover:bg-primary-accent/5"
            >
              Insights
            </Link>
          </div>
        </section>

        {/* TOP CARDS */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Inventory */}
          <div className="bg-primary-accent text-input-text rounded-2xl p-5 shadow-lg">
            <h2 className="text-sm font-semibold">My Inventory</h2>
            <div className="mt-5 flex items-end gap-3">
              <span className="font-oswald text-4xl">
                {inventory.totalItems}
              </span>
              <div className="text-xs text-input-text/70">
                <p>Total Items</p>
                <p>Expiring Soon: {inventory.expiringSoon}</p>
              </div>
            </div>
          </div>

          {/* Impact */}
          <div className="bg-primary-accent text-input-text rounded-2xl p-5 shadow-lg">
            <h2 className="text-sm font-semibold">Your Impact</h2>

            <div className="mt-5">
              <p className="font-oswald text-4xl">{impact.wasteSavedKg}kg</p>
              <p className="text-xs text-input-text/70 mt-1">Waste Saved</p>

              <div className="mt-3 h-2 bg-input-text/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#f3b54a]"
                  style={{ width: `${impact.progress}%` }}
                />
              </div>

              <p className="text-xs text-input-text/70 mt-2">
                {impact.progress}% to monthly goal
              </p>
            </div>
          </div>

          {/* Today's Meals */}
          <div className="bg-primary-accent text-input-text rounded-2xl p-5 shadow-lg">
            <h2 className="text-sm font-semibold">Today&apos;s Meals</h2>

            <div className="mt-5 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-input-text/70">Breakfast</span>
                <span>{mealsToday.breakfast}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-input-text/70">Lunch</span>
                <span>{mealsToday.lunch}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-input-text/70">Dinner</span>
                <span>{mealsToday.dinner}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Logs + Recommendation */}
        <section className="grid grid-cols-1 lg:grid-cols-[2fr,1.2fr] gap-5">
          {/* Logs */}
          <div className="bg-primary-accent text-input-text rounded-2xl p-5 shadow-lg">
            <h2 className="text-sm font-semibold mb-4">Recent Logs</h2>

            <ul className="divide-y divide-input-text/10">
              {recentLogs.map((log) => (
                <li key={log.id} className="py-3 flex justify-between">
                  <div>
                    <p className="font-semibold">{log.title}</p>
                    <p className="text-xs text-input-text/70">{log.subtitle}</p>
                  </div>
                  <span className="text-xs text-input-text/60">{log.time}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Recommendation */}
          <div className="bg-primary-accent text-input-text rounded-2xl p-5 shadow-lg">
            <h2 className="text-sm font-semibold mb-4">Recommendation</h2>

            <div className="bg-primary-accent border border-input-text/10 rounded-xl p-4">
              <p className="font-semibold text-sm mb-2">Smart Suggestion</p>
              <p className="text-xs text-input-text/70">
                Your tomatoes and chicken are expiring soon. Try making a{" "}
                <span className="font-semibold">Chicken Tomato Curry</span>.
              </p>

              <button className="w-full mt-3 px-4 py-2 rounded-full bg-input-text text-primary-accent text-xs font-semibold hover:bg-input-text/90">
                Get Recipe →
              </button>
            </div>
          </div>
        </section>

        {/* Expiring Items */}
        <section className="bg-primary-accent text-input-text rounded-2xl p-5 shadow-lg">
          <h2 className="text-sm font-semibold mb-4">Use It or Lose It!</h2>

          <div className="space-y-3">
            {expiringItems.map((item) => (
              <div key={item.id} className="flex items-center gap-4 text-sm">
                <span className="w-32">{item.name}</span>

                <div className="flex-1">
                  <div className="h-2 bg-input-text/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#f3b54a]"
                      style={{ width: `${item.percent}%` }}
                    ></div>
                  </div>
                </div>

                <span className="w-20 text-right text-input-text/70">
                  {item.daysLeft} days left
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
