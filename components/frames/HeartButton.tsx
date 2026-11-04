"use client";

import { useBlaze } from "@/lib/store/BlazeProvider";

export function HeartButton({
  frameId,
  className = "",
}: {
  frameId: string;
  className?: string;
}) {
  const { isSaved, toggleHeart } = useBlaze();
  const saved = isSaved(frameId);

  return (
    <button
      type="button"
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        void toggleHeart(frameId);
      }}
      aria-pressed={saved}
      aria-label={saved ? "Remove from My Blaze" : "Save to My Blaze"}
      className={`flex h-11 w-11 items-center justify-center rounded-full bg-ivory/90 text-xl leading-none md:h-12 md:w-12 ${className}`}
    >
      {saved ? "♥" : "♡"}
    </button>
  );
}
