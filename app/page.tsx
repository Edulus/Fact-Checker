export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1
        className="text-4xl font-bold tracking-tight mb-2"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        Fact-Checker
      </h1>
      <p className="text-[var(--color-muted)] text-sm mb-8">
        Independent · Nonpartisan · Evidence-based
      </p>
      <p className="text-[var(--color-muted)] text-sm">
        Scaffold complete. UI coming next.
      </p>
    </main>
  );
}
