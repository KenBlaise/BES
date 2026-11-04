"use client";

import { IntegrationStatusBadge } from "@/components/staff/IntegrationStatusBadge";
import { services } from "@/lib/services";
import { recordAudit } from "@/lib/audit";
import { getState } from "@/lib/store/prototype-db";
import type { BlazeCustomer } from "@/lib/types";
import { maskPhone } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";

export function CustomerSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<BlazeCustomer[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function search(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const found = await services.customers.search(query);
      setResults(found);
      if (found.length === 0) setError("Customer not found.");
    } catch {
      setError("Search unavailable.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <form onSubmit={search} className="flex flex-col gap-3 sm:flex-row">
        <label className="flex-1 text-xs tracking-[0.16em]">
          Search by phone, name, or email
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="(404) 555-1234"
            className="mt-2 w-full border-b border-charcoal/30 bg-transparent py-3 text-lg"
          />
        </label>
        <button
          type="submit"
          className="min-h-12 bg-ink px-6 text-xs tracking-[0.16em] text-ivory sm:self-end"
        >
          {loading ? "Searching…" : "Search"}
        </button>
      </form>
      {error ? <p className="mt-4 text-orange">{error}</p> : null}
      <ul className="mt-8 space-y-4">
        {results?.map((customer) => {
          const account = getState().accounts.find(
            (item) => item.accountId === customer.myBlazeAccountId,
          );
          return (
            <li key={customer.blazeCustomerId}>
              <Link
                href={`/staff/customers/${customer.blazeCustomerId}`}
                onClick={() =>
                  recordAudit({
                    type: "CUSTOMER_RECORD_OPENED",
                    actorName: getState().employeeSession?.name ?? "Staff",
                    actorRole: "EMPLOYEE",
                    customerId: customer.blazeCustomerId,
                  })
                }
                className="block min-h-20 bg-cream px-5 py-6"
              >
                <p className="text-xl">
                  {customer.firstName} {customer.lastName.charAt(0)}.
                </p>
                <p className="text-stone">{maskPhone(customer.phone)}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <IntegrationStatusBadge label="My Blaze" connected={Boolean(account)} />
                  <IntegrationStatusBadge
                    label="Crystal"
                    connected={Boolean(customer.crystalPatientId)}
                  />
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
