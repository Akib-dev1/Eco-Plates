import InventoryPage from "@/app/components/ui/InventoryPage";

export const dynamic = "force-dynamic";

const getData = async () => {
  const res = await fetch("https://eco-plates.vercel.app/api/inventory");
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
