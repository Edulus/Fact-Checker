export default async function ResultPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // TODO: Fetch verdict from DB by UUID, render verdict card
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1
        className="text-3xl font-bold tracking-tight mb-2"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        Fact-Checker
      </h1>
      <p className="text-[var(--color-muted)] text-sm mb-8">
        Result: {id}
      </p>
      <p className="text-[var(--color-muted)] text-sm">
        Verdict page coming soon.
      </p>
    </main>
  );
}
