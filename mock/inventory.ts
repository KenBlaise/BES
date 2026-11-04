import { frames } from "@/mock/frames";
import type { InventoryItem } from "@/lib/types";

export const seedInventory: InventoryItem[] = frames.map((frame, index) => ({
  frameId: frame.id,
  onHand: [4, 2, 6, 1, 3, 5][index % 6],
  location: "Snellville Studio",
}));
