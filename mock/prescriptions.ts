import type { Prescription } from "@/lib/types";

export const kenPrescription: Prescription = {
  id: "RX-10482-01",
  blazeCustomerId: "BLZ-10482",
  crystalPatientId: "CRY-28491",
  examDate: "September 4, 2026",
  expirationDate: "September 4, 2027",
  right: { sphere: "-1.75", cylinder: "-0.50", axis: "090" },
  left: { sphere: "-2.00", cylinder: "-0.75", axis: "085" },
  add: "+1.75",
  pd: "63",
};

export const seedPrescriptions: Prescription[] = [kenPrescription];
