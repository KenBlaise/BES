import type { Prescription } from "@/lib/types";

export function PrescriptionCard({ rx }: { rx: Prescription }) {
  return (
    <article className="bg-cream px-6 py-8">
      <p className="text-xs tracking-[0.16em] text-stone">CURRENT PRESCRIPTION</p>
      <p className="mt-3 text-sm text-stone">
        Exam {rx.examDate} · Expires {rx.expirationDate}
      </p>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div>
          <h3 className="text-sm tracking-wide">Right eye</h3>
          <p className="mt-2 text-sm">
            Sphere {rx.right.sphere}
            <br />
            Cylinder {rx.right.cylinder}
            <br />
            Axis {rx.right.axis}
          </p>
        </div>
        <div>
          <h3 className="text-sm tracking-wide">Left eye</h3>
          <p className="mt-2 text-sm">
            Sphere {rx.left.sphere}
            <br />
            Cylinder {rx.left.cylinder}
            <br />
            Axis {rx.left.axis}
          </p>
        </div>
      </div>
      <p className="mt-6 text-sm">
        Add {rx.add} · PD {rx.pd}
      </p>
    </article>
  );
}
