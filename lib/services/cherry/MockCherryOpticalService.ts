import { getState, setState } from "@/lib/store/prototype-db";
import type { CherryLabOrder } from "@/lib/types";
import { nowIso, randomId, simulateLatency } from "@/lib/utils";
import type { CherryOpticalService } from "./types";

export const mockCherryOpticalService: CherryOpticalService = {
  async createLabOrder(input) {
    // PENDING CHERRY INTEGRATION CAPABILITY CONFIRMATION
    await simulateLatency(900);
    const order: CherryLabOrder = {
      labOrderId: randomId("CHY"),
      blazeOrderId: input.blazeOrderId,
      status: "received",
      trackingNumber: randomId("CHY-TRK"),
      createdAt: nowIso(),
      updatedAt: nowIso(),
    };
    setState((state) => ({
      ...state,
      cherryOrders: [...state.cherryOrders, order],
    }));
    return order;
  },

  async getLabOrder(labOrderId) {
    await simulateLatency(200);
    return getState().cherryOrders.find((item) => item.labOrderId === labOrderId);
  },

  async getLabOrderStatus(labOrderId) {
    return this.getLabOrder(labOrderId);
  },

  async getShipmentTracking(labOrderId) {
    const order = await this.getLabOrder(labOrderId);
    if (!order) return undefined;
    return { trackingNumber: order.trackingNumber, status: order.status };
  },
};
