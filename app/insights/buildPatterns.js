export function buildPatterns(logs) {
  const DAYS = 28;
  const categoryTotals = {};

  for (const log of logs) {
    categoryTotals[log.categoryNorm] =
      (categoryTotals[log.categoryNorm] || 0) + log.quantityNum;
  }

  const categoryAvgPerDay = {};
  for (const [cat, total] of Object.entries(categoryTotals)) {
    categoryAvgPerDay[cat] = total / DAYS;
  }

  return { categoryTotals, categoryAvgPerDay };
}
