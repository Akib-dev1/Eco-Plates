import dbConnect from "../lib/dbConnect";

function parseQuantity(q) {
  const num = parseFloat(q);
  return isNaN(num) ? 0 : num;
}

function normalizeCategory(cat) {
  if (!cat) return "unknown";
  let c = cat.toLowerCase().trim();
  if (c.endsWith("s")) c = c.slice(0, -1); // "Grains" -> "grain"
  return c;
}

export async function getUserLogs(email) {
  const logsColl = await dbConnect("logs");

  const fromDate = new Date();
  fromDate.setDate(fromDate.getDate() - 28);

  const docs = await logsColl
    .find({
      email,
      dateLogged: { $gte: fromDate.toISOString() },
    })
    .toArray();

  return docs.map((log) => ({
    ...log,
    quantityNum: parseQuantity(log.quantity),
    categoryNorm: normalizeCategory(log.category),
    date: new Date(log.dateLogged),
  }));
}
