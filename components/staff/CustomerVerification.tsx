"use client";

import { recordAudit } from "@/lib/audit";
import { getState, setState } from "@/lib/store/prototype-db";
import { useState } from "react";

export function CustomerVerification({ customerId }: { customerId: string }) {
  const [sent, setSent] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function verify(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");
    await new Promise((resolve) => setTimeout(resolve, 700));
    if (code !== "123456") {
      setError("Verification failed. Demo code is 123456.");
      setLoading(false);
      return;
    }
    setState((state) => ({
      ...state,
      verifiedCustomerIds: state.verifiedCustomerIds.includes(customerId)
        ? state.verifiedCustomerIds
        : [...state.verifiedCustomerIds, customerId],
    }));
    recordAudit({
      type: "CUSTOMER_VERIFIED",
      actorName: getState().employeeSession?.name ?? "Staff",
      actorRole: "EMPLOYEE",
      customerId,
    });
    setLoading(false);
  }

  return (
    <div className="bg-cream px-6 py-8">
      <h2 className="font-serif text-3xl">Verify customer</h2>
      <p className="mt-3 text-stone">
        Phone number is a lookup, not authentication. Confirm identity before opening sensitive
        information.
      </p>
      {!sent ? (
        <button
          type="button"
          className="mt-6 min-h-12 bg-ink px-5 text-xs tracking-[0.16em] text-ivory"
          onClick={() => setSent(true)}
        >
          Send verification code
        </button>
      ) : (
        <form onSubmit={verify} className="mt-6 space-y-4">
          <p className="text-sm text-stone">Mock OTP sent to the customer. Demo code: 123456</p>
          <label className="block text-xs tracking-[0.16em]">
            Code
            <input
              value={code}
              onChange={(event) => setCode(event.target.value)}
              className="mt-2 w-full border-b border-charcoal/30 bg-transparent py-2 text-lg"
            />
          </label>
          {error ? <p className="text-sm text-orange">{error}</p> : null}
          <button type="submit" className="min-h-12 bg-ink px-5 text-xs tracking-[0.16em] text-ivory">
            {loading ? "Verifying customer…" : "Verify"}
          </button>
        </form>
      )}
    </div>
  );
}
