import { getTranslations } from "next-intl/server";
import { Marquee } from "@/components/ui/Marquee";

export async function TickerBand() {
  const t = await getTranslations("marquee");
  const text = t("items");
  return (
    <div className="relative border-y border-mm-line bg-mm-ink-900 py-5">
      <Marquee text={text} speed={32} angle={-3} />
      <Marquee text={text} speed={44} angle={-3} reverse spectrum />
    </div>
  );
}
