import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { ChevronRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getProducto, getRelacionados } from "@/lib/data/products";
import { ProductImage } from "@/components/shop/ProductImage";
import { ProductActions } from "@/components/shop/ProductActions";
import { ProductCard } from "@/components/shop/ProductCard";
import { Badge } from "@/components/ui/Badge";
import { SectionShell } from "@/components/ui/SectionShell";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = await getProducto(slug);
  if (!p) return {};
  return {
    title: p.nombre,
    description: p.descripcion,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const producto = await getProducto(slug);
  if (!producto) notFound();

  const t = await getTranslations("product");
  const tc = await getTranslations("common");
  const tn = await getTranslations("nav");
  const relacionados = await getRelacionados(slug, 4);

  const specs: { label: string; value: string }[] = [
    producto.cilindradaCc ? { label: t("displacement"), value: `${producto.cilindradaCc} cc` } : null,
    producto.potenciaW ? { label: t("power"), value: `${producto.potenciaW} W` } : null,
    producto.velocidadMax ? { label: t("topSpeed"), value: `${producto.velocidadMax} km/h` } : null,
    producto.autonomiaKm ? { label: t("range"), value: `${producto.autonomiaKm} km` } : null,
    producto.edadMin ? { label: t("ageMin"), value: `+${producto.edadMin}` } : null,
    ...Object.entries(producto.especificaciones).map(([k, v]) => ({ label: k, value: String(v) })),
  ].filter(Boolean) as { label: string; value: string }[];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: producto.nombre,
    description: producto.descripcion,
    category: producto.categoriaSlug,
    ...(producto.marca ? { brand: { "@type": "Brand", name: producto.marca } } : {}),
    offers: {
      "@type": "Offer",
      price: producto.precioOferta ?? producto.precio,
      priceCurrency: "EUR",
      availability:
        producto.estado === "agotado" || producto.stock <= 0
          ? "https://schema.org/OutOfStock"
          : "https://schema.org/InStock",
    },
  };

  return (
    <main className="pt-24 md:pt-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 font-mono text-[0.65rem] uppercase tracking-widest text-mm-text-mute">
          <Link href="/tienda" className="hover:text-mm-text">{tn("shop")}</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-mm-text-dim">{producto.nombre}</span>
        </nav>

        <div className="mt-6 grid gap-10 md:grid-cols-2 md:gap-16">
          {/* Galería */}
          <div className="relative aspect-[4/5] overflow-hidden rounded-mm-md border border-mm-line">
            <ProductImage producto={producto} sizes="(max-width:768px) 100vw, 50vw" priority />
            <div className="absolute left-4 top-4 flex gap-2">
              {producto.estado === "nuevo" && <Badge tone="new">{tc("new")}</Badge>}
              {producto.precioOferta && (
                <Badge tone="offer">
                  -{Math.round((1 - producto.precioOferta / producto.precio) * 100)}%
                </Badge>
              )}
              {producto.tipoEnergia !== "na" && (
                <Badge tone="energy">
                  {producto.tipoEnergia === "electrica" ? tc("electric") : tc("gasoline")}
                </Badge>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col gap-7">
            <div>
              <h1 className="mm-display text-[length:var(--fs-h3)] leading-tight">
                {producto.nombre}
              </h1>
              {producto.placeholder && (
                <p className="mt-2 font-mono text-[0.6rem] uppercase tracking-widest text-mm-text-mute">
                  {tc("placeholderNotice")}
                </p>
              )}
            </div>

            <ProductActions producto={producto} />

            <p className="text-mm-text-dim">{producto.descripcion}</p>

            {specs.length > 0 && (
              <div>
                <h2 className="font-mono text-xs uppercase tracking-widest text-mm-text-mute">
                  {t("specs")}
                </h2>
                <dl className="mt-3 divide-y divide-mm-line border-y border-mm-line">
                  {specs.map((s) => (
                    <div key={s.label} className="flex justify-between gap-4 py-2.5">
                      <dt className="text-sm text-mm-text-dim">{s.label}</dt>
                      <dd className="tnum text-sm">{s.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Relacionados */}
      {relacionados.length > 0 && (
        <SectionShell className="py-20 md:py-28">
          <h2 className="mm-display mb-8 text-[length:var(--fs-h3)]">{t("related")}</h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {relacionados.map((p) => (
              <ProductCard key={p.id} producto={p} />
            ))}
          </div>
        </SectionShell>
      )}
    </main>
  );
}
