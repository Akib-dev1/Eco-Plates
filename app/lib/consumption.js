import dbConnect from "./dbConnect";

/**
 * Estimate average daily usage of an item (by name) for a user over N days.
 * Logs assumed schema:
 * { email, itemName, quantity: string/number, dateLogged: "YYYY-MM-DD" }
 */
export async function getAverageDailyUsage(email, itemName, days = 30) {
  const logsCol = await dbConnect("logs");

  const since = new Date();
  since.setDate(since.getDate() - days);
  const sinceStr = since.toISOString().slice(0, 10); // "YYYY-MM-DD"

  const result = await logsCol
    .aggregate([
      {
        $match: {
          email,
          itemName,
          // if dateLogged is stored as string "YYYY-MM-DD"
          dateLogged: { $gte: sinceStr },
        },
      },
      {
        $group: {
          _id: null,
          totalQty: {
            $sum: {
              // quantity comes as string like ".6"
              $toDouble: "$quantity",
            },
          },
        },
      },
    ])
    .toArray();

  if (!result.length) return 0;

  const totalQty = result[0].totalQty;
  return totalQty / days; // average per day
}
