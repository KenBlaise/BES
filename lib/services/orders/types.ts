import type { BlazeOrder } from "@/lib/types";

export interface CreateOrderInput {
  blazeCustomerId: string;
  myBlazeAccountId?: string;
  crystalPatientId?: string;
  frameId: string;
  frameBrand: string;
  frameModel: string;
  frameColor: string;
  prescriptionReference: string;
  lensType: string;
  lensMaterial: string;
  lensOptions: string[];
  retailPrice: number;
  estimatedBenefit: number;
  estimatedCustomerResponsibility: number;
}

export interface OrderService {
  listForCustomer(blazeCustomerId: string): Promise<BlazeOrder[]>;
  get(orderId: string): Promise<BlazeOrder | undefined>;
  create(input: CreateOrderInput): Promise<BlazeOrder>;
}
