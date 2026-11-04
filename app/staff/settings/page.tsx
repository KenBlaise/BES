"use client";

import { listAuditEvents } from "@/lib/audit";
import { resetPrototypeDb } from "@/lib/store/prototype-db";
import { usePrototypeState } from "@/lib/store/usePrototypeState";

export default function SettingsPage() {
  usePrototypeState();
  const events = listAuditEvents().slice(0, 12);

  return (
    <div className="space-y-8 py-4">
      <div>
        <h1 className="font-serif text-4xl">Settings</h1>
        <p className="mt-2 text-stone">Prototype controls and mock audit trail.</p>
      </div>
      <button
        type="button"
        onClick={() => resetPrototypeDb()}
        className="min-h-12 border border-ink px-5 text-xs tracking-[0.16em]"
      >
        Reset demo data
      </button>
      <section>
        <h2 className="font-serif text-2xl">Recent audit events</h2>
        <ul className="mt-4 space-y-3 text-sm">
          {events.map((event) => (
            <li key={event.id}>
              {event.actorName} · {event.type}
              {event.customerId ? ` · ${event.customerId}` : ""} ·{" "}
              {new Date(event.timestamp).toLocaleString()}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
