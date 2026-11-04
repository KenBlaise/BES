import Link from "next/link";

export default function StaffHomePage() {
  return (
    <div className="py-6">
      <h1 className="font-serif text-4xl">Studio floor</h1>
      <p className="mt-3 max-w-xl text-stone">
        Look up a guest, verify them, and start from the frames they already saved online.
      </p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <Link href="/staff/customers" className="bg-cream px-6 py-8">
          <p className="text-xs tracking-[0.16em] text-stone">PRIMARY</p>
          <p className="mt-2 font-serif text-3xl">Customers</p>
        </Link>
        <Link href="/staff/customers" className="border border-charcoal/10 px-6 py-8">
          <p className="font-serif text-2xl">New walk-in</p>
          <p className="mt-2 text-stone">Create a Blaze customer, then connect My Blaze if they have one.</p>
        </Link>
      </div>
    </div>
  );
}
