import { PLACEHOLDER } from "@/mock/images";
import Image from "next/image";
import Link from "next/link";

export default function VisitPage() {
  return (
    <div>
      <div className="relative h-[50vh] min-h-80 overflow-hidden bg-ink">
        <Image
          src={PLACEHOLDER.visit}
          alt="Blaze Eyewear Studio exterior placeholder"
          fill
          className="object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-ink/35" />
        <div className="page-shell relative flex h-full items-end pb-10 text-ivory">
          <div>
            <p className="text-xs tracking-[0.22em]">THE STUDIO</p>
            <h1 className="mt-2 font-serif text-5xl">Visit Blaze</h1>
          </div>
        </div>
      </div>

      <div className="page-shell grid gap-12 py-12 md:grid-cols-2 md:py-16">
        <div>
          <h2 className="font-serif text-4xl">Blaze Eyewear Studio</h2>
          <p className="mt-4 text-lg">
            2250 Scenic Hwy N
            <br />
            Snellville, GA
          </p>
          <p className="mt-6 text-stone">
            Phone (placeholder): (470) 555-0192
            <br />
            Tue–Sat 10:00am – 6:00pm
            <br />
            Sun–Mon by appointment
          </p>
          <p className="mt-6 leading-7 text-charcoal/80">
            Complimentary lot parking is available beside the studio (demo). Enter from Scenic
            Highway; the entrance faces the courtyard. Street parking is limited during peak hours.
          </p>
          <p className="mt-4 text-sm text-stone">
            Hours, phone, and parking are placeholder/demo information until confirmed.
          </p>
          <Link
            href="/find-your-blaze"
            className="mt-8 inline-block bg-ink px-6 py-3 text-xs tracking-[0.18em] text-ivory"
          >
            Book a styling visit
          </Link>
        </div>
        <div className="space-y-4">
          <div className="flex aspect-[4/3] items-center justify-center bg-cream text-center text-stone">
            <div>
              <p className="text-xs tracking-[0.18em]">MAP PLACEHOLDER</p>
              <p className="mt-2">2250 Scenic Hwy N, Snellville, GA</p>
              <a
                className="mt-4 inline-block underline"
                href="https://maps.google.com/?q=2250+Scenic+Hwy+N+Snellville+GA"
                target="_blank"
                rel="noreferrer"
              >
                Open directions
              </a>
            </div>
          </div>
          <div className="relative aspect-[5/3] overflow-hidden bg-cream">
            <Image
              src={PLACEHOLDER.lifestyleC}
              alt="Interior atmosphere of the Blaze studio"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
