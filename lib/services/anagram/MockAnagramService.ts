import { recordAudit } from "@/lib/audit";
import { getState, setState } from "@/lib/store/prototype-db";
import type { AnagramEligibilityResult } from "@/lib/types";
import { nowIso, randomId, simulateLatency } from "@/lib/utils";
import type { AnagramService } from "./types";

function demoResult(): AnagramEligibilityResult {
  return {
    anagramEligibilityId: randomId("ANG-ELIG"),
    anagramPatientId: "ANA-19281",
    carrier: "VSP",
    planName: "VSP Choice",
    status: "active",
    frameAllowance: 200,
    lensBenefit: "Covered according to plan",
    progressiveBenefit: "$120 allowance",
    antiReflectiveBenefit: "$40 allowance",
    eligibilityDate: new Date().toISOString().slice(0, 10),
  };
}

export const mockAnagramService: AnagramService = {
  async checkEligibility() {
    await simulateLatency(1100);
    return demoResult();
  },

  async getDetailedBenefits(anagramEligibilityId) {
    await simulateLatency(400);
    return { ...demoResult(), anagramEligibilityId };
  },

  async refreshEligibility() {
    await simulateLatency(900);
    return demoResult();
  },

  async linkEligibilityToCustomer(blazeCustomerId, anagramEligibilityId) {
    const employee = getState().employeeSession;
    setState((state) => ({
      ...state,
      benefits: [
        {
          id: randomId("BEN"),
          blazeCustomerId,
          anagramEligibilityId,
          carrier: "VSP",
          planName: "VSP Choice",
          status: "active",
          frameAllowance: 200,
          lensBenefit: "Covered according to plan",
          progressiveBenefit: "$120 allowance",
          antiReflectiveBenefit: "$40 allowance",
          eligibilityDate: new Date().toISOString().slice(0, 10),
          verifiedAt: nowIso(),
          source: "ANAGRAM",
        },
        ...state.benefits.filter((item) => item.blazeCustomerId !== blazeCustomerId),
      ],
    }));
    recordAudit({
      type: "BENEFITS_CHECKED",
      actorName: employee?.name ?? "Staff",
      actorRole: "EMPLOYEE",
      customerId: blazeCustomerId,
      detail: "Mock Anagram eligibility — staff initiated",
    });
  },

  async createClaim() {
    await simulateLatency();
    return { claimId: randomId("CLM") };
  },
};
