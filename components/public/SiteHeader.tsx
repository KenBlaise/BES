"use client";

import { useBlaze } from "@/lib/store/BlazeProvider";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV = [
  { href: "/eyewear", label: "Eyewear" },
  { href: "/find-your-blaze", label: "Find Your Blaze" },
  { href: "/lenses-services", label: "Lenses & Services" },
  { href: "/our-story", label: "Our Story" },
  { href: "/visit", label: "Visit Blaze" },
  { href: "/workback", label: "Workback" },
];

function NavLinks({
  pathname,
  onNavigate,
  compact = false,
}: {
  pathname: string;
  onNavigate?: () => void;
  compact?: boolean;
}) {
  return (
    <>
      {NAV.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={onNavigate}
          className={`inline-flex min-h-11 items-center ${compact ? "text-[13px]" : "text-sm md:text-[13px] xl:text-sm"} tracking-wide ${
            pathname.startsWith(item.href) ? "text-ink" : "text-stone hover:text-ink"
          }`}
        >
          {item.label}
        </Link>
      ))}
    </>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const { account } = useBlaze();
  const [open, setOpen] = useState(false);

  if (pathname.startsWith("/staff")) return null;

  const myBlazeLabel = account ? `My Blaze · ${account.firstName}` : "My Blaze";

  return (
    <header className="sticky top-0 z-40 border-b border-charcoal/10 bg-ivory/90 backdrop-blur-md">
      <div className="page-shell">
        <div className="flex items-center justify-between gap-4 py-3 md:py-4">
          <Link
            href="/"
            className="shrink-0 text-[11px] font-semibold tracking-[0.16em] text-ink sm:text-xs sm:tracking-[0.22em]"
          >
            BLAZE EYEWEAR STUDIO
          </Link>

          <nav className="hidden items-center gap-5 xl:flex" aria-label="Primary">
            <NavLinks pathname={pathname} />
            <Link
              href="/my-blaze"
              className="inline-flex min-h-11 items-center border border-ink px-4 text-[12px] tracking-[0.16em] text-ink hover:bg-ink hover:text-ivory"
            >
              {myBlazeLabel}
            </Link>
          </nav>

          <div className="flex items-center gap-3 xl:hidden">
            <Link
              href="/my-blaze"
              className="hidden min-h-11 items-center border border-ink px-3 text-[11px] tracking-[0.14em] md:inline-flex"
            >
              {myBlazeLabel}
            </Link>
            <button
              type="button"
              className="inline-flex min-h-11 min-w-11 items-center justify-center text-sm tracking-wide md:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((value) => !value)}
            >
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </div>

        <nav
          className="hidden flex-wrap items-center gap-x-5 gap-y-1 border-t border-charcoal/10 py-2 md:flex xl:hidden"
          aria-label="Primary"
        >
          <NavLinks pathname={pathname} compact />
        </nav>
      </div>

      {open ? (
        <nav id="mobile-nav" className="border-t border-charcoal/10 px-5 py-4 md:hidden">
          <div className="flex flex-col">
            <NavLinks pathname={pathname} onNavigate={() => setOpen(false)} />
            <Link
              href="/my-blaze"
              className="inline-flex min-h-11 items-center"
              onClick={() => setOpen(false)}
            >
              My Blaze
            </Link>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
