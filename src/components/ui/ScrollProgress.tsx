"use client";

import { useEffect, useRef } from "react";

/** Progreso de scroll como fina línea neón de espectro (top). */
export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);
  const raf = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        const h = document.documentElement;
        const max = h.scrollHeight - h.clientHeight;
        const p = max > 0 ? Math.min(1, h.scrollTop / max) : 0;
        if (bar.current) bar.current.style.transform = `scaleX(${p})`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed left-0 top-0 z-[55] h-[2px] w-full">
      <div
        ref={bar}
        className="h-full w-full origin-left scale-x-0"
        style={{ background: "var(--mm-spectrum)", boxShadow: "0 0 10px rgba(30,123,255,0.6)" }}
      />
    </div>
  );
}
