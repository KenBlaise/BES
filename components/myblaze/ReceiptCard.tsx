import type { Receipt } from "@/lib/types";
import { formatMoney } from "@/lib/utils";
import Link from "next/link";

export function ReceiptCard({ receipt }: { receipt: Receipt }) {
  return (
    <article className="border-b border-charcoal/10 py-6">
      <p className="text-xs tracking-[0.16em] text-stone">BLAZE ORDER #{receipt.orderId}</p>
      <p className="mt-2">{receipt.purchaseDate}</p>
      <p className="mt-1">{receipt.frame}</p>
      <p className="text-stone">{receipt.lenses}</p>
      <p className="mt-3 text-sm">
        Retail {formatMoney(receipt.retailPrice)} · Benefit {formatMoney(receipt.benefitApplied)} ·
        You paid {formatMoney(receipt.customerPaid)}
      </p>
      <Link href={`/my-blaze/orders/${receipt.orderId}`} className="mt-3 inline-block text-sm underline">
        View receipt
      </Link>
    </article>
  );
}
