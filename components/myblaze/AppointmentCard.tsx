import type { Appointment } from "@/lib/types";

export function AppointmentCard({ appointment }: { appointment: Appointment }) {
  return (
    <article className="border border-charcoal/10 px-6 py-6">
      <p className="text-xs tracking-[0.16em] text-stone">UPCOMING APPOINTMENT</p>
      <h3 className="mt-2 font-serif text-2xl">{appointment.type}</h3>
      <p className="mt-2">
        {appointment.date} · {appointment.time}
      </p>
      <p className="text-stone">{appointment.location}</p>
    </article>
  );
}
