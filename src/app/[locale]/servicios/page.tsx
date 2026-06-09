import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { SectionShell } from "@/components/ui/SectionShell";
import { Reveal } from "@/components/ui/Reveal";
import { SplitReveal } from "@/components/ui/SplitReveal";
import { site, waLink } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "servicesPage" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("servicesPage");

  const steps = [1, 2, 3, 4] as const;

  return (
    <main className="pt-24 md:pt-28">
      <SectionShell className="pb-16">
        <p className="mm-eyebrow text-mm-magenta">{t("eyebrow")}</p>
        <SplitReveal text={t("title")} as="h1" className="mm-display mt-4 text-[length:var(--fs-hero)] leading-[0.85]" />
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-lg text-mm-text-dim">{t("subtitle")}</p>
        </Reveal>
      </SectionShell>

      <SectionShell surface slant="top" className="py-20 md:py-28">
        <h2 className="mm-display mb-10 text-[length:var(--fs-h3)]">{t("stepsTitle")}</h2>
        <Reveal stagger className="grid gap-3 md:grid-cols-4">
          {steps.map((n) => (
            <div key={n} className="relative overflow-hidden rounded-mm-md border border-mm-line p-6">
              <span className="mm-display absolute -right-1 -top-3 text-7xl text-white/[0.05]">0{n}</span>
              <span className="tnum text-sm text-mm-cyan">0{n}</span>
              <h3 className="mm-display mt-3 text-xl">{t(`step${n}Title`)}</h3>
              <p className="mt-2 text-sm text-mm-text-dim">{t(`step${n}Body`)}</p>
            </div>
          ))}
        </Reveal>
      </SectionShell>

      <SectionShell className="py-20 md:py-28">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="mm-display text-[length:var(--fs-h2)]">{t("whatTitle")}</h2>
            <div className="mt-6 flex flex-wrap gap-2">
              {t("what")
                .split("·")
                .map((w) => (
                  <span key={w} className="rounded-mm-pill border border-mm-line px-4 py-1.5 font-mono text-xs text-mm-text-dim">
                    {w.trim()}
                  </span>
                ))}
            </div>
          </div>
          <Reveal>
            <a
              href={waLink(`¡Hola ${site.name}! Quiero pedir cita en el taller.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex h-14 items-center justify-center gap-2 overflow-hidden rounded-mm-pill border border-mm-green/40 bg-mm-green/10 px-8 font-mono text-sm uppercase tracking-[0.14em] text-mm-green"
              data-cursor="link"
            >
              {t("cta")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Reveal>
        </div>
      </SectionShell>
    </main>
  );
}
