import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
export function parseQuantity(q) {
  const num = parseFloat(q);
  return isNaN(num) ? 0 : num;
}

export function normalizeCategory(cat) {
  if (!cat) return "unknown";
  let c = cat.toLowerCase().trim();
  if (c.endsWith("s")) c = c.slice(0, -1); // "Grains" → "grain"
  return c;
}
