"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function SiteFooter() {
  const pathname = usePathname();
  if (pathname.startsWith("/staff")) return null;

  return (
    <footer className="mt-24 border-t border-charcoal/10 bg-ink text-cream">
      <div className="page-shell grid gap-10 py-14 md:grid-cols-3">
        <div>
          <p className="tracking-[0.28em] text-xs">BLAZE EYEWEAR STUDIO</p>
          <p className="mt-4 font-serif text-3xl">Ignite your style.</p>
          <p className="mt-3 max-w-sm text-sm text-warm">
            Independent eyewear. Premium frames built to last. Personal styling in Snellville.
          </p>
        </div>
        <div className="text-sm leading-7 text-cream/80">
          <p>2250 Scenic Hwy N</p>
          <p>Snellville, GA</p>
          <p className="mt-3">(470) 555-0192</p>
          <p>Hours placeholder: Tue–Sat 10–6</p>
        </div>
        <div className="flex flex-col gap-1 text-sm">
          <Link href="/eyewear" className="inline-flex min-h-11 items-center">Eyewear</Link>
          <Link href="/find-your-blaze" className="inline-flex min-h-11 items-center">Find Your Blaze</Link>
          <Link href="/visit" className="inline-flex min-h-11 items-center">Visit Blaze</Link>
          <Link href="/workback" className="inline-flex min-h-11 items-center">Workback</Link>
          <Link href="/my-blaze" className="inline-flex min-h-11 items-center">My Blaze</Link>
          <Link href="/staff/login" className="mt-4 inline-flex min-h-11 items-center text-cream/40">
            Staff
          </Link>
        </div>
      </div>
    </footer>
  );
}
