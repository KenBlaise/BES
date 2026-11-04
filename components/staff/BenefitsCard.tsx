import type { BenefitVerification } from "@/lib/types";
import { formatMoney } from "@/lib/utils";

export function BenefitsCard({ benefit }: { benefit: BenefitVerification }) {
  return (
    <article className="bg-cream px-6 py-8">
      <p className="text-xs tracking-[0.16em] text-stone">VISION BENEFITS · DEMO DATA</p>
      <h2 className="mt-2 font-serif text-3xl">{benefit.planName}</h2>
      <p className="mt-2">{benefit.carrier} · Active ✓</p>
      <dl className="mt-6 space-y-2 text-sm">
        <div className="flex justify-between gap-4">
          <dt>Frame allowance</dt>
          <dd>{formatMoney(benefit.frameAllowance)}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt>Lens benefit</dt>
          <dd>{benefit.lensBenefit}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt>Progressive</dt>
          <dd>{benefit.progressiveBenefit}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt>Anti-reflective</dt>
          <dd>{benefit.antiReflectiveBenefit}</dd>
        </div>
      </dl>
      <p className="mt-6 text-xs text-stone">
        Verified {new Date(benefit.verifiedAt).toLocaleString()} · Last verified matters because
        benefits can change.
      </p>
    </article>
  );
}
