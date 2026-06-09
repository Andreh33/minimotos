import { setRequestLocale, getTranslations } from "next-intl/server";
import { CartView } from "@/components/shop/CartView";

export default async function CartPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("cart");

  return (
    <main className="mx-auto min-h-[60vh] max-w-[1400px] px-6 pb-24 pt-24 md:px-12 md:pt-28">
      <h1 className="mm-display mb-10 text-[length:var(--fs-h1)]">{t("title")}</h1>
      <CartView />
    </main>
  );
}
