import type {
  Appointment,
  CrystalOpticalOrder,
  CrystalPatient,
  Prescription,
} from "@/lib/types";

/**
 * Desired Crystal PM abstraction.
 * Read methods return mock data.
 * Write methods are MOCK ONLY — PENDING CRYSTAL API CAPABILITY CONFIRMATION.
 */
export interface CrystalPMService {
  findPatient(query: {
    phone?: string;
    email?: string;
    lastName?: string;
  }): Promise<CrystalPatient | undefined>;
  getPatient(crystalPatientId: string): Promise<CrystalPatient | undefined>;
  getPatientDemographics(
    crystalPatientId: string,
  ): Promise<CrystalPatient | undefined>;
  getPrescriptions(crystalPatientId: string): Promise<Prescription[]>;
  getAppointments(crystalPatientId: string): Promise<Appointment[]>;
  getOpticalOrders(crystalPatientId: string): Promise<CrystalOpticalOrder[]>;
  /** PENDING CRYSTAL API CAPABILITY CONFIRMATION */
  createPatient(
    input: Omit<CrystalPatient, "crystalPatientId">,
  ): Promise<CrystalPatient>;
  /** PENDING CRYSTAL API CAPABILITY CONFIRMATION */
  updatePatient(
    crystalPatientId: string,
    patch: Partial<CrystalPatient>,
  ): Promise<CrystalPatient>;
  /** PENDING CRYSTAL API CAPABILITY CONFIRMATION */
  createAppointment(input: Appointment): Promise<Appointment>;
  /** PENDING CRYSTAL API CAPABILITY CONFIRMATION */
  updateAppointment(
    id: string,
    patch: Partial<Appointment>,
  ): Promise<Appointment>;
  /** PENDING CRYSTAL API CAPABILITY CONFIRMATION */
  createOpticalOrder(
    input: Omit<CrystalOpticalOrder, "id">,
  ): Promise<CrystalOpticalOrder>;
}
