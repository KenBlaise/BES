"use client";

import { ConnectedOnly } from "@/components/myblaze/ConnectedOnly";
import { MyBlazeHeader } from "@/components/myblaze/MyBlazeHeader";
import { OrderStatusTimeline } from "@/components/orders/OrderStatusTimeline";
import { useBlaze } from "@/lib/store/BlazeProvider";
import { usePrototypeState } from "@/lib/store/usePrototypeState";
import { formatMoney } from "@/lib/utils";
import { useParams } from "next/navigation";

export default function OrderDetailPage() {
  return (
    <ConnectedOnly>
      <Content />
    </ConnectedOnly>
  );
}

function Content() {
  const params = useParams<{ id: string }>();
  const { customer } = useBlaze();
  const proto = usePrototypeState();
  const order = proto.orders.find((item) => item.orderId === params.id);
  const benefit = proto.benefits.find(
    (item) => item.blazeCustomerId === customer?.blazeCustomerId,
  );

  if (!order) {
    return (
      <>
        <MyBlazeHeader />
        <p className="px-5 py-16">Order not found.</p>
      </>
    );
  }

  return (
    <>
      <MyBlazeHeader />
      <div className="mx-auto max-w-3xl px-5 py-12">
        <p className="text-xs tracking-[0.18em] text-stone">YOUR EYEWEAR</p>
        <h1 className="mt-2 font-serif text-4xl">Blaze Order #{order.orderId}</h1>
        <p className="mt-4 text-lg">
          {order.frameBrand} {order.frameModel}
          <br />
          {order.frameColor}
          <br />
          {order.lensType} · {order.lensOptions.join(" · ")}
        </p>
        <p className="mt-6 text-xs tracking-[0.16em] text-stone">CURRENT STATUS</p>
        <p className="mt-2 font-serif text-3xl">Lenses in production</p>
        <div className="mt-8">
          <OrderStatusTimeline current={order.orderStatus} />
        </div>
        {benefit ? (
          <section className="mt-12 bg-cream px-6 py-8">
            <h2 className="font-serif text-2xl">Vision benefits</h2>
            <p className="mt-3 text-stone">
              {benefit.carrier}
              <br />
              Verified by Blaze: September 27, 2026
              <br />
              Applied to: Order #{order.orderId}
              <br />
              Benefit applied: {formatMoney(order.estimatedBenefit)}
            </p>
          </section>
        ) : null}
      </div>
    </>
  );
}
