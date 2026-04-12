"use client";

import { createContext, useContext, useState } from "react";

type ViewMode = "feed" | "grid";

const ViewContext = createContext<{
  view: ViewMode;
  toggle: () => void;
}>({ view: "feed", toggle: () => {} });

export function useViewMode() {
  return useContext(ViewContext);
}

export function ViewProvider({ children }: { children: React.ReactNode }) {
  const [view, setView] = useState<ViewMode>("feed");
  const toggle = () => setView((v) => (v === "feed" ? "grid" : "feed"));
  return (
    <ViewContext value={{ view, toggle }}>
      {children}
    </ViewContext>
  );
}

export default function ViewToggle() {
  const { view, toggle } = useViewMode();

  return (
    <button
      onClick={toggle}
      className="type-nav-sm shrink-0 transition-opacity hover:opacity-60"
      style={{ color: "var(--color-fg-secondary)" }}
      title={view === "feed" ? "Switch to grid" : "Switch to feed"}
    >
      {view === "feed" ? (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="1" y="1" width="6" height="6" rx="1" />
          <rect x="11" y="1" width="6" height="6" rx="1" />
          <rect x="1" y="11" width="6" height="6" rx="1" />
          <rect x="11" y="11" width="6" height="6" rx="1" />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
          <line x1="1" y1="3" x2="17" y2="3" />
          <line x1="1" y1="9" x2="17" y2="9" />
          <line x1="1" y1="15" x2="17" y2="15" />
        </svg>
      )}
    </button>
  );
}
