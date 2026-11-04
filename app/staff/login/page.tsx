"use client";

import { services } from "@/lib/services";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function StaffLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("employee@blazeeyewear.com");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      await services.auth.loginEmployee(email, password);
      router.push("/staff");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to sign in.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-5">
      <p className="text-xs tracking-[0.22em] text-stone">BLAZE STAFF · DEMO ONLY</p>
      <h1 className="mt-3 font-serif text-4xl">Sign in</h1>
      <p className="mt-3 text-sm text-stone">
        Demo credentials only. This is not production authentication.
      </p>
      <form onSubmit={submit} className="mt-8 space-y-5">
        <label className="block text-xs tracking-[0.16em]">
          Email
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-2 w-full border-b border-charcoal/30 bg-transparent py-2 text-base"
          />
        </label>
        <label className="block text-xs tracking-[0.16em]">
          Password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-2 w-full border-b border-charcoal/30 bg-transparent py-2 text-base"
          />
        </label>
        <p className="text-xs text-stone">employee@blazeeyewear.com · blaze123</p>
        {error ? <p className="text-sm text-orange">{error}</p> : null}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-ink py-3 text-xs tracking-[0.18em] text-ivory"
        >
          {loading ? "Signing in…" : "Enter staff"}
        </button>
      </form>
    </div>
  );
}
