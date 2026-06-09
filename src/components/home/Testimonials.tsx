import { getTranslations } from "next-intl/server";
import { Quote } from "lucide-react";
import { SectionShell } from "@/components/ui/SectionShell";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Testimonios — VACÍO / PLACEHOLDER explícito. Prohibido inventar reseñas (Ley 2).
 * Sustituir cuando el cliente facilite reseñas reales.
 */
export async function Testimonials() {
  const t = await getTranslations("testimonials");

  return (
    <SectionShell className="py-24 md:py-32">
      <header className="mb-12 flex flex-col gap-4">
        <Reveal>
          <p className="mm-eyebrow">{t("eyebrow")}</p>
        </Reveal>
        <Reveal>
          <h2 className="mm-display text-[length:var(--fs-h2)]">{t("title")}</h2>
        </Reveal>
      </header>

      <Reveal stagger className="grid gap-3 md:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="flex flex-col gap-4 rounded-mm-md border border-dashed border-mm-line p-6"
          >
            <Quote className="h-6 w-6 text-mm-text-mute" />
            <div className="space-y-2">
              <span className="block h-2.5 w-3/4 rounded-full bg-white/5" />
              <span className="block h-2.5 w-full rounded-full bg-white/5" />
              <span className="block h-2.5 w-2/3 rounded-full bg-white/5" />
            </div>
            <span className="mt-auto font-mono text-[0.6rem] uppercase tracking-widest text-mm-text-mute">
              TODO:RESEÑA-REAL
            </span>
          </div>
        ))}
      </Reveal>

      <Reveal>
        <p className="mt-8 text-center text-sm text-mm-text-dim">{t("empty")}</p>
      </Reveal>
    </SectionShell>
  );
}
