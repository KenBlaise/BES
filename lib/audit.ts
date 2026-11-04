import { getState, setState } from "@/lib/store/prototype-db";
import type { AuditEvent, AuditEventType, Role } from "@/lib/types";
import { nowIso, randomId } from "@/lib/utils";

export function recordAudit(input: {
  type: AuditEventType;
  actorName: string;
  actorRole: Role;
  customerId?: string;
  accountId?: string;
  detail?: string;
}) {
  const event: AuditEvent = {
    id: randomId("AUD"),
    timestamp: nowIso(),
    ...input,
  };
  setState((state) => ({
    ...state,
    auditEvents: [event, ...state.auditEvents],
  }));
  return event;
}

export function listAuditEvents() {
  return getState().auditEvents;
}
