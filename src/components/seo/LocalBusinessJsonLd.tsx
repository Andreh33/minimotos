import { site, horario } from "@/lib/site";

const DAY_NAMES: Record<number, string> = {
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
  0: "Sunday",
};

export function LocalBusinessJsonLd() {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://minimotos.example";

  const openingHours = Object.entries(horario).flatMap(([day, tramos]) =>
    tramos.map((tr) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: DAY_NAMES[Number(day)],
      opens: tr.open,
      closes: tr.close,
    })),
  );

  const data = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: site.name,
    legalName: site.legalName,
    url: base,
    email: site.email,
    image: `${base}/opengraph-image`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Avenida de Valdepeñas",
      addressLocality: "Ciudad Real",
      postalCode: "13004",
      addressCountry: "ES",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.lat,
      longitude: site.geo.lng,
    },
    openingHoursSpecification: openingHours,
    sameAs: [site.tiktok],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
