import { setRequestLocale } from "next-intl/server";
import { getDestacados } from "@/lib/data/products";
import { Preloader } from "@/components/home/Preloader";
import { Hero } from "@/components/home/Hero";
import { TickerBand } from "@/components/home/TickerBand";
import { Families } from "@/components/home/Families";
import { Featured } from "@/components/home/Featured";
import { Panels } from "@/components/home/Panels";
import { Signature } from "@/components/home/Signature";
import { TikTokFeed } from "@/components/home/TikTokFeed";
import { Testimonials } from "@/components/home/Testimonials";
import { Location } from "@/components/home/Location";
import { Newsletter } from "@/components/home/Newsletter";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const destacados = await getDestacados(8);

  return (
    <>
      <Preloader />
      <Hero />
      <TickerBand />
      <Families />
      <Featured />
      <Panels />
      <Signature productos={destacados} />
      <TikTokFeed />
      <Testimonials />
      <Location />
      <Newsletter />
    </>
  );
}
