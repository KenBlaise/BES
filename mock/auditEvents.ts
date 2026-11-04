import type { AuditEvent } from "@/lib/types";

export const seedAuditEvents: AuditEvent[] = [
  {
    id: "AUD-1001",
    type: "EMPLOYEE_LOGIN",
    actorName: "Janelle B.",
    actorRole: "EMPLOYEE",
    timestamp: "2026-09-27T14:10:00.000Z",
  },
  {
    id: "AUD-1002",
    type: "CUSTOMER_SEARCH",
    actorName: "Janelle B.",
    actorRole: "EMPLOYEE",
    customerId: "BLZ-10482",
    timestamp: "2026-09-27T14:18:00.000Z",
    detail: "Phone lookup (404) 555-1234",
  },
  {
    id: "AUD-1003",
    type: "CUSTOMER_VERIFIED",
    actorName: "Janelle B.",
    actorRole: "EMPLOYEE",
    customerId: "BLZ-10482",
    timestamp: "2026-09-27T14:22:00.000Z",
  },
  {
    id: "AUD-1004",
    type: "BENEFITS_CHECKED",
    actorName: "Janelle B.",
    actorRole: "EMPLOYEE",
    customerId: "BLZ-10482",
    timestamp: "2026-09-27T14:42:00.000Z",
    detail: "VSP Choice — demo eligibility",
  },
];
