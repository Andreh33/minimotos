"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowDown } from "lucide-react";
import { hasWebGL } from "@/lib/utils/capabilities";
import { ButtonLink } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { Gauge } from "@/components/ui/Gauge";
import { registerGsap, gsap } from "@/lib/motion/gsap";
import { waLink, site } from "@/lib/site";

const HeroCanvas = dynamic(() => import("@/components/webgl/HeroCanvas"), {
  ssr: false,
});

export function Hero() {
  const t = useTranslations("hero");
  const [webgl, setWebgl] = useState(false);
  const [rpm, setRpm] = useState(0);
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    setWebgl(hasWebGL());
  }, []);

  useEffect(() => {
    registerGsap();
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      // sweep de RPM (telemetría decorativa)
      const o = { v: 0 };
      gsap.to(o, {
        v: 0.78,
        duration: 1.6,
        ease: "power3.inOut",
        onUpdate: () => setRpm(o.v),
        delay: 0.2,
      });
      gsap.to(o, { v: 0.52, duration: 1.2, delay: 1.8, onUpdate: () => setRpm(o.v) });

      gsap.from(el.querySelectorAll("[data-hero-rise]"), {
        yPercent: 110,
        opacity: 0,
        duration: 1,
        ease: "expo.out",
        stagger: 0.08,
        delay: 0.35,
      });
      // parallax del contenido al hacer scroll
      gsap.to(el.querySelector("[data-hero-content]"), {
        yPercent: -14,
        opacity: 0.2,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="contenido"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden"
    >
      {/* Fondo */}
      <div className="absolute inset-0 -z-10">
        {webgl ? (
          <HeroCanvas />
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(120% 80% at 30% 35%, rgba(30,123,255,0.25), transparent 60%), radial-gradient(100% 70% at 75% 60%, rgba(255,30,142,0.18), transparent 55%), #050507",
            }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-mm-black via-mm-black/30 to-transparent" />
      </div>

      <div
        data-hero-content
        className="mx-auto w-full max-w-[1400px] px-6 pb-20 pt-32 md:px-12 md:pb-28"
      >
        <div className="overflow-hidden">
          <p data-hero-rise className="mm-eyebrow mb-6 text-mm-cyan">
            {t("eyebrow")}
          </p>
        </div>

        <h1 className="mm-display mm-display-skew text-[length:var(--fs-hero)] leading-[0.84]">
          <span className="block overflow-hidden">
            <span data-hero-rise className="block mm-text-chrome">
              {t("title").split(" ").slice(0, -1).join(" ") || t("title")}
            </span>
          </span>
          <span className="block overflow-hidden">
            <span data-hero-rise className="block mm-text-spectrum">
              {t("title").split(" ").slice(-1)}
            </span>
          </span>
        </h1>

        <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="overflow-hidden">
            <p data-hero-rise className="max-w-md text-mm-text-dim">
              {t("subtitle")}
            </p>
            <div data-hero-rise className="mt-7 flex flex-wrap gap-3">
              <Magnetic>
                <ButtonLink href="/tienda" size="lg">
                  {t("ctaShop")}
                </ButtonLink>
              </Magnetic>
              <Magnetic>
                <ButtonLink
                  href={waLink(`¡Hola ${site.name}! Quiero información.`)}
                  external
                  variant="ghost"
                  size="lg"
                >
                  {t("ctaWhatsapp")}
                </ButtonLink>
              </Magnetic>
            </div>
          </div>

          {/* Telemetría: gauge RPM */}
          <div data-hero-rise aria-hidden className="hidden items-center gap-4 md:flex">
            <div className="relative grid h-24 w-24 place-items-center">
              <Gauge value={rpm} className="h-24 w-24" id="hero-gauge" />
              <div className="absolute flex flex-col items-center">
                <span className="tnum text-lg leading-none">
                  {String(Math.round(rpm * 12)).padStart(2, "0")}
                </span>
                <span className="font-mono text-[0.55rem] uppercase tracking-widest text-mm-text-mute">
                  ×1000 rpm
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Indicador scroll */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2">
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-mm-text-mute">
          scroll
        </span>
        <ArrowDown className="h-4 w-4 animate-bounce text-mm-text-dim" />
      </div>
    </section>
  );
}
