import FoodScanUpload from "@/app/components/ui/FoodScanUpload";

const getData = async () => {
  const res = await fetch("http://localhost:3000/api/inventory");
  return res.json();
};

export default async function FoodScanUploadPage() {
  const items = await getData();
  return (
    <div className="min-h-screen bg-main-bg px-4 sm:px-6 lg:px-8 py-8 font-plus-jakarta-sans">
      <main className="max-w-11/12 sm:max-w-10/12 lg:max-w-9/12 mx-auto">
        <FoodScanUpload items={items} />
      </main>
    </div>
  );
}
