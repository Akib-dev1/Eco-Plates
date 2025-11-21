import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export const dynamic = "force-dynamic";

const getData = async (email) => {
  const res = await fetch(
    `https://eco-plates.vercel.app/api/insights?email=${email}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch insights");
  }

  return res.json();
};

export default async function InsightsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold">Please log in first.</h1>
      </div>
    );
  }

  const email = session?.user?.email;
  const data = await getData(email);
  console.log("Insights data:", data);

  return (
    <div className="min-h-screen bg-main-bg text-white">
      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Page heading */}
        <header className="text-center mb-10">
          <h1 className="text-4xl font-semibold tracking-tight text-primary-btn-bg">
            Insights
          </h1>
          <p className="mt-2 text-sm text-neutral-800">
            Understand your consumption patterns and reduce food waste.
          </p>
        </header>

        <div className="space-y-6">
          {/* Average per day */}
          <section className="bg-[#111111] border border-neutral-800 rounded-xl px-6 py-5 shadow-[0_18px_40px_rgba(0,0,0,0.7)]">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 text-lg">
                ⏱
              </span>
              <h2 className="text-lg font-semibold">
                Average Consumption Per Day
              </h2>
            </div>

            <div className="mt-1 space-y-2 text-sm">
              {Object.entries(data.categoryAvgPerDay || {}).map(
                ([cat, avg]) => (
                  <div key={cat} className="flex items-baseline gap-2">
                    <span className="uppercase text-[0.7rem] tracking-wide text-neutral-400">
                      {cat}:
                    </span>
                    <span className="text-2xl font-semibold text-emerald-400">
                      {Number(avg).toFixed(2)}
                    </span>
                    <span className="text-xs text-neutral-400">units/day</span>
                  </div>
                )
              )}

              {Object.keys(data.categoryAvgPerDay || {}).length === 0 && (
                <p className="text-sm text-neutral-400">
                  No consumption data available yet.
                </p>
              )}
            </div>
          </section>

          {/* Waste predictions */}
          <section className="bg-[#111111] border border-neutral-800 rounded-xl px-6 py-5 shadow-[0_18px_40px_rgba(0,0,0,0.7)]">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/10 text-amber-400 text-lg">
                ⚠️
              </span>
              <h2 className="text-lg font-semibold">
                Items Likely to Be Wasted (3–7 Days)
              </h2>
            </div>

            {data.wastePredictions?.length === 0 && (
              <div className="rounded-lg bg-emerald-700/70 text-sm px-4 py-3 flex items-center gap-2">
                <span className="text-lg">✅</span>
                <span>No high-risk items 🎉</span>
              </div>
            )}

            {data.wastePredictions && data.wastePredictions.length > 0 && (
              <div className="space-y-3">
                {data.wastePredictions.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-lg border border-neutral-800 bg-[#181818] px-4 py-3 text-sm"
                  >
                    <div className="flex justify-between mb-1">
                      <span className="font-semibold capitalize text-neutral-100">
                        {item.name}{" "}
                        <span className="text-neutral-400">
                          ({item.category})
                        </span>
                      </span>
                      <span className="text-xs uppercase tracking-wide text-amber-300">
                        Risk: {item.localRisk}
                      </span>
                    </div>

                    <p className="text-xs text-neutral-300">
                      Expires in{" "}
                      <span className="font-semibold">
                        {item.daysUntilExpiry}
                      </span>{" "}
                      days
                    </p>
                    <p className="text-xs text-neutral-300">
                      Estimated days to finish:{" "}
                      {Number.isFinite(item.estimatedDaysToFinish)
                        ? Math.round(item.estimatedDaysToFinish)
                        : "∞"}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* AI Suggestions */}
          {data.aiAdvice && (
            <section className="bg-[#111111] border border-neutral-800 rounded-xl px-6 py-5 shadow-[0_18px_40px_rgba(0,0,0,0.7)]">
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 text-lg">
                  ✨
                </span>
                <h2 className="text-lg font-semibold">
                  AI Suggestions to Reduce Waste
                </h2>
              </div>

              <div className="text-sm leading-relaxed text-neutral-200 whitespace-pre-wrap">
                {data.aiAdvice}
              </div>
            </section>
          )}
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-[0.70rem] text-neutral-500">
          © 2024 WasteNot. All rights reserved.
        </footer>
      </main>
    </div>
  );
}
