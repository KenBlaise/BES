"use client";

import { FrameCard } from "@/components/frames/FrameCard";
import { MyBlazeHeader } from "@/components/myblaze/MyBlazeHeader";
import { RequireAccount } from "@/components/myblaze/RequireAccount";
import { SavedFrameCard } from "@/components/myblaze/SavedFrameCard";
import { StyleProfileCard } from "@/components/myblaze/StyleProfileCard";
import { OrderStatusTimeline } from "@/components/orders/OrderStatusTimeline";
import { useBlaze } from "@/lib/store/BlazeProvider";
import { usePrototypeState } from "@/lib/store/usePrototypeState";
import { formatMoney } from "@/lib/utils";
import { getFrameById } from "@/mock/frames";
import Link from "next/link";

export default function MyBlazeHomePage() {
  return (
    <RequireAccount>
      <Dashboard />
    </RequireAccount>
  );
}

function Dashboard() {
  const { account, customer, isConnectedCustomer, removeFrame } = useBlaze();
  const proto = usePrototypeState();
  if (!account) return null;

  const saved = account.savedFrameIds.map(getFrameById).filter(Boolean);
  const recent = account.recentlyViewedFrameIds.map(getFrameById).filter(Boolean);
  const picks = (account.styleProfile?.recommendedFrameIds ?? [])
    .map(getFrameById)
    .filter(Boolean);
  const orders = isConnectedCustomer
    ? proto.orders.filter((item) => item.blazeCustomerId === customer?.blazeCustomerId)
    : [];
  const current = orders[0];

  return (
    <>
      <MyBlazeHeader />
      <div className="mx-auto max-w-6xl space-y-14 px-5 py-12">
        {isConnectedCustomer && current ? (
          <section className="bg-ink px-6 py-8 text-ivory">
            <p className="text-xs tracking-[0.18em] text-warm">CURRENT EYEWEAR</p>
            <h2 className="mt-2 font-serif text-4xl">Blaze Order #{current.orderId}</h2>
            <p className="mt-3">
              {current.frameBrand} {current.frameModel} · {current.frameColor}
            </p>
            <p className="mt-2 text-cream/80">Lenses in production</p>
            <Link
              href={`/my-blaze/orders/${current.orderId}`}
              className="mt-6 inline-block border border-ivory px-5 py-2 text-xs tracking-[0.16em]"
            >
              Track order
            </Link>
          </section>
        ) : null}

        <section>
          <div className="flex items-end justify-between">
            <div>
              <h2 className="font-serif text-3xl">Your favorites</h2>
              <p className="text-stone">{saved.length} frames</p>
            </div>
            <Link href="/my-blaze/favorites" className="text-sm underline">
              View all
            </Link>
          </div>
          {saved.length === 0 ? (
            <EmptyFavorites />
          ) : (
            <div className="mt-4">
              {saved.slice(0, 3).map((frame) =>
                frame ? (
                  <SavedFrameCard
                    key={frame.id}
                    frame={frame}
                    onRemove={() => void removeFrame(frame.id)}
                  />
                ) : null,
              )}
            </div>
          )}
        </section>

        <StyleProfileCard profile={account.styleProfile} />

        <section>
          <h2 className="font-serif text-3xl">Recently viewed</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recent.slice(0, 6).map((frame) =>
              frame ? <FrameCard key={frame.id} frame={frame} /> : null,
            )}
          </div>
        </section>

        {picks.length > 0 ? (
          <section>
            <h2 className="font-serif text-3xl">Your Blaze picks</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {picks.slice(0, 3).map((frame) =>
                frame ? <FrameCard key={frame.id} frame={frame} /> : null,
              )}
            </div>
          </section>
        ) : null}

        {isConnectedCustomer && current ? (
          <section>
            <h2 className="font-serif text-3xl">Order progress</h2>
            <div className="mt-6">
              <OrderStatusTimeline current={current.orderStatus} />
            </div>
          </section>
        ) : null}

        {!isConnectedCustomer ? (
          <section className="border border-charcoal/10 px-6 py-8">
            <h2 className="font-serif text-3xl">Visit Blaze</h2>
            <p className="mt-3 max-w-lg text-stone">
              Bring your saved frames to the studio. We will start styling from what you already
              love.
            </p>
            <Link
              href="/visit"
              className="mt-6 inline-block bg-ink px-5 py-3 text-xs tracking-[0.16em] text-ivory"
            >
              Visit Blaze
            </Link>
          </section>
        ) : (
          <section className="grid gap-4 sm:grid-cols-3">
            <Link href="/my-blaze/prescriptions" className="bg-cream px-5 py-6">
              Current prescription
            </Link>
            <Link href="/my-blaze/appointments" className="bg-cream px-5 py-6">
              Next appointment
            </Link>
            <Link href="/my-blaze/receipts" className="bg-cream px-5 py-6">
              Recent purchases · {current ? formatMoney(current.estimatedCustomerResponsibility) : ""}
            </Link>
          </section>
        )}
      </div>
    </>
  );
}

function EmptyFavorites() {
  return (
    <div className="mt-8 bg-cream px-6 py-10">
      <h3 className="font-serif text-2xl">Your collection starts here</h3>
      <p className="mt-3 text-stone">Explore eyewear and heart the frames you love.</p>
      <Link href="/eyewear" className="mt-5 inline-block underline">
        Explore eyewear
      </Link>
    </div>
  );
}
