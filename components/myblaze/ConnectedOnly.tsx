"use client";

import { MyBlazeHeader } from "@/components/myblaze/MyBlazeHeader";
import { RequireAccount } from "@/components/myblaze/RequireAccount";
import { useBlaze } from "@/lib/store/BlazeProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function ConnectedOnly({ children }: { children: React.ReactNode }) {
  return (
    <RequireAccount>
      <Gate>{children}</Gate>
    </RequireAccount>
  );
}

function Gate({ children }: { children: React.ReactNode }) {
  const { isConnectedCustomer, ready } = useBlaze();
  const router = useRouter();

  useEffect(() => {
    if (ready && !isConnectedCustomer) router.replace("/my-blaze");
  }, [isConnectedCustomer, ready, router]);

  if (!isConnectedCustomer) {
    return (
      <>
        <MyBlazeHeader />
        <div className="px-5 py-16 text-stone">Returning to My Blaze…</div>
      </>
    );
  }
  return <>{children}</>;
}
