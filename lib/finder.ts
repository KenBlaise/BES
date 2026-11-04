import type { Frame, PriceRangeId, StylePreference, StyleProfile } from "@/lib/types";
import { frames } from "@/mock/frames";

export const STYLE_OPTIONS: { id: StylePreference; label: string; hint: string }[] = [
  { id: "classic", label: "Classic", hint: "Timeless lines, easy to wear" },
  { id: "bold", label: "Bold", hint: "Statement shapes and presence" },
  { id: "minimal", label: "Minimal", hint: "Quiet, refined, architectural" },
  { id: "luxury", label: "Luxury", hint: "Craft, finish, and heritage" },
  { id: "sport", label: "Sport", hint: "Light, active, contemporary" },
];

export const SHAPE_OPTIONS = [
  { id: "round", label: "Round" },
  { id: "square", label: "Square" },
  { id: "rectangle", label: "Rectangle" },
  { id: "aviator", label: "Aviator" },
  { id: "geometric", label: "Geometric" },
  { id: "not-sure", label: "Not sure" },
];

export const COLOR_OPTIONS = [
  { id: "black", label: "Black" },
  { id: "tortoise", label: "Tortoise" },
  { id: "clear", label: "Clear" },
  { id: "metal", label: "Metal" },
  { id: "colorful", label: "Colorful" },
  { id: "no-preference", label: "No preference" },
];

export const BUDGET_OPTIONS: { id: PriceRangeId; label: string; min: number; max: number }[] = [
  { id: "under-250", label: "Under $250", min: 0, max: 249 },
  { id: "250-400", label: "$250–$400", min: 250, max: 400 },
  { id: "400-600", label: "$400–$600", min: 400, max: 600 },
  { id: "600-plus", label: "$600+", min: 600, max: 10000 },
];

function priceFits(price: number, range?: PriceRangeId) {
  if (!range) return true;
  const option = BUDGET_OPTIONS.find((item) => item.id === range);
  if (!option) return true;
  return price >= option.min && price <= option.max;
}

export function recommendFrames(input: {
  style?: StylePreference;
  shapes: string[];
  colors: string[];
  priceRange?: PriceRangeId;
}): StyleProfile {
  const openShapes = input.shapes.includes("not-sure") || input.shapes.length === 0;
  const openColors = input.colors.includes("no-preference") || input.colors.length === 0;

  const scored = frames
    .map((frame) => {
      let score = 0;
      if (input.style && frame.styleTags.includes(input.style)) score += 3;
      if (openShapes || input.shapes.includes(frame.shape)) score += 2;
      if (openColors || input.colors.includes(frame.colorFamily)) score += 2;
      if (priceFits(frame.price, input.priceRange)) score += 2;
      return { frame, score };
    })
    .sort((a, b) => b.score - a.score || a.frame.price - b.frame.price);

  const uniqueBrands = new Set<string>();
  const picks: Frame[] = [];
  for (const item of scored) {
    if (picks.length >= 6) break;
    if (uniqueBrands.has(item.frame.brand) && picks.length >= 3) continue;
    uniqueBrands.add(item.frame.brand);
    picks.push(item.frame);
  }

  return {
    style: input.style,
    shapes: input.shapes.filter((shape) => shape !== "not-sure"),
    colors: input.colors.filter((color) => color !== "no-preference"),
    priceRange: input.priceRange,
    recommendedFrameIds: picks.map((frame) => frame.id),
  };
}
