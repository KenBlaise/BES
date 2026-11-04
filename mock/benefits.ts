import type { BenefitVerification } from "@/lib/types";

export const kenBenefits: BenefitVerification = {
  id: "BEN-10482-01",
  blazeCustomerId: "BLZ-10482",
  anagramEligibilityId: "ANG-ELIG-88421",
  carrier: "VSP",
  planName: "VSP Choice",
  status: "active",
  frameAllowance: 200,
  lensBenefit: "Covered according to plan",
  progressiveBenefit: "$120 allowance",
  antiReflectiveBenefit: "$40 allowance",
  eligibilityDate: "2026-09-27",
  verifiedAt: "2026-09-27T14:42:00.000Z",
  source: "ANAGRAM",
};

export const seedBenefits: BenefitVerification[] = [kenBenefits];
