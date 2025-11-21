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
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Insights</h1>

      {/* Average per day */}
      <section>
        <h2 className="text-xl font-semibold mb-2">
          Average Consumption Per Day
        </h2>
        <ul className="space-y-1">
          {Object.entries(data.categoryAvgPerDay || {}).map(([cat, avg]) => (
            <li key={cat}>
              <strong>{cat}:</strong> {Number(avg).toFixed(2)}
            </li>
          ))}
        </ul>
      </section>

      {/* Waste predictions */}
      <section>
        <h2 className="text-xl font-semibold mb-2">
          Items Likely to Be Wasted (3–7 Days)
        </h2>

        {data.wastePredictions?.length === 0 && <p>No high-risk items 🎉</p>}

        <div className="space-y-3">
          {data.wastePredictions?.map((item) => (
            <div key={item.id} className="border rounded p-4 shadow-sm">
              <div className="flex justify-between mb-1">
                <span className="font-semibold capitalize">
                  {item.name} ({item.category})
                </span>
                <span className="uppercase text-sm">
                  Risk: {item.localRisk}
                </span>
              </div>

              <p className="text-sm">
                Expires in <strong>{item.daysUntilExpiry}</strong> days
              </p>
              <p className="text-sm">
                Estimated days to finish:{" "}
                {Number.isFinite(item.estimatedDaysToFinish)
                  ? Math.round(item.estimatedDaysToFinish)
                  : "∞"}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 🔮 Gemini AI Suggestions */}
      {data.aiAdvice && (
        <section>
          <h2 className="text-xl font-semibold mb-2">
            AI Suggestions to Reduce Waste
          </h2>
          <div className="border rounded p-4 bg-gray-50 whitespace-pre-wrap">
            {data.aiAdvice}
          </div>
        </section>
      )}
    </div>
  );
}
