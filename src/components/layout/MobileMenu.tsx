"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { X } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { families } from "@/lib/site";
import { useUI } from "@/store/ui";
import { Marquee } from "@/components/ui/Marquee";
import { LocaleSwitch } from "./LocaleSwitch";
import { cn } from "@/lib/utils/cn";

const NAV = [
  { href: "/tienda", key: "shop" },
  { href: "/servicios", key: "services" },
  { href: "/nosotros", key: "about" },
  { href: "/contacto", key: "contact" },
] as const;

export function MobileMenu() {
  const t = useTranslations("nav");
  const tf = useTranslations("families");
  const open = useUI((s) => s.menuOpen);
  const close = useUI((s) => s.closeMenu);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-[60] lg:hidden",
        open ? "pointer-events-auto" : "pointer-events-none",
      )}
      aria-hidden={!open}
    >
      <div
        className={cn(
          "absolute inset-0 bg-mm-black transition-opacity duration-[var(--mm-dur)]",
          open ? "opacity-100" : "opacity-0",
        )}
      >
        {/* Marquee de fondo */}
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-center gap-8 opacity-[0.06]">
          <Marquee text="MINIMOTOS ✦ QUADS ✦ PIT BIKES ✦" speed={30} />
          <Marquee text="VENTA ✦ TALLER ✦ CIUDAD REAL ✦" speed={36} reverse />
        </div>

        <div
          className={cn(
            "relative flex h-full flex-col px-6 pb-10 pt-6 transition-transform duration-[var(--mm-dur-slow)] ease-[var(--ease-power)]",
            open ? "translate-y-0" : "-translate-y-4",
          )}
        >
          <div className="flex items-center justify-between">
            <LocaleSwitch />
            <button
              type="button"
              onClick={close}
              className="grid h-10 w-10 place-items-center rounded-full hover:bg-white/5"
              aria-label={t("close")}
            >
              <X className="h-6 w-6" strokeWidth={1.5} />
            </button>
          </div>

          <nav className="mt-10 flex flex-col gap-1">
            {NAV.map((n, i) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={close}
                className="mm-display border-b border-mm-line py-3 text-[12vw] leading-none xs:text-5xl"
                style={{ transitionDelay: `${i * 40}ms` }}
              >
                {t(n.key)}
              </Link>
            ))}
          </nav>

          <p className="mm-eyebrow mt-8">{t("families")}</p>
          <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2">
            {families.map((f) => (
              <Link
                key={f.slug}
                href={{ pathname: "/tienda", query: { family: f.slug } }}
                onClick={close}
                className="py-1 font-mono text-sm text-mm-text-dim hover:text-mm-cyan"
              >
                {tf(f.key)}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
