"use client";

import { AppointmentCard } from "@/components/myblaze/AppointmentCard";
import { ConnectedOnly } from "@/components/myblaze/ConnectedOnly";
import { MyBlazeHeader } from "@/components/myblaze/MyBlazeHeader";
import { useBlaze } from "@/lib/store/BlazeProvider";
import { usePrototypeState } from "@/lib/store/usePrototypeState";

export default function AppointmentsPage() {
  return (
    <ConnectedOnly>
      <Content />
    </ConnectedOnly>
  );
}

function Content() {
  const { customer } = useBlaze();
  const { appointments } = usePrototypeState();
  const items = appointments.filter(
    (item) => item.blazeCustomerId === customer?.blazeCustomerId,
  );

  return (
    <>
      <MyBlazeHeader />
      <div className="mx-auto max-w-3xl px-5 py-12">
        <h1 className="font-serif text-4xl">Appointments</h1>
        <div className="mt-8 space-y-4">
          {items.map((appointment) => (
            <AppointmentCard key={appointment.id} appointment={appointment} />
          ))}
        </div>
        <p className="mt-8 text-sm text-stone">
          Schedule, reschedule, and cancel are mock actions for this prototype.
        </p>
      </div>
    </>
  );
}
