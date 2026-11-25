import { AdminGate } from "@/components/public/AdminGate";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blaze Eyewear Studio — Coming Soon",
  description: "Blaze Eyewear Studio is opening in Snellville, GA.",
  robots: { index: false, follow: false },
};

export default async function ComingSoonPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-ivory px-6 py-16">
      <p className="text-xs tracking-[0.28em] text-stone">COMING SOON</p>
      <div className="lockup mt-8">
        <div className="logo-mark">
          <img
            src="/bes-logo.png"
            alt="Blaze Eyewear Studio"
            width={968}
            height={508}
            className="block h-36 w-auto sm:h-44"
          />
          <span className="logo-shimmer" aria-hidden="true" />
        </div>
        <h1 className="ignite-line mt-1 text-center font-serif text-4xl italic leading-tight text-[#FB5B04] md:text-5xl">
          Ignite your style.
        </h1>
        <span className="ember ember-front ember-1" aria-hidden="true" />
        <span className="ember ember-behind ember-2" aria-hidden="true" />
        <span className="ember ember-front ember-3" aria-hidden="true" />
        <span className="ember ember-behind ember-4" aria-hidden="true" />
        <span className="ember ember-front ember-5" aria-hidden="true" />
        <span className="ember ember-behind ember-6" aria-hidden="true" />
        <span className="ember ember-front ember-7" aria-hidden="true" />
      </div>
      <p className="mt-4 max-w-md text-center leading-7 text-charcoal/80">
        Blaze Eyewear Studio is opening at
        <br />
        2250 Scenic Hwy N, Suite F, Snellville, GA.
      </p>
      <AdminGate initialError={params.error === "1"} />
    </div>
  );
}
