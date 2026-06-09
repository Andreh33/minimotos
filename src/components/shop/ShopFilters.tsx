"use client";

import { useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { X } from "lucide-react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { families } from "@/lib/site";
import { Chip } from "@/components/ui/Chip";

export function ShopFilters() {
  const t = useTranslations("shop");
  const tf = useTranslations("families");
  const tc = useTranslations("common");
  const sp = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [pending, start] = useTransition();

  const family = sp.get("family") ?? "";
  const energy = sp.get("energy") ?? "";
  const sort = sp.get("sort") ?? "relevance";

  function update(next: Record<string, string | null>) {
    const params = new URLSearchParams(sp.toString());
    for (const [k, v] of Object.entries(next)) {
      if (v) params.set(k, v);
      else params.delete(k);
    }
    start(() => {
      router.replace(`${pathname}?${params.toString()}` as never, { scroll: false });
    });
  }

  const hasFilters = family || energy || (sort && sort !== "relevance");

  return (
    <div
      className={`sticky top-16 z-30 -mx-6 border-y border-mm-line bg-mm-black/80 px-6 py-4 backdrop-blur-xl md:top-20 md:px-12 ${pending ? "opacity-70" : ""}`}
    >
      <div className="mx-auto flex max-w-[1400px] flex-col gap-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden">
          <Chip active={!family} onClick={() => update({ family: null })}>
            {tc("viewAll")}
          </Chip>
          {families.map((f) => (
            <Chip key={f.slug} active={family === f.slug} onClick={() => update({ family: f.slug })}>
              {tf(f.key)}
            </Chip>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[0.6rem] uppercase tracking-widest text-mm-text-mute">
              {t("energy")}
            </span>
            <Chip active={energy === "gasolina"} onClick={() => update({ energy: energy === "gasolina" ? null : "gasolina" })}>
              {tc("gasoline")}
            </Chip>
            <Chip active={energy === "electrica"} onClick={() => update({ energy: energy === "electrica" ? null : "electrica" })}>
              {tc("electric")}
            </Chip>
          </div>

          <div className="flex items-center gap-3">
            {hasFilters && (
              <button
                onClick={() => update({ family: null, energy: null, sort: null })}
                className="inline-flex items-center gap-1 font-mono text-[0.65rem] uppercase tracking-widest text-mm-text-mute hover:text-mm-danger"
              >
                <X className="h-3 w-3" /> {t("clear")}
              </button>
            )}
            <label className="flex items-center gap-2">
              <span className="font-mono text-[0.6rem] uppercase tracking-widest text-mm-text-mute">
                {t("sort")}
              </span>
              <select
                value={sort}
                onChange={(e) => update({ sort: e.target.value === "relevance" ? null : e.target.value })}
                className="rounded-mm-sm border border-mm-line bg-mm-ink-800 px-3 py-1.5 font-mono text-xs text-mm-text focus:border-mm-cyan/60 focus:outline-none"
              >
                <option value="relevance">{t("sortRelevance")}</option>
                <option value="price-asc">{t("sortPriceAsc")}</option>
                <option value="price-desc">{t("sortPriceDesc")}</option>
                <option value="newest">{t("sortNewest")}</option>
              </select>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
