// 🔁 MOCK DATA – replace with real DB / API calls later
// ---------------------------------------------------

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import DashboardClient from "@/app/components/ui/DashboardClient";
import { getServerSession } from "next-auth";

export const dynamic = "force-dynamic";

// master inventory (static item info)

const getData1 = async (email) => {
  const res = await fetch(
    `https://eco-plates.vercel.app/api/inventoryUsers/${email}`
  );
  return res.json();
};

const getData2 = async () => {
  const res = await fetch(`https://eco-plates.vercel.app/api/inventory`);
  return res.json();
};

const getData3 = async (email) => {
  const res = await fetch(`https://eco-plates.vercel.app/api/logs/${email}`);
  return res.json();
};

export default async function DashboardPage() {
  const data = await getServerSession(authOptions);
  const user = data?.user;
  const email = user.email;
  const USER_INVENTORY = await getData1(email);

  const INVENTORY_MASTER = await getData2();

  // user inventory (what user actually has)

  // logs (meals / items user consumed/used)
  const LOGS = await getData3(email);

  // 🧮 Helpers
  // ---------

  function calculateInventorySummary(userInventory, inventoryMaster) {
    const totalItems = userInventory.reduce(
      (sum, item) => sum + Number(item.quantity || 0),
      0
    );

    const now = new Date();

    const expiringSoon = userInventory.filter((inv) => {
      const master = inventoryMaster.find((m) => m.name === inv.name);
      if (!master || !master.expirationDays || !inv.dateAdded) return false;

      const added = new Date(inv.dateAdded);
      const expiry = new Date(added);
      expiry.setDate(expiry.getDate() + master.expirationDays);

      const diffDays = (expiry - now) / (1000 * 60 * 60 * 24);
      return diffDays >= 0 && diffDays <= 7; // within next 7 days
    }).length;

    return { totalItems, expiringSoon };
  }

  function calculateImpact(logsForUser) {
    // fake logic: 1 unit = 0.25kg saved
    const totalKg = logsForUser.reduce(
      (sum, log) => sum + Number(log.quantity || 0) * 0.25,
      0
    );

    const monthlyGoalKg = 5; // pretend goal
    const progress = Math.min(100, Math.round((totalKg / monthlyGoalKg) * 100));

    return {
      wasteSavedKg: Number(totalKg.toFixed(1)),
      progress,
    };
  }

  function buildRecentLogs(logsForUser) {
    const sorted = [...logsForUser].sort(
      (a, b) => new Date(b.dateLogged) - new Date(a.dateLogged)
    );

    return sorted.slice(0, 3).map((log) => ({
      id: log._id,
      title: log.itemName,
      subtitle: `${log.category} · ${log.quantity} pcs`,
      time: new Date(log.dateLogged).toDateString(),
    }));
  }

  function buildExpiringItems(userInventory, inventoryMaster) {
    const now = new Date();

    const withDaysLeft = userInventory
      .map((inv) => {
        const master = inventoryMaster.find((m) => m.name === inv.name);
        if (!master || !master.expirationDays || !inv.dateAdded) return null;

        const added = new Date(inv.dateAdded);
        const expiry = new Date(added);
        expiry.setDate(expiry.getDate() + master.expirationDays);

        const diffDays = Math.round((expiry - now) / (1000 * 60 * 60 * 24));

        return {
          id: inv._id,
          name: inv.name,
          daysLeft: diffDays,
          percent: Math.max(
            0,
            Math.min(100, 100 - (diffDays / master.expirationDays) * 100)
          ),
        };
      })
      .filter(Boolean)
      .sort((a, b) => a.daysLeft - b.daysLeft)
      .slice(0, 4);

    return withDaysLeft;
  }

  async function getDashboardData(email) {
    // 👉 TODO: replace these filters with real DB queries by email
    const userInventory = USER_INVENTORY.filter((i) => i.email === email);
    console.log("User Inventory:", userInventory);
    const logsForUser = LOGS.filter((l) => l.email === email);

    const inventorySummary = calculateInventorySummary(
      userInventory,
      INVENTORY_MASTER
    );
    const impact = calculateImpact(logsForUser);
    const recentLogs = buildRecentLogs(logsForUser);
    const expiringItems = buildExpiringItems(userInventory, INVENTORY_MASTER);

    // mealsToday is still mock – you can build from logs later
    const mealsToday = {
      breakfast: "Oatmeal with Berries",
      lunch: "Chicken Salad",
      dinner: "Pasta with Tomatoes",
    };

    return {
      inventorySummary,
      impact,
      mealsToday,
      recentLogs,
      expiringItems,
    };
  }
  const { inventorySummary, impact, mealsToday, recentLogs, expiringItems } =
    await getDashboardData(email);

  return (
    <DashboardClient
      user={user}
      inventory={inventorySummary}
      impact={impact}
      mealsToday={mealsToday}
      recentLogs={recentLogs}
      expiringItems={expiringItems}
    />
  );
}
