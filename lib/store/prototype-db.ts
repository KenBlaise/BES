import { seedAccounts } from "@/mock/accounts";
import { seedAppointments } from "@/mock/appointments";
import { seedAuditEvents } from "@/mock/auditEvents";
import { seedBenefits } from "@/mock/benefits";
import { seedCrystalOrders, seedCrystalPatients } from "@/mock/crystal";
import { seedCustomers } from "@/mock/customers";
import { seedInventory } from "@/mock/inventory";
import { seedOrders } from "@/mock/orders";
import { seedPrescriptions } from "@/mock/prescriptions";
import { seedReceipts } from "@/mock/receipts";
import type {
  Appointment,
  AuditEvent,
  BenefitVerification,
  BlazeCustomer,
  BlazeOrder,
  CherryLabOrder,
  CrystalOpticalOrder,
  CrystalPatient,
  CustomerSession,
  EmployeeSession,
  InventoryItem,
  MyBlazeAccount,
  Prescription,
  Receipt,
} from "@/lib/types";

const STORAGE_KEY = "blaze-prototype-v1";

export interface PrototypeState {
  accounts: MyBlazeAccount[];
  customers: BlazeCustomer[];
  benefits: BenefitVerification[];
  orders: BlazeOrder[];
  appointments: Appointment[];
  prescriptions: Prescription[];
  receipts: Receipt[];
  inventory: InventoryItem[];
  auditEvents: AuditEvent[];
  crystalPatients: CrystalPatient[];
  crystalOrders: CrystalOpticalOrder[];
  cherryOrders: CherryLabOrder[];
  customerSession: CustomerSession | null;
  employeeSession: EmployeeSession | null;
  pendingSaveFrameId: string | null;
  pendingStyleSave: boolean;
  verifiedCustomerIds: string[];
}

function seedState(): PrototypeState {
  return {
    accounts: structuredClone(seedAccounts),
    customers: structuredClone(seedCustomers),
    benefits: structuredClone(seedBenefits),
    orders: structuredClone(seedOrders),
    appointments: structuredClone(seedAppointments),
    prescriptions: structuredClone(seedPrescriptions),
    receipts: structuredClone(seedReceipts),
    inventory: structuredClone(seedInventory),
    auditEvents: structuredClone(seedAuditEvents),
    crystalPatients: structuredClone(seedCrystalPatients),
    crystalOrders: structuredClone(seedCrystalOrders),
    cherryOrders: [
      {
        labOrderId: "CHY-77201",
        blazeOrderId: "10248",
        status: "in_production",
        trackingNumber: "CHY-TRK-44192",
        createdAt: "2026-09-13T08:15:00.000Z",
        updatedAt: "2026-09-20T09:30:00.000Z",
      },
    ],
    customerSession: null,
    employeeSession: null,
    pendingSaveFrameId: null,
    pendingStyleSave: false,
    verifiedCustomerIds: [],
  };
}

let memory = seedState();
let hydrated = false;
const listeners = new Set<() => void>();

function persist() {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(memory));
}

export function hydratePrototypeDb() {
  if (hydrated || typeof window === "undefined") return;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (raw) {
    try {
      memory = { ...seedState(), ...JSON.parse(raw) };
    } catch {
      memory = seedState();
    }
  }
  hydrated = true;
}

export function getState(): PrototypeState {
  if (typeof window !== "undefined" && !hydrated) {
    hydratePrototypeDb();
  }
  return memory;
}

export function setState(updater: (state: PrototypeState) => PrototypeState) {
  memory = updater(memory);
  persist();
  listeners.forEach((listener) => listener());
}

export function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function resetPrototypeDb() {
  memory = seedState();
  persist();
  listeners.forEach((listener) => listener());
}
