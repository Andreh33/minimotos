"use client";

import { useEffect, useRef, useState } from "react";
import { Gauge } from "./Gauge";

/** Indicador de progreso de scroll en forma de velocímetro (firma §8). */
export function ScrollGauge() {
  const [p, setP] = useState(0);
  const raf = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        const h = document.documentElement;
        const max = h.scrollHeight - h.clientHeight;
        setP(max > 0 ? Math.min(1, h.scrollTop / max) : 0);
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
    <div className="pointer-events-none fixed bottom-5 right-5 z-40 hidden items-center gap-2 md:flex">
      <div className="relative grid h-14 w-14 place-items-center rounded-full bg-mm-black/50 backdrop-blur-md">
        <Gauge value={p} showTicks={false} strokeWidth={5} className="h-12 w-12" id="scroll-gauge" />
        <span className="tnum absolute text-[0.6rem] text-mm-text-dim">
          {String(Math.round(p * 100)).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}
