import type { StyleProfile } from "@/lib/types";
import { titleCase } from "@/lib/utils";
import Link from "next/link";

export function StyleProfileCard({ profile }: { profile?: StyleProfile }) {
  if (!profile?.style && !profile?.shapes.length) {
    return (
      <div className="bg-cream px-6 py-8">
        <h3 className="font-serif text-2xl">Your style</h3>
        <p className="mt-3 text-stone">
          Take Find Your Blaze and we will keep an edit that feels like you.
        </p>
        <Link href="/find-your-blaze" className="mt-5 inline-block underline">
          Find Your Blaze
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-cream px-6 py-8">
      <h3 className="font-serif text-2xl">Your style</h3>
      <p className="mt-3 capitalize">{profile?.style}</p>
      <p className="mt-2 text-sm text-stone">
        Shapes: {profile?.shapes.map(titleCase).join(", ") || "Open"}
        <br />
        Colors: {profile?.colors.map(titleCase).join(", ") || "Open"}
      </p>
      <Link href="/find-your-blaze" className="mt-5 inline-block text-sm underline">
        Refine
      </Link>
    </div>
  );
}
