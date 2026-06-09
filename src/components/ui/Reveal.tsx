"use client";

import { useRef, useEffect, createElement, type ReactNode, type ElementType } from "react";
import { registerGsap, gsap } from "@/lib/motion/gsap";

/**
 * Reveal de scroll genérico (GSAP + ScrollTrigger). Distancias cortas,
 * easing expo.out, una sola vez. Si stagger=true anima los hijos directos.
 */
export function Reveal({
  children,
  className,
  y = 28,
  delay = 0,
  stagger = false,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  y?: number;
  delay?: number;
  stagger?: boolean;
  as?: ElementType;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGsap();
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const targets = stagger ? (el.children as unknown as Element[]) : el;
      gsap.from(targets, {
        opacity: 0,
        y,
        duration: 0.85,
        ease: "expo.out",
        delay,
        stagger: stagger ? 0.06 : 0,
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      });
    }, el);

    return () => ctx.revert();
  }, [y, delay, stagger]);

  return createElement(Tag, { ref, className }, children);
}
