"use client";

import { AuthForm } from "@/components/myblaze/AuthForm";
import { useBlaze } from "@/lib/store/BlazeProvider";

export function RequireAccount({ children }: { children: React.ReactNode }) {
  const { ready, account } = useBlaze();
  if (!ready) {
    return <div className="px-5 py-20 text-stone">Loading My Blaze…</div>;
  }
  if (!account) {
    return (
      <div className="mx-auto max-w-md px-5 py-16">
        <p className="text-xs tracking-[0.22em] text-stone">CREATE MY BLAZE</p>
        <h1 className="mt-3 font-serif text-4xl">Keep everything you love.</h1>
        <p className="mt-4 text-stone">
          Save your favorite frames, discover your style, and keep it all in one place.
        </p>
        <div className="mt-8">
          <AuthForm />
        </div>
        <p className="mt-8 text-xs text-stone">
          Demo: jordan@example.com or ken@example.com · code 123456
        </p>
      </div>
    );
  }
  return <>{children}</>;
}
