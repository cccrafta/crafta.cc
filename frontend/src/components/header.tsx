import Image from "next/image";
import Link from "next/link";

export default function Header({
  children,
  actions,
}: {
  children?: React.ReactNode;
  actions?: React.ReactNode;
}) {
  return (
    <header
      className="fixed top-0 left-0 w-full z-50"
      style={{ padding: "var(--space-md)" }}
    >
      <div className="relative flex items-center justify-between">
        {/* Logo — left */}
        <Link href="/" className="shrink-0 relative z-10">
          <Image
            src="/crafta-journal.svg"
            alt="Crafta Journal"
            width={120}
            height={34}
            priority
          />
        </Link>

        {/* Center — scoped content (search bar, nav, etc.) */}
        {children && (
          <div
            className="absolute left-1/2 -translate-x-1/2"
            style={{ width: "50%", maxWidth: "var(--content-max-width)" }}
          >
            {children}
          </div>
        )}

        {/* Right — actions + menu */}
        <div className="shrink-0 relative z-10 flex items-center" style={{ gap: "var(--space-md)" }}>
          {actions}
          <button
            className="type-nav transition-opacity hover:opacity-60"
          >
            Menu
          </button>
        </div>
      </div>
    </header>
  );
}
