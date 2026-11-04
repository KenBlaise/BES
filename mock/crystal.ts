import type { CrystalOpticalOrder, CrystalPatient } from "@/lib/types";

export const kenCrystalPatient: CrystalPatient = {
  crystalPatientId: "CRY-28491",
  firstName: "Ken",
  lastName: "Blaze",
  dateOfBirth: "01/15/1984",
  phone: "(404) 555-1234",
  email: "ken@example.com",
  address: "1182 Ridgeland Drive",
  city: "Snellville",
  state: "GA",
  zip: "30078",
};

export const seedCrystalPatients: CrystalPatient[] = [kenCrystalPatient];

export const seedCrystalOrders: CrystalOpticalOrder[] = [
  {
    id: "CRY-ORD-8841",
    crystalPatientId: "CRY-28491",
    blazeOrderId: "10248",
    status: "in_lab",
    createdAt: "2026-09-12T16:06:00.000Z",
  },
];
