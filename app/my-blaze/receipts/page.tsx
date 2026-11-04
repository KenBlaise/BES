"use client";

import { ConnectedOnly } from "@/components/myblaze/ConnectedOnly";
import { MyBlazeHeader } from "@/components/myblaze/MyBlazeHeader";
import { ReceiptCard } from "@/components/myblaze/ReceiptCard";
import { useBlaze } from "@/lib/store/BlazeProvider";
import { usePrototypeState } from "@/lib/store/usePrototypeState";

export default function ReceiptsPage() {
  return (
    <ConnectedOnly>
      <Content />
    </ConnectedOnly>
  );
}

function Content() {
  const { customer } = useBlaze();
  const { receipts: allReceipts } = usePrototypeState();
  const receipts = allReceipts.filter(
    (item) => item.blazeCustomerId === customer?.blazeCustomerId,
  );

  return (
    <>
      <MyBlazeHeader />
      <div className="mx-auto max-w-3xl px-5 py-12">
        <h1 className="font-serif text-4xl">Purchase history</h1>
        <div className="mt-8">
          {receipts.map((receipt) => (
            <ReceiptCard key={receipt.id} receipt={receipt} />
          ))}
        </div>
      </div>
    </>
  );
}
