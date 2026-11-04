import type { BlazeOrder } from "@/lib/types";

export const kenOrder: BlazeOrder = {
  orderId: "10248",
  blazeCustomerId: "BLZ-10482",
  myBlazeAccountId: "MB-83921",
  crystalPatientId: "CRY-28491",
  frameId: "frm-tf-1234-black",
  frameBrand: "Vale & Co.",
  frameModel: "VL1234",
  frameColor: "Black",
  prescriptionReference: "RX-CRY-28491-2026",
  lensType: "Progressive",
  lensMaterial: "High Index",
  lensOptions: ["Premium Anti-Reflective"],
  retailPrice: 1245,
  estimatedBenefit: 360,
  estimatedCustomerResponsibility: 885,
  orderStatus: "LENSES_IN_PRODUCTION",
  labName: "Cherry Optical",
  labOrderId: "CHY-77201",
  createdAt: "2026-09-12T16:05:00.000Z",
  updatedAt: "2026-09-20T09:30:00.000Z",
};

export const seedOrders: BlazeOrder[] = [kenOrder];
