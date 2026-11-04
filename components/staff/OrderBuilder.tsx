"use client";

import { services } from "@/lib/services";
import { usePrototypeState } from "@/lib/store/usePrototypeState";
import type { Frame } from "@/lib/types";
import { formatMoney } from "@/lib/utils";
import { frames, getFrameById } from "@/mock/frames";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

const LENS_TYPES = ["Single Vision", "Progressive", "Reading", "Plano"];
const MATERIALS = ["Standard", "Polycarbonate", "High Index"];
const OPTIONS = ["Anti-Reflective", "Photochromic", "Scratch Protection", "Premium Anti-Reflective"];

const PRICES: Record<string, number> = {
  "Single Vision": 180,
  Progressive: 420,
  Reading: 140,
  Plano: 80,
  Standard: 0,
  Polycarbonate: 60,
  "High Index": 180,
  "Anti-Reflective": 80,
  Photochromic: 140,
  "Scratch Protection": 40,
  "Premium Anti-Reflective": 160,
};

export function OrderBuilder({ customerId }: { customerId: string }) {
  const router = useRouter();
  const state = usePrototypeState();
  const customer = state.customers.find((item) => item.blazeCustomerId === customerId);
  const account = state.accounts.find((item) => item.accountId === customer?.myBlazeAccountId);
  const benefit = state.benefits.find((item) => item.blazeCustomerId === customerId);
  const rx = state.prescriptions.find((item) => item.blazeCustomerId === customerId);

  const favorites = (account?.savedFrameIds ?? []).map(getFrameById).filter(Boolean) as Frame[];

  const [step, setStep] = useState(1);
  const [frame, setFrame] = useState<Frame | null>(favorites[0] ?? null);
  const [query, setQuery] = useState("");
  const [lensType, setLensType] = useState("Progressive");
  const [material, setMaterial] = useState("High Index");
  const [options, setOptions] = useState<string[]>(["Premium Anti-Reflective"]);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  const catalog = useMemo(
    () =>
      frames.filter((item) =>
        `${item.brand} ${item.model} ${item.color}`.toLowerCase().includes(query.toLowerCase()),
      ),
    [query],
  );

  const retail =
    (frame?.price ?? 0) +
    (PRICES[lensType] ?? 0) +
    (PRICES[material] ?? 0) +
    options.reduce((sum, option) => sum + (PRICES[option] ?? 0), 0);

  const estimatedBenefit = Math.min(benefit?.frameAllowance ?? 0, frame?.price ?? 0) +
    (lensType === "Progressive" ? 120 : 80) +
    (options.some((option) => option.includes("Anti-Reflective")) ? 40 : 0);
  const safeBenefit = benefit ? Math.min(estimatedBenefit, retail) : 0;
  const responsibility = retail - safeBenefit;

  if (!customer) return <p>Customer not found.</p>;
  const current = customer;

  async function create() {
    if (!frame) return;
    setBusy(true);
    setMessage("Creating order…");
    try {
      const order = await services.orders.create({
        blazeCustomerId: current.blazeCustomerId,
        myBlazeAccountId: current.myBlazeAccountId,
        crystalPatientId: current.crystalPatientId,
        frameId: frame.id,
        frameBrand: frame.brand,
        frameModel: frame.model,
        frameColor: frame.color,
        prescriptionReference: rx?.id ?? "DEMO-RX",
        lensType,
        lensMaterial: material,
        lensOptions: options,
        retailPrice: retail,
        estimatedBenefit: safeBenefit,
        estimatedCustomerResponsibility: responsibility,
      });
      setMessage("Sending to lab…");
      router.push(`/staff/orders/${order.orderId}`);
    } catch {
      setMessage("Order creation error.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-8">
      <p className="text-sm text-stone">Step {step} of 8</p>

      {step === 1 ? (
        <section>
          <h2 className="font-serif text-3xl">Select frame</h2>
          {favorites.length > 0 ? (
            <div className="mt-6">
              <p className="text-xs tracking-[0.16em] text-stone">
                {customer.firstName.toUpperCase()}&apos;S FAVORITES
              </p>
              <div className="mt-3 flex flex-col gap-2">
                {favorites.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setFrame(item)}
                    className={`min-h-12 px-4 text-left ${
                      frame?.id === item.id ? "bg-ink text-ivory" : "bg-cream"
                    }`}
                  >
                    {item.brand} {item.model} · {item.color} · {formatMoney(item.price)}
                  </button>
                ))}
              </div>
            </div>
          ) : null}
          <label className="mt-8 block text-xs tracking-[0.16em]">
            Search inventory
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="mt-2 w-full border-b border-charcoal/30 bg-transparent py-2"
            />
          </label>
          <div className="mt-4 max-h-64 overflow-auto">
            {catalog.slice(0, 8).map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setFrame(item)}
                className="block w-full py-2 text-left text-sm"
              >
                {item.brand} {item.model} · {item.color}
              </button>
            ))}
          </div>
        </section>
      ) : null}

      {step === 2 ? (
        <section>
          <h2 className="font-serif text-3xl">Prescription</h2>
          {rx ? (
            <p className="mt-4 leading-7">
              Exam {rx.examDate}
              <br />
              OD {rx.right.sphere} {rx.right.cylinder} x {rx.right.axis}
              <br />
              OS {rx.left.sphere} {rx.left.cylinder} x {rx.left.axis}
              <br />
              Add {rx.add} · PD {rx.pd}
            </p>
          ) : (
            <p className="mt-4 text-stone">Using demo prescription entry for this prototype.</p>
          )}
        </section>
      ) : null}

      {step === 3 ? (
        <Selector title="Lens type" value={lensType} options={LENS_TYPES} onChange={setLensType} />
      ) : null}
      {step === 4 ? (
        <Selector title="Lens material" value={material} options={MATERIALS} onChange={setMaterial} />
      ) : null}
      {step === 5 ? (
        <section>
          <h2 className="font-serif text-3xl">Lens options</h2>
          <div className="mt-6 flex flex-col gap-2">
            {OPTIONS.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() =>
                  setOptions((current) =>
                    current.includes(option)
                      ? current.filter((item) => item !== option)
                      : [...current, option],
                  )
                }
                className={`min-h-12 px-4 text-left ${
                  options.includes(option) ? "bg-ink text-ivory" : "bg-cream"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </section>
      ) : null}

      {step === 6 ? (
        <section>
          <h2 className="font-serif text-3xl">Benefits</h2>
          <p className="mt-2 text-xs tracking-[0.16em] text-stone">ESTIMATE</p>
          <PriceLines retail={retail} benefit={safeBenefit} due={responsibility} />
          <p className="mt-4 text-sm text-stone">
            Final reimbursement may depend on actual plan processing.
          </p>
        </section>
      ) : null}

      {step === 7 ? (
        <section>
          <h2 className="font-serif text-3xl">Review</h2>
          <p className="mt-4 leading-7">
            {frame?.brand} {frame?.model} · {frame?.color}
            <br />
            {lensType} · {material}
            <br />
            {options.join(", ")}
          </p>
          <PriceLines retail={retail} benefit={safeBenefit} due={responsibility} />
        </section>
      ) : null}

      {step === 8 ? (
        <section>
          <h2 className="font-serif text-3xl">Create order</h2>
          <p className="mt-3 text-stone">
            This submits a Blaze order and a mock lab job. Cherry write capability is unconfirmed.
          </p>
          <button
            type="button"
            disabled={busy || !frame}
            onClick={() => void create()}
            className="mt-6 min-h-12 bg-ink px-6 text-xs tracking-[0.16em] text-ivory"
          >
            {busy ? message || "Creating…" : "Create order"}
          </button>
          {message ? <p className="mt-3 text-sm text-wood">{message}</p> : null}
        </section>
      ) : null}

      <div className="flex gap-3">
        {step > 1 ? (
          <button type="button" className="underline" onClick={() => setStep((value) => value - 1)}>
            Back
          </button>
        ) : null}
        {step < 8 ? (
          <button
            type="button"
            disabled={step === 1 && !frame}
            className="min-h-12 bg-ink px-5 text-xs tracking-[0.16em] text-ivory"
            onClick={() => setStep((value) => value + 1)}
          >
            Continue
          </button>
        ) : null}
      </div>
    </div>
  );
}

function Selector({
  title,
  value,
  options,
  onChange,
}: {
  title: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <section>
      <h2 className="font-serif text-3xl">{title}</h2>
      <div className="mt-6 flex flex-col gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={`min-h-12 px-4 text-left ${value === option ? "bg-ink text-ivory" : "bg-cream"}`}
          >
            {option}
          </button>
        ))}
      </div>
    </section>
  );
}

function PriceLines({
  retail,
  benefit,
  due,
}: {
  retail: number;
  benefit: number;
  due: number;
}) {
  return (
    <dl className="mt-6 space-y-2">
      <div className="flex justify-between">
        <dt>Retail price</dt>
        <dd>{formatMoney(retail)}</dd>
      </div>
      <div className="flex justify-between">
        <dt>Estimated benefit</dt>
        <dd>{formatMoney(benefit)}</dd>
      </div>
      <div className="flex justify-between">
        <dt>Estimated customer responsibility</dt>
        <dd>{formatMoney(due)}</dd>
      </div>
    </dl>
  );
}
