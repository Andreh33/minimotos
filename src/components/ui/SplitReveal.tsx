"use client";

import { useRef, useEffect, type ElementType } from "react";
import { registerGsap, gsap, SplitText } from "@/lib/motion/gsap";
import { cn } from "@/lib/utils/cn";

/**
 * Titular revelado por palabras con máscara de línea + skew (firma "ladeado").
 * GSAP SplitText (gratis en 3.13+).
 */
export function SplitReveal({
  text,
  className,
  as: Tag = "h2",
  start = "top 85%",
}: {
  text: string;
  className?: string;
  as?: ElementType;
  start?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGsap();
    const el = ref.current;
    if (!el) return;

    let split: InstanceType<typeof SplitText> | null = null;
    const ctx = gsap.context(() => {
      split = new SplitText(el, {
        type: "lines,words",
        linesClass: "overflow-hidden py-[0.05em]",
      });
      gsap.set(el, { opacity: 1 });
      gsap.from(split.words, {
        yPercent: 120,
        skewX: -8,
        opacity: 0,
        duration: 0.9,
        ease: "expo.out",
        stagger: 0.045,
        scrollTrigger: { trigger: el, start, once: true },
      });
    }, el);

    return () => {
      ctx.revert();
      split?.revert();
    };
  }, [text, start]);

  return (
    <Tag ref={ref as never} className={cn("opacity-0", className)}>
      {text}
    </Tag>
  );
}
