import Image from "next/image";
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
  photo: string;
  tint: string;
  cta: string;
};

const PANELS: PanelDef[] = [
  { key: "venta", icon: Gauge, href: "/tienda", photo: "/media/prod/minimotos.jpg", tint: "rgba(30,123,255,0.6)", cta: "viewAll" },
  { key: "taller", icon: Wrench, href: "/servicios", photo: "/media/prod/recambios.jpg", tint: "rgba(255,30,142,0.55)", cta: "viewMore" },
  { key: "equipacion", icon: ShieldCheck, href: "/tienda", photo: "/media/prod/equipacion.jpg", tint: "rgba(43,255,106,0.5)", cta: "viewMore" },
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

              {/* Visual: foto tratada */}
              <Reveal className="[direction:ltr]">
                <div className="group relative aspect-[5/4] overflow-hidden rounded-mm-md border border-mm-line">
                  <Image
                    src={panel.photo}
                    alt=""
                    fill
                    sizes="(max-width:768px) 100vw, 50vw"
                    className="object-cover brightness-[0.82] saturate-[0.8] transition-transform duration-[var(--mm-dur-slow)] ease-[var(--ease-power)] group-hover:scale-105"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(180deg, rgba(21,23,29,0.2), rgba(21,23,29,0.75))",
                    }}
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 mix-blend-color opacity-25"
                    style={{ background: `radial-gradient(120% 100% at 70% 10%, ${panel.tint}, transparent 60%)` }}
                  />
                  <span
                    aria-hidden
                    className="mm-display absolute -right-1 bottom-0 select-none text-[12rem] leading-none text-white/[0.08]"
                  >
                    0{i + 1}
                  </span>
                  <span className="absolute left-5 top-5 grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-mm-black/40 backdrop-blur-md">
                    <Icon className="h-5 w-5 text-mm-text" strokeWidth={1.5} />
                  </span>
                </div>
              </Reveal>
            </div>
          </SectionShell>
        );
      })}
    </div>
  );
}
