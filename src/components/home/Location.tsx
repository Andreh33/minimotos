"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { MapPin, Phone, MessageCircle, Navigation } from "lucide-react";
import { SectionShell } from "@/components/ui/SectionShell";
import { site, horarioLabel, isOpenAt, waLink } from "@/lib/site";

const StoreMap = dynamic(() => import("./StoreMap"), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse bg-mm-ink-800" />,
});

export function Location() {
  const t = useTranslations("location");
  const tc = useTranslations("common");
  const locale = useLocale();
  const [open, setOpen] = useState<boolean | null>(null);

  useEffect(() => {
    setOpen(isOpenAt(new Date()));
  }, []);

  const directions = `https://www.google.com/maps/dir/?api=1&destination=${site.geo.lat},${site.geo.lng}`;
  const schedule = horarioLabel[locale === "en" ? "en" : "es"];

  return (
    <SectionShell id="localizacion" className="py-24 md:py-32">
      <div className="grid gap-6 overflow-hidden rounded-mm-md border border-mm-line md:grid-cols-2">
        {/* Info */}
        <div className="flex flex-col gap-6 p-8 md:p-12">
          <p className="mm-eyebrow text-mm-cyan">{t("eyebrow")}</p>
          <h2 className="mm-display text-[length:var(--fs-h3)]">{t("title")}</h2>

          <div className="flex items-start gap-3">
            <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-mm-text-dim" strokeWidth={1.5} />
            <p className="text-mm-text">{t("address")}</p>
          </div>

          {/* Horario + estado */}
          <div>
            <div className="flex items-center gap-3">
              <h3 className="font-mono text-xs uppercase tracking-widest text-mm-text-mute">
                {t("schedule")}
              </h3>
              {open !== null && (
                <span
                  className={`inline-flex items-center gap-1.5 rounded-mm-xs border px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-widest ${
                    open
                      ? "border-mm-green/40 bg-mm-green/15 text-mm-green"
                      : "border-mm-line bg-white/5 text-mm-text-mute"
                  }`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${open ? "bg-mm-green" : "bg-mm-text-mute"}`} />
                  {open ? tc("open") : tc("closed")}
                </span>
              )}
            </div>
            <ul className="mt-3 space-y-1">
              {schedule.map((row) => (
                <li key={row.d} className="flex justify-between gap-6 text-sm text-mm-text-dim">
                  <span>{row.d}</span>
                  <span className="tnum">{row.h}</span>
                </li>
              ))}
            </ul>
            <p className="mt-2 font-mono text-[0.55rem] uppercase tracking-widest text-mm-text-mute">
              TODO:DATO-REAL — horario por confirmar
            </p>
          </div>

          <div className="mt-auto flex flex-wrap gap-3">
            <a
              href={waLink(`¡Hola ${site.name}!`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-mm-pill border border-mm-green/40 bg-mm-green/10 px-4 py-2 font-mono text-xs uppercase tracking-widest text-mm-green"
              data-cursor="link"
            >
              <MessageCircle className="h-4 w-4" /> {t("whatsapp")}
            </a>
            <a
              href={`tel:${site.phone}`}
              className="mm-edge inline-flex items-center gap-2 rounded-mm-pill px-4 py-2 font-mono text-xs uppercase tracking-widest hover:bg-mm-ink-700"
              data-cursor="link"
            >
              <Phone className="h-4 w-4" /> {t("call")}
            </a>
            <a
              href={directions}
              target="_blank"
              rel="noopener noreferrer"
              className="mm-edge inline-flex items-center gap-2 rounded-mm-pill px-4 py-2 font-mono text-xs uppercase tracking-widest hover:bg-mm-ink-700"
              data-cursor="link"
            >
              <Navigation className="h-4 w-4" /> {t("directions")}
            </a>
          </div>
        </div>

        {/* Mapa */}
        <div className="relative min-h-[320px] md:min-h-[460px]">
          <StoreMap />
        </div>
      </div>
    </SectionShell>
  );
}
