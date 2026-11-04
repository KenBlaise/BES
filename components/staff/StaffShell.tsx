"use client";

import { DemoModeBadge } from "@/components/staff/DemoModeBadge";
import { services } from "@/lib/services";
import { usePrototypeState } from "@/lib/store/usePrototypeState";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const NAV = [
  { href: "/staff", label: "Home" },
  { href: "/staff/customers", label: "Customers" },
  { href: "/staff/orders", label: "Orders" },
  { href: "/staff/appointments", label: "Appointments" },
  { href: "/staff/inventory", label: "Inventory" },
  { href: "/staff/settings", label: "Settings" },
];

export function StaffShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const state = usePrototypeState();
  const session = state.employeeSession;

  useEffect(() => {
    if (pathname === "/staff/login") return;
    if (!session) router.replace("/staff/login");
  }, [pathname, router, session]);

  if (pathname === "/staff/login") return <>{children}</>;
  if (!session) return <div className="p-8 text-stone">Opening staff…</div>;

  return (
    <div className="min-h-screen bg-ivory">
      <header className="border-b border-charcoal/10 bg-ink text-ivory">
        <div className="page-shell flex items-center justify-between py-3 md:py-4">
          <Link href="/staff" className="tracking-[0.22em] text-xs">
            BLAZE STAFF
          </Link>
          <div className="flex items-center gap-4 text-sm">
            <span className="hidden sm:inline">{session.name}</span>
            <button
              type="button"
              className="inline-flex min-h-11 items-center"
              onClick={async () => {
                await services.auth.logoutEmployee();
                router.push("/staff/login");
              }}
            >
              Sign out
            </button>
          </div>
        </div>
        <nav className="page-shell flex gap-1 overflow-x-auto pb-3 text-sm">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`inline-flex min-h-12 shrink-0 items-center px-3 ${
                pathname === item.href ? "text-orange" : "text-cream/70"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>
      <div className="page-shell py-3">
        <DemoModeBadge />
      </div>
      <div className="page-shell pb-16">{children}</div>
    </div>
  );
}
