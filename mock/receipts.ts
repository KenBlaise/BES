import type { Receipt } from "@/lib/types";

export const kenReceipt: Receipt = {
  id: "RCP-10248",
  orderId: "10248",
  blazeCustomerId: "BLZ-10482",
  purchaseDate: "September 12, 2026",
  frame: "Vale & Co. VL1234 — Black",
  lenses: "Progressive · High Index · Premium Anti-Reflective",
  retailPrice: 1245,
  benefitApplied: 360,
  customerPaid: 885,
};

export const seedReceipts: Receipt[] = [kenReceipt];
