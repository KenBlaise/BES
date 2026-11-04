"use client";

import { BenefitsCard } from "@/components/staff/BenefitsCard";
import { mapCrystalPatientToAnagramEligibilityRequest } from "@/lib/mappers/crystalToAnagram";
import { services } from "@/lib/services";
import { usePrototypeState } from "@/lib/store/usePrototypeState";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function BenefitsPage() {
  const params = useParams<{ id: string }>();
  const state = usePrototypeState();
  const customer = state.customers.find((item) => item.blazeCustomerId === params.id);
  const verified = Boolean(customer && state.verifiedCustomerIds.includes(customer.blazeCustomerId));
  const benefit = state.benefits.find((item) => item.blazeCustomerId === params.id);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  if (!customer) return <p>Customer not found.</p>;
  const current = customer;
  if (!verified) {
    return (
      <p className="py-10">
        Verify the customer before checking benefits.{" "}
        <Link href={`/staff/customers/${current.blazeCustomerId}`} className="underline">
          Return
        </Link>
      </p>
    );
  }

  async function check() {
    setBusy(true);
    setMessage("Retrieving customer…");
    try {
      if (!current.crystalPatientId) {
        setMessage("Crystal record required before benefits can be checked.");
        return;
      }
      setMessage("Checking vision benefits…");
      const demographics = await services.crystal.getPatientDemographics(current.crystalPatientId);
      if (!demographics) {
        setMessage("Benefits unavailable — Crystal demographics not found.");
        return;
      }
      const request = mapCrystalPatientToAnagramEligibilityRequest(demographics);
      const result = await services.anagram.checkEligibility(request);
      await services.anagram.linkEligibilityToCustomer(
        current.blazeCustomerId,
        result.anagramEligibilityId,
      );
      await services.customers.attachAnagram(
        current.blazeCustomerId,
        result.anagramPatientId ?? "ANA-19281",
      );
      setMessage("Benefits returned. Demo data.");
    } catch {
      setMessage("Mock service unavailable.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-8 py-4">
      <h1 className="font-serif text-4xl">Vision benefits</h1>
      <p className="text-stone">
        Staff initiated only. Demographics come from Crystal. The associate does not retype them.
      </p>
      {benefit ? <BenefitsCard benefit={benefit} /> : (
        <p>No current benefits verification.</p>
      )}
      <button
        type="button"
        disabled={busy}
        onClick={() => void check()}
        className="min-h-12 bg-ink px-5 text-xs tracking-[0.16em] text-ivory"
      >
        {busy ? message || "Checking…" : "Check benefits"}
      </button>
      {message ? <p className="text-sm text-wood">{message}</p> : null}
      {benefit ? (
        <Link
          href={`/staff/customers/${current.blazeCustomerId}/orders/new`}
          className="inline-block min-h-12 border border-ink px-5 leading-[48px] text-xs tracking-[0.16em]"
        >
          Build eyewear order
        </Link>
      ) : null}
    </div>
  );
}
