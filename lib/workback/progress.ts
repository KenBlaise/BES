import type { WorkbackEvent, WorkbackStatus } from "@/mock/workback";

export const WORKBACK_STATUSES: WorkbackStatus[] = [
  "Not Started",
  "In Progress",
  "Blocked",
  "Complete",
  "Deferred",
];

export type WorkbackProgressEntry = {
  status: WorkbackStatus;
  updatedAt: string;
};

export type WorkbackProgress = Record<string, WorkbackProgressEntry>;

export function isWorkbackStatus(value: string): value is WorkbackStatus {
  return WORKBACK_STATUSES.includes(value as WorkbackStatus);
}

export function applyProgress(
  events: WorkbackEvent[],
  progress: WorkbackProgress,
): WorkbackEvent[] {
  return events.map((event) => {
    const update = progress[event.id];
    return update ? { ...event, status: update.status } : event;
  });
}
