"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

export function LocaleSwitch({ className }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const other = locale === "es" ? "en" : "es";

  return (
    <button
      type="button"
      onClick={() => router.replace(pathname, { locale: other })}
      className={`font-mono text-[0.7rem] uppercase tracking-[0.14em] text-mm-text-dim transition-colors hover:text-mm-text ${className ?? ""}`}
      aria-label={`Switch language to ${other.toUpperCase()}`}
      data-cursor="link"
    >
      <span className="text-mm-text">{locale}</span>
      <span className="px-1 text-mm-text-mute">/</span>
      <span>{other}</span>
    </button>
  );
}
