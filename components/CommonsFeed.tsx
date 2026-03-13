import { CommonsStats, TagCount, Verdict } from "@/lib/types";
import VerdictCard from "./VerdictCard";

export function StatsBlock({ stats }: { stats: CommonsStats }) {
  return (
    <div className="flex gap-8 text-sm">
      <div>
        <span className="font-serif text-2xl font-bold">
          {stats.totalChecks.toLocaleString()}
        </span>
        <p className="text-xs text-[var(--color-muted)] mt-0.5">
          claims checked
        </p>
      </div>
      <div>
        <span className="font-serif text-2xl font-bold verdict-red">
          {stats.falsePct}%
        </span>
        <p className="text-xs text-[var(--color-muted)] mt-0.5">
          rated false
        </p>
      </div>
      <div>
        <span className="font-serif text-2xl font-bold">
          {stats.distinctTopics}
        </span>
        <p className="text-xs text-[var(--color-muted)] mt-0.5">
          topics covered
        </p>
      </div>
    </div>
  );
}

export function TagCloud({ tags }: { tags: TagCount[] }) {
  const maxCount = Math.max(...tags.map((t) => t.count));

  return (
    <div className="flex flex-wrap gap-x-3 gap-y-1.5">
      {tags.map((t) => {
        const weight = t.count / maxCount;
        const size = weight > 0.6 ? "text-sm" : weight > 0.3 ? "text-xs" : "text-xs opacity-70";
        return (
          <span
            key={t.tag}
            className={`${size} text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors cursor-default`}
            title={`${t.count} checks`}
          >
            {t.tag}
            <span className="text-[10px] ml-0.5 opacity-50">{t.count}</span>
          </span>
        );
      })}
    </div>
  );
}

export function RecentChecks({ checks }: { checks: Verdict[] }) {
  if (checks.length === 0) {
    return (
      <p className="text-sm text-[var(--color-muted)] py-8 text-center">
        No checks yet. Be the first.
      </p>
    );
  }

  return (
    <div>
      {checks.map((check) => (
        <VerdictCard key={check.id} verdict={check} compact />
      ))}
    </div>
  );
}
