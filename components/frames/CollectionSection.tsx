import { FrameCard } from "@/components/frames/FrameCard";
import type { Frame } from "@/lib/types";

export function CollectionSection({
  title,
  intro,
  frames,
}: {
  title: string;
  intro?: string;
  frames: Frame[];
}) {
  return (
    <section className="page-shell py-12 md:py-16">
      <p className="text-xs tracking-[0.22em] text-stone">COLLECTION</p>
      <h2 className="mt-2 font-serif text-4xl md:text-5xl">{title}</h2>
      {intro ? <p className="mt-3 max-w-xl text-stone">{intro}</p> : null}
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {frames.map((frame) => (
          <FrameCard key={frame.id} frame={frame} />
        ))}
      </div>
    </section>
  );
}
