"use client";

import { FrameCard } from "@/components/frames/FrameCard";
import {
  BUDGET_OPTIONS,
  COLOR_OPTIONS,
  recommendFrames,
  SHAPE_OPTIONS,
  STYLE_OPTIONS,
} from "@/lib/finder";
import { useBlaze } from "@/lib/store/BlazeProvider";
import type { PriceRangeId, StylePreference, StyleProfile } from "@/lib/types";
import { frames } from "@/mock/frames";
import { useMemo, useState } from "react";

export default function FindYourBlazePage() {
  const { account, saveStyle } = useBlaze();
  const [step, setStep] = useState(0);
  const [style, setStyle] = useState<StylePreference | undefined>(
    account?.styleProfile?.style,
  );
  const [shapes, setShapes] = useState<string[]>(account?.styleProfile?.shapes ?? []);
  const [colors, setColors] = useState<string[]>(account?.styleProfile?.colors ?? []);
  const [priceRange, setPriceRange] = useState<PriceRangeId | undefined>(
    account?.styleProfile?.priceRange,
  );
  const [saved, setSaved] = useState(false);

  const profile: StyleProfile = useMemo(
    () => recommendFrames({ style, shapes, colors, priceRange }),
    [colors, priceRange, shapes, style],
  );
  const picks = frames.filter((frame) => profile.recommendedFrameIds.includes(frame.id));

  function toggle(list: string[], id: string, setter: (next: string[]) => void) {
    setter(list.includes(id) ? list.filter((item) => item !== id) : [...list, id]);
  }

  async function persist() {
    await saveStyle(profile);
    setSaved(true);
  }

  return (
    <div className="page-shell max-w-4xl py-12 md:py-14">
      <p className="text-xs tracking-[0.22em] text-stone">A STYLING CONVERSATION</p>
      <h1 className="mt-3 font-serif text-5xl">Find Your Blaze</h1>
      <p className="mt-4 max-w-xl text-lg text-stone">
        Not a medical form. A few style questions — then frames that feel like you.
      </p>

      {step === 0 ? (
        <section className="mt-12">
          <h2 className="font-serif text-3xl">What’s your style?</h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {STYLE_OPTIONS.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => {
                  setStyle(option.id);
                  setStep(1);
                }}
                className={`min-h-20 border px-5 py-4 text-left ${
                  style === option.id ? "border-ink bg-cream" : "border-charcoal/15"
                }`}
              >
                <p className="text-lg">{option.label}</p>
                <p className="text-sm text-stone">{option.hint}</p>
              </button>
            ))}
          </div>
        </section>
      ) : null}

      {step === 1 ? (
        <section className="mt-12">
          <h2 className="font-serif text-3xl">What shapes do you like?</h2>
          <div className="mt-8 flex flex-wrap gap-3">
            {SHAPE_OPTIONS.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => toggle(shapes, option.id, setShapes)}
                className={`min-h-12 px-4 ${
                  shapes.includes(option.id) ? "bg-ink text-ivory" : "bg-cream"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
          <button type="button" className="mt-8 underline" onClick={() => setStep(2)}>
            Continue
          </button>
        </section>
      ) : null}

      {step === 2 ? (
        <section className="mt-12">
          <h2 className="font-serif text-3xl">What colors do you prefer?</h2>
          <div className="mt-8 flex flex-wrap gap-3">
            {COLOR_OPTIONS.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => toggle(colors, option.id, setColors)}
                className={`min-h-12 px-4 ${
                  colors.includes(option.id) ? "bg-ink text-ivory" : "bg-cream"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
          <button type="button" className="mt-8 underline" onClick={() => setStep(3)}>
            Continue
          </button>
        </section>
      ) : null}

      {step === 3 ? (
        <section className="mt-12">
          <h2 className="font-serif text-3xl">What’s your frame budget?</h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {BUDGET_OPTIONS.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => {
                  setPriceRange(option.id);
                  setStep(4);
                }}
                className={`min-h-14 border px-5 text-left ${
                  priceRange === option.id ? "border-ink bg-cream" : "border-charcoal/15"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </section>
      ) : null}

      {step === 4 ? (
        <section className="mt-12">
          <h2 className="font-serif text-3xl">Your Blaze picks</h2>
          <p className="mt-3 text-stone">
            {picks.length} frames styled for you. Heart any of them — or save the whole edit.
          </p>
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            {picks.map((frame) => (
              <FrameCard key={frame.id} frame={frame} />
            ))}
          </div>
          <button
            type="button"
            onClick={() => void persist()}
            className="mt-10 min-h-12 bg-ink px-6 text-xs tracking-[0.18em] text-ivory"
          >
            {account ? "Save my style" : "Save my style to My Blaze"}
          </button>
          {saved ? (
            <p className="mt-4 text-sm text-wood">Your style is saved in My Blaze.</p>
          ) : null}
        </section>
      ) : null}
    </div>
  );
}
