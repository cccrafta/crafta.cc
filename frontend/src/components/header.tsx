import Image from "next/image";
import Link from "next/link";

export default function Header({ children }: { children?: React.ReactNode }) {
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

        {/* Center — absolutely centered */}
        {children && (
          <div
            className="absolute left-1/2 -translate-x-1/2"
            style={{ width: "50%", maxWidth: "var(--content-max-width)" }}
          >
            {children}
          </div>
        )}

        {/* Global menu — right (placeholder) */}
        <button
          className="type-nav shrink-0 relative z-10 transition-opacity hover:opacity-60"
        >
          Menu
        </button>
      </div>
    </header>
  );
}
