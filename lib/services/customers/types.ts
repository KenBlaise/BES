import type { BlazeCustomer } from "@/lib/types";

export interface CustomerService {
  search(query: string): Promise<BlazeCustomer[]>;
  get(blazeCustomerId: string): Promise<BlazeCustomer | undefined>;
  create(
    input: Omit<BlazeCustomer, "blazeCustomerId" | "createdAt" | "updatedAt">,
  ): Promise<BlazeCustomer>;
  connectMyBlaze(
    blazeCustomerId: string,
    myBlazeAccountId: string,
  ): Promise<BlazeCustomer>;
  attachCrystal(
    blazeCustomerId: string,
    crystalPatientId: string,
  ): Promise<BlazeCustomer>;
  attachAnagram(
    blazeCustomerId: string,
    anagramPatientId: string,
  ): Promise<BlazeCustomer>;
}
