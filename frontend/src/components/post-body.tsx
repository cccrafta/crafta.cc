"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { useSearch } from "@/components/search-context";

export default function PostBody({ html }: { html: string }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const { setQuery } = useSearch();
  const [floatBtn, setFloatBtn] = useState<{
    text: string;
    top: number;
    left: number;
  } | null>(null);

  const clearFloat = useCallback(() => setFloatBtn(null), []);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest(".lookup");
      if (!target) return;
      e.preventDefault();
      const query =
        target.getAttribute("data-query") || target.textContent || "";
      if (query.trim()) {
        setFloatBtn(null);
        setQuery(query.trim());
      }
    };

    el.addEventListener("click", onClick);
    return () => el.removeEventListener("click", onClick);
  }, [setQuery]);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const onMouseUp = () => {
      const sel = window.getSelection();
      if (!sel || sel.isCollapsed) {
        clearFloat();
        return;
      }

      const text = sel.toString().trim();
      if (text.length < 2 || text.length > 100) {
        clearFloat();
        return;
      }

      if (!el.contains(sel.anchorNode)) {
        clearFloat();
        return;
      }

      const range = sel.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      const containerRect = el.getBoundingClientRect();

      setFloatBtn({
        text,
        top: rect.top - containerRect.top - 40,
        left: rect.left - containerRect.left + rect.width / 2,
      });
    };

    el.addEventListener("mouseup", onMouseUp);
    return () => el.removeEventListener("mouseup", onMouseUp);
  }, [clearFloat]);

  useEffect(() => {
    const onScroll = () => clearFloat();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [clearFloat]);

  return (
    <div style={{ position: "relative" }}>
      <div
        ref={contentRef}
        className="prose type-body max-w-none"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      {floatBtn && (
        <button
          className="image-lookup-float-btn"
          style={{
            top: floatBtn.top,
            left: floatBtn.left,
          }}
          onClick={() => {
            setQuery(floatBtn.text);
            setFloatBtn(null);
          }}
        >
          Lookup
        </button>
      )}
    </div>
  );
}
