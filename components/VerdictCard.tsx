"use client";

import { Verdict } from "@/lib/types";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function verdictLabel(verdict: Verdict["verdict"]): string {
  switch (verdict) {
    case "true":
      return "True";
    case "partially_true":
      return "Partially True";
    case "false":
      return "False";
  }
}

function colorClasses(color: Verdict["color"]) {
  switch (color) {
    case "green":
      return {
        dot: "verdict-bg-green",
        text: "verdict-green",
        border: "verdict-border-green",
      };
    case "yellow":
      return {
        dot: "verdict-bg-yellow",
        text: "verdict-yellow",
        border: "verdict-border-yellow",
      };
    case "red":
      return {
        dot: "verdict-bg-red",
        text: "verdict-red",
        border: "verdict-border-red",
      };
  }
}

export default function VerdictCard({
  verdict,
  compact = false,
}: {
  verdict: Verdict;
  compact?: boolean;
}) {
  const colors = colorClasses(verdict.color);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  const shareUrl = `${siteUrl}/result/${verdict.id}`;

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl);
  };

  if (compact) {
    return (
      <a
        href={`/result/${verdict.id}`}
        className="block py-4 border-b border-[var(--color-border)] hover:bg-[var(--color-surface)] transition-colors px-2 -mx-2"
      >
        <div className="flex items-start gap-3">
          <span
            className={`${colors.dot} inline-block w-3 h-3 rounded-full mt-1.5 shrink-0`}
          />
          <div className="min-w-0">
            <p className="font-serif text-base leading-snug">{verdict.claim}</p>
            <div className="flex items-center gap-3 mt-1.5 text-xs text-[var(--color-muted)]">
              <span className={`font-medium ${colors.text}`}>
                {verdictLabel(verdict.verdict)}
              </span>
              <span>{verdict.confidence}% confidence</span>
              <span>{formatDate(verdict.checkedAt)}</span>
            </div>
          </div>
        </div>
      </a>
    );
  }

  return (
    <article className="max-w-2xl mx-auto">
      {/* Verdict header */}
      <div className="rule-thick pt-4 pb-6">
        <div className="flex items-center gap-3 mb-4">
          <span
            className={`${colors.dot} inline-block w-4 h-4 rounded-full shrink-0`}
          />
          <span className={`font-serif text-2xl font-bold ${colors.text}`}>
            {verdictLabel(verdict.verdict)}
          </span>
          <span className="text-sm text-[var(--color-muted)]">
            {verdict.confidence}% confidence
          </span>
        </div>
        <h1 className="font-serif text-xl leading-relaxed">
          &ldquo;{verdict.claim.replace(/^["]+|["]+$/g, "")}&rdquo;
        </h1>
        <p className="text-xs text-[var(--color-muted)] mt-3">
          Checked {formatDate(verdict.checkedAt)}
        </p>
      </div>

      {/* Provenance */}
      <section className="rule pt-4 pb-6">
        <h2 className="text-xs font-medium uppercase tracking-widest text-[var(--color-muted)] mb-2">
          Provenance
        </h2>
        <p className="text-sm leading-relaxed">{verdict.provenance}</p>
      </section>

      {/* Sources */}
      <section className="rule pt-4 pb-6">
        <h2 className="text-xs font-medium uppercase tracking-widest text-[var(--color-muted)] mb-3">
          Sources
        </h2>
        {verdict.sources.against.length > 0 && (
          <div className="mb-3">
            <h3 className="text-xs font-medium text-[var(--color-muted)] mb-1">
              Against
            </h3>
            <ul className="space-y-1">
              {verdict.sources.against.map((s, i) => (
                <li key={i} className="text-sm leading-relaxed pl-4 relative">
                  <span className="absolute left-0 text-[var(--color-muted)]">
                    &mdash;
                  </span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
        )}
        {verdict.sources.for.length > 0 && (
          <div>
            <h3 className="text-xs font-medium text-[var(--color-muted)] mb-1">
              For
            </h3>
            <ul className="space-y-1">
              {verdict.sources.for.map((s, i) => (
                <li key={i} className="text-sm leading-relaxed pl-4 relative">
                  <span className="absolute left-0 text-[var(--color-muted)]">
                    &mdash;
                  </span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* Amplifiers */}
      {verdict.amplifiers.length > 0 && (
        <section className="rule pt-4 pb-6">
          <h2 className="text-xs font-medium uppercase tracking-widest text-[var(--color-muted)] mb-3">
            Amplifiers
          </h2>
          <div className="space-y-2">
            {verdict.amplifiers.map((a, i) => (
              <div key={i} className="text-sm">
                <span className="font-medium">{a.name}</span>
                {a.affiliation && (
                  <span className="text-[var(--color-muted)]">
                    {" "}
                    &middot; {a.affiliation}
                  </span>
                )}
                {a.lean && (
                  <span className="text-[var(--color-muted)]">
                    {" "}
                    &middot; {a.lean}
                  </span>
                )}
                {a.platform && (
                  <span className="text-[var(--color-muted)]">
                    {" "}
                    &middot; {a.platform}
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Fallacies */}
      {verdict.fallacies.length > 0 && (
        <section className="rule pt-4 pb-6">
          <h2 className="text-xs font-medium uppercase tracking-widest text-[var(--color-muted)] mb-3">
            Fallacies Detected
          </h2>
          <div className="flex flex-wrap gap-2">
            {verdict.fallacies.map((f, i) => (
              <span
                key={i}
                className="text-xs border border-[var(--color-border)] px-2 py-1"
              >
                {f.replace(/_/g, " ")}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Tags */}
      {verdict.tags.length > 0 && (
        <section className="rule pt-4 pb-6">
          <h2 className="text-xs font-medium uppercase tracking-widest text-[var(--color-muted)] mb-3">
            Topics
          </h2>
          <div className="flex flex-wrap gap-2">
            {verdict.tags.map((t, i) => (
              <span
                key={i}
                className="text-xs bg-[var(--color-surface)] px-2 py-1"
              >
                {t}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Share */}
      <section className="rule pt-4 pb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={copyLink}
            className="text-xs border border-[var(--color-border)] px-3 py-1.5 hover:bg-[var(--color-surface)] transition-colors cursor-pointer"
          >
            Copy share link
          </button>
          <span className="text-xs text-[var(--color-muted)] select-all">
            {shareUrl}
          </span>
        </div>
      </section>
    </article>
  );
}
