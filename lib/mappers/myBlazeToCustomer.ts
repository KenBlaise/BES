import type { BlazeCustomer, MyBlazeAccount } from "@/lib/types";

/**
 * Linking helper — never copies favorites or style onto a new record.
 * Those remain on MyBlazeAccount.
 */
export function suggestedLinkFromMyBlaze(
  account: MyBlazeAccount,
  customer: BlazeCustomer,
) {
  return {
    myBlazeAccountId: account.accountId,
    blazeCustomerId: customer.blazeCustomerId,
    emailMatch:
      account.email.toLowerCase() === customer.email.toLowerCase(),
    nameMatch:
      account.firstName.toLowerCase() === customer.firstName.toLowerCase(),
  };
}
