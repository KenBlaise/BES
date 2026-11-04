import { recordAudit } from "@/lib/audit";
import { getState, setState } from "@/lib/store/prototype-db";
import type { Appointment } from "@/lib/types";
import { randomId, simulateLatency } from "@/lib/utils";
import type { AppointmentService } from "./types";

export const mockAppointmentService: AppointmentService = {
  async listForCustomer(blazeCustomerId) {
    await simulateLatency(200);
    return getState().appointments.filter(
      (item) => item.blazeCustomerId === blazeCustomerId,
    );
  },

  async create(input) {
    // Writes are mocked. Crystal appointment WRITE capability is unconfirmed.
    await simulateLatency();
    const appointment: Appointment = { ...input, id: randomId("APT") };
    setState((state) => ({
      ...state,
      appointments: [...state.appointments, appointment],
    }));
    const employee = getState().employeeSession;
    recordAudit({
      type: "APPOINTMENT_CREATED",
      actorName: employee?.name ?? "Staff",
      actorRole: "EMPLOYEE",
      customerId: input.blazeCustomerId,
      detail: "Mock appointment — Crystal write unconfirmed",
    });
    return appointment;
  },

  async update(id, patch) {
    await simulateLatency();
    const current = getState().appointments.find((item) => item.id === id);
    if (!current) throw new Error("Appointment not found");
    const next = { ...current, ...patch };
    setState((state) => ({
      ...state,
      appointments: state.appointments.map((item) => (item.id === id ? next : item)),
    }));
    return next;
  },
};
