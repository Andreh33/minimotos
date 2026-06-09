"use client";

import { useEffect, useRef, useState } from "react";
import { registerGsap, gsap } from "@/lib/motion/gsap";
import { Gauge } from "@/components/ui/Gauge";
import { Logo } from "@/components/layout/Logo";

type Lenis = { stop?: () => void; start?: () => void };

export function Preloader() {
  const [done, setDone] = useState(false);
  const [rpm, setRpm] = useState(0);
  const root = useRef<HTMLDivElement>(null);

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

    tl.to(o, { v: 0.95, duration: 1.1, ease: "power2.inOut", onUpdate: () => setRpm(o.v) })
      .to(root.current, { yPercent: -100, skewY: -3, duration: 0.8, ease: "expo.inOut" }, "+=0.15");

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
      <Logo className="scale-125" />
      <div className="relative grid h-28 w-28 place-items-center">
        <Gauge value={rpm} className="h-28 w-28" id="preload-gauge" />
        <span className="tnum absolute text-sm text-mm-text-dim">
          {String(Math.round(rpm * 100)).padStart(3, "0")}
        </span>
      </div>
    </div>
  );
}
