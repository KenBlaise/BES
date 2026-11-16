"use client";

import { FormEvent, useState } from "react";

export function AdminGate({ initialError = false }: { initialError?: boolean }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(initialError ? "That password is not correct." : "");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setPending(true);
    try {
      const response = await fetch("/api/access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!response.ok) {
        setError("That password is not correct.");
        setPending(false);
        return;
      }
      window.location.assign("/");
    } catch {
      setError("Could not check the password. Try again.");
      setPending(false);
    }
  }

  return (
    <section className="mt-16 w-full max-w-sm border-t border-charcoal/15 pt-8">
      <p className="text-xs tracking-[0.22em] text-stone">ADMIN</p>
      <form className="mt-4" method="post" action="/api/access" onSubmit={onSubmit}>
        <label className="block text-sm text-charcoal" htmlFor="admin-password">
          Password
        </label>
        <input
          id="admin-password"
          type="password"
          name="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="mt-2 w-full border border-charcoal/20 bg-ivory px-3 py-3 text-ink outline-none"
          required
        />
        {error ? <p className="mt-3 text-sm text-orange">{error}</p> : null}
        <button
          type="submit"
          disabled={pending}
          className="mt-4 inline-flex min-h-12 w-full items-center justify-center bg-ink px-6 text-xs tracking-[0.18em] text-ivory disabled:opacity-60"
        >
          {pending ? "Checking…" : "Enter"}
        </button>
      </form>
    </section>
  );
}
