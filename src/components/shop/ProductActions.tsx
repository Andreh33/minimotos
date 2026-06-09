"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ShoppingBag, MessageCircle, Minus, Plus } from "lucide-react";
import type { Producto } from "@/lib/data/types";
import { VEHICLE_FAMILIES, waLink, site, type FamilySlug } from "@/lib/site";
import { useCart } from "@/store/cart";
import { useUI } from "@/store/ui";
import { formatPrice } from "@/lib/utils/format";

export function ProductActions({ producto }: { producto: Producto }) {
  const t = useTranslations("common");
  const tp = useTranslations("product");
  const locale = useLocale();
  const [qty, setQty] = useState(1);
  const add = useCart((s) => s.add);
  const openCart = useUI((s) => s.openCart);
  const pingCart = useUI((s) => s.pingCart);

  const isVehicle = VEHICLE_FAMILIES.includes(producto.categoriaSlug as FamilySlug);
  const price = producto.precioOferta ?? producto.precio;
  const soldOut = producto.estado === "agotado" || producto.stock <= 0;

  function handleAdd() {
    add(
      {
        id: producto.id,
        slug: producto.slug,
        nombre: producto.nombre,
        precio: price,
        family: producto.categoriaSlug,
        energy: producto.tipoEnergia,
      },
      qty,
    );
    pingCart();
    openCart();
  }

  const waMsg = `¡Hola ${site.name}! Me interesa: ${producto.nombre} (${formatPrice(price, locale)}). ¿Disponibilidad, financiación y recogida?`;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-baseline gap-3">
        <span className="tnum text-3xl">{formatPrice(price, locale)}</span>
        {producto.precioOferta && (
          <span className="tnum text-base text-mm-text-mute line-through">
            {formatPrice(producto.precio, locale)}
          </span>
        )}
      </div>

      {isVehicle ? (
        <>
          <a
            href={waLink(waMsg)}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex h-14 items-center justify-center gap-2 overflow-hidden rounded-mm-pill border border-mm-green/40 bg-mm-green/10 px-8 font-mono text-sm uppercase tracking-[0.14em] text-mm-green transition-colors hover:bg-mm-green/20"
            data-cursor="link"
          >
            <MessageCircle className="h-5 w-5" />
            {t("askWhatsapp")}
          </a>
          <p className="text-sm text-mm-text-dim">{tp("vehicleNotice")}</p>
        </>
      ) : (
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex h-14 items-center gap-3 rounded-mm-pill border border-mm-line px-4">
            <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="-" className="text-mm-text-dim hover:text-mm-text">
              <Minus className="h-4 w-4" />
            </button>
            <span className="tnum w-6 text-center">{qty}</span>
            <button onClick={() => setQty((q) => q + 1)} aria-label="+" className="text-mm-text-dim hover:text-mm-text">
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <button
            onClick={handleAdd}
            disabled={soldOut}
            className="group relative inline-flex h-14 flex-1 items-center justify-center gap-2 overflow-hidden rounded-mm-pill px-8 font-mono text-sm uppercase tracking-[0.14em] text-black disabled:opacity-40"
            data-cursor="link"
          >
            <span aria-hidden className="absolute inset-0 -z-10" style={{ background: "var(--mm-spectrum)" }} />
            <ShoppingBag className="h-5 w-5" />
            {soldOut ? t("soldOut") : t("addToCart")}
          </button>
        </div>
      )}

      <p className="font-mono text-[0.65rem] uppercase tracking-widest text-mm-text-mute">
        {tp("pickup")}
      </p>
    </div>
  );
}
