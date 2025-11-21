import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ConsumptionHistoryTable from "@/app/components/ui/ConsumptionHistoryTable";
import DailyFoodUsageForm from "@/app/components/ui/DailyFoodUsageForm";
import InventoryTable from "@/app/components/ui/InventoryTable";
import MyDetailsForm from "@/app/components/ui/MyDetailsForm";
import WelcomeBanner from "@/app/components/ui/WelcomeBanner";
import { getServerSession } from "next-auth";

export const dynamic = "force-dynamic";

const getData = async (email) => {
  const res = await fetch(`https://eco-plates.vercel.app/api/users/${email}`);
  return res.json();
};

const getHistory = async (email) => {
  const res = await fetch(`https://eco-plates.vercel.app/api/logs/${email}`);
  return res.json();
};

const getInventory = async (email) => {
  const res = await fetch(
    `https://eco-plates.vercel.app/api/inventoryUsers/${email}`
  );
  return res.json();
};

const getMainInventory = async () => {
  const res = await fetch(`https://eco-plates.vercel.app/api/inventory/`);
  return res.json();
};

export default async function DashboardPage() {
  const data = await getServerSession(authOptions);
  const user = data?.user;
  const userData = await getData(user.email);
  const userHistory = await getHistory(user.email);
  const userInventory = await getInventory(user.email);
  const mainInventoryData = await getMainInventory();

  return (
    <div className="min-h-screen bg-main-bg px-4 sm:px-6 lg:px-8 py-8 font-plus-jakarta-sans">
      <main className="max-w-11/12 sm:max-w-10/12 lg:max-w-9/12 mx-auto space-y-6">
        <WelcomeBanner userData={userData} />

        <section className="rounded-2xl shadow-xl p-6 sm:p-7 lg:p-8 space-y-8 bg-primary-accent text-input-text">
          <MyDetailsForm userData={userData} />

          <div className="border-t border-neutral-800" />

          <DailyFoodUsageForm userInventory={userInventory} />

          <div className="border-t border-neutral-800" />

          <InventoryTable
            items={userInventory}
            mainInventoryData={mainInventoryData}
          />

          <div className="border-t border-neutral-800" />

          <ConsumptionHistoryTable items={userHistory} />
        </section>
      </main>
    </div>
  );
}
