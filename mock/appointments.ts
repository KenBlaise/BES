import type { Appointment } from "@/lib/types";

export const kenAppointment: Appointment = {
  id: "APT-22018",
  blazeCustomerId: "BLZ-10482",
  date: "October 8, 2026",
  time: "2:30 PM",
  type: "Dispensing / Fitting",
  location: "Blaze Eyewear Studio, Snellville",
  status: "upcoming",
};

export const seedAppointments: Appointment[] = [kenAppointment];
