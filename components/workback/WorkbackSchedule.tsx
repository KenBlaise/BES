"use client";

import {
  applyProgress,
  WORKBACK_STATUSES,
  type WorkbackProgress,
} from "@/lib/workback/progress";
import {
  workbackEvents,
  workbackTargetOpening,
  type WorkbackEvent,
  type WorkbackStatus,
} from "@/mock/workback";
import { WorkbackTimeline, WorkbackTimelineAxis } from "@/components/workback/WorkbackTimeline";
import { useEffect, useMemo, useRef, useState } from "react";

const WORKSTREAMS = [...new Set(workbackEvents.map((event) => event.workstream))];
const STATUSES: Array<WorkbackStatus | "All"> = ["All", ...WORKBACK_STATUSES];
const STORAGE_KEY = "blaze-workback-progress";

function formatDate(isoDate: string) {
  const parsed = new Date(`${isoDate}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return isoDate;

  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(parsed);
}

function formatShortDate(isoDate: string) {
  const parsed = new Date(`${isoDate}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return isoDate;

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(parsed);
}

function formatMonth(isoDate: string) {
  const parsed = new Date(`${isoDate}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return isoDate;

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(parsed);
}

function statusClass(status: WorkbackStatus) {
  if (status === "Complete") return "bg-ink text-ivory";
  if (status === "In Progress") return "bg-orange text-ivory";
  if (status === "Blocked") return "bg-wood text-ivory";
  if (status === "Deferred") return "bg-warm text-ink";
  return "bg-cream text-stone";
}

function groupByDueDate(events: WorkbackEvent[]) {
  const groups = new Map<string, WorkbackEvent[]>();

  for (const event of [...events].sort((a, b) => {
    const byDue = a.dueDate.localeCompare(b.dueDate);
    if (byDue !== 0) return byDue;
    return a.id.localeCompare(b.id);
  })) {
    const day = groups.get(event.dueDate) ?? [];
    day.push(event);
    groups.set(event.dueDate, day);
  }

  return [...groups.entries()];
}

function matchesQuery(event: WorkbackEvent, query: string) {
  const needle = query.trim().toLowerCase();
  if (!needle) return true;

  return [
    event.id,
    event.title,
    event.workstream,
    event.owner,
    event.status,
    event.priority,
    event.dependency,
    event.criteria,
    event.notes,
  ].some((value) => value?.toLowerCase().includes(needle));
}

function jumpTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function readLocalProgress(): WorkbackProgress {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as WorkbackProgress) : {};
  } catch {
    return {};
  }
}

export function WorkbackSchedule() {
  const [query, setQuery] = useState("");
  const [workstream, setWorkstream] = useState("All");
  const [status, setStatus] = useState<WorkbackStatus | "All">("All");
  const [criticalOnly, setCriticalOnly] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [view, setView] = useState<"list" | "timeline">("timeline");
  const [progress, setProgress] = useState<WorkbackProgress>({});
  const [persist, setPersist] = useState<"github" | "local" | "device">("device");
  const [saveState, setSaveState] = useState("");
  const axisScroll = useRef<HTMLDivElement>(null);
  const chartScroll = useRef<HTMLDivElement>(null);
  const syncing = useRef(false);

  function syncScroll(source: "axis" | "chart") {
    const axis = axisScroll.current;
    const chart = chartScroll.current;
    if (!axis || !chart || syncing.current) return;
    syncing.current = true;
    if (source === "axis") chart.scrollLeft = axis.scrollLeft;
    else axis.scrollLeft = chart.scrollLeft;
    requestAnimationFrame(() => {
      syncing.current = false;
    });
  }

  useEffect(() => {
    const local = readLocalProgress();
    if (Object.keys(local).length) setProgress(local);

    fetch("/api/workback/progress")
      .then((response) => (response.ok ? response.json() : null))
      .then((payload: { progress?: WorkbackProgress; persist?: "github" | "local" } | null) => {
        if (!payload?.progress) return;
        setProgress(payload.progress);
        if (payload.persist) setPersist(payload.persist);
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload.progress));
      })
      .catch(() => {
        setPersist("device");
      });
  }, []);

  const events = useMemo(() => applyProgress(workbackEvents, progress), [progress]);

  const visible = useMemo(
    () =>
      events.filter((event) => {
        if (!matchesQuery(event, query)) return false;
        if (workstream !== "All" && event.workstream !== workstream) return false;
        if (status !== "All" && event.status !== status) return false;
        if (criticalOnly && !event.criticalPath) return false;
        return true;
      }),
    [criticalOnly, events, query, status, workstream],
  );

  const schedule = groupByDueDate(visible);
  const months = useMemo(() => {
    const seen = new Map<string, string>();
    for (const [date] of groupByDueDate(visible)) {
      const key = date.slice(0, 7);
      if (!seen.has(key)) seen.set(key, date);
    }
    return [...seen.entries()];
  }, [visible]);

  const complete = events.filter((event) => event.status === "Complete").length;
  const critical = events.filter((event) => event.criticalPath).length;
  const hasFilters = query.trim() !== "" || workstream !== "All" || status !== "All" || criticalOnly;
  const persistLabel =
    persist === "github"
      ? "Saved to GitHub — live on every device after refresh"
      : persist === "local"
        ? "Saved in this project — add a GitHub token on Vercel to share it"
        : "Saved on this device only until GitHub sync is connected";

  async function updateStatus(id: string, nextStatus: WorkbackStatus) {
    const nextProgress = {
      ...progress,
      [id]: { status: nextStatus, updatedAt: new Date().toISOString() },
    };
    setProgress(nextProgress);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextProgress));
    setSaveState("Saving…");

    try {
      const response = await fetch("/api/workback/progress", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: nextStatus }),
      });
      const payload = (await response.json()) as {
        progress?: WorkbackProgress;
        persist?: "github" | "local";
        error?: string;
      };
      if (!response.ok) throw new Error(payload.error ?? "Save failed");
      if (payload.progress) {
        setProgress(payload.progress);
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload.progress));
      }
      setPersist(payload.persist ?? "local");
      setSaveState(payload.persist === "github" ? "Saved to GitHub" : "Saved locally");
    } catch {
      setPersist("device");
      setSaveState("Saved on this device only");
    }
  }

  return (
    <article className="page-shell py-12 md:py-16">
      <p className="text-xs tracking-[0.22em] text-stone">GRAND OPENING WORKBACK</p>
      <h1 className="mt-3 font-serif text-5xl">Workback</h1>
      <p className="mt-6 max-w-3xl text-lg leading-8 text-charcoal/85">
        Target opening {formatDate(workbackTargetOpening)}. Change a task status here — this is the
        live schedule, not a static mock.
      </p>

      <dl className="mt-10 grid gap-4 sm:grid-cols-3">
        <div className="border border-charcoal/10 bg-cream/50 px-5 py-4">
          <dt className="text-xs tracking-[0.16em] text-stone">TASKS</dt>
          <dd className="mt-1 font-serif text-3xl">{events.length}</dd>
        </div>
        <div className="border border-charcoal/10 bg-cream/50 px-5 py-4">
          <dt className="text-xs tracking-[0.16em] text-stone">COMPLETE</dt>
          <dd className="mt-1 font-serif text-3xl">{complete}</dd>
        </div>
        <div className="border border-charcoal/10 bg-cream/50 px-5 py-4">
          <dt className="text-xs tracking-[0.16em] text-stone">CRITICAL PATH</dt>
          <dd className="mt-1 font-serif text-3xl">{critical}</dd>
        </div>
      </dl>

      <div className="sticky top-[4.5rem] z-30 mt-10 border border-charcoal/10 bg-ivory/95 p-3 backdrop-blur-md md:top-[7.25rem] xl:top-[5.25rem]">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search tasks, owners, IDs…"
            className="min-h-12 flex-1 border border-charcoal/15 bg-white px-4 text-base outline-none focus:border-ink"
          />
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex border border-charcoal/15">
              <button
                type="button"
                onClick={() => setView("timeline")}
                className={`min-h-12 px-4 text-sm ${
                  view === "timeline" ? "bg-ink text-ivory" : "text-charcoal"
                }`}
              >
                Timeline
              </button>
              <button
                type="button"
                onClick={() => setView("list")}
                className={`min-h-12 px-4 text-sm ${
                  view === "list" ? "bg-ink text-ivory" : "text-charcoal"
                }`}
              >
                List
              </button>
            </div>
            <button
              type="button"
              aria-expanded={filtersOpen}
              onClick={() => setFiltersOpen((value) => !value)}
              className={`min-h-12 px-4 text-sm ${
                filtersOpen || hasFilters
                  ? "bg-ink text-ivory"
                  : "border border-charcoal/15 text-charcoal"
              }`}
            >
              {filtersOpen ? "Hide filters" : "Show filters"}
            </button>
            {hasFilters ? (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setWorkstream("All");
                  setStatus("All");
                  setCriticalOnly(false);
                }}
                className="min-h-12 px-3 text-sm underline"
              >
                Clear
              </button>
            ) : null}
          </div>
        </div>

        <p className="mt-3 text-sm text-stone">
          Showing {visible.length} of {events.length}
          {saveState ? ` · ${saveState}` : ` · ${persistLabel}`}
        </p>

        {filtersOpen ? (
          <div className="mt-4 border-t border-charcoal/10 pt-4">
            <div className="flex flex-wrap gap-2">
              {["All", ...WORKSTREAMS].map((name) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => setWorkstream(name)}
                  className={`min-h-11 px-3 text-sm md:px-4 ${
                    workstream === name
                      ? "bg-ink text-ivory"
                      : "border border-charcoal/15 text-charcoal"
                  }`}
                >
                  {name}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setCriticalOnly((value) => !value)}
                className={`min-h-11 px-3 text-sm md:px-4 ${
                  criticalOnly ? "bg-orange text-ivory" : "border border-charcoal/15 text-charcoal"
                }`}
              >
                Critical path
              </button>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              {STATUSES.map((name) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => setStatus(name)}
                  className={`min-h-10 px-3 text-xs tracking-wide ${
                    status === name ? "bg-charcoal text-ivory" : "border border-charcoal/10 text-stone"
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>

            {months.length > 1 ? (
              <nav className="mt-3 flex gap-2 overflow-x-auto pb-1" aria-label="Jump to month">
                {months.map(([month, firstDate]) => (
                  <button
                    key={month}
                    type="button"
                    onClick={() => jumpTo(`due-${firstDate}`)}
                    className="min-h-10 shrink-0 border border-charcoal/10 px-3 text-xs tracking-wide text-charcoal"
                  >
                    {formatMonth(firstDate)}
                  </button>
                ))}
              </nav>
            ) : null}
          </div>
        ) : null}

        {view === "timeline" && visible.length > 0 ? (
          <div className="mt-3 border-t border-charcoal/10 pt-3">
            <WorkbackTimelineAxis
              events={visible}
              opening={workbackTargetOpening}
              scrollRef={axisScroll}
              onScroll={() => syncScroll("axis")}
            />
          </div>
        ) : null}
      </div>

      {schedule.length === 0 ? (
        <div className="mt-12 border border-charcoal/10 bg-cream/60 px-6 py-10">
          <p className="font-serif text-3xl">No matching tasks</p>
          <p className="mt-3 max-w-xl leading-7 text-charcoal/80">
            Try a task ID, owner, workstream, or a word from the title — for example “permit”,
            “POS”, or “BES-040”.
          </p>
        </div>
      ) : view === "timeline" ? (
        <WorkbackTimeline
          events={visible}
          opening={workbackTargetOpening}
          onUpdateStatus={updateStatus}
          scrollRef={chartScroll}
          onScroll={() => syncScroll("chart")}
        />
      ) : (
        <ol className="mt-12 space-y-12">
          {schedule.map(([date, dayEvents]) => (
            <li key={date} id={`due-${date}`} className="scroll-mt-40">
              <h2 className="font-serif text-2xl">{formatDate(date)}</h2>
              <p className="mt-1 text-sm text-stone">
                {dayEvents.length} {dayEvents.length === 1 ? "task" : "tasks"} due
              </p>
              <ul className="mt-5 space-y-4 border-l border-charcoal/15 pl-6">
                {dayEvents.map((event) => (
                  <li key={event.id} id={event.id} className="relative scroll-mt-40">
                    <span
                      aria-hidden
                      className={`absolute -left-[1.91rem] top-2 h-2.5 w-2.5 rounded-full ${
                        event.criticalPath ? "bg-orange" : "bg-warm"
                      }`}
                    />
                    <div className="flex flex-wrap items-center gap-2 text-xs tracking-wide text-stone">
                      <span>{event.id}</span>
                      <span>{event.workstream}</span>
                      <span>
                        {formatShortDate(event.startDate)} – {formatShortDate(event.dueDate)}
                      </span>
                      {event.criticalPath ? <span className="text-orange">Critical</span> : null}
                    </div>
                    <p className="mt-2 text-lg font-medium">{event.title}</p>
                    <label className="mt-3 flex flex-wrap items-center gap-3 text-sm">
                      <span className="text-stone">Status</span>
                      <select
                        value={event.status}
                        onChange={(change) =>
                          updateStatus(event.id, change.target.value as WorkbackStatus)
                        }
                        className={`min-h-11 border border-charcoal/15 px-3 ${statusClass(event.status)}`}
                      >
                        {WORKBACK_STATUSES.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </label>
                    <p className="mt-2 text-sm text-charcoal/75">
                      {event.owner}
                      {event.dependency ? ` · Depends on ${event.dependency}` : ""}
                    </p>
                    {event.notes ? (
                      <p className="mt-2 leading-7 text-charcoal/80">{event.notes}</p>
                    ) : null}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      )}
    </article>
  );
}
