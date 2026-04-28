import { Suspense } from "react";
import JournalHeader from "@/components/journal-header";

export default function JournalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Suspense fallback={null}><JournalHeader /></Suspense>
      <main
        className="mx-auto w-full px-6 py-8"
        style={{ marginTop: "var(--header-height)", flex: 1 }}
      >
        {children}
      </main>
      <footer
        className="flex items-center justify-between px-6"
        style={{
          padding: "var(--space-md)",
          color: "var(--color-fg-secondary)",
        }}
      >
        <div className="flex type-label" style={{ gap: "var(--space-md)" }}>
          <span>CRAFTA &copy; 2026</span>
          <a href="/privacy" className="transition-opacity hover:opacity-60">Privacy Policy</a>
        </div>
        <div className="flex type-label" style={{ gap: "var(--space-md)" }}>
          <a href="https://instagram.com/crafta.cc" className="transition-opacity hover:opacity-60">Instagram</a>
        </div>
      </footer>
    </div>
  );
}
