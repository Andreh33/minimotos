"use client";

import { useLocale, useTranslations } from "next-intl";
import { ShoppingBag, MessageCircle } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Producto } from "@/lib/data/types";
import { VEHICLE_FAMILIES, waLink, site, type FamilySlug } from "@/lib/site";
import { useCart } from "@/store/cart";
import { useUI } from "@/store/ui";
import { formatPrice } from "@/lib/utils/format";
import { ProductImage } from "./ProductImage";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils/cn";

/* Esquina recortada (angular) */
const CLIP = "polygon(0 0, 100% 0, 100% 100%, 22px 100%, 0 calc(100% - 22px))";

export function ProductCard({ producto, priority }: { producto: Producto; priority?: boolean }) {
  const t = useTranslations("common");
  const locale = useLocale();
  const add = useCart((s) => s.add);
  const openCart = useUI((s) => s.openCart);
  const pingCart = useUI((s) => s.pingCart);

  const isVehicle = VEHICLE_FAMILIES.includes(producto.categoriaSlug as FamilySlug);
  const price = producto.precioOferta ?? producto.precio;
  const soldOut = producto.estado === "agotado" || producto.stock <= 0;

  const specs = [
    producto.cilindradaCc ? `${producto.cilindradaCc}cc` : null,
    producto.potenciaW ? `${producto.potenciaW}W` : null,
    producto.velocidadMax ? `${producto.velocidadMax} km/h` : null,
    producto.edadMin ? `+${producto.edadMin}` : null,
  ].filter(Boolean);

  function handleAdd() {
    add({
      id: producto.id,
      slug: producto.slug,
      nombre: producto.nombre,
      precio: price,
      family: producto.categoriaSlug,
      energy: producto.tipoEnergia,
    });
    pingCart();
    openCart();
  }

  const waMsg = `¡Hola ${site.name}! Me interesa: ${producto.nombre}. ¿Disponibilidad, financiación y recogida?`;

  return (
    <article
      className="group relative flex flex-col border border-mm-line bg-mm-ink-700 transition-colors duration-[var(--mm-dur)] hover:border-mm-line-strong"
      style={{ clipPath: CLIP }}
    >
      <Link
        href={{ pathname: `/tienda/${producto.slug}` }}
        className="relative block aspect-[4/5] overflow-hidden"
        data-cursor="view"
      >
        <div className="absolute inset-0 transition-transform duration-[var(--mm-dur-slow)] ease-[var(--ease-power)] group-hover:scale-[1.06]">
          <ProductImage producto={producto} priority={priority} />
        </div>
        <div className="absolute left-3 top-3 flex gap-1.5">
          {producto.estado === "nuevo" && <Badge tone="new">{t("new")}</Badge>}
          {producto.precioOferta && (
            <Badge tone="offer">
              -{Math.round((1 - producto.precioOferta / producto.precio) * 100)}%
            </Badge>
          )}
          {soldOut && <Badge tone="soldout">{t("soldOut")}</Badge>}
        </div>
        {producto.tipoEnergia !== "na" && (
          <span className="absolute right-3 top-3">
            <Badge tone="energy">{producto.tipoEnergia === "electrica" ? t("electric") : t("gasoline")}</Badge>
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <Link href={{ pathname: `/tienda/${producto.slug}` }} className="block">
          <h3 className="text-sm leading-snug transition-colors group-hover:text-mm-cyan">
            {producto.nombre}
          </h3>
        </Link>

        {specs.length > 0 && (
          <p className="tnum mt-1.5 text-[0.7rem] text-mm-text-mute">{specs.join(" · ")}</p>
        )}

        <div className="mt-3 flex items-end justify-between gap-2">
          <div className="flex items-baseline gap-2">
            <span className="tnum text-base">{formatPrice(price, locale)}</span>
            {producto.precioOferta && (
              <span className="tnum text-xs text-mm-text-mute line-through">
                {formatPrice(producto.precio, locale)}
              </span>
            )}
          </div>

          {isVehicle ? (
            <a
              href={waLink(waMsg)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("askWhatsapp")}
              className="grid h-9 w-9 place-items-center rounded-mm-sm border border-mm-line text-mm-text-dim transition-colors hover:border-mm-green/50 hover:text-mm-green"
              data-cursor="link"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
          ) : (
            <button
              type="button"
              onClick={handleAdd}
              disabled={soldOut}
              aria-label={t("addToCart")}
              className={cn(
                "grid h-9 w-9 place-items-center rounded-mm-sm border border-mm-line text-mm-text-dim transition-colors hover:border-mm-cyan/50 hover:text-mm-cyan disabled:opacity-40",
              )}
              data-cursor="link"
            >
              <ShoppingBag className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
