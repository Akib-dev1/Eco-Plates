import InventoryPage from "@/app/components/ui/InventoryPage";

const mockInventory = [
  {
    id: "1",
    name: "Ilish Fish",
    category: "Protein",
    quantity: 1,
    unit: "piece",
    expirationDays: 2,
    costPerUnit: 650,
  },
  {
    id: "2",
    name: "Lentils (Dal)",
    category: "Grain",
    quantity: 500,
    unit: "g",
    expirationDays: 180,
    costPerUnit: 180,
  },
  {
    id: "3",
    name: "Eggplant",
    category: "Vegetable",
    quantity: 2,
    unit: "pieces",
    expirationDays: 4,
    costPerUnit: 40,
  },
];

const getData = async () => {
  const res = await fetch("http://localhost:3000/api/inventory");
  return res.json();
};

export default async function Page() {
  const items = await getData();
  return (
    <div className="min-h-screen bg-main-bg py-8 px-4 sm:px-6 lg:px-8 font-plus-jakarta-sans">
      <main className="max-w-11/12 sm:max-w-10/12 lg:max-w-9/12 mx-auto">
        <InventoryPage initialItems={items} />
      </main>
    </div>
  );
}
