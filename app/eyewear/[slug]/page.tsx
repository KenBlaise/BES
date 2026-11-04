"use client";

import { HeartButton } from "@/components/frames/HeartButton";
import { useBlaze } from "@/lib/store/BlazeProvider";
import { availabilityLabel, collectionLabel, formatMoney } from "@/lib/utils";
import { frames, getFrameBySlug } from "@/mock/frames";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function FrameDetailPage() {
  const params = useParams<{ slug: string }>();
  const frame = getFrameBySlug(params.slug);
  const { markViewed, addTryAtBlaze, isSaved } = useBlaze();

  useEffect(() => {
    if (frame) markViewed(frame.id);
  }, [frame, markViewed]);

  if (!frame) {
    return (
      <div className="mx-auto max-w-4xl px-5 py-20">
        <h1 className="font-serif text-4xl">Frame not found</h1>
        <Link href="/eyewear" className="mt-6 inline-block underline">
          Return to eyewear
        </Link>
      </div>
    );
  }

  const alternates = frames.filter((item) => frame.alternateColorIds.includes(item.id));

  return (
    <div className="page-shell grid gap-8 py-10 md:grid-cols-2 md:gap-10 md:py-12">
      <div className="space-y-4">
        {frame.images.map((src) => (
          <div key={src} className="relative aspect-[4/5] overflow-hidden bg-cream">
            <Image
              src={src}
              alt={`${frame.brand} ${frame.model}`}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>
        ))}
      </div>
      <div className="md:sticky md:top-28 md:self-start">
        <p className="text-xs tracking-[0.22em] text-stone uppercase">{frame.brand}</p>
        <div className="mt-2 flex items-start justify-between gap-4">
          <h1 className="font-serif text-5xl">{frame.model}</h1>
          <HeartButton frameId={frame.id} />
        </div>
        <p className="mt-3 text-xl">{formatMoney(frame.price)}</p>
        <p className="mt-2 text-stone">
          {frame.color} · {collectionLabel(frame.collection)}
        </p>
        <p className="mt-1 text-sm text-wood">{availabilityLabel(frame.availability)}</p>
        <p className="mt-6 leading-7 text-charcoal/85">{frame.description}</p>

        {alternates.length > 0 ? (
          <div className="mt-8">
            <p className="text-xs tracking-[0.16em] text-stone">ALTERNATIVE COLORS</p>
            <div className="mt-3 flex gap-3">
              {alternates.map((item) => (
                <Link key={item.id} href={`/eyewear/${item.slug}`} className="text-sm underline">
                  {item.color}
                </Link>
              ))}
            </div>
          </div>
        ) : null}

        <dl className="mt-8 grid grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="text-stone">Shape</dt>
            <dd className="capitalize">{frame.shape}</dd>
          </div>
          <div>
            <dt className="text-stone">Material</dt>
            <dd className="capitalize">{frame.material}</dd>
          </div>
          <div>
            <dt className="text-stone">Measurements</dt>
            <dd>
              {frame.measurements.lensWidth}–{frame.measurements.bridge}–
              {frame.measurements.temple}
            </dd>
          </div>
          <div>
            <dt className="text-stone">Style</dt>
            <dd className="capitalize">{frame.styleTags.join(", ")}</dd>
          </div>
        </dl>

        <div className="mt-10 flex flex-col gap-3">
          <button
            type="button"
            onClick={() => void addTryAtBlaze(frame.id)}
            className="min-h-12 bg-ink text-xs tracking-[0.18em] text-ivory"
          >
            {isSaved(frame.id) ? "Saved · Try at Blaze" : "Save to My Blaze"}
          </button>
          <Link
            href="/visit"
            className="flex min-h-12 items-center justify-center border border-ink text-xs tracking-[0.18em]"
          >
            Try at Blaze / Visit Blaze
          </Link>
        </div>
      </div>
    </div>
  );
}
