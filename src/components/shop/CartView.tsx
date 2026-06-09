"use client";

import { useLocale, useTranslations } from "next-intl";
import { Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useCart, cartSubtotal } from "@/store/cart";
import { waLink, site } from "@/lib/site";
import { formatPrice } from "@/lib/utils/format";
import { ProductImage } from "./ProductImage";
import type { Producto } from "@/lib/data/types";

export function CartView() {
  const t = useTranslations("cart");
  const locale = useLocale();
  const items = useCart((s) => s.items);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const subtotal = cartSubtotal(items);

  function checkout() {
    const lines = items
      .map((i) => `• ${i.nombre} ×${i.qty} — ${formatPrice(i.precio * i.qty, locale)}`)
      .join("\n");
    const msg = `¡Hola ${site.name}! Quiero tramitar este pedido:\n\n${lines}\n\nSubtotal: ${formatPrice(subtotal, locale)}\n\n¿Me confirmáis disponibilidad y forma de pago/recogida?`;
    window.open(waLink(msg), "_blank", "noopener");
  }

  if (items.length === 0) {
    return (
      <div className="grid place-items-center gap-5 py-32 text-center">
        <p className="text-mm-text-dim">{t("empty")}</p>
        <Link
          href="/tienda"
          className="mm-edge rounded-mm-pill px-6 py-3 font-mono text-xs uppercase tracking-widest hover:bg-mm-ink-700"
        >
          {t("emptyCta")}
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
      <ul className="divide-y divide-mm-line border-y border-mm-line">
        {items.map((i) => (
          <li key={i.id} className="flex gap-4 py-5">
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-mm-sm border border-mm-line">
              <ProductImage
                producto={{
                  imagenes: [],
                  tipoEnergia: (i.energy as Producto["tipoEnergia"]) ?? "na",
                  placeholder: true,
                  nombre: i.nombre,
                }}
                sizes="96px"
              />
            </div>
            <div className="flex flex-1 flex-col">
              <Link href={{ pathname: `/tienda/${i.slug}` }} className="text-sm hover:text-mm-cyan">
                {i.nombre}
              </Link>
              <p className="tnum mt-1 text-xs text-mm-text-dim">{formatPrice(i.precio, locale)}</p>
              <div className="mt-auto flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <button onClick={() => setQty(i.id, i.qty - 1)} aria-label="-" className="grid h-7 w-7 place-items-center rounded-mm-xs border border-mm-line hover:bg-white/5">
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="tnum w-6 text-center text-sm">{i.qty}</span>
                  <button onClick={() => setQty(i.id, i.qty + 1)} aria-label="+" className="grid h-7 w-7 place-items-center rounded-mm-xs border border-mm-line hover:bg-white/5">
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
                <button onClick={() => remove(i.id)} aria-label={t("remove")} className="text-mm-text-mute hover:text-mm-danger">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <span className="tnum text-sm">{formatPrice(i.precio * i.qty, locale)}</span>
          </li>
        ))}
      </ul>

      <aside className="h-fit rounded-mm-md border border-mm-line bg-mm-ink-800 p-6 lg:sticky lg:top-28">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-widest text-mm-text-dim">{t("subtotal")}</span>
          <span className="tnum text-2xl">{formatPrice(subtotal, locale)}</span>
        </div>
        <button
          onClick={checkout}
          className="group relative mt-6 flex h-14 w-full items-center justify-center gap-2 overflow-hidden rounded-mm-pill font-mono text-sm uppercase tracking-[0.14em] text-black"
        >
          <span aria-hidden className="absolute inset-0 -z-10" style={{ background: "var(--mm-spectrum)" }} />
          {t("checkoutWhatsapp")}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
        <Link href="/tienda" className="mt-4 block text-center font-mono text-[0.7rem] uppercase tracking-widest text-mm-text-dim hover:text-mm-text">
          {t("continue")}
        </Link>
      </aside>
    </div>
  );
}
