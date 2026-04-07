import Image from "next/image";
import Link from "next/link";

type NavItem = {
  label: string;
  href: string;
};

// Scoped navigation per parent route — will come from WP menus later
const scopedNav: Record<string, NavItem[]> = {
  journal: [
    { label: "Feed", href: "/journal" },
    { label: "Design", href: "/journal?category=design" },
    { label: "Garments", href: "/journal?category=garments" },
    { label: "History", href: "/journal?category=history" },
  ],
};

export default function Header({ scope = "journal" }: { scope?: string }) {
  const navItems = scopedNav[scope] ?? [];

  return (
    <header
      className="fixed top-0 left-0 w-full z-50"
      style={{ padding: "var(--space-md)" }}
    >
      <div className="relative flex items-center justify-between">
        {/* Logo — left */}
        <Link href="/" className="shrink-0">
          <Image
            src="/crafta-journal.svg"
            alt="Crafta Journal"
            width={110}
            height={34}
            priority
          />
        </Link>

        {/* Scoped nav — center, constrained to content max-width */}
        {navItems.length > 0 && (
          <nav
            className="absolute left-1/2 -translate-x-1/2 flex items-center uppercase font-bold"
            style={{
              gap: "var(--space-xl)",
              width: "100%",
              maxWidth: "var(--content-max-width)",
              fontFamily: "var(--font-nav)",
              fontSize: "var(--text-sm)",
            }}
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="whitespace-nowrap transition-opacity hover:opacity-60"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}

        {/* Global menu — right (placeholder) */}
        <button
          className="shrink-0 uppercase font-bold transition-opacity hover:opacity-60"
          style={{ fontFamily: "var(--font-nav)", fontSize: "var(--text-sm)" }}
        >
          Menu
        </button>
      </div>
    </header>
  );
}
