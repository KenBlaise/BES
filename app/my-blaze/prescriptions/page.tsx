"use client";

import { ConnectedOnly } from "@/components/myblaze/ConnectedOnly";
import { MyBlazeHeader } from "@/components/myblaze/MyBlazeHeader";
import { PrescriptionCard } from "@/components/myblaze/PrescriptionCard";
import { useBlaze } from "@/lib/store/BlazeProvider";
import { usePrototypeState } from "@/lib/store/usePrototypeState";

export default function PrescriptionsPage() {
  return (
    <ConnectedOnly>
      <Content />
    </ConnectedOnly>
  );
}

function Content() {
  const { customer } = useBlaze();
  const { prescriptions } = usePrototypeState();
  const rx = prescriptions.find(
    (item) => item.blazeCustomerId === customer?.blazeCustomerId,
  );

  return (
    <>
      <MyBlazeHeader />
      <div className="mx-auto max-w-3xl px-5 py-12">
        <h1 className="font-serif text-4xl">Prescriptions</h1>
        <div className="mt-8">
          {rx ? <PrescriptionCard rx={rx} /> : <p>No prescription on file.</p>}
        </div>
      </div>
    </>
  );
}
