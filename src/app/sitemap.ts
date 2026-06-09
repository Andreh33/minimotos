import type { MetadataRoute } from "next";
import { mockProductos } from "@/lib/data/mock";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://minimotos.example";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "",
    "/tienda",
    "/servicios",
    "/nosotros",
    "/contacto",
    "/aviso-legal",
    "/privacidad",
    "/cookies",
    "/devoluciones",
  ];
  const productPaths = mockProductos.map((p) => `/tienda/${p.slug}`);
  const all = [...staticPaths, ...productPaths];

  return all.flatMap((path) => {
    const esUrl = `${base}${path || "/"}`;
    const enUrl = `${base}/en${path}`;
    return [
      {
        url: esUrl,
        alternates: { languages: { es: esUrl, en: enUrl } },
        priority: path === "" ? 1 : 0.7,
      },
      { url: enUrl, priority: 0.5 },
    ];
  });
}
