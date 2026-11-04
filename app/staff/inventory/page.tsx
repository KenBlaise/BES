"use client";

import { usePrototypeState } from "@/lib/store/usePrototypeState";
import { formatMoney } from "@/lib/utils";
import { getFrameById } from "@/mock/frames";

export default function InventoryPage() {
  const { inventory } = usePrototypeState();

  return (
    <div className="py-4">
      <h1 className="font-serif text-4xl">Inventory</h1>
      <p className="mt-2 text-stone">Snellville studio · demo quantities</p>
      <ul className="mt-8 divide-y divide-charcoal/10">
        {inventory.map((item) => {
          const frame = getFrameById(item.frameId);
          if (!frame) return null;
          return (
            <li key={item.frameId} className="flex justify-between gap-4 py-4">
              <div>
                {frame.brand} {frame.model} · {frame.color}
                <p className="text-sm text-stone">{formatMoney(frame.price)}</p>
              </div>
              <p>{item.onHand} on hand</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
