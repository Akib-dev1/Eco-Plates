import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ConsumptionHistoryTable from "@/app/components/ui/ConsumptionHistoryTable";
import DailyFoodUsageForm from "@/app/components/ui/DailyFoodUsageForm";
import InventoryTable from "@/app/components/ui/InventoryTable";
import MyDetailsForm from "@/app/components/ui/MyDetailsForm";
import WelcomeBanner from "@/app/components/ui/WelcomeBanner";
import { getServerSession } from "next-auth";

const mockInventory = [
  {
    id: 1,
    name: "Organic Milk",
    quantity: "1 Gallon",
    dateAdded: "2023-10-26",
  },
  {
    id: 2,
    name: "Whole Wheat Bread",
    quantity: "1 Loaf",
    dateAdded: "2023-10-25",
  },
  { id: 3, name: "Avocados", quantity: "4", dateAdded: "2023-10-24" },
];

const mockHistory = [
  {
    id: 1,
    name: "Apple Slices",
    quantity: "1 cup",
    category: "Snack",
    date: "2023-10-26",
  },
  {
    id: 2,
    name: "Grilled Chicken",
    quantity: "4 oz",
    category: "Protein",
    date: "2023-10-25",
  },
];

const getData = async (email) => {
  const res = await fetch(`http://localhost:3000/api/users/${email}`, {
    cache: "force-cache",
  });
  return res.json();
};

const getHistory = async (email) => {
  const res = await fetch(`http://localhost:3000/api/logs/${email}`, {
    cache: "force-cache",
  });
  return res.json();
};

const getInventory = async (email) => {
  const res = await fetch(`http://localhost:3000/api/inventoryUsers/${email}`, {
    cache: "force-cache",
  });
  return res.json();
};

export default async function DashboardPage() {
  const { user } = await getServerSession(authOptions);
  const userData = await getData(user.email);
  const userHistory = await getHistory(user.email);
  const userInventory = await getInventory(user.email);

  return (
    <div className="min-h-screen bg-main-bg px-4 sm:px-6 lg:px-8 py-8 font-plus-jakarta-sans">
      <main className="max-w-11/12 sm:max-w-10/12 lg:max-w-9/12 mx-auto space-y-6">
        <WelcomeBanner userData={userData} />

        <section className="rounded-2xl shadow-xl p-6 sm:p-7 lg:p-8 space-y-8 bg-primary-accent text-input-text">
          <MyDetailsForm userData={userData} />

          <div className="border-t border-neutral-800" />

          <DailyFoodUsageForm />

          <div className="border-t border-neutral-800" />

          <InventoryTable items={userInventory} />

          <div className="border-t border-neutral-800" />

          <ConsumptionHistoryTable items={userHistory} />
        </section>
      </main>
    </div>
  );
}
