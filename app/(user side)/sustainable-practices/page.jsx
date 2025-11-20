import ResourceHub from "@/app/components/ui/ResourceHub";

// Minimal demo data (you'll replace this later)
const demoResources = [
  {
    id: "vinegar-wash-berries",
    title: "The Vinegar Wash for Berries",
    description:
      "Kill mold spores with a 1:3 vinegar-water bath. Dry thoroughly before storing to extend berry shelf life by days.",
    category: "Storage",
    relatedFoodCategory: "Fruit",
    type: "Guide",
    impactLevel: "Medium",
    url: "https://www.allrecipes.com/how-to-keep-berries-fresh-for-longer-11757783",
    aiTags: [
      "mold",
      "berries",
      "vinegar",
      "cleaning",
      "shelf-life",
      "strawberry",
    ],
  },
  {
    id: "leftover-rice-pancakes",
    title: "Crispy Pancakes from Leftover Rice",
    description:
      "Turn leftover rice into savory pancakes with a little onion, chili, and gram flour. Great for breakfast or snacks.",
    category: "Reuse Leftovers",
    relatedFoodCategory: "Grains",
    type: "Recipe",
    impactLevel: "High",
    url: "https://example.com/leftover-rice-pancakes",
    aiTags: ["leftovers", "rice", "snack", "budget", "quick"],
  },
  {
    id: "onion-storage",
    title: "Breathable Storage for Onions",
    description:
      "Store onions in mesh bags or perforated baskets away from potatoes to reduce sprouting and rot.",
    category: "Storage",
    relatedFoodCategory: "Vegetables",
    type: "Tip",
    impactLevel: "Low",
    url: "https://example.com/onion-storage",
    aiTags: ["onion", "sprouting", "pantry", "airflow"],
  },
];

const getData = async () => {
  const res = await fetch("http://localhost:3000/api/resources", {
    cache: "force-cache",
  });
  return res.json();
};

export default async function ResourceHubPage() {
  const data = await getData();
  return (
    <div className="min-h-screen bg-main-bg px-4 sm:px-6 lg:px-8 py-8 font-plus-jakarta-sans">
      <main className="max-w-11/12 sm:max-w-10/12 lg:max-w-9/12 mx-auto">
        <ResourceHub initialResources={data} />
      </main>
    </div>
  );
}
