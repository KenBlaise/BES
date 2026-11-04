import type { CherryLabOrder } from "@/lib/types";

/**
 * Desired Cherry Optical abstractions.
 * PENDING CHERRY INTEGRATION CAPABILITY CONFIRMATION
 * Do not treat these method names as confirmed Cherry APIs.
 */
export interface CherryOpticalService {
  createLabOrder(input: {
    blazeOrderId: string;
    frameBrand: string;
    frameModel: string;
    lensType: string;
  }): Promise<CherryLabOrder>;
  getLabOrder(labOrderId: string): Promise<CherryLabOrder | undefined>;
  getLabOrderStatus(labOrderId: string): Promise<CherryLabOrder | undefined>;
  getShipmentTracking(
    labOrderId: string,
  ): Promise<{ trackingNumber?: string; status: string } | undefined>;
}
