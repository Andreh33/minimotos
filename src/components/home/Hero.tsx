"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowDown, Volume2, VolumeX } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { Sticker } from "@/components/ui/Sticker";
import { registerGsap, gsap } from "@/lib/motion/gsap";
import { waLink, site } from "@/lib/site";

export function Hero() {
  const t = useTranslations("hero");
  const [showVideo, setShowVideo] = useState(false);
  const [muted, setMuted] = useState(true);
  const root = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setShowVideo(window.matchMedia("(min-width: 768px)").matches);
  }, []);

  useEffect(() => {
    registerGsap();
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.from(el.querySelectorAll("[data-hero-rise]"), {
        yPercent: 110,
        opacity: 0,
        duration: 1,
        ease: "expo.out",
        stagger: 0.07,
        delay: 0.35,
      });
      gsap.to(el.querySelector("[data-hero-content]"), {
        yPercent: -14,
        opacity: 0.2,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  function toggleSound() {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    if (!v.muted) v.play().catch(() => {});
    setMuted(v.muted);
  }

  const words = t("title").split(" ");
  const lead = words.slice(0, -1).join(" ") || t("title");
  const last = words.slice(-1).join(" ");

  return (
    <section
      ref={root}
      id="contenido"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden"
    >
      {/* Fondo: foto/vídeo ambiente + grafito + glow neón + patrón */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/media/hero-bike-v2.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_35%] saturate-[0.6] brightness-105 contrast-105"
        />
        {showVideo && (
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover object-center saturate-[0.7] brightness-105"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/media/hero-bike-v2.jpg"
          >
            <source src="/media/hero.mp4" type="video/mp4" />
          </video>
        )}
        <div
          className="absolute inset-0 mix-blend-color opacity-30"
          style={{ background: "linear-gradient(120deg, #1E7BFF, #7A2BFF 60%, #FF1E8E)" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(21,23,29,0.18) 0%, rgba(21,23,29,0.02) 30%, rgba(21,23,29,0.5) 78%, rgba(21,23,29,0.92) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(21,23,29,0.92) 0%, rgba(21,23,29,0.28) 44%, rgba(21,23,29,0) 74%)",
          }}
        />
        <div
          className="absolute inset-0 mix-blend-screen"
          style={{
            background:
              "radial-gradient(60% 50% at 78% 12%, rgba(30,123,255,0.45), transparent 60%), radial-gradient(55% 45% at 90% 78%, rgba(255,30,142,0.35), transparent 60%), radial-gradient(50% 40% at 8% 30%, rgba(122,43,255,0.30), transparent 60%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              "repeating-linear-gradient(115deg, rgba(255,255,255,0.03) 0 1px, transparent 1px 26px)",
          }}
        />
      </div>

      {/* REC + dirección + toggle de sonido (top) */}
      <div className="absolute right-6 top-24 z-20 flex items-center gap-4 md:right-12 md:top-28">
        <span className="hidden items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-mm-text-dim sm:inline-flex">
          <span className="h-1.5 w-1.5 animate-[mm-pulse-glow_1.4s_ease-in-out_infinite] rounded-full bg-mm-danger" />
          REC · {site.city}
        </span>
        {showVideo && (
          <button
            type="button"
            onClick={toggleSound}
            aria-label={muted ? "Activar sonido" : "Silenciar"}
            className="grid h-9 w-9 place-items-center rounded-full border border-mm-line bg-mm-black/40 backdrop-blur-md transition-colors hover:border-mm-cyan/60 hover:text-mm-cyan"
            data-cursor="link"
          >
            {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>
        )}
      </div>

      <div
        data-hero-content
        className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pb-20 pt-32 md:px-12 md:pb-28"
      >
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <span data-hero-rise>
            <Sticker tone="amber" rotate={-4}>
              ★★★ Taller propio
            </Sticker>
          </span>
          <span data-hero-rise>
            <Sticker tone="red" rotate={3}>
              Gasolina + Eléctricas
            </Sticker>
          </span>
        </div>

        <div className="overflow-hidden">
          <p data-hero-rise className="mm-eyebrow mb-5 text-mm-cyan">
            {t("eyebrow")}
          </p>
        </div>

        <h1 className="mm-display mm-display-skew text-[length:var(--fs-hero)] leading-[0.84]">
          <span className="block overflow-hidden">
            <span data-hero-rise className="mm-text-chrome mm-glow-chrome block">
              {lead}
            </span>
          </span>
          <span className="block overflow-hidden">
            <span data-hero-rise className="mm-text-spectrum mm-glow-spectrum block">
              {last}
            </span>
          </span>
        </h1>

        <div className="mt-8 max-w-md overflow-hidden">
          <p data-hero-rise className="text-mm-text-dim">
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
      </div>

      {/* Indicador scroll */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2">
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-mm-text-mute">
          scroll
        </span>
        <ArrowDown className="h-4 w-4 animate-bounce text-mm-text-dim" />
      </div>
    </section>
  );
}
