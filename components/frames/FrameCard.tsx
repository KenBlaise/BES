import { HeartButton } from "@/components/frames/HeartButton";
import type { Frame } from "@/lib/types";
import { availabilityLabel, formatMoney } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export function FrameCard({ frame }: { frame: Frame }) {
  return (
    <article className="group">
      <Link href={`/eyewear/${frame.slug}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-cream">
          <Image
            src={frame.image}
            alt={`${frame.brand} ${frame.model} ${frame.color}`}
            fill
            className="object-cover transition duration-700 group-hover:scale-[1.03]"
            sizes="(min-width: 1280px) 20vw, (min-width: 768px) 33vw, 50vw"
          />
          <HeartButton frameId={frame.id} className="absolute right-3 top-3" />
        </div>
        <div className="mt-4 space-y-1">
          <p className="text-xs tracking-[0.18em] text-stone uppercase">{frame.brand}</p>
          <p className="text-lg">{frame.model}</p>
          <p className="text-sm text-stone">{frame.color}</p>
          <p className="pt-1">{formatMoney(frame.price)}</p>
          <p className="text-xs tracking-wide text-wood">
            {availabilityLabel(frame.availability)}
          </p>
        </div>
      </Link>
    </article>
  );
}
