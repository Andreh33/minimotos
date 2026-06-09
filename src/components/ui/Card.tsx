"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "@/lib/motion/gsap";
import { cn } from "@/lib/utils/cn";

/**
 * Tarjeta con tilt 3D sutil en hover (parallax premium, nunca caricaturesco).
 * Plana en reposo. Glow neón opcional en el borde.
 */
export function TiltCard({
  children,
  className,
  max = 6,
  glow = "blue",
}: {
  children: ReactNode;
  className?: string;
  max?: number;
  glow?: "blue" | "magenta" | "green" | "none";
}) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el || window.matchMedia("(pointer: coarse)").matches) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(el, {
      rotateY: px * max,
      rotateX: -py * max,
      duration: 0.4,
      ease: "power3.out",
      transformPerspective: 800,
    });
  }
  function onLeave() {
    if (!ref.current) return;
    gsap.to(ref.current, { rotateX: 0, rotateY: 0, duration: 0.6, ease: "power3.out" });
  }

  const glowShadow =
    glow === "none"
      ? undefined
      : {
          blue: "var(--mm-glow-blue)",
          magenta: "var(--mm-glow-magenta)",
          green: "var(--mm-glow-green)",
        }[glow];

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transformStyle: "preserve-3d" }}
      className={cn(
        "group relative rounded-mm-md border border-mm-line bg-mm-ink-700 transition-shadow duration-[var(--mm-dur)] hover:border-mm-line-strong",
        className,
      )}
      onMouseEnter={(e) => {
        if (glowShadow) gsap.to(e.currentTarget, { boxShadow: glowShadow, duration: 0.4 });
      }}
    >
      {children}
    </div>
  );
}
