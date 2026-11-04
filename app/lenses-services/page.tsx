import Link from "next/link";

const SECTIONS = [
  {
    title: "Prescription lenses",
    copy: "Single-vision, distance, and near — crafted to your prescription and the frame you chose.",
  },
  {
    title: "Progressive lenses",
    copy: "A seamless field for distance, intermediate, and near. We take the time to fit them properly.",
  },
  {
    title: "High-index lenses",
    copy: "Thinner, lighter lenses for stronger prescriptions without adding bulk to a refined frame.",
  },
  {
    title: "Anti-reflective coatings",
    copy: "Clearer vision, less glare, and a cleaner look in conversation and on camera.",
  },
  {
    title: "Photochromic options",
    copy: "Lenses that adapt with the light — one pair that moves with your day.",
  },
  {
    title: "Frame styling",
    copy: "A guided edit from the wall and from the frames you’ve already saved in My Blaze.",
  },
  {
    title: "Professional fitting",
    copy: "Measurements, pantoscopic tilt, vertex — the details that make a pair feel like yours.",
  },
  {
    title: "Adjustments",
    copy: "Come back. We will tune the fit as the frames settle into your life.",
  },
  {
    title: "Repairs",
    copy: "Screws, nosepads, temples — small restorations that keep a favorite pair in rotation.",
  },
  {
    title: "Vision benefits assistance",
    copy: "Have vision coverage? Our team can help verify eligible benefits as part of your Blaze eyewear purchase.",
  },
];

export default function LensesServicesPage() {
  return (
    <div className="page-shell max-w-4xl py-12 md:py-16">
      <p className="text-xs tracking-[0.22em] text-stone">THE PAIR, COMPLETED</p>
      <h1 className="mt-3 font-serif text-5xl">Lenses & services</h1>
      <p className="mt-5 max-w-2xl text-lg text-stone">
        Education without the lecture. We will help you choose what matters for how you see and
        how you look.
      </p>
      <div className="mt-14 space-y-10">
        {SECTIONS.map((section) => (
          <section key={section.title} className="border-t border-charcoal/10 pt-8">
            <h2 className="font-serif text-3xl">{section.title}</h2>
            <p className="mt-3 text-charcoal/80">{section.copy}</p>
          </section>
        ))}
      </div>

      <section className="mt-16 bg-cream px-6 py-10">
        <h2 className="font-serif text-3xl">Using vision benefits at Blaze</h2>
        <p className="mt-4 max-w-xl text-charcoal/80">
          Have vision coverage? Our team can help verify eligible benefits as part of your Blaze
          eyewear purchase. Benefits are confirmed in studio — not as a public lookup.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/visit" className="bg-ink px-5 py-3 text-xs tracking-[0.16em] text-ivory">
            Visit Blaze
          </Link>
          <Link href="/visit" className="border border-ink px-5 py-3 text-xs tracking-[0.16em]">
            Book a styling visit
          </Link>
        </div>
      </section>
    </div>
  );
}
