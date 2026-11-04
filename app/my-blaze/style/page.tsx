"use client";

import { FrameCard } from "@/components/frames/FrameCard";
import { MyBlazeHeader } from "@/components/myblaze/MyBlazeHeader";
import { RequireAccount } from "@/components/myblaze/RequireAccount";
import { StyleProfileCard } from "@/components/myblaze/StyleProfileCard";
import { useBlaze } from "@/lib/store/BlazeProvider";
import { getFrameById } from "@/mock/frames";

export default function StylePage() {
  return (
    <RequireAccount>
      <Content />
    </RequireAccount>
  );
}

function Content() {
  const { account } = useBlaze();
  const picks = (account?.styleProfile?.recommendedFrameIds ?? [])
    .map(getFrameById)
    .filter(Boolean);

  return (
    <>
      <MyBlazeHeader />
      <div className="mx-auto max-w-6xl space-y-10 px-5 py-12">
        <h1 className="font-serif text-4xl">Style profile</h1>
        <StyleProfileCard profile={account?.styleProfile} />
        {picks.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {picks.map((frame) => (frame ? <FrameCard key={frame.id} frame={frame} /> : null))}
          </div>
        ) : null}
      </div>
    </>
  );
}
