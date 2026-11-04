"use client";

import { OrderStatusTimeline } from "@/components/orders/OrderStatusTimeline";
import { usePrototypeState } from "@/lib/store/usePrototypeState";
import { formatMoney } from "@/lib/utils";
import { useParams } from "next/navigation";

export default function StaffOrderDetailPage() {
  const params = useParams<{ id: string }>();
  const { orders, customers } = usePrototypeState();
  const order = orders.find((item) => item.orderId === params.id);
  const customer = customers.find((item) => item.blazeCustomerId === order?.blazeCustomerId);

  if (!order) return <p className="py-10">Order not found.</p>;

  return (
    <div className="space-y-8 py-4">
      <div>
        <p className="text-xs tracking-[0.16em] text-stone">BLAZE ORDER</p>
        <h1 className="mt-2 font-serif text-4xl">#{order.orderId}</h1>
        <p className="mt-2">
          {customer?.firstName} {customer?.lastName}
          <br />
          {order.frameBrand} {order.frameModel} · {order.frameColor}
          <br />
          {order.lensType} · {order.lensMaterial} · {order.lensOptions.join(", ")}
        </p>
      </div>
      <p>
        Retail {formatMoney(order.retailPrice)} · Benefit {formatMoney(order.estimatedBenefit)} ·
        Due {formatMoney(order.estimatedCustomerResponsibility)}
      </p>
      <p className="text-sm text-stone">
        Lab job {order.labOrderId} (internal). Customers see Blaze tracking only.
      </p>
      <OrderStatusTimeline current={order.orderStatus} />
    </div>
  );
}
