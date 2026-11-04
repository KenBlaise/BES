import type { AnagramEligibilityRequest, CrystalPatient } from "@/lib/types";

/**
 * Vendor-specific mapping outside UI.
 * Passes only the minimum fields needed for a mock eligibility request.
 * Does not copy the full Crystal patient record into Blaze storage.
 */
export function mapCrystalPatientToAnagramEligibilityRequest(
  patient: CrystalPatient,
): AnagramEligibilityRequest {
  return {
    firstName: patient.firstName,
    lastName: patient.lastName,
    dateOfBirth: patient.dateOfBirth,
    phone: patient.phone,
    zip: patient.zip,
  };
}
