import { Suspense } from "react";
import JournalHeader from "@/components/journal-header";

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Suspense fallback={null}><JournalHeader /></Suspense>
      <main
        style={{
          flex: 1,
          marginTop: "var(--header-height)",
          maxWidth: "var(--content-max-width)",
          width: "100%",
          margin: "var(--header-height) auto 0",
          padding: "var(--space-3xl) var(--space-xl)",
        }}
      >
        {children}
      </main>
      <footer
        className="flex items-center justify-between"
        style={{
          padding: "var(--space-md) var(--space-xl)",
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
