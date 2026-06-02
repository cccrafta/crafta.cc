"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

interface SearchState {
  isOpen: boolean;
  query: string;
  toggle: () => void;
  setQuery: (q: string) => void;
}

const SearchCtx = createContext<SearchState>({
  isOpen: false,
  query: "",
  toggle: () => {},
  setQuery: () => {},
});

export function useSearch() {
  return useContext(SearchCtx);
}

export function SearchProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQueryState] = useState("");

  const toggle = useCallback(() => setIsOpen((v) => !v), []);
  const setQuery = useCallback(
    (q: string) => {
      setQueryState(q);
      if (!isOpen) setIsOpen(true);
    },
    [isOpen]
  );

  return (
    <SearchCtx.Provider value={{ isOpen, query, toggle, setQuery }}>
      {children}
    </SearchCtx.Provider>
  );
}
