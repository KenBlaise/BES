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
      <img
        src="/bes-logo.png"
        alt="Blaze Eyewear Studio"
        width={968}
        height={508}
        className="h-36 w-auto sm:h-44"
      />
      <p className="mt-10 text-xs tracking-[0.28em] text-stone">COMING SOON</p>
      <h1 className="mt-4 max-w-xl text-center font-serif text-4xl leading-tight md:text-5xl">
        Ignite your style.
      </h1>
      <p className="mt-4 max-w-md text-center leading-7 text-charcoal/80">
        Blaze Eyewear Studio is opening at 2250 Scenic Hwy N, Suite F, Snellville, GA.
      </p>
      <AdminGate initialError={params.error === "1"} />
    </div>
  );
}
