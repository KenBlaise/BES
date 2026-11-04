"use client";

import { AuthForm } from "@/components/myblaze/AuthForm";
import { useBlaze } from "@/lib/store/BlazeProvider";
import { getFrameById } from "@/mock/frames";

export function SaveFramePrompt() {
  const { savePromptFrameId, closeSavePrompt } = useBlaze();
  if (!savePromptFrameId) return null;

  const frame =
    savePromptFrameId === "style" ? null : getFrameById(savePromptFrameId);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-ink/50 p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="save-frame-title"
    >
      <div className="w-full max-w-md bg-ivory p-6 shadow-2xl">
        <p className="text-xs tracking-[0.2em] text-stone">MY BLAZE</p>
        <h2 id="save-frame-title" className="mt-2 font-serif text-3xl">
          {frame ? "Save this frame" : "Save your style"}
        </h2>
        <p className="mt-3 text-stone">
          {frame
            ? "Create My Blaze to keep the eyewear you love."
            : "Create My Blaze to keep your style profile and recommendations."}
        </p>
        {frame ? (
          <p className="mt-4 text-sm">
            {frame.brand} {frame.model} · {frame.color}
          </p>
        ) : null}
        <div className="mt-6">
          <AuthForm onComplete={closeSavePrompt} compact />
        </div>
        <button
          type="button"
          className="mt-4 text-sm text-stone underline"
          onClick={closeSavePrompt}
        >
          Not now
        </button>
      </div>
    </div>
  );
}
