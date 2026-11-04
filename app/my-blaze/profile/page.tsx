"use client";

import { MyBlazeHeader } from "@/components/myblaze/MyBlazeHeader";
import { RequireAccount } from "@/components/myblaze/RequireAccount";
import { useBlaze } from "@/lib/store/BlazeProvider";

export default function ProfilePage() {
  return (
    <RequireAccount>
      <Content />
    </RequireAccount>
  );
}

function Content() {
  const { account, customer, isConnectedCustomer } = useBlaze();
  if (!account) return null;

  return (
    <>
      <MyBlazeHeader />
      <div className="mx-auto max-w-2xl px-5 py-12">
        <h1 className="font-serif text-4xl">Profile</h1>
        <dl className="mt-8 space-y-4">
          <div>
            <dt className="text-xs tracking-[0.16em] text-stone">FIRST NAME</dt>
            <dd className="mt-1 text-lg">{account.firstName}</dd>
          </div>
          <div>
            <dt className="text-xs tracking-[0.16em] text-stone">EMAIL</dt>
            <dd className="mt-1 text-lg">{account.email}</dd>
          </div>
          {account.phoneOptional ? (
            <div>
              <dt className="text-xs tracking-[0.16em] text-stone">PHONE</dt>
              <dd className="mt-1 text-lg">{account.phoneOptional}</dd>
            </div>
          ) : null}
        </dl>
        {isConnectedCustomer && customer ? (
          <p className="mt-10 text-sm text-stone">
            Your Blaze studio profile is connected. Optical details live under prescriptions,
            appointments, and orders — not here.
          </p>
        ) : (
          <p className="mt-10 text-sm text-stone">
            My Blaze is a retail account. We only keep what we need to remember your style.
          </p>
        )}
      </div>
    </>
  );
}
