"use client";

import { ConnectedOnly } from "@/components/myblaze/ConnectedOnly";
import { MyBlazeHeader } from "@/components/myblaze/MyBlazeHeader";
import { blazeStatusLabel } from "@/lib/mappers/labStatusToBlazeStatus";
import { useBlaze } from "@/lib/store/BlazeProvider";
import { usePrototypeState } from "@/lib/store/usePrototypeState";
import Link from "next/link";

export default function OrdersPage() {
  return (
    <ConnectedOnly>
      <Content />
    </ConnectedOnly>
  );
}

function Content() {
  const { customer } = useBlaze();
  const { orders: allOrders } = usePrototypeState();
  const orders = allOrders.filter(
    (item) => item.blazeCustomerId === customer?.blazeCustomerId,
  );

  return (
    <>
      <MyBlazeHeader />
      <div className="mx-auto max-w-4xl px-5 py-12">
        <h1 className="font-serif text-4xl">Your eyewear</h1>
        {orders.length === 0 ? (
          <div className="mt-10 bg-cream px-6 py-10">
            <h2 className="font-serif text-2xl">Your first Blaze pair is waiting.</h2>
            <Link href="/eyewear" className="mt-5 inline-block underline">
              Explore eyewear
            </Link>
          </div>
        ) : (
          <ul className="mt-8 space-y-6">
            {orders.map((order) => (
              <li key={order.orderId} className="border-b border-charcoal/10 pb-6">
                <p className="text-xs tracking-[0.16em] text-stone">
                  BLAZE ORDER #{order.orderId}
                </p>
                <p className="mt-2 text-xl">
                  {order.frameBrand} {order.frameModel} · {order.frameColor}
                </p>
                <p className="text-stone">{blazeStatusLabel(order.orderStatus)}</p>
                <Link href={`/my-blaze/orders/${order.orderId}`} className="mt-3 inline-block underline">
                  Track order
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
