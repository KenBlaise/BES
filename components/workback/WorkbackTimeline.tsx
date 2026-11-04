"use client";

import { WORKBACK_STATUSES } from "@/lib/workback/progress";
import type { WorkbackEvent, WorkbackStatus } from "@/mock/workback";
import { useMemo, useState, type RefObject, type UIEventHandler } from "react";

const CHART_MIN_WIDTH = "56rem";

function parseDate(isoDate: string) {
  return new Date(`${isoDate}T00:00:00`);
}

function addDays(isoDate: string, days: number) {
  const date = parseDate(isoDate);
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

function daysBetween(start: string, end: string) {
  return Math.round((parseDate(end).getTime() - parseDate(start).getTime()) / 86_400_000);
}

function monthKey(isoDate: string) {
  return isoDate.slice(0, 7);
}

function formatMonth(isoDate: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
  }).format(parseDate(isoDate));
}

function formatDisplay(isoDate: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(parseDate(isoDate));
}

function statusFill(status: WorkbackStatus) {
  if (status === "Complete") return "bg-ink";
  if (status === "In Progress") return "bg-orange";
  if (status === "Blocked") return "bg-wood";
  if (status === "Deferred") return "bg-warm";
  return "bg-charcoal/35";
}

function buildMonths(rangeStart: string, rangeEnd: string) {
  const months: { key: string; start: string; days: number }[] = [];
  let cursor = `${rangeStart.slice(0, 7)}-01`;

  while (cursor <= rangeEnd) {
    const nextMonth = addDays(`${cursor.slice(0, 7)}-28`, 8).slice(0, 7);
    const monthEnd = addDays(`${nextMonth}-01`, -1);
    const clippedStart = cursor < rangeStart ? rangeStart : cursor;
    const clippedEnd = monthEnd > rangeEnd ? rangeEnd : monthEnd;
    months.push({
      key: monthKey(cursor),
      start: clippedStart,
      days: daysBetween(clippedStart, clippedEnd) + 1,
    });
    cursor = `${nextMonth}-01`;
  }

  return months;
}

function useTimelineScale(events: WorkbackEvent[], opening: string) {
  return useMemo(() => {
    const rangeStart = events.reduce(
      (min, event) => (event.startDate < min ? event.startDate : min),
      events[0]?.startDate ?? opening,
    );
    const lastDue = events.reduce(
      (max, event) => (event.dueDate > max ? event.dueDate : max),
      events[0]?.dueDate ?? opening,
    );
    const rangeEnd = lastDue > opening ? lastDue : opening;
    const totalDays = Math.max(daysBetween(rangeStart, rangeEnd) + 1, 1);
    const today = new Date().toISOString().slice(0, 10);
    const todayOffset =
      today >= rangeStart && today <= rangeEnd
        ? ((daysBetween(rangeStart, today) + 0.5) / totalDays) * 100
        : null;

    return {
      rangeStart,
      rangeEnd,
      totalDays,
      months: buildMonths(rangeStart, rangeEnd),
      todayOffset,
    };
  }, [events, opening]);
}

export function WorkbackTimelineAxis({
  events,
  opening,
  scrollRef,
  onScroll,
}: {
  events: WorkbackEvent[];
  opening: string;
  scrollRef: RefObject<HTMLDivElement | null>;
  onScroll: UIEventHandler<HTMLDivElement>;
}) {
  const scale = useTimelineScale(events, opening);

  return (
    <div ref={scrollRef} onScroll={onScroll} className="overflow-x-auto">
      <div
        className="grid grid-cols-[9rem_1fr] md:grid-cols-[13rem_1fr]"
        style={{ minWidth: CHART_MIN_WIDTH }}
      >
        <p className="pr-3 pt-1 text-xs tracking-[0.16em] text-stone">TASK</p>
        <div className="relative flex border-b border-charcoal/15 pb-2 pt-1">
          {scale.months.map((month) => (
            <div
              key={month.key}
              className="shrink-0 text-xs tracking-wide text-stone"
              style={{ width: `${(month.days / scale.totalDays) * 100}%` }}
            >
              {formatMonth(month.start)}
            </div>
          ))}
          {scale.todayOffset !== null ? (
            <span
              aria-hidden
              className="absolute bottom-0 top-0 w-px bg-orange"
              style={{ left: `${scale.todayOffset}%` }}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export function WorkbackTimeline({
  events,
  opening,
  onUpdateStatus,
  scrollRef,
  onScroll,
}: {
  events: WorkbackEvent[];
  opening: string;
  onUpdateStatus: (id: string, status: WorkbackStatus) => void;
  scrollRef: RefObject<HTMLDivElement | null>;
  onScroll: UIEventHandler<HTMLDivElement>;
}) {
  const [selectedId, setSelectedId] = useState(events[0]?.id ?? "");
  const selected = events.find((event) => event.id === selectedId) ?? events[0];
  const scale = useTimelineScale(events, opening);

  const lanes = new Map<string, WorkbackEvent[]>();
  for (const event of [...events].sort((a, b) => a.startDate.localeCompare(b.startDate))) {
    const lane = lanes.get(event.workstream) ?? [];
    lane.push(event);
    lanes.set(event.workstream, lane);
  }

  return (
    <div className="mt-8">
      <div className="mb-4 flex flex-wrap gap-4 text-xs tracking-wide text-stone">
        <span className="inline-flex items-center gap-2">
          <span className="h-2 w-5 bg-charcoal/35" /> Not started
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-2 w-5 bg-orange" /> In progress
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-2 w-5 bg-ink" /> Complete
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-2 w-5 bg-wood" /> Blocked
        </span>
        {scale.todayOffset !== null ? (
          <span className="inline-flex items-center gap-2">
            <span className="h-4 w-px bg-orange" /> Today
          </span>
        ) : null}
      </div>

      {selected ? (
        <div className="mb-8 border border-charcoal/10 bg-cream/50 px-5 py-5">
          <p className="text-xs tracking-[0.16em] text-stone">
            {selected.id} · {selected.workstream}
            {selected.criticalPath ? " · Critical path" : ""}
          </p>
          <h2 className="mt-2 font-serif text-3xl">{selected.title}</h2>
          <p className="mt-2 text-sm text-charcoal/75">
            {formatDisplay(selected.startDate)} → {formatDisplay(selected.dueDate)} · {selected.owner}
            {selected.dependency ? ` · Depends on ${selected.dependency}` : ""}
          </p>
          {selected.notes ? <p className="mt-3 leading-7 text-charcoal/80">{selected.notes}</p> : null}
          <label className="mt-4 inline-flex items-center gap-3 text-sm">
            <span className="text-stone">Status</span>
            <select
              value={selected.status}
              onChange={(change) =>
                onUpdateStatus(selected.id, change.target.value as WorkbackStatus)
              }
              className="min-h-11 border border-charcoal/15 bg-white px-3"
            >
              {WORKBACK_STATUSES.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </div>
      ) : null}

      <div ref={scrollRef} onScroll={onScroll} className="overflow-x-auto">
        <div className="space-y-8" style={{ minWidth: CHART_MIN_WIDTH }}>
          {[...lanes.entries()].map(([workstream, laneEvents]) => (
            <section key={workstream}>
              <h3 className="mb-3 font-serif text-xl">{workstream}</h3>
              <ul className="space-y-1.5">
                {laneEvents.map((event) => {
                  const left =
                    (daysBetween(scale.rangeStart, event.startDate) / scale.totalDays) * 100;
                  const width = Math.max(
                    ((daysBetween(event.startDate, event.dueDate) + 1) / scale.totalDays) * 100,
                    1.2,
                  );
                  const active = event.id === selected?.id;

                  return (
                    <li
                      key={event.id}
                      className="grid grid-cols-[9rem_1fr] items-center md:grid-cols-[13rem_1fr]"
                    >
                      <p className={`truncate pr-3 text-xs ${active ? "text-ink" : "text-stone"}`}>
                        {event.title}
                      </p>
                      <div className="relative h-7 bg-cream/70">
                        {scale.todayOffset !== null ? (
                          <span
                            aria-hidden
                            className="absolute bottom-0 top-0 z-10 w-px bg-orange/70"
                            style={{ left: `${scale.todayOffset}%` }}
                          />
                        ) : null}
                        <button
                          type="button"
                          aria-pressed={active}
                          title={`${event.title} · ${formatDisplay(event.startDate)} to ${formatDisplay(event.dueDate)}`}
                          className={`absolute top-1 h-5 min-w-2 ${statusFill(event.status)} ${
                            active ? "ring-2 ring-ink ring-offset-1" : ""
                          } ${event.criticalPath ? "outline outline-1 outline-orange" : ""}`}
                          style={{ left: `${left}%`, width: `${width}%` }}
                          onClick={() => setSelectedId(event.id)}
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
