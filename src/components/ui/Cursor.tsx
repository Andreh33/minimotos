"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/motion/gsap";

/**
 * Cursor custom (solo pointer:fine): punto rápido + anillo con trail.
 * Estados vía [data-cursor]: "link" agranda el anillo, "view"/"drag" cambian texto.
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const d = dot.current;
    const r = ring.current;
    if (!d || !r) return;

    document.documentElement.classList.add("has-custom-cursor");

    const dx = gsap.quickTo(d, "x", { duration: 0.08, ease: "power3" });
    const dy = gsap.quickTo(d, "y", { duration: 0.08, ease: "power3" });
    const rx = gsap.quickTo(r, "x", { duration: 0.32, ease: "power3" });
    const ry = gsap.quickTo(r, "y", { duration: 0.32, ease: "power3" });

    function move(e: MouseEvent) {
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
      const t = (e.target as HTMLElement)?.closest?.("[data-cursor]");
      const state = t?.getAttribute("data-cursor");
      gsap.to(r, {
        scale: state === "link" ? 1.8 : state === "view" ? 2.6 : 1,
        borderColor:
          state === "link"
            ? "rgba(0,194,255,0.9)"
            : state === "view"
              ? "rgba(255,30,142,0.9)"
              : "rgba(255,255,255,0.35)",
        duration: 0.3,
        ease: "power3.out",
      });
    }
    function down() {
      gsap.to(r, { scale: 0.8, duration: 0.15 });
    }
    function up() {
      gsap.to(r, { scale: 1, duration: 0.25 });
    }

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[90] hidden md:block">
      <div
        ref={ring}
        className="absolute left-0 top-0 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/35"
      />
      <div
        ref={dot}
        className="absolute left-0 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-mm-cyan"
      />
    </div>
  );
}
