// components/dashboard/ConsumptionHistoryTable.jsx
"use client";

export default function ConsumptionHistoryTable({ items }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg sm:text-xl font-oswald text-input-text">
        Consumption History
      </h2>

      <div className="overflow-x-auto rounded-xl border border-neutral-800 bg-[#181818]">
        <table className="min-w-full text-left text-xs sm:text-sm text-input-text">
          <thead className="bg-[#202020] text-neutral-300">
            <tr>
              <th className="px-4 py-3 font-medium">Item Name</th>
              <th className="px-4 py-3 font-medium">Quantity</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Date Logged</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr
                key={item._id}
                className={
                  idx % 2 === 0
                    ? "bg-transparent"
                    : "bg-[rgba(255,255,255,0.02)]"
                }
              >
                <td className="px-4 py-3 whitespace-nowrap">{item.itemName}</td>
                <td className="px-4 py-3 whitespace-nowrap">{item.quantity}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[0.7rem] font-medium bg-lime-400/10 text-lime-300 border border-lime-500/40">
                    {item.category}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">{item.dateLogged}</td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-4 text-center text-neutral-400"
                >
                  No consumption history yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
