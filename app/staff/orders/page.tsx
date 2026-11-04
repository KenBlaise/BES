"use client";

import { blazeStatusLabel } from "@/lib/mappers/labStatusToBlazeStatus";
import { usePrototypeState } from "@/lib/store/usePrototypeState";
import Link from "next/link";

export default function StaffOrdersPage() {
  const { orders, customers } = usePrototypeState();

  return (
    <div className="py-4">
      <h1 className="font-serif text-4xl">Orders</h1>
      <ul className="mt-8 space-y-4">
        {orders.map((order) => {
          const customer = customers.find((item) => item.blazeCustomerId === order.blazeCustomerId);
          return (
            <li key={order.orderId}>
              <Link href={`/staff/orders/${order.orderId}`} className="block bg-cream px-5 py-5">
                <p className="text-xs tracking-[0.16em]">#{order.orderId}</p>
                <p className="mt-1 text-lg">
                  {order.frameBrand} {order.frameModel} · {customer?.firstName} {customer?.lastName}
                </p>
                <p className="text-stone">{blazeStatusLabel(order.orderStatus)}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
