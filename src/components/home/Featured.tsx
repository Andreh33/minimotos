import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getDestacados } from "@/lib/data/products";
import { SectionShell } from "@/components/ui/SectionShell";
import { Reveal } from "@/components/ui/Reveal";
import { SplitReveal } from "@/components/ui/SplitReveal";
import { ProductCard } from "@/components/shop/ProductCard";

export async function Featured() {
  const t = await getTranslations("featured");
  const tc = await getTranslations("common");
  const productos = await getDestacados(6);
  if (productos.length === 0) return null;

  return (
    <SectionShell id="destacados" className="py-24 md:py-32">
      <header className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <div className="flex flex-col gap-4">
          <Reveal>
            <p className="mm-eyebrow text-mm-green">{t("eyebrow")}</p>
          </Reveal>
          <SplitReveal text={t("title")} className="mm-display text-[length:var(--fs-h2)]" />
          <Reveal delay={0.1}>
            <p className="max-w-md text-mm-text-dim">{t("subtitle")}</p>
          </Reveal>
        </div>
        <Reveal>
          <Link
            href="/tienda"
            className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-mm-text-dim hover:text-mm-text"
            data-cursor="link"
          >
            {tc("viewAll")}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </header>

      {/* Carrusel en móvil (snap), grid en desktop */}
      <Reveal
        stagger
        className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 lg:grid-cols-3 [&::-webkit-scrollbar]:hidden"
      >
        {productos.map((p, i) => (
          <div key={p.id} className="w-[72vw] shrink-0 snap-start xs:w-[60vw] sm:w-[44vw] md:w-auto">
            <ProductCard producto={p} priority={i < 3} />
          </div>
        ))}
      </Reveal>
    </SectionShell>
  );
}
