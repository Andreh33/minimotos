"use client";

import { useEffect, useRef, useState } from "react";
import { registerGsap, gsap } from "@/lib/motion/gsap";
import { Logo } from "@/components/layout/Logo";

type Lenis = { stop?: () => void; start?: () => void };

export function Preloader() {
  const [done, setDone] = useState(false);
  const [pct, setPct] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sessionStorage.getItem("mm-preloaded")) {
      setDone(true);
      return;
    }
    registerGsap();
    const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
    document.documentElement.style.overflow = "hidden";
    lenis?.stop?.();

    const o = { v: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem("mm-preloaded", "1");
        document.documentElement.style.overflow = "";
        lenis?.start?.();
        setDone(true);
      },
    });

    tl.to(o, {
      v: 1,
      duration: 1.1,
      ease: "power2.inOut",
      onUpdate: () => {
        setPct(Math.round(o.v * 100));
        if (bar.current) bar.current.style.transform = `scaleX(${o.v})`;
      },
    }).to(root.current, { yPercent: -100, skewY: -3, duration: 0.8, ease: "expo.inOut" }, "+=0.15");

    return () => {
      document.documentElement.style.overflow = "";
      tl.kill();
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-8 bg-mm-black"
    >
      <Logo className="scale-150" />
      <div className="w-60 max-w-[60vw]">
        <div className="h-[2px] w-full overflow-hidden rounded-full bg-white/10">
          <div
            ref={bar}
            className="h-full w-full origin-left scale-x-0"
            style={{ background: "var(--mm-spectrum)", boxShadow: "0 0 10px rgba(30,123,255,0.6)" }}
          />
        </div>
        <div className="mt-3 flex justify-between font-mono text-[0.6rem] uppercase tracking-widest text-mm-text-mute">
          <span>Cargando</span>
          <span className="tnum">{String(pct).padStart(3, "0")}</span>
        </div>
      </div>
    </div>
  );
}
