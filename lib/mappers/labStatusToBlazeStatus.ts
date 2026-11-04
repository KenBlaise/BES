import type { BlazeOrderStatus, LabStatus } from "@/lib/types";

const BLAZE_TIMELINE: BlazeOrderStatus[] = [
  "ORDER_RECEIVED",
  "PRESCRIPTION_VERIFIED",
  "SENT_TO_LAB",
  "LENSES_IN_PRODUCTION",
  "QUALITY_CHECK",
  "ON_THE_WAY_TO_BLAZE",
  "ARRIVED_AT_BLAZE",
  "READY_FOR_PICKUP",
];

export function getBlazeOrderTimeline() {
  return BLAZE_TIMELINE;
}

export function labStatusToBlazeStatus(status: LabStatus): BlazeOrderStatus {
  switch (status) {
    case "received":
      return "SENT_TO_LAB";
    case "rx_verified":
      return "PRESCRIPTION_VERIFIED";
    case "in_production":
      return "LENSES_IN_PRODUCTION";
    case "qc":
      return "QUALITY_CHECK";
    case "shipped":
      return "ON_THE_WAY_TO_BLAZE";
    case "delivered":
      return "ARRIVED_AT_BLAZE";
    default:
      return "ORDER_RECEIVED";
  }
}

export function blazeStatusLabel(status: BlazeOrderStatus) {
  const labels: Record<BlazeOrderStatus, string> = {
    ORDER_RECEIVED: "Order received",
    PRESCRIPTION_VERIFIED: "Prescription verified",
    SENT_TO_LAB: "Sent to lab",
    LENSES_IN_PRODUCTION: "Lenses in production",
    QUALITY_CHECK: "Quality check",
    ON_THE_WAY_TO_BLAZE: "On the way to Blaze",
    ARRIVED_AT_BLAZE: "Arrived at Blaze",
    READY_FOR_PICKUP: "Ready for pickup",
  };
  return labels[status];
}

export function blazeStatusIndex(status: BlazeOrderStatus) {
  return BLAZE_TIMELINE.indexOf(status);
}
