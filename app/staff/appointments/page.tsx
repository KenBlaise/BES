"use client";

import { services } from "@/lib/services";
import { usePrototypeState } from "@/lib/store/usePrototypeState";
import { useState } from "react";

export default function StaffAppointmentsPage() {
  const { appointments, customers } = usePrototypeState();
  const [message, setMessage] = useState("");

  async function addDemo() {
    const customer = customers[0];
    if (!customer) return;
    await services.appointments.create({
      blazeCustomerId: customer.blazeCustomerId,
      date: "October 22, 2026",
      time: "11:00 AM",
      type: "Styling visit",
      location: "Blaze Eyewear Studio, Snellville",
      status: "upcoming",
    });
    setMessage("Appointment created (mock). Crystal write capability is unconfirmed.");
  }

  return (
    <div className="py-4">
      <h1 className="font-serif text-4xl">Appointments</h1>
      <ul className="mt-8 space-y-4">
        {appointments.map((appointment) => {
          const customer = customers.find((item) => item.blazeCustomerId === appointment.blazeCustomerId);
          return (
            <li key={appointment.id} className="bg-cream px-5 py-5">
              <p className="text-lg">{appointment.type}</p>
              <p className="text-stone">
                {customer?.firstName} {customer?.lastName} · {appointment.date} · {appointment.time}
              </p>
            </li>
          );
        })}
      </ul>
      <button
        type="button"
        onClick={() => void addDemo()}
        className="mt-8 min-h-12 border border-ink px-5 text-xs tracking-[0.16em]"
      >
        Create appointment
      </button>
      {message ? <p className="mt-3 text-sm text-wood">{message}</p> : null}
    </div>
  );
}
