import type { BlazeCustomer } from "@/lib/types";

export const kenCustomer: BlazeCustomer = {
  blazeCustomerId: "BLZ-10482",
  myBlazeAccountId: "MB-83921",
  firstName: "Ken",
  lastName: "Blaze",
  dateOfBirth: "01/15/1984",
  phone: "(404) 555-1234",
  email: "ken@example.com",
  address: "1182 Ridgeland Drive",
  city: "Snellville",
  state: "GA",
  zipCode: "30078",
  customerStatus: "active",
  crystalPatientId: "CRY-28491",
  anagramPatientId: "ANA-19281",
  createdAt: "2025-11-03T15:40:00.000Z",
  updatedAt: "2026-09-12T10:18:00.000Z",
};

export const seedCustomers: BlazeCustomer[] = [kenCustomer];
