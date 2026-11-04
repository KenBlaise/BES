"use client";

import { useBlaze } from "@/lib/store/BlazeProvider";
import { useState } from "react";

export function AuthForm({
  onComplete,
  compact = false,
}: {
  onComplete?: () => void;
  compact?: boolean;
}) {
  const { requestCode, completeAuth } = useBlaze();
  const [mode, setMode] = useState<"create" | "signin">("create");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"details" | "code">("details");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendCode(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      await requestCode(email);
      setStep("code");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to send code.");
    } finally {
      setLoading(false);
    }
  }

  async function verify(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      await completeAuth({
        email,
        code,
        firstName: mode === "create" ? firstName : undefined,
      });
      onComplete?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to sign in.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {!compact ? (
        <div className="mb-6 flex gap-4 text-sm">
          <button
            type="button"
            className={mode === "create" ? "text-ink" : "text-stone"}
            onClick={() => setMode("create")}
          >
            Create My Blaze
          </button>
          <button
            type="button"
            className={mode === "signin" ? "text-ink" : "text-stone"}
            onClick={() => setMode("signin")}
          >
            Sign in
          </button>
        </div>
      ) : (
        <div className="mb-4 flex gap-4 text-sm">
          <button type="button" onClick={() => setMode("create")}>
            Create My Blaze
          </button>
          <button type="button" className="text-stone" onClick={() => setMode("signin")}>
            Sign in
          </button>
        </div>
      )}

      {step === "details" ? (
        <form onSubmit={sendCode} className="space-y-4">
          {mode === "create" ? (
            <label className="block text-xs tracking-[0.16em]">
              First name
              <input
                required
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                className="mt-2 w-full border-b border-charcoal/30 bg-transparent py-2 text-base outline-none"
              />
            </label>
          ) : null}
          <label className="block text-xs tracking-[0.16em]">
            Email
            <input
              required
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-2 w-full border-b border-charcoal/30 bg-transparent py-2 text-base outline-none"
            />
          </label>
          {error ? <p className="text-sm text-orange">{error}</p> : null}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-ink px-5 py-3 text-xs tracking-[0.18em] text-ivory disabled:opacity-60"
          >
            {loading ? "Sending code…" : "Continue"}
          </button>
        </form>
      ) : (
        <form onSubmit={verify} className="space-y-4">
          <p className="text-sm text-stone">
            Enter the demo verification code sent to {email}.
          </p>
          <label className="block text-xs tracking-[0.16em]">
            Code
            <input
              required
              inputMode="numeric"
              value={code}
              onChange={(event) => setCode(event.target.value)}
              className="mt-2 w-full border-b border-charcoal/30 bg-transparent py-2 text-base outline-none"
            />
          </label>
          <p className="text-xs text-stone">Demo code: 123456</p>
          {error ? <p className="text-sm text-orange">{error}</p> : null}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-ink px-5 py-3 text-xs tracking-[0.18em] text-ivory"
          >
            {loading ? "Verifying…" : mode === "create" ? "Create My Blaze" : "Sign in"}
          </button>
        </form>
      )}
    </div>
  );
}
