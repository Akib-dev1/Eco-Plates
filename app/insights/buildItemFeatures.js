export function buildItemFeatures(inventory, categoryAvgPerDay) {
  const items = [];

  for (const item of inventory) {
    const daysUntilExpiry = item.expirationDays; // from schema

    const dailyUsage = categoryAvgPerDay[item.categoryNorm] || 0;
    const estimatedDaysToFinish =
      dailyUsage > 0 ? item.quantityNum / dailyUsage : Infinity;

    let localRisk = "low";
    if (daysUntilExpiry <= 7 && daysUntilExpiry < estimatedDaysToFinish) {
      localRisk = "high";
    } else if (daysUntilExpiry <= 7) {
      localRisk = "medium";
    }

    items.push({
      id: String(item._id),
      name: item.name,
      category: item.categoryNorm,
      quantity: item.quantityNum,
      unit: item.unit,
      daysUntilExpiry,
      dailyCategoryConsumption: dailyUsage,
      estimatedDaysToFinish,
      localRisk,
    });
  }

  return items;
}
