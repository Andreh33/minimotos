import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { SectionShell } from "@/components/ui/SectionShell";
import { Reveal } from "@/components/ui/Reveal";
import { SplitReveal } from "@/components/ui/SplitReveal";
import { Marquee } from "@/components/ui/Marquee";
import { Location } from "@/components/home/Location";
import { site } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "aboutPage" });
  return { title: t("title"), description: t("intro") };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("aboutPage");

  return (
    <main className="pt-24 md:pt-28">
      <SectionShell className="pb-12">
        <p className="mm-eyebrow text-mm-cyan">{t("eyebrow")}</p>
        <SplitReveal text={t("title")} as="h1" className="mm-display mt-4 text-[length:var(--fs-h1)] leading-[0.86]" />
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-2xl text-lg text-mm-text-dim">{t("intro")}</p>
        </Reveal>
      </SectionShell>

      <div className="py-6 opacity-[0.08]">
        <Marquee text="CIUDAD REAL ✦ DESDE SIEMPRE ✦ MINI MOTOS ✦" speed={42} spectrum />
      </div>

      <SectionShell className="py-16 md:py-24">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-mm-md border border-mm-line p-8">
            <h2 className="mm-display text-2xl">{t("physicalTitle")}</h2>
            <p className="mt-3 text-mm-text-dim">{t("physicalBody")}</p>
            <p className="mt-5 font-mono text-xs uppercase tracking-widest text-mm-text-mute">
              {site.address}
            </p>
          </div>
          <a
            href={site.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-mm-md border border-mm-line p-8"
            data-cursor="view"
          >
            <div
              className="absolute inset-0 -z-10 opacity-60"
              style={{ background: "radial-gradient(100% 80% at 80% 10%, rgba(255,30,142,0.18), transparent 60%), #0F1117" }}
            />
            <h2 className="mm-display text-2xl">{t("tiktokTitle")}</h2>
            <p className="mt-3 text-mm-text-dim">{t("tiktokBody")}</p>
            <span className="mt-5 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-mm-magenta">
              {site.tiktokHandle} <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </a>
        </div>
      </SectionShell>

      <Location />
    </main>
  );
}
