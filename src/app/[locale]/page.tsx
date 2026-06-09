import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("hero");

  return (
    <main id="contenido" className="relative min-h-[200vh]">
      <section className="flex min-h-screen flex-col justify-center px-6 md:px-12">
        <p className="mm-eyebrow mb-6">{t("eyebrow")}</p>
        <h1 className="mm-display mm-display-skew text-[length:var(--fs-hero)]">
          <span className="mm-text-chrome">Mini</span>
          <span className="mm-text-spectrum">motos</span>
        </h1>
        <p className="mt-6 max-w-xl text-mm-text-dim">{t("subtitle")}</p>
        <p className="mt-10 mm-eyebrow">{t("eyebrow")} · B0 OK</p>
      </section>
      <section className="flex min-h-screen items-center justify-center">
        <p className="tnum text-mm-text-mute">scroll · Lenis activo</p>
      </section>
    </main>
  );
}
