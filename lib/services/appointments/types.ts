import type { Appointment } from "@/lib/types";

export interface AppointmentService {
  listForCustomer(blazeCustomerId: string): Promise<Appointment[]>;
  create(
    input: Omit<Appointment, "id">,
  ): Promise<Appointment>;
  update(id: string, patch: Partial<Appointment>): Promise<Appointment>;
}
