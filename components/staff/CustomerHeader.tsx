import { IntegrationStatusBadge } from "@/components/staff/IntegrationStatusBadge";
import type { BlazeCustomer, MyBlazeAccount } from "@/lib/types";

export function CustomerHeader({
  customer,
  account,
  verified,
}: {
  customer: BlazeCustomer;
  account?: MyBlazeAccount;
  verified: boolean;
}) {
  return (
    <header className="border-b border-charcoal/10 pb-6">
      <p className="text-xs tracking-[0.18em] text-stone">{customer.blazeCustomerId}</p>
      <h1 className="mt-2 font-serif text-4xl">
        {customer.firstName} {customer.lastName}
      </h1>
      <p className="mt-2 text-stone">{customer.phone}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <IntegrationStatusBadge label="My Blaze" connected={Boolean(account)} />
        <IntegrationStatusBadge label="Crystal" connected={Boolean(customer.crystalPatientId)} />
        {verified ? (
          <span className="border border-ink px-2 py-1 text-[11px]">Customer verified ✓</span>
        ) : null}
      </div>
    </header>
  );
}
