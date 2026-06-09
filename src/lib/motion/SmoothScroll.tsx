"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { registerGsap, gsap, ScrollTrigger } from "./gsap";
import { LENIS_LERP } from "./config";

/**
 * Smooth scroll global (Lenis) sincronizado con el ticker de GSAP y ScrollTrigger.
 * Client-only. Sin window en scope de módulo.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    registerGsap();

    const lenis = new Lenis({
      lerp: LENIS_LERP,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
    });

    // Exponer para scroll-to programático (anclas, botón "subir").
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);

  return <>{children}</>;
}
