import type {
  AnagramEligibilityRequest,
  AnagramEligibilityResult,
} from "@/lib/types";

/**
 * Desired Anagram abstraction. ALL methods return mock data.
 * Do not treat these names as confirmed public Anagram APIs.
 */
export interface AnagramService {
  checkEligibility(
    request: AnagramEligibilityRequest,
  ): Promise<AnagramEligibilityResult>;
  getDetailedBenefits(
    anagramEligibilityId: string,
  ): Promise<AnagramEligibilityResult | undefined>;
  refreshEligibility(
    request: AnagramEligibilityRequest,
  ): Promise<AnagramEligibilityResult>;
  linkEligibilityToCustomer(
    blazeCustomerId: string,
    anagramEligibilityId: string,
  ): Promise<void>;
  /** Desired claim capability — mock only, unconfirmed. */
  createClaim(input: {
    blazeCustomerId: string;
    orderId: string;
  }): Promise<{ claimId: string }>;
}
