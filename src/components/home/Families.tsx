import { getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { families } from "@/lib/site";
import { SectionShell } from "@/components/ui/SectionShell";
import { Reveal } from "@/components/ui/Reveal";
import { SplitReveal } from "@/components/ui/SplitReveal";

/* Tinte por familia (recorre el espectro). */
const tints = [
  "rgba(0,194,255,0.16)",
  "rgba(30,123,255,0.16)",
  "rgba(122,43,255,0.16)",
  "rgba(255,30,142,0.16)",
  "rgba(43,255,106,0.16)",
  "rgba(255,196,0,0.14)",
  "rgba(198,255,26,0.12)",
  "rgba(0,194,255,0.12)",
];

export async function Families() {
  const t = await getTranslations("familiesSection");
  const tf = await getTranslations("families");

  return (
    <SectionShell id="familias" className="py-24 md:py-32" surface slant="top">
      <header className="mb-12 flex flex-col gap-4 md:mb-16">
        <Reveal>
          <p className="mm-eyebrow text-mm-magenta">{t("eyebrow")}</p>
        </Reveal>
        <SplitReveal
          text={t("title")}
          className="mm-display text-[length:var(--fs-h2)]"
        />
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
            <div
              className="absolute inset-0 -z-10 transition-transform duration-[var(--mm-dur-slow)] ease-[var(--ease-power)] group-hover:scale-110"
              style={{
                background: `radial-gradient(120% 90% at 30% 15%, ${tints[i % tints.length]}, transparent 65%), #0F1117`,
              }}
            />
            <div
              aria-hidden
              className="absolute inset-0 -z-10 opacity-50"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(115deg, rgba(255,255,255,0.025) 0 1px, transparent 1px 26px)",
              }}
            />
            <ArrowUpRight className="absolute right-4 top-4 h-5 w-5 text-mm-text-mute transition-all duration-[var(--mm-dur)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-mm-text" />
            <h3 className="mm-display text-2xl leading-none transition-transform duration-[var(--mm-dur)] group-hover:translate-x-1 md:text-3xl">
              {tf(f.key)}
            </h3>
            {f.energy === "both" ? (
              <p className="mt-1 font-mono text-[0.6rem] uppercase tracking-widest text-mm-text-mute">
                gasolina · eléctrica
              </p>
            ) : f.energy !== "na" ? (
              <p className="mt-1 font-mono text-[0.6rem] uppercase tracking-widest text-mm-text-mute">
                {f.energy}
              </p>
            ) : null}
          </Link>
        ))}
      </Reveal>
    </SectionShell>
  );
}
