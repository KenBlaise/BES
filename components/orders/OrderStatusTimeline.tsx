import {
  blazeStatusIndex,
  blazeStatusLabel,
  getBlazeOrderTimeline,
} from "@/lib/mappers/labStatusToBlazeStatus";
import type { BlazeOrderStatus } from "@/lib/types";

export function OrderStatusTimeline({ current }: { current: BlazeOrderStatus }) {
  const steps = getBlazeOrderTimeline();
  const active = blazeStatusIndex(current);

  return (
    <ol className="space-y-4">
      {steps.map((step, index) => {
        const done = index < active;
        const here = index === active;
        return (
          <li key={step} className="flex gap-4">
            <span
              aria-hidden
              className={`mt-1 h-3 w-3 rounded-full ${
                here ? "bg-orange" : done ? "bg-ink" : "bg-warm"
              }`}
            />
            <div>
              <p className={here ? "font-medium" : "text-stone"}>
                {blazeStatusLabel(step)}
                {done ? " ✓" : ""}
                {here ? " — current" : ""}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
