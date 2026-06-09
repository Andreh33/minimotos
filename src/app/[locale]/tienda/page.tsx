import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { getProductos } from "@/lib/data/products";
import type { Energia, ProductFilters } from "@/lib/data/types";
import { ShopFilters } from "@/components/shop/ShopFilters";
import { ProductCard } from "@/components/shop/ProductCard";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "shop" });
  return { title: t("title") };
}

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function ShopPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: SearchParams;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const sp = await searchParams;
  const t = await getTranslations("shop");

  const str = (v: string | string[] | undefined) =>
    Array.isArray(v) ? v[0] : v;

  const filters: ProductFilters = {
    family: str(sp.family),
    energy: str(sp.energy) as Energia | undefined,
    sort: (str(sp.sort) as ProductFilters["sort"]) ?? "relevance",
    search: str(sp.q),
  };

  const productos = await getProductos(filters);

  return (
    <main className="pt-24 md:pt-28">
      <header className="mx-auto max-w-[1400px] px-6 pb-8 md:px-12">
        <p className="mm-eyebrow text-mm-cyan">// Catálogo</p>
        <h1 className="mm-display mt-4 text-[length:var(--fs-h1)]">{t("title")}</h1>
        <p className="tnum mt-3 text-sm text-mm-text-dim">
          {t("results", { count: productos.length })}
        </p>
      </header>

      <ShopFilters />

      <div className="mx-auto max-w-[1400px] px-6 py-10 md:px-12">
        {productos.length === 0 ? (
          <div className="grid place-items-center py-32 text-center">
            <p className="text-mm-text-dim">{t("empty")}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
            {productos.map((p, i) => (
              <ProductCard key={p.id} producto={p} priority={i < 4} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
