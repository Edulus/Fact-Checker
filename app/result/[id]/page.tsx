import Header from "@/components/Header";
import VerdictCard from "@/components/VerdictCard";
import { MOCK_VERDICT, MOCK_VERDICT_YELLOW, MOCK_VERDICT_GREEN } from "@/lib/mock-data";
import type { Metadata } from "next";

// TODO: Replace with actual DB fetch
const MOCK_DB: Record<string, typeof MOCK_VERDICT> = {
  [MOCK_VERDICT.id]: MOCK_VERDICT,
  [MOCK_VERDICT_YELLOW.id]: MOCK_VERDICT_YELLOW,
  [MOCK_VERDICT_GREEN.id]: MOCK_VERDICT_GREEN,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const verdict = MOCK_DB[id];
  if (!verdict) {
    return { title: "Not Found — Fact-Checker" };
  }
  const label =
    verdict.verdict === "true"
      ? "True"
      : verdict.verdict === "partially_true"
        ? "Partially True"
        : "False";
  return {
    title: `${label}: "${verdict.claim}" — Fact-Checker`,
    description: verdict.provenance.slice(0, 160),
    openGraph: {
      title: `${label}: "${verdict.claim}"`,
      description: verdict.provenance.slice(0, 160),
      siteName: "Fact-Checker",
    },
  };
}

export default async function ResultPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const verdict = MOCK_DB[id];

  if (!verdict) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="max-w-3xl mx-auto px-4 py-16 text-center">
          <h2 className="font-serif text-2xl mb-2">Result not found</h2>
          <p className="text-sm text-[var(--color-muted)]">
            This check may have been removed or the link may be incorrect.
          </p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-10">
        <VerdictCard verdict={verdict} />
      </main>
    </div>
  );
}
