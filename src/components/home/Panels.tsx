import { getTranslations } from "next-intl/server";
import { Gauge, Wrench, ShieldCheck, ArrowRight, type LucideIcon } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SectionShell } from "@/components/ui/SectionShell";
import { Reveal } from "@/components/ui/Reveal";
import { SplitReveal } from "@/components/ui/SplitReveal";
import { cn } from "@/lib/utils/cn";

type PanelDef = {
  key: "venta" | "taller" | "equipacion";
  icon: LucideIcon;
  href: string;
  tint: string;
  cta: string;
};

const PANELS: PanelDef[] = [
  { key: "venta", icon: Gauge, href: "/tienda", tint: "rgba(30,123,255,0.22)", cta: "viewAll" },
  { key: "taller", icon: Wrench, href: "/servicios", tint: "rgba(255,30,142,0.20)", cta: "viewMore" },
  { key: "equipacion", icon: ShieldCheck, href: "/tienda", tint: "rgba(43,255,106,0.18)", cta: "viewMore" },
];

export async function Panels() {
  const t = await getTranslations("panels");
  const tc = await getTranslations("common");

  return (
    <div className="flex flex-col">
      {PANELS.map((panel, i) => {
        const Icon = panel.icon;
        const reverse = i % 2 === 1;
        return (
          <SectionShell key={panel.key} className="py-16 md:py-24">
            <div
              className={cn(
                "grid items-center gap-8 md:grid-cols-2 md:gap-16",
                reverse && "md:[direction:rtl]",
              )}
            >
              {/* Texto */}
              <div className="flex flex-col gap-5 [direction:ltr]">
                <Reveal>
                  <p className="mm-eyebrow">{t(`${panel.key}.eyebrow`)}</p>
                </Reveal>
                <SplitReveal
                  text={t(`${panel.key}.title`)}
                  className="mm-display text-[length:var(--fs-h2)]"
                />
                <Reveal delay={0.1}>
                  <p className="max-w-md text-mm-text-dim">{t(`${panel.key}.body`)}</p>
                </Reveal>
                <Reveal delay={0.15}>
                  <Link
                    href={panel.href}
                    className="group mt-2 inline-flex w-fit items-center gap-2 font-mono text-xs uppercase tracking-widest text-mm-text hover:text-mm-cyan"
                    data-cursor="link"
                  >
                    {tc(panel.cta)}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Reveal>
              </div>

              {/* Visual branded */}
              <Reveal className="[direction:ltr]">
                <div className="relative aspect-[5/4] overflow-hidden rounded-mm-md border border-mm-line">
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `radial-gradient(110% 90% at 70% 20%, ${panel.tint}, transparent 60%), #0F1117`,
                    }}
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-40"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(115deg, rgba(255,255,255,0.025) 0 1px, transparent 1px 28px)",
                    }}
                  />
                  <span
                    aria-hidden
                    className="mm-display absolute -right-2 bottom-0 select-none text-[12rem] leading-none text-white/[0.04]"
                  >
                    0{i + 1}
                  </span>
                  <div className="absolute inset-0 grid place-items-center">
                    <Icon className="h-20 w-20 text-mm-text-dim" strokeWidth={1} />
                  </div>
                </div>
              </Reveal>
            </div>
          </SectionShell>
        );
      })}
    </div>
  );
}
