import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { families } from "@/lib/site";
import { familyPhoto } from "@/lib/media";
import { SectionShell } from "@/components/ui/SectionShell";
import { Reveal } from "@/components/ui/Reveal";
import { SplitReveal } from "@/components/ui/SplitReveal";

const tints = [
  "rgba(0,194,255,0.55)",
  "rgba(30,123,255,0.55)",
  "rgba(122,43,255,0.55)",
  "rgba(255,30,142,0.5)",
  "rgba(43,255,106,0.5)",
  "rgba(255,196,0,0.45)",
  "rgba(198,255,26,0.4)",
  "rgba(0,194,255,0.45)",
];

export async function Families() {
  const t = await getTranslations("familiesSection");
  const tf = await getTranslations("families");

  return (
    <SectionShell id="familias" className="relative py-24 md:py-32" surface slant="top">
      {/* Título fantasma de fondo */}
      <span
        aria-hidden
        className="mm-display pointer-events-none absolute -top-2 left-2 select-none text-[18vw] leading-none text-white/[0.025] md:left-6"
      >
        GAMA
      </span>

      <header className="relative mb-12 flex flex-col gap-4 md:mb-16">
        <Reveal>
          <p className="mm-eyebrow text-mm-magenta">{t("eyebrow")}</p>
        </Reveal>
        <SplitReveal text={t("title")} className="mm-display text-[length:var(--fs-h2)]" />
        <Reveal delay={0.1}>
          <p className="max-w-lg text-mm-text-dim">{t("subtitle")}</p>
        </Reveal>
      </header>

      <Reveal stagger className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {families.map((f, i) => (
          <Link
            key={f.slug}
            href={{ pathname: "/tienda", query: { family: f.slug } }}
            className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-mm-md border border-mm-line p-5 transition-colors duration-[var(--mm-dur)] hover:border-mm-line-strong"
            data-cursor="view"
          >
            {/* Foto */}
            <div className="absolute inset-0 z-0 transition-transform duration-[var(--mm-dur-slow)] ease-[var(--ease-power)] group-hover:scale-110">
              <Image
                src={familyPhoto[f.slug]}
                alt=""
                fill
                sizes="(max-width:768px) 50vw, 25vw"
                className="object-cover brightness-[0.78] saturate-[0.75] transition-[filter] duration-[var(--mm-dur)] group-hover:brightness-90 group-hover:saturate-100"
              />
            </div>
            {/* Oscurecido + tinte de familia */}
            <div
              aria-hidden
              className="absolute inset-0 z-[1]"
              style={{
                background: `linear-gradient(180deg, rgba(21,23,29,0.35) 0%, rgba(21,23,29,0.05) 40%, rgba(21,23,29,0.92) 100%)`,
              }}
            />
            <div
              aria-hidden
              className="absolute inset-0 z-[1] opacity-0 mix-blend-screen transition-opacity duration-[var(--mm-dur)] group-hover:opacity-100"
              style={{ background: `radial-gradient(120% 80% at 50% 120%, ${tints[i % tints.length]}, transparent 60%)` }}
            />

            <ArrowUpRight className="absolute right-4 top-4 z-10 h-5 w-5 text-mm-text-dim transition-all duration-[var(--mm-dur)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-mm-text" />
            <h3 className="relative z-10 mm-display text-2xl leading-none transition-transform duration-[var(--mm-dur)] group-hover:translate-x-1 md:text-3xl">
              {tf(f.key)}
            </h3>
            {f.energy === "both" ? (
              <p className="relative z-10 mt-1 font-mono text-[0.6rem] uppercase tracking-widest text-mm-text-dim">
                gasolina · eléctrica
              </p>
            ) : f.energy !== "na" ? (
              <p className="relative z-10 mt-1 font-mono text-[0.6rem] uppercase tracking-widest text-mm-text-dim">
                {f.energy}
              </p>
            ) : null}
          </Link>
        ))}
      </Reveal>
    </SectionShell>
  );
}
