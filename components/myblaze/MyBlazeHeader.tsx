"use client";

import { useBlaze } from "@/lib/store/BlazeProvider";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function MyBlazeHeader() {
  const { account, isConnectedCustomer, logout } = useBlaze();
  const pathname = usePathname();

  const retail = [
    { href: "/my-blaze", label: "Overview" },
    { href: "/my-blaze/favorites", label: "Saved Frames" },
    { href: "/my-blaze/style", label: "Style" },
    { href: "/my-blaze/profile", label: "Profile" },
  ];

  const connected = [
    { href: "/my-blaze", label: "Overview" },
    { href: "/my-blaze/orders", label: "My Eyewear" },
    { href: "/my-blaze/prescriptions", label: "Prescriptions" },
    { href: "/my-blaze/appointments", label: "Appointments" },
    { href: "/my-blaze/favorites", label: "Saved Frames" },
    { href: "/my-blaze/style", label: "Style" },
    { href: "/my-blaze/receipts", label: "Receipts" },
    { href: "/my-blaze/profile", label: "Profile" },
  ];

  const links = isConnectedCustomer ? connected : retail;

  return (
    <div className="border-b border-charcoal/10 bg-cream/50">
      <div className="page-shell flex max-w-6xl flex-col gap-4 py-5 md:py-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs tracking-[0.22em] text-stone">MY BLAZE</p>
            <p className="font-serif text-2xl">
              {account ? `Welcome back, ${account.firstName}` : "My Blaze"}
            </p>
          </div>
          {account ? (
            <button type="button" className="text-sm underline" onClick={() => void logout()}>
              Sign out
            </button>
          ) : null}
        </div>
        <nav className="flex gap-4 overflow-x-auto text-sm" aria-label="My Blaze">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`inline-flex min-h-11 items-center whitespace-nowrap ${
                pathname === link.href ? "border-b border-ink" : "text-stone"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
