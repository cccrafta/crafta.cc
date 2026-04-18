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
      style={{
        padding: "var(--space-md)",
        }}
    >
      <div className="flex items-center" style={{ gap: "var(--space-xl)" }}>
        {/* Logo — left */}
        <Link href="/" className="shrink-0">
          <Image
            src="/crafta-journal.svg"
            alt="Crafta Journal"
            width={120}
            height={34}
            priority
          />
        </Link>

        {/* Center — fills remaining space */}
        <div className="flex-1 flex items-center" style={{ gap: "var(--space-lg)" }}>
          {children}
        </div>

        {/* Right — actions */}
        {actions && (
          <div className="shrink-0 flex items-center">
            {actions}
          </div>
        )}
      </div>
    </header>
  );
}
