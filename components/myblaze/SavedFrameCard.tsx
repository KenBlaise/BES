import type { Frame } from "@/lib/types";
import { availabilityLabel, formatMoney } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export function SavedFrameCard({
  frame,
  onRemove,
}: {
  frame: Frame;
  onRemove?: () => void;
}) {
  return (
    <article className="grid gap-4 border-b border-charcoal/10 py-6 sm:grid-cols-[140px_1fr]">
      <div className="relative aspect-[4/5] overflow-hidden bg-cream">
        <Image src={frame.image} alt="" fill className="object-cover" />
      </div>
      <div>
        <p className="text-xs tracking-[0.16em] text-stone uppercase">{frame.brand}</p>
        <h3 className="mt-1 text-xl">
          {frame.model} · {frame.color}
        </h3>
        <p className="mt-1">{formatMoney(frame.price)}</p>
        <p className="text-sm text-wood">{availabilityLabel(frame.availability)}</p>
        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          <Link href={`/eyewear/${frame.slug}`} className="underline">
            View frame
          </Link>
          <Link href="/visit" className="underline">
            Try at Blaze
          </Link>
          {onRemove ? (
            <button type="button" onClick={onRemove} className="text-stone">
              Remove
            </button>
          ) : null}
        </div>
      </div>
    </article>
  );
}
