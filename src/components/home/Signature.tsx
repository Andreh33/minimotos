"use client";

import { useEffect, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Producto } from "@/lib/data/types";
import { registerGsap, gsap, ScrollTrigger } from "@/lib/motion/gsap";
import { ProductImage } from "@/components/shop/ProductImage";
import { formatPrice } from "@/lib/utils/format";

export function Signature({ productos }: { productos: Producto[] }) {
  const t = useTranslations("signature");
  const locale = useLocale();
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const rpm = useRef<HTMLSpanElement>(null);
  const lines = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    const sec = section.current;
    const tr = track.current;
    if (!sec || !tr || window.innerWidth < 768) return;

    const ctx = gsap.context(() => {
      const distance = () => Math.max(0, tr.scrollWidth - window.innerWidth + 96);
      const tween = gsap.to(tr, { x: () => -distance(), ease: "none" });

      ScrollTrigger.create({
        trigger: sec,
        start: "top top",
        end: () => `+=${distance()}`,
        pin: true,
        scrub: 1,
        animation: tween,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (bar.current) bar.current.style.transform = `scaleX(${self.progress})`;
          if (rpm.current)
            rpm.current.textContent = String(Math.round(self.progress * 90) / 10 + 1).padStart(2, "0");
          if (lines.current) {
            const v = Math.min(Math.abs(self.getVelocity()) / 2500, 1);
            lines.current.style.opacity = String(0.05 + v * 0.5);
          }
        },
      });
    }, sec);

    return () => ctx.revert();
  }, [productos.length]);

  if (productos.length === 0) return null;

  return (
    <section ref={section} className="relative min-h-[100svh] overflow-hidden bg-mm-ink-900">
      {/* líneas de velocidad */}
      <div
        ref={lines}
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(255,255,255,0.5) 0 1px, transparent 1px 70px)",
          maskImage: "linear-gradient(90deg, transparent, #000 30%, #000 70%, transparent)",
        }}
      />

      <div className="relative flex h-[100svh] flex-col">
        <header className="flex items-end justify-between px-6 pt-28 md:px-12">
          <div>
            <p className="mm-eyebrow text-mm-amber">{t("eyebrow")}</p>
            <h2 className="mm-display mt-3 text-[length:var(--fs-h2)]">{t("title")}</h2>
          </div>
          <div className="hidden items-baseline gap-2 md:flex" aria-hidden>
            <span ref={rpm} className="tnum text-3xl text-mm-text">
              01
            </span>
            <span className="font-mono text-[0.6rem] uppercase tracking-widest text-mm-text-mute">
              ×1000 rpm
            </span>
          </div>
        </header>

        {/* track horizontal */}
        <div className="flex flex-1 items-center">
          <div ref={track} className="flex items-center gap-6 px-6 will-change-transform md:px-12">
            {productos.map((p, i) => (
              <Link
                key={p.id}
                href={{ pathname: `/tienda/${p.slug}` }}
                className="group relative block w-[78vw] shrink-0 overflow-hidden rounded-mm-md border border-mm-line sm:w-[52vw] md:w-[34vw] lg:w-[28vw]"
                style={{ transform: `rotate(${i % 2 ? 1.5 : -1.5}deg)` }}
                data-cursor="view"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <div className="absolute inset-0 transition-transform duration-[var(--mm-dur-slow)] group-hover:scale-105">
                    <ProductImage producto={p} sizes="34vw" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-mm-black to-transparent p-5">
                    <h3 className="mm-display text-xl">{p.nombre}</h3>
                    <p className="tnum mt-1 text-sm text-mm-text-dim">
                      {formatPrice(p.precioOferta ?? p.precio, locale)}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* barra de progreso espectro */}
        <div className="mx-6 mb-10 h-[3px] overflow-hidden rounded-full bg-white/10 md:mx-12">
          <div
            ref={bar}
            className="h-full w-full origin-left scale-x-0"
            style={{ background: "var(--mm-spectrum)" }}
          />
        </div>
      </div>
    </section>
  );
}
