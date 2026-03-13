"use client";

import { useState } from "react";
import { Verdict } from "@/lib/types";

export default function ClaimInput({
  onResult,
}: {
  onResult: (verdict: Verdict) => void;
}) {
  const [claim, setClaim] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    const trimmed = claim.trim();
    if (!trimmed) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ claim: trimmed }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      const verdict: Verdict = await res.json();
      onResult(verdict);
      setClaim("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <textarea
          value={claim}
          onChange={(e) => setClaim(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter a claim to check…"
          rows={2}
          disabled={loading}
          className="w-full border border-[var(--color-border)] px-4 py-3 text-base font-serif leading-relaxed resize-none focus:outline-none focus:border-[var(--color-foreground)] transition-colors disabled:opacity-50 bg-transparent"
        />
        <button
          onClick={handleSubmit}
          disabled={loading || !claim.trim()}
          className="absolute bottom-3 right-3 text-xs border border-[var(--color-border)] px-4 py-1.5 hover:bg-[var(--color-foreground)] hover:text-white transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-[var(--color-foreground)] cursor-pointer"
        >
          {loading ? "Checking…" : "Check"}
        </button>
      </div>

      <p className="text-xs text-[var(--color-muted)] mt-2">
        All checks are public and anonymous. Do not submit personally
        identifying information.
      </p>

      {error && (
        <p className="text-xs verdict-red mt-2">{error}</p>
      )}
    </div>
  );
}
