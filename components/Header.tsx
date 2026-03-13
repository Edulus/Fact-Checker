import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-[var(--color-border)]">
      <div className="max-w-3xl mx-auto px-4 py-5">
        <Link href="/" className="block text-center">
          <h1 className="font-serif text-3xl font-bold tracking-tight">
            Fact-Checker
          </h1>
          <p className="text-xs text-[var(--color-muted)] mt-1 tracking-wide">
            Independent &middot; Nonpartisan &middot; Evidence-based
          </p>
        </Link>
      </div>
    </header>
  );
}
