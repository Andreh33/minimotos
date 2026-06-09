"use client";

import { useActionState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { subscribeNewsletter, type NewsletterState } from "@/app/actions/newsletter";
import { Marquee } from "@/components/ui/Marquee";

const initial: NewsletterState = { ok: false };

export function Newsletter() {
  const t = useTranslations("newsletter");
  const tc = useTranslations("common");
  const locale = useLocale();
  const [state, formAction, pending] = useActionState(subscribeNewsletter, initial);

  return (
    <section className="relative overflow-hidden border-t border-mm-line py-24 md:py-36">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04]">
        <Marquee text="ÚNETE ✦ JOIN ✦ MINIMOTOS ✦" speed={50} angle={-3} spectrum />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20"
        style={{
          background:
            "radial-gradient(80% 60% at 50% 120%, rgba(122,43,255,0.18), transparent 60%)",
        }}
      />

      <div className="mx-auto flex max-w-2xl flex-col items-center px-6 text-center">
        <p className="mm-eyebrow text-mm-violet">{t("eyebrow")}</p>
        <h2 className="mm-display mt-5 text-[length:var(--fs-h1)] leading-[0.9]">{t("title")}</h2>

        {state.ok ? (
          <p className="mt-8 font-mono text-sm uppercase tracking-widest text-mm-green">
            {t("success")}
          </p>
        ) : (
          <form action={formAction} className="mt-8 flex w-full max-w-md flex-col gap-3 sm:flex-row">
            <input type="hidden" name="locale" value={locale} />
            <input
              type="email"
              name="email"
              required
              placeholder={t("placeholder")}
              aria-label={t("placeholder")}
              className="h-12 flex-1 rounded-mm-pill border border-mm-line bg-mm-ink-800 px-5 text-sm text-mm-text placeholder:text-mm-text-mute focus:border-mm-cyan/60 focus:outline-none"
            />
            <button
              type="submit"
              disabled={pending}
              className="group relative inline-flex h-12 items-center justify-center gap-2 overflow-hidden rounded-mm-pill px-6 font-mono text-xs uppercase tracking-[0.14em] text-black disabled:opacity-60"
            >
              <span aria-hidden className="absolute inset-0 -z-10" style={{ background: "var(--mm-spectrum)" }} />
              {pending ? tc("loading") : t("submit")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </form>
        )}
        {state.error && (
          <p className="mt-3 font-mono text-xs text-mm-danger">{t("error")}</p>
        )}
      </div>
    </section>
  );
}
