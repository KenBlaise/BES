"use client";

import { CustomerSearch } from "@/components/staff/CustomerSearch";
import Link from "next/link";

export default function StaffCustomersPage() {
  return (
    <div className="py-4">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-4xl">Customers</h1>
          <p className="mt-2 text-stone">Phone is the primary lookup.</p>
        </div>
        <Link
          href="/staff/customers/new"
          className="min-h-12 bg-ink px-5 text-xs leading-[48px] tracking-[0.16em] text-ivory"
        >
          New customer
        </Link>
      </div>
      <div className="mt-10">
        <CustomerSearch />
      </div>
    </div>
  );
}
