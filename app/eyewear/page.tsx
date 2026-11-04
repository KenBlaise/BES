"use client";

import { FrameCard } from "@/components/frames/FrameCard";
import { EMPTY_FILTERS, FrameFilters, type FilterState } from "@/components/frames/FrameFilters";
import { collectionLabel } from "@/lib/utils";
import { frames } from "@/mock/frames";
import { useMemo, useState } from "react";

function inPrice(price: number, range: string) {
  if (range === "under-250") return price < 250;
  if (range === "250-400") return price >= 250 && price <= 400;
  if (range === "400-600") return price >= 400 && price <= 600;
  if (range === "600-plus") return price >= 600;
  return true;
}

export default function EyewearPage() {
  const [filters, setFilters] = useState<FilterState>(EMPTY_FILTERS);
  const [open, setOpen] = useState(false);

  const visible = useMemo(
    () =>
      frames.filter((frame) => {
        if (filters.gender && frame.gender !== filters.gender) return false;
        if (filters.shape && frame.shape !== filters.shape) return false;
        if (filters.color && frame.colorFamily !== filters.color) return false;
        if (filters.material && frame.material !== filters.material) return false;
        if (filters.price && !inPrice(frame.price, filters.price)) return false;
        if (filters.style && !frame.styleTags.includes(filters.style)) return false;
        return true;
      }),
    [filters],
  );

  const collections = [...new Set(visible.map((frame) => frame.collection))];

  return (
    <div className="page-shell py-10 md:py-12">
      <p className="text-xs tracking-[0.22em] text-stone">DIGITAL SHOWROOM</p>
      <h1 className="mt-3 font-serif text-4xl md:text-5xl">Eyewear</h1>
      <p className="mt-4 max-w-2xl text-base text-stone md:text-lg">
        Browse what Blaze carries. Heart what you love. Then visit the studio to try them on.
        This is not checkout — it is discovery.
      </p>

      <button
        type="button"
        className="mt-8 inline-flex min-h-12 items-center border border-ink px-4 text-sm md:hidden"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? "Hide filters" : "Filter"}
      </button>

      <div className="mt-8 grid gap-8 md:grid-cols-[200px_1fr] lg:grid-cols-[220px_1fr]">
        <aside className={`${open ? "block" : "hidden"} md:block`}>
          <FrameFilters value={filters} onChange={setFilters} />
          <button
            type="button"
            className="mt-6 min-h-11 text-sm underline"
            onClick={() => setFilters(EMPTY_FILTERS)}
          >
            Clear filters
          </button>
        </aside>
        <div>
          <p className="text-sm text-stone">{visible.length} frames</p>
          {collections.map((collection) => (
            <section key={collection} className="mt-10 md:mt-12">
              <h2 className="font-serif text-3xl">{collectionLabel(collection)}</h2>
              <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {visible
                  .filter((frame) => frame.collection === collection)
                  .map((frame) => (
                    <FrameCard key={frame.id} frame={frame} />
                  ))}
              </div>
            </section>
          ))}
          {visible.length === 0 ? (
            <p className="mt-16 text-stone">No frames match this edit. Try a wider filter.</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
