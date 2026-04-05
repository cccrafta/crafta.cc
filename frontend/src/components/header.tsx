import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b" style={{ borderColor: "var(--color-border)" }}>
      <div
        className="mx-auto flex items-center justify-between px-6 py-4"
        style={{ maxWidth: "var(--content-max-width)" }}
      >
        <Link
          href="/"
          className="text-xl font-normal tracking-widest uppercase"
          style={{ color: "var(--color-fg)", fontFamily: "var(--font-heading)" }}
        >
          Crafta<sup style={{ fontSize: "0.5em" }}>&reg;</sup>
          <br />
          <span className="text-xs tracking-[0.3em]">journal</span>
        </Link>
        <nav className="flex gap-8 text-sm" style={{ fontFamily: "var(--font-body)" }}>
          <Link href="/journal" className="transition-colors hover:opacity-70" style={{ color: "var(--color-accent)" }}>
            Feed
          </Link>
        </nav>
      </div>
    </header>
  );
}
