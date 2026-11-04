"use client";

import { CustomerHeader } from "@/components/staff/CustomerHeader";
import { CustomerVerification } from "@/components/staff/CustomerVerification";
import { services } from "@/lib/services";
import { usePrototypeState } from "@/lib/store/usePrototypeState";
import { formatMoney } from "@/lib/utils";
import { getFrameById } from "@/mock/frames";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

export default function StaffCustomerPage() {
  return (
    <Suspense fallback={<p className="py-10">Retrieving customer…</p>}>
      <StaffCustomerContent />
    </Suspense>
  );
}

function StaffCustomerContent() {
  const params = useParams<{ id: string }>();
  const search = useSearchParams();
  const state = usePrototypeState();
  const customer = state.customers.find((item) => item.blazeCustomerId === params.id);
  const account = state.accounts.find((item) => item.accountId === customer?.myBlazeAccountId);
  const suggestedId = search.get("suggest");
  const suggested = state.accounts.find((item) => item.accountId === suggestedId);
  const verified = Boolean(customer && state.verifiedCustomerIds.includes(customer.blazeCustomerId));
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  if (!customer) return <p className="py-10">Customer not found.</p>;
  const current = customer;

  const saved = (account?.savedFrameIds ?? []).map(getFrameById).filter(Boolean);

  async function connect(accountId: string) {
    setBusy(true);
    await services.customers.connectMyBlaze(current.blazeCustomerId, accountId);
    setStatus("My Blaze connected ✓");
    setBusy(false);
  }

  async function createCrystal() {
    setBusy(true);
    setStatus("Creating Crystal patient…");
    const patient = await services.crystal.createPatient({
      firstName: current.firstName,
      lastName: current.lastName,
      dateOfBirth: current.dateOfBirth,
      phone: current.phone,
      email: current.email,
      address: current.address,
      city: current.city,
      state: current.state,
      zip: current.zipCode,
    });
    await services.customers.attachCrystal(current.blazeCustomerId, patient.crystalPatientId);
    setStatus(`Crystal patient created ✓ ${patient.crystalPatientId}`);
    setBusy(false);
  }

  return (
    <div className="space-y-8 py-4">
      <CustomerHeader customer={customer} account={account} verified={verified} />
      {!verified ? <CustomerVerification customerId={customer.blazeCustomerId} /> : null}

      {verified && suggested && !account ? (
        <section className="bg-cream px-6 py-8">
          <h2 className="font-serif text-3xl">Potential My Blaze account found</h2>
          <p className="mt-3">
            {suggested.firstName} · {suggested.email}
            <br />
            {suggested.savedFrameIds.length} saved frames
          </p>
          <button
            type="button"
            disabled={busy}
            onClick={() => void connect(suggested.accountId)}
            className="mt-5 min-h-12 bg-ink px-5 text-xs tracking-[0.16em] text-ivory"
          >
            Connect My Blaze
          </button>
        </section>
      ) : null}

      {verified && account ? (
        <section>
          <p className="text-xs tracking-[0.16em] text-stone">MY BLAZE MEMBER ✓</p>
          <h2 className="mt-2 font-serif text-3xl">{account.firstName}&apos;s saved frames</h2>
          <p className="text-stone">{saved.length} saved frames</p>
          <ul className="mt-6 space-y-3">
            {saved.map((frame) =>
              frame ? (
                <li key={frame.id}>
                  {frame.brand} {frame.model} · {frame.color} · {formatMoney(frame.price)}
                </li>
              ) : null,
            )}
          </ul>
          <Link
            href={`/staff/customers/${customer.blazeCustomerId}/orders/new`}
            className="mt-6 inline-block min-h-12 bg-ink px-5 leading-[48px] text-xs tracking-[0.16em] text-ivory"
          >
            Start styling session
          </Link>
        </section>
      ) : null}

      {verified ? (
        <div className="grid gap-3 sm:grid-cols-2">
          <Link
            href={`/staff/customers/${customer.blazeCustomerId}/benefits`}
            className="bg-cream px-5 py-6"
          >
            Vision benefits
          </Link>
          <Link
            href={`/staff/customers/${customer.blazeCustomerId}/orders/new`}
            className="border border-charcoal/10 px-5 py-6"
          >
            Build eyewear order
          </Link>
        </div>
      ) : null}

      {verified && !customer.crystalPatientId ? (
        <button
          type="button"
          disabled={busy}
          onClick={() => void createCrystal()}
          className="min-h-12 border border-ink px-5 text-xs tracking-[0.16em]"
        >
          Create Crystal patient
        </button>
      ) : null}

      {status ? <p className="text-wood">{status}</p> : null}

      {verified && customer.crystalPatientId ? (
        <p className="text-sm text-stone">
          Crystal record {customer.crystalPatientId} is available for demographics, prescriptions,
          and appointments (mock read).
        </p>
      ) : null}
    </div>
  );
}
