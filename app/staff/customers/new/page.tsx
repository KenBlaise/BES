"use client";

import { services } from "@/lib/services";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewCustomerPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    phone: "",
    email: "",
    address: "",
    city: "Snellville",
    state: "GA",
    zipCode: "",
  });

  function set<K extends keyof typeof form>(key: K, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const customer = await services.customers.create({
        ...form,
        customerStatus: "new",
      });
      const matches = await services.myBlaze.searchByEmailOrPhone(form.email || form.phone);
      if (matches[0]) {
        router.push(
          `/staff/customers/${customer.blazeCustomerId}?suggest=${matches[0].accountId}`,
        );
        return;
      }
      router.push(`/staff/customers/${customer.blazeCustomerId}`);
    } catch {
      setError("Unable to create customer.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-xl py-6">
      <h1 className="font-serif text-4xl">New customer</h1>
      <p className="mt-3 text-stone">
        Collect what the optical visit needs. Do not auto-connect My Blaze on email/phone match.
      </p>
      <form onSubmit={submit} className="mt-8 grid gap-4">
        {(
          [
            ["firstName", "First name"],
            ["lastName", "Last name"],
            ["dateOfBirth", "Date of birth"],
            ["phone", "Phone"],
            ["email", "Email"],
            ["address", "Address"],
            ["city", "City"],
            ["state", "State"],
            ["zipCode", "ZIP"],
          ] as const
        ).map(([key, label]) => (
          <label key={key} className="text-xs tracking-[0.16em]">
            {label}
            <input
              required
              value={form[key]}
              onChange={(event) => set(key, event.target.value)}
              className="mt-2 w-full border-b border-charcoal/30 bg-transparent py-2 text-base"
            />
          </label>
        ))}
        {error ? <p className="text-orange">{error}</p> : null}
        <button type="submit" className="mt-4 min-h-12 bg-ink text-xs tracking-[0.16em] text-ivory">
          {loading ? "Creating…" : "Create customer"}
        </button>
      </form>
    </div>
  );
}
