"use client";

import { AuthForm } from "@/components/myblaze/AuthForm";
import { useBlaze } from "@/lib/store/BlazeProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function MyBlazeLoginPage() {
  const { account } = useBlaze();
  const router = useRouter();

  useEffect(() => {
    if (account) router.replace("/my-blaze");
  }, [account, router]);

  return (
    <div className="mx-auto max-w-md px-5 py-16">
      <p className="text-xs tracking-[0.22em] text-stone">CREATE MY BLAZE</p>
      <h1 className="mt-3 font-serif text-4xl">Save the frames you love.</h1>
      <p className="mt-4 text-stone">
        Save your favorite frames, discover your style and keep everything you love in one place.
      </p>
      <div className="mt-8">
        <AuthForm onComplete={() => router.push("/my-blaze")} />
      </div>
    </div>
  );
}
