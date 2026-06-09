import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Play, ArrowUpRight } from "lucide-react";
import { SectionShell } from "@/components/ui/SectionShell";
import { Reveal } from "@/components/ui/Reveal";
import { SplitReveal } from "@/components/ui/SplitReveal";
import { site } from "@/lib/site";

const clips = [
  "/media/prod/pit-bikes.jpg",
  "/media/prod/electricas.jpg",
  "/media/prod/buggies.jpg",
  "/media/prod/minimotos.jpg",
];

export async function TikTokFeed() {
  const t = await getTranslations("tiktok");

  return (
    <SectionShell className="py-24 md:py-32" surface slant="both">
      <header className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <div className="flex flex-col gap-4">
          <Reveal>
            <p className="mm-eyebrow text-mm-magenta">{t("eyebrow")}</p>
          </Reveal>
          <SplitReveal text={t("title")} className="mm-display text-[length:var(--fs-h2)]" />
          <Reveal delay={0.1}>
            <p className="text-mm-text-dim">{t("subtitle")}</p>
          </Reveal>
        </div>
        <Reveal>
          <a
            href={site.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="group mm-edge inline-flex items-center gap-2 rounded-mm-pill px-5 py-2.5 font-mono text-xs uppercase tracking-widest transition-colors hover:bg-mm-ink-700"
            data-cursor="link"
          >
            {t("cta")}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </Reveal>
      </header>

      <Reveal stagger className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {clips.map((src, i) => (
          <a
            key={i}
            href={site.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex aspect-[9/16] flex-col justify-end overflow-hidden rounded-mm-md border border-mm-line p-4"
            data-cursor="view"
          >
            <div className="absolute inset-0 z-0 transition-transform duration-[var(--mm-dur-slow)] group-hover:scale-105">
              <Image
                src={src}
                alt=""
                fill
                sizes="(max-width:768px) 50vw, 25vw"
                className="object-cover brightness-[0.8] saturate-[0.8]"
              />
            </div>
            <div
              aria-hidden
              className="absolute inset-0 z-[1]"
              style={{ background: "linear-gradient(180deg, rgba(21,23,29,0.15), rgba(21,23,29,0.85))" }}
            />
            <div className="absolute inset-0 z-[2] grid place-items-center">
              <span className="grid h-12 w-12 place-items-center rounded-full border border-white/20 backdrop-blur-sm transition-transform group-hover:scale-110">
                <Play className="ml-0.5 h-5 w-5" fill="currentColor" />
              </span>
            </div>
            <span className="relative z-10 font-mono text-[0.6rem] uppercase tracking-widest text-mm-text">
              {site.tiktokHandle}
            </span>
          </a>
        ))}
      </Reveal>
      <p className="mt-6 font-mono text-[0.6rem] uppercase tracking-widest text-mm-text-mute">
        {/* Placeholder: enlaza al perfil real. Integrar embeds oficiales cuando se decida. */}
        TODO:DATO-REAL — clips reales del feed
      </p>
    </SectionShell>
  );
}
