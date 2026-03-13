"use client";

import { useState } from "react";
import Header from "@/components/Header";
import ClaimInput from "@/components/ClaimInput";
import VerdictCard from "@/components/VerdictCard";
import {
  StatsBlock,
  TagCloud,
  RecentChecks,
} from "@/components/CommonsFeed";
import { Verdict } from "@/lib/types";
import { MOCK_COMMONS } from "@/lib/mock-data";

export default function Home() {
  const [result, setResult] = useState<Verdict | null>(null);
  const commons = MOCK_COMMONS; // TODO: Replace with /api/commons fetch

  return (
    <div className="min-h-screen">
      <Header />

      <main className="max-w-3xl mx-auto px-4">
        {/* Claim input */}
        <section className="py-10">
          <ClaimInput onResult={setResult} />
        </section>

        {/* Verdict result (shown after a check) */}
        {result && (
          <section className="pb-10">
            <VerdictCard verdict={result} />
          </section>
        )}

        {/* Commons */}
        <section className="rule-thick pt-6 pb-10">
          <h2 className="text-xs font-medium uppercase tracking-widest text-[var(--color-muted)] mb-5">
            The Commons
          </h2>

          {/* Stats */}
          <div className="mb-8">
            <StatsBlock stats={commons.stats} />
          </div>

          {/* Tag cloud */}
          <div className="mb-8">
            <h3 className="text-xs font-medium uppercase tracking-widest text-[var(--color-muted)] mb-3">
              Topics
            </h3>
            <TagCloud tags={commons.tagCounts} />
          </div>

          {/* Recent checks */}
          <div>
            <h3 className="text-xs font-medium uppercase tracking-widest text-[var(--color-muted)] mb-3">
              Recent Checks
            </h3>
            <RecentChecks checks={commons.recentChecks} />
          </div>
        </section>

        {/* Footer */}
        <footer className="rule py-6 text-center">
          <p className="text-xs text-[var(--color-muted)]">
            No ads. No sponsors. No tracking.
            <br />
            Sustained by donations from people who believe in fighting
            disinformation.
          </p>
        </footer>
      </main>
    </div>
  );
}
