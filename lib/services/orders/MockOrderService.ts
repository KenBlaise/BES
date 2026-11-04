import { recordAudit } from "@/lib/audit";
import { mockCherryOpticalService } from "@/lib/services/cherry/MockCherryOpticalService";
import { getState, setState } from "@/lib/store/prototype-db";
import type { BlazeOrder } from "@/lib/types";
import { nowIso, simulateLatency } from "@/lib/utils";
import type { OrderService } from "./types";

export const mockOrderService: OrderService = {
  async listForCustomer(blazeCustomerId) {
    await simulateLatency(250);
    return getState().orders.filter((item) => item.blazeCustomerId === blazeCustomerId);
  },

  async get(orderId) {
    await simulateLatency(200);
    return getState().orders.find((item) => item.orderId === orderId);
  },

  async create(input) {
    await simulateLatency(800);
    const nextNumber =
      Math.max(
        10248,
        ...getState().orders.map((item) => Number(item.orderId) || 0),
      ) + 1;
    const order: BlazeOrder = {
      ...input,
      orderId: String(nextNumber),
      orderStatus: "ORDER_RECEIVED",
      labName: "Cherry Optical",
      createdAt: nowIso(),
      updatedAt: nowIso(),
    };

    const lab = await mockCherryOpticalService.createLabOrder({
      blazeOrderId: order.orderId,
      frameBrand: input.frameBrand,
      frameModel: input.frameModel,
      lensType: input.lensType,
    });

    const withLab: BlazeOrder = {
      ...order,
      labOrderId: lab.labOrderId,
      orderStatus: "LENSES_IN_PRODUCTION",
      updatedAt: nowIso(),
    };

    setState((state) => ({
      ...state,
      orders: [withLab, ...state.orders],
      receipts: [
        {
          id: `RCP-${withLab.orderId}`,
          orderId: withLab.orderId,
          blazeCustomerId: withLab.blazeCustomerId,
          purchaseDate: new Date().toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          }),
          frame: `${withLab.frameBrand} ${withLab.frameModel} — ${withLab.frameColor}`,
          lenses: [withLab.lensType, withLab.lensMaterial, ...withLab.lensOptions].join(" · "),
          retailPrice: withLab.retailPrice,
          benefitApplied: withLab.estimatedBenefit,
          customerPaid: withLab.estimatedCustomerResponsibility,
        },
        ...state.receipts,
      ],
    }));

    const employee = getState().employeeSession;
    recordAudit({
      type: "ORDER_CREATED",
      actorName: employee?.name ?? "Staff",
      actorRole: "EMPLOYEE",
      customerId: input.blazeCustomerId,
      detail: `Blaze Order #${withLab.orderId}`,
    });
    return withLab;
  },
};
