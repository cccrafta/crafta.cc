"use client";

import { type ReactNode, useEffect } from "react";
import { SearchProvider, useSearch } from "@/components/search-context";
import SearchPanel from "@/components/search-panel";
import SearchTrigger from "@/components/search-trigger";

function Layout({
  children,
  context,
}: {
  children: ReactNode;
  context?: string;
}) {
  const { isOpen } = useSearch();

  useEffect(() => {
    document.documentElement.classList.toggle("search-open", isOpen);
    return () => document.documentElement.classList.remove("search-open");
  }, [isOpen]);

  return (
    <>
      <div className="post-layout">
        <div className="post-layout-content">{children}</div>
      </div>
      {isOpen && <SearchPanel context={context} />}
      <SearchTrigger />
    </>
  );
}

export default function PostSearchLayout({
  children,
  context,
}: {
  children: ReactNode;
  context?: string;
}) {
  return (
    <SearchProvider>
      <Layout context={context}>{children}</Layout>
    </SearchProvider>
  );
}
