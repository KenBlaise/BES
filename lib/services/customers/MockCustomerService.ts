import { recordAudit } from "@/lib/audit";
import { getState, setState } from "@/lib/store/prototype-db";
import type { BlazeCustomer } from "@/lib/types";
import { normalizePhone, nowIso, randomId, simulateLatency } from "@/lib/utils";
import type { CustomerService } from "./types";

export const mockCustomerService: CustomerService = {
  async search(query) {
    await simulateLatency(350);
    const q = query.trim().toLowerCase();
    const digits = normalizePhone(query);
    const results = getState().customers.filter((customer) => {
      const fullName = `${customer.firstName} ${customer.lastName}`.toLowerCase();
      if (digits && digits.length >= 4 && normalizePhone(customer.phone).includes(digits)) {
        return true;
      }
      if (customer.email.toLowerCase().includes(q)) return true;
      return fullName.includes(q) || customer.lastName.toLowerCase().startsWith(q);
    });
    const employee = getState().employeeSession;
    recordAudit({
      type: "CUSTOMER_SEARCH",
      actorName: employee?.name ?? "Staff",
      actorRole: "EMPLOYEE",
      detail: query,
      customerId: results[0]?.blazeCustomerId,
    });
    return results;
  },

  async get(blazeCustomerId) {
    await simulateLatency(200);
    return getState().customers.find((item) => item.blazeCustomerId === blazeCustomerId);
  },

  async create(input) {
    await simulateLatency();
    const customer: BlazeCustomer = {
      ...input,
      blazeCustomerId: randomId("BLZ"),
      createdAt: nowIso(),
      updatedAt: nowIso(),
    };
    setState((state) => ({ ...state, customers: [...state.customers, customer] }));
    return customer;
  },

  async connectMyBlaze(blazeCustomerId, myBlazeAccountId) {
    await simulateLatency();
    const customer = getState().customers.find((item) => item.blazeCustomerId === blazeCustomerId);
    if (!customer) throw new Error("Customer not found");
    const next = { ...customer, myBlazeAccountId, updatedAt: nowIso() };
    setState((state) => ({
      ...state,
      customers: state.customers.map((item) =>
        item.blazeCustomerId === blazeCustomerId ? next : item,
      ),
    }));
    const employee = getState().employeeSession;
    recordAudit({
      type: "MY_BLAZE_CONNECTED",
      actorName: employee?.name ?? "Staff",
      actorRole: "EMPLOYEE",
      customerId: blazeCustomerId,
      accountId: myBlazeAccountId,
    });
    return next;
  },

  async attachCrystal(blazeCustomerId, crystalPatientId) {
    const customer = getState().customers.find((item) => item.blazeCustomerId === blazeCustomerId);
    if (!customer) throw new Error("Customer not found");
    const next = { ...customer, crystalPatientId, updatedAt: nowIso() };
    setState((state) => ({
      ...state,
      customers: state.customers.map((item) =>
        item.blazeCustomerId === blazeCustomerId ? next : item,
      ),
    }));
    return next;
  },

  async attachAnagram(blazeCustomerId, anagramPatientId) {
    const customer = getState().customers.find((item) => item.blazeCustomerId === blazeCustomerId);
    if (!customer) throw new Error("Customer not found");
    const next = { ...customer, anagramPatientId, updatedAt: nowIso() };
    setState((state) => ({
      ...state,
      customers: state.customers.map((item) =>
        item.blazeCustomerId === blazeCustomerId ? next : item,
      ),
    }));
    return next;
  },
};
