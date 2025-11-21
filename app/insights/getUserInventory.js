import dbConnect from "../lib/dbConnect";

function normalizeCategory(cat) {
  if (!cat) return "unknown";
  let c = cat.toLowerCase().trim();
  if (c.endsWith("s")) c = c.slice(0, -1);
  return c;
}

export async function getUserInventory(email) {
  const inv = await dbConnect("inventory");

  const docs = await inv.find({ email }).toArray();

  return docs.map((item) => ({
    ...item,
    categoryNorm: normalizeCategory(item.category),
    quantityNum: item.quantity ?? 0,
    expirationDays: item.expirationDays ?? 7, // fallback
  }));
}
