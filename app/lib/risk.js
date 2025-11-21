// lib/risk.js

export function getCategoryRiskBoost(category = "") {
  const cat = (category || "").toLowerCase();

  if (
    ["fruit", "fruits", "vegetable", "vegetables", "veggies"].some((c) =>
      cat.includes(c)
    )
  ) {
    return 0.25;
  }
  if (["dairy", "milk", "yogurt"].some((c) => cat.includes(c))) {
    return 0.2;
  }
  if (["meat", "fish", "chicken", "egg"].some((c) => cat.includes(c))) {
    return 0.2;
  }
  if (
    ["grain", "grains", "rice", "lentil", "pulse"].some((c) => cat.includes(c))
  ) {
    return 0.05;
  }
  return 0.1; // default
}

export function getSeasonRiskBoost() {
  // Simple: treat March–September as "warm season"
  const month = new Date().getMonth() + 1;
  const warm = month >= 3 && month <= 9;
  return warm ? 0.1 : 0;
}

export function computeRiskScore(daysToExpiry, daysToFinish, category) {
  if (daysToExpiry <= 0) return 1.0;

  const noUsage = !isFinite(daysToFinish);
  let base = 0;

  if (noUsage) {
    base = daysToExpiry <= 3 ? 0.8 : 0.4;
  } else if (daysToFinish > daysToExpiry) {
    base = 0.75;
  } else if (daysToExpiry <= 3) {
    base = 0.7;
  } else if (daysToExpiry <= 7) {
    base = 0.5;
  } else {
    base = 0.25;
  }

  const categoryBoost = getCategoryRiskBoost(category);
  const seasonBoost = getSeasonRiskBoost();

  let score = base + categoryBoost + seasonBoost;

  // clamp 0–1
  if (score > 1) score = 1;
  if (score < 0) score = 0;

  return score;
}

export function getRiskLevel(score) {
  if (score >= 0.7) return "high";
  if (score >= 0.4) return "medium";
  return "low";
}

export function buildRiskReason(item, daysToExpiry, daysToFinish, riskLevel) {
  const name = item.name || "This item";

  if (daysToExpiry <= 0) {
    return `${name} is already past its expected expiry date.`;
  }

  if (!isFinite(daysToFinish)) {
    return `${name} has no recent consumption logs and may be left unused before it expires.`;
  }

  if (riskLevel === "high") {
    return `${name} might not be finished before expiry based on your current usage. Try using it soon.`;
  }

  if (riskLevel === "medium") {
    return `${name} is okay for now, but keep an eye on it this week.`;
  }

  return `${name} looks low risk based on shelf life and your usage.`;
}
