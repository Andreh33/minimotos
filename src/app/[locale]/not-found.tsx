import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("nav");
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="mm-eyebrow">404</p>
      <h1 className="mm-display text-[length:var(--fs-h1)]">
        <span className="mm-text-spectrum">Sin señal</span>
      </h1>
      <p className="max-w-md text-mm-text-dim">
        La página que buscas se ha salido de la pista.
      </p>
      <Link
        href="/"
        className="mm-edge rounded-mm-pill px-6 py-3 font-mono text-sm uppercase tracking-widest text-mm-text transition-colors hover:bg-mm-ink-700"
      >
        {t("shop")}
      </Link>
    </main>
  );
}
