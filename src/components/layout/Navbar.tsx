"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { ShoppingBag, Menu } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { families } from "@/lib/site";
import { useCart, cartCount } from "@/store/cart";
import { useUI } from "@/store/ui";
import { gsap } from "@/lib/motion/gsap";
import { Logo } from "./Logo";
import { LocaleSwitch } from "./LocaleSwitch";
import { cn } from "@/lib/utils/cn";

const NAV = [
  { href: "/tienda", key: "shop" },
  { href: "/servicios", key: "services" },
  { href: "/nosotros", key: "about" },
  { href: "/contacto", key: "contact" },
] as const;

export function Navbar() {
  const t = useTranslations("nav");
  const tf = useTranslations("families");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mega, setMega] = useState(false);
  const [mounted, setMounted] = useState(false);

  const items = useCart((s) => s.items);
  const openCart = useUI((s) => s.openCart);
  const toggleMenu = useUI((s) => s.toggleMenu);
  const cartPing = useUI((s) => s.cartPing);
  const count = cartCount(items);
  const cartBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => setMounted(true), []);

  // Blip al añadir al carrito (firma §8)
  useEffect(() => {
    if (cartPing === 0 || !cartBtn.current) return;
    gsap.fromTo(
      cartBtn.current,
      { scale: 0.82 },
      { scale: 1, duration: 0.5, ease: "elastic.out(1, 0.4)" },
    );
  }, [cartPing]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-[var(--mm-dur)]",
        scrolled
          ? "border-b border-mm-line bg-mm-black/70 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
      onMouseLeave={() => setMega(false)}
    >
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6 md:h-20 md:px-12">
        <Link href="/" className="relative z-10" data-cursor="link" aria-label="Mini Motos — inicio">
          <Logo />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          <button
            type="button"
            onMouseEnter={() => setMega(true)}
            onClick={() => setMega((v) => !v)}
            aria-expanded={mega}
            className={cn(
              "rounded-mm-pill px-4 py-2 font-mono text-[0.72rem] uppercase tracking-[0.14em] transition-colors",
              mega ? "text-mm-cyan" : "text-mm-text-dim hover:text-mm-text",
            )}
            data-cursor="link"
          >
            {t("families")}
          </button>
          {NAV.map((n) => {
            const active = pathname === n.href;
            return (
              <Link
                key={n.href}
                href={n.href}
                onMouseEnter={() => setMega(false)}
                className={cn(
                  "rounded-mm-pill px-4 py-2 font-mono text-[0.72rem] uppercase tracking-[0.14em] transition-colors",
                  active ? "text-mm-text" : "text-mm-text-dim hover:text-mm-text",
                )}
                data-cursor="link"
              >
                {t(n.key)}
              </Link>
            );
          })}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-3 md:gap-5">
          <LocaleSwitch className="hidden sm:block" />
          <button
            ref={cartBtn}
            type="button"
            onClick={openCart}
            className="relative grid h-10 w-10 place-items-center rounded-full transition-colors hover:bg-white/5"
            aria-label={t("cart")}
            data-cursor="link"
          >
            <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
            {mounted && count > 0 && (
              <span className="tnum absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-mm-magenta px-1 text-[0.6rem] font-bold text-white">
                {count}
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={toggleMenu}
            className="grid h-10 w-10 place-items-center rounded-full transition-colors hover:bg-white/5 lg:hidden"
            aria-label={t("openMenu")}
            data-cursor="link"
          >
            <Menu className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Megamenú familias */}
      <div
        className={cn(
          "absolute inset-x-0 top-full hidden origin-top overflow-hidden border-b border-mm-line bg-mm-black/90 backdrop-blur-2xl transition-[max-height,opacity] duration-[var(--mm-dur)] lg:block",
          mega ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0",
        )}
        onMouseEnter={() => setMega(true)}
      >
        <div className="mx-auto grid max-w-[1400px] grid-cols-4 gap-px bg-mm-line px-6 py-px md:px-12">
          {families.map((f) => (
            <Link
              key={f.slug}
              href={{ pathname: "/tienda", query: { family: f.slug } }}
              onClick={() => setMega(false)}
              className="group flex flex-col gap-1 bg-mm-black px-5 py-6 transition-colors hover:bg-mm-ink-800"
              data-cursor="link"
            >
              <span className="mm-display text-xl transition-transform duration-[var(--mm-dur)] group-hover:translate-x-1">
                {tf(f.key)}
              </span>
              {f.energy === "both" && (
                <span className="font-mono text-[0.6rem] uppercase tracking-widest text-mm-text-mute">
                  gasolina · eléctrica
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
