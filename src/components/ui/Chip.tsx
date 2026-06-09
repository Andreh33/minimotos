"use client";

import { cn } from "@/lib/utils/cn";

/** Chip de filtro (toggle). */
export function Chip({
  active,
  children,
  onClick,
  className,
}: {
  active?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-mm-pill border px-3.5 py-1.5 font-mono text-[0.72rem] uppercase tracking-[0.1em] transition-colors duration-[var(--mm-dur-fast)]",
        active
          ? "border-mm-cyan/60 bg-mm-cyan/15 text-mm-cyan"
          : "border-mm-line text-mm-text-dim hover:border-mm-line-strong hover:text-mm-text",
        className,
      )}
    >
      {children}
    </button>
  );
}
