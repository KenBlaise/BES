"use client";

import { OrderBuilder } from "@/components/staff/OrderBuilder";
import { usePrototypeState } from "@/lib/store/usePrototypeState";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function NewOrderPage() {
  const params = useParams<{ id: string }>();
  const state = usePrototypeState();
  const verified = state.verifiedCustomerIds.includes(params.id);

  if (!verified) {
    return (
      <p className="py-10">
        Verify the customer first.{" "}
        <Link href={`/staff/customers/${params.id}`} className="underline">
          Return
        </Link>
      </p>
    );
  }

  return (
    <div className="py-4">
      <h1 className="font-serif text-4xl">Order builder</h1>
      <div className="mt-8">
        <OrderBuilder customerId={params.id} />
      </div>
    </div>
  );
}
