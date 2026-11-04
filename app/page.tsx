import { CollectionSection } from "@/components/frames/CollectionSection";
import { PLACEHOLDER } from "@/mock/images";
import { getStudioEdit } from "@/mock/frames";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  const studioEdit = getStudioEdit();

  return (
    <>
      <section className="relative min-h-[70vh] overflow-hidden bg-ink text-ivory md:min-h-[78vh]">
        <Image
          src={PLACEHOLDER.hero}
          alt="Round sunglasses from the Blaze Eyewear Studio collection"
          fill
          priority
          unoptimized
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-ink/30" />
        <div className="page-shell relative flex min-h-[70vh] flex-col justify-end pb-12 pt-24 md:min-h-[78vh] md:pb-16">
          <p className="text-xs tracking-[0.28em] text-cream">BLAZE EYEWEAR STUDIO</p>
          <h1 className="mt-4 max-w-3xl font-serif text-5xl leading-tight md:text-6xl xl:text-7xl">
            Ignite your style.
          </h1>
          <p className="mt-5 max-w-md text-lg text-cream/85">
            Independent eyewear. Premium eyewear built to last.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/eyewear"
              className="inline-flex min-h-12 items-center bg-ivory px-6 text-xs tracking-[0.18em] text-ink"
            >
              Explore Eyewear
            </Link>
            <Link
              href="/visit"
              className="inline-flex min-h-12 items-center border border-ivory px-6 text-xs tracking-[0.18em] text-ivory"
            >
              Visit Blaze
            </Link>
          </div>
        </div>
      </section>

      <CollectionSection
        title="The Studio Edit"
        intro="A considered edit of frames we love right now — ready to try at Blaze."
        frames={studioEdit}
      />

      <section className="bg-cream">
        <div className="page-shell grid items-center gap-10 py-16 md:grid-cols-2 md:py-20">
          <div className="relative aspect-[4/5] overflow-hidden md:aspect-[4/5]">
            <Image
              src={PLACEHOLDER.lifestyleA}
              alt="Lifestyle photography from the Blaze studio"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-xs tracking-[0.22em] text-stone">FIND YOUR BLAZE</p>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl">Not sure where to start?</h2>
            <p className="mt-4 max-w-md text-lg text-charcoal/80">
              Find frames that fit your style. A few questions. A personal edit. No medical
              questionnaire.
            </p>
            <Link
              href="/find-your-blaze"
              className="mt-8 inline-flex min-h-12 items-center bg-ink px-6 text-xs tracking-[0.18em] text-ivory"
            >
              Find Your Blaze
            </Link>
          </div>
        </div>
      </section>

      <section className="page-shell py-16 md:py-20">
        <p className="text-xs tracking-[0.22em] text-stone">WHY BLAZE</p>
        <h2 className="mt-3 font-serif text-4xl">See confidence. Live Blaze.</h2>
        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ["Independent eyewear", "A locally owned studio, not a chain. Every frame is chosen with intention."],
            ["Personal styling", "We start with how you want to feel — then find the frames that belong to you."],
            ["Premium frames", "Pieces built to last, from houses we trust and collections we design."],
            ["Expert fitting", "Comfort is not an afterthought. Precision fitting is part of the Blaze visit."],
            ["Modern optical experience", "Technology that stays behind the scenes so you can stay with the style."],
            ["Local service", "Snellville, Georgia. Adjustments, repairs, and a team that knows your name."],
          ].map(([title, copy]) => (
            <div key={title}>
              <h3 className="text-lg">{title}</h3>
              <p className="mt-2 text-stone">{copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-ink text-ivory">
        <div className="page-shell grid gap-12 py-16 md:grid-cols-2 md:py-20">
          <div>
            <p className="text-xs tracking-[0.22em] text-warm">LENSES & SERVICES</p>
            <h2 className="mt-3 font-serif text-4xl">The pair is only the beginning.</h2>
            <p className="mt-4 text-cream/80">
              Prescription lenses, progressives, high-index, coatings, photochromic options,
              professional fitting, adjustments, repairs, and vision benefits assistance.
            </p>
            <Link
              href="/lenses-services"
              className="mt-8 inline-flex min-h-12 items-center border border-ivory px-6 text-xs tracking-[0.18em]"
            >
              Explore services
            </Link>
          </div>
          <div className="relative min-h-72 overflow-hidden">
            <Image
              src={PLACEHOLDER.lifestyleB}
              alt="Detail photography from the Blaze studio"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="page-shell grid items-center gap-10 py-16 md:grid-cols-2 md:py-20">
        <div className="relative aspect-[5/4] overflow-hidden bg-cream">
          <Image
            src={PLACEHOLDER.visit}
            alt="Blaze Eyewear Studio in Snellville"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div>
          <p className="text-xs tracking-[0.22em] text-stone">VISIT BLAZE</p>
          <h2 className="mt-3 font-serif text-4xl">2250 Scenic Hwy N</h2>
          <p className="mt-1 text-lg">Snellville, GA</p>
          <p className="mt-4 text-stone">
            Tue–Sat 10am–6pm · Sun–Mon by appointment
            <br />
            (470) 555-0192 · Placeholder hours
          </p>
          <p className="mt-4 text-sm text-stone">
            Map and parking details live on the visit page. Street-level studio with complimentary
            lot parking (demo).
          </p>
          <Link
            href="/visit"
            className="mt-8 inline-flex min-h-12 items-center bg-ink px-6 text-xs tracking-[0.18em] text-ivory"
          >
            Plan your visit
          </Link>
        </div>
      </section>
    </>
  );
}
