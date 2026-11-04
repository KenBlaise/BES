import { recordAudit } from "@/lib/audit";
import { getState, setState } from "@/lib/store/prototype-db";
import type { CrystalOpticalOrder, CrystalPatient } from "@/lib/types";
import { normalizePhone, nowIso, randomId, simulateLatency } from "@/lib/utils";
import type { CrystalPMService } from "./types";

export const mockCrystalPMService: CrystalPMService = {
  async findPatient(query) {
    await simulateLatency(400);
    const digits = query.phone ? normalizePhone(query.phone) : "";
    return getState().crystalPatients.find((patient) => {
      if (digits && normalizePhone(patient.phone) === digits) return true;
      if (query.email && patient.email.toLowerCase() === query.email.toLowerCase()) {
        return true;
      }
      if (query.lastName && patient.lastName.toLowerCase() === query.lastName.toLowerCase()) {
        return true;
      }
      return false;
    });
  },

  async getPatient(crystalPatientId) {
    await simulateLatency(250);
    return getState().crystalPatients.find(
      (patient) => patient.crystalPatientId === crystalPatientId,
    );
  },

  async getPatientDemographics(crystalPatientId) {
    return this.getPatient(crystalPatientId);
  },

  async getPrescriptions(crystalPatientId) {
    await simulateLatency(250);
    return getState().prescriptions.filter(
      (rx) => rx.crystalPatientId === crystalPatientId,
    );
  },

  async getAppointments(crystalPatientId) {
    await simulateLatency(250);
    const customer = getState().customers.find(
      (item) => item.crystalPatientId === crystalPatientId,
    );
    if (!customer) return [];
    return getState().appointments.filter(
      (item) => item.blazeCustomerId === customer.blazeCustomerId,
    );
  },

  async getOpticalOrders(crystalPatientId) {
    await simulateLatency(250);
    return getState().crystalOrders.filter(
      (item) => item.crystalPatientId === crystalPatientId,
    );
  },

  async createPatient(input) {
    // PENDING CRYSTAL API CAPABILITY CONFIRMATION
    await simulateLatency(900);
    const patient: CrystalPatient = {
      ...input,
      crystalPatientId: randomId("CRY"),
    };
    setState((state) => ({
      ...state,
      crystalPatients: [...state.crystalPatients, patient],
    }));
    const employee = getState().employeeSession;
    recordAudit({
      type: "CRYSTAL_PATIENT_CREATED",
      actorName: employee?.name ?? "Staff",
      actorRole: "EMPLOYEE",
      detail: `${patient.crystalPatientId} — mock write, unconfirmed Crystal capability`,
    });
    return patient;
  },

  async updatePatient(crystalPatientId, patch) {
    // PENDING CRYSTAL API CAPABILITY CONFIRMATION
    await simulateLatency();
    const current = getState().crystalPatients.find(
      (item) => item.crystalPatientId === crystalPatientId,
    );
    if (!current) throw new Error("Crystal patient not found (mock)");
    const next = { ...current, ...patch };
    setState((state) => ({
      ...state,
      crystalPatients: state.crystalPatients.map((item) =>
        item.crystalPatientId === crystalPatientId ? next : item,
      ),
    }));
    return next;
  },

  async createAppointment(input) {
    // PENDING CRYSTAL API CAPABILITY CONFIRMATION
    await simulateLatency();
    return { ...input, id: input.id || randomId("APT") };
  },

  async updateAppointment(id, patch) {
    // PENDING CRYSTAL API CAPABILITY CONFIRMATION
    await simulateLatency();
    const current = getState().appointments.find((item) => item.id === id);
    if (!current) throw new Error("Appointment not found");
    return { ...current, ...patch };
  },

  async createOpticalOrder(input) {
    // PENDING CRYSTAL API CAPABILITY CONFIRMATION
    await simulateLatency();
    const order: CrystalOpticalOrder = {
      ...input,
      id: randomId("CRY-ORD"),
      createdAt: input.createdAt || nowIso(),
    };
    setState((state) => ({
      ...state,
      crystalOrders: [...state.crystalOrders, order],
    }));
    return order;
  },
};
