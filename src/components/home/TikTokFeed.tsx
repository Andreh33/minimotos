import { getTranslations } from "next-intl/server";
import { Play, ArrowUpRight } from "lucide-react";
import { SectionShell } from "@/components/ui/SectionShell";
import { Reveal } from "@/components/ui/Reveal";
import { SplitReveal } from "@/components/ui/SplitReveal";
import { site } from "@/lib/site";

const tints = [
  "rgba(255,30,142,0.20)",
  "rgba(0,194,255,0.18)",
  "rgba(122,43,255,0.18)",
  "rgba(43,255,106,0.16)",
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
        {tints.map((tint, i) => (
          <a
            key={i}
            href={site.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex aspect-[9/16] flex-col justify-end overflow-hidden rounded-mm-md border border-mm-line p-4"
            data-cursor="view"
          >
            <div
              className="absolute inset-0 -z-10 transition-transform duration-[var(--mm-dur-slow)] group-hover:scale-105"
              style={{ background: `radial-gradient(110% 80% at 40% 25%, ${tint}, transparent 60%), #0F1117` }}
            />
            <div className="absolute inset-0 grid place-items-center">
              <span className="grid h-12 w-12 place-items-center rounded-full border border-white/20 backdrop-blur-sm transition-transform group-hover:scale-110">
                <Play className="ml-0.5 h-5 w-5" fill="currentColor" />
              </span>
            </div>
            <span className="relative font-mono text-[0.6rem] uppercase tracking-widest text-mm-text-dim">
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
