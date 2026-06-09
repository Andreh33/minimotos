"use client";

import { useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useCart, cartSubtotal } from "@/store/cart";
import { useUI } from "@/store/ui";
import { waLink, site } from "@/lib/site";
import { formatPrice } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";

export function CartDrawer() {
  const t = useTranslations("cart");
  const locale = useLocale();
  const open = useUI((s) => s.cartOpen);
  const close = useUI((s) => s.closeCart);
  const items = useCart((s) => s.items);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const subtotal = cartSubtotal(items);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  function checkout() {
    const lines = items
      .map((i) => `• ${i.nombre} ×${i.qty} — ${formatPrice(i.precio * i.qty, locale)}`)
      .join("\n");
    const msg = `¡Hola ${site.name}! Quiero tramitar este pedido:\n\n${lines}\n\nSubtotal: ${formatPrice(subtotal, locale)}\n\n¿Me confirmáis disponibilidad y forma de pago/recogida?`;
    window.open(waLink(msg), "_blank", "noopener");
  }

  return (
    <div className={cn("fixed inset-0 z-[70]", open ? "" : "pointer-events-none")} aria-hidden={!open}>
      {/* Backdrop */}
      <div
        onClick={close}
        className={cn(
          "absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-[var(--mm-dur)]",
          open ? "opacity-100" : "opacity-0",
        )}
      />
      {/* Panel */}
      <aside
        className={cn(
          "absolute right-0 top-0 flex h-full w-full max-w-[440px] flex-col border-l border-mm-line bg-mm-ink-900 transition-transform duration-[var(--mm-dur-slow)] ease-[var(--ease-power)]",
          open ? "translate-x-0" : "translate-x-full",
        )}
        role="dialog"
        aria-label={t("title")}
      >
        <header className="flex items-center justify-between border-b border-mm-line px-6 py-5">
          <h2 className="mm-display text-2xl">{t("title")}</h2>
          <button onClick={close} aria-label={t("remove")} className="grid h-9 w-9 place-items-center rounded-full hover:bg-white/5">
            <X className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </header>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-5 px-6 text-center">
            <p className="text-mm-text-dim">{t("empty")}</p>
            <Link
              href="/tienda"
              onClick={close}
              className="mm-edge rounded-mm-pill px-5 py-2.5 font-mono text-xs uppercase tracking-widest hover:bg-mm-ink-700"
            >
              {t("emptyCta")}
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-mm-line overflow-y-auto" data-lenis-prevent>
              {items.map((i) => (
                <li key={i.id} className="flex gap-4 px-6 py-4">
                  <div className="grid h-16 w-16 shrink-0 place-items-center rounded-mm-sm border border-mm-line bg-mm-ink-700">
                    <span className="mm-text-spectrum mm-display text-lg">MM</span>
                  </div>
                  <div className="flex flex-1 flex-col">
                    <p className="text-sm leading-snug">{i.nombre}</p>
                    <p className="tnum mt-0.5 text-xs text-mm-text-dim">
                      {formatPrice(i.precio, locale)}
                    </p>
                    <div className="mt-auto flex items-center justify-between">
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

            <footer className="border-t border-mm-line px-6 py-5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-widest text-mm-text-dim">{t("subtotal")}</span>
                <span className="tnum text-xl">{formatPrice(subtotal, locale)}</span>
              </div>
              <button
                onClick={checkout}
                className="mm-edge group relative mt-4 flex h-12 w-full items-center justify-center overflow-hidden rounded-mm-pill font-mono text-xs uppercase tracking-[0.14em] text-black"
              >
                <span aria-hidden className="absolute inset-0 -z-10" style={{ background: "var(--mm-spectrum)" }} />
                {t("checkoutWhatsapp")}
              </button>
              <Link href="/carrito" onClick={close} className="mt-3 block text-center font-mono text-[0.7rem] uppercase tracking-widest text-mm-text-dim hover:text-mm-text">
                {t("continue")}
              </Link>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
