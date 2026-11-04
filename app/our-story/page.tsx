import { PLACEHOLDER } from "@/mock/images";
import Image from "next/image";

export default function OurStoryPage() {
  return (
    <article className="page-shell max-w-3xl py-12 md:py-16">
      <p className="text-xs tracking-[0.22em] text-stone">BLAZE EYEWEAR STUDIO</p>
      <h1 className="mt-3 font-serif text-5xl">Our story</h1>
      <p className="mt-6 text-xl leading-8 text-charcoal/85">
        Blaze began as a simple idea: eyewear should feel like fashion, and optical care should
        feel like hospitality. Not a waiting room. Not a warehouse. A studio.
      </p>
      <div className="relative my-12 aspect-[16/10] overflow-hidden bg-cream">
        <Image
          src={PLACEHOLDER.ourStory}
          alt="Portrait for the Blaze Eyewear Studio story"
          fill
          unoptimized
          sizes="(min-width: 768px) 768px, 100vw"
          className="object-cover"
        />
      </div>
      <div className="space-y-6 text-lg leading-8 text-charcoal/85">
        <p>
          We are locally owned and independent. That means the frames on the wall were chosen by
          people who will actually fit them to your face — not a distant buying algorithm.
        </p>
        <p>
          Style comes first. Then service. Then the quiet technology that makes a visit easier:
          saving the frames you love, remembering how you like to wear them, and keeping your
          relationship with Blaze in one place.
        </p>
        <p>
          Technology should never become the identity of the brand. You should experience Blaze —
          warm wood, considered lighting, a conversation about how you want to look — not a
          patchwork of other people’s software.
        </p>
        <p>Premium eyewear built to last. See confidence. Live Blaze.</p>
      </div>
    </article>
  );
}
