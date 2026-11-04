"use client";

import { MyBlazeHeader } from "@/components/myblaze/MyBlazeHeader";
import { RequireAccount } from "@/components/myblaze/RequireAccount";
import { SavedFrameCard } from "@/components/myblaze/SavedFrameCard";
import { useBlaze } from "@/lib/store/BlazeProvider";
import { getFrameById } from "@/mock/frames";
import Link from "next/link";

export default function FavoritesPage() {
  return (
    <RequireAccount>
      <Content />
    </RequireAccount>
  );
}

function Content() {
  const { account, removeFrame } = useBlaze();
  const saved = account?.savedFrameIds.map(getFrameById).filter(Boolean) ?? [];

  return (
    <>
      <MyBlazeHeader />
      <div className="mx-auto max-w-4xl px-5 py-12">
        <h1 className="font-serif text-4xl">Your saved frames</h1>
        <p className="mt-2 text-stone">{saved.length} frames</p>
        {saved.length === 0 ? (
          <div className="mt-10 bg-cream px-6 py-10">
            <h2 className="font-serif text-2xl">Your collection starts here</h2>
            <p className="mt-3 text-stone">Explore eyewear and heart the frames you love.</p>
            <Link href="/eyewear" className="mt-5 inline-block underline">
              Explore eyewear
            </Link>
          </div>
        ) : (
          saved.map((frame) =>
            frame ? (
              <SavedFrameCard
                key={frame.id}
                frame={frame}
                onRemove={() => void removeFrame(frame.id)}
              />
            ) : null,
          )
        )}
      </div>
    </>
  );
}
