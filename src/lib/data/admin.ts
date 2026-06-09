import "server-only";
import { hasSupabase, createClient } from "@/lib/supabase/server";
import { mockProductos } from "./mock";
import type { Producto } from "./types";

/** Todos los productos (incluye borradores) para el panel admin. */
export async function getAdminProductos(): Promise<Producto[]> {
  if (!hasSupabase()) return mockProductos;
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("productos")
      .select("*, categorias(slug)")
      .order("created_at", { ascending: false });
    if (!data) return mockProductos;
    return data.map((r: Record<string, unknown>) => ({
      id: String(r.id),
      slug: String(r.slug),
      nombre: String(r.nombre),
      categoriaSlug: String((r.categorias as { slug?: string } | null)?.slug ?? ""),
      marca: (r.marca as string | null) ?? null,
      tipoEnergia: (r.tipo_energia as Producto["tipoEnergia"]) ?? "na",
      precio: Number(r.precio),
      precioOferta: r.precio_oferta != null ? Number(r.precio_oferta) : null,
      destacado: Boolean(r.destacado),
      estado: (r.estado as Producto["estado"]) ?? "borrador",
      stock: Number(r.stock ?? 0),
      cilindradaCc: r.cilindrada_cc != null ? Number(r.cilindrada_cc) : null,
      potenciaW: r.potencia_w != null ? Number(r.potencia_w) : null,
      velocidadMax: r.velocidad_max != null ? Number(r.velocidad_max) : null,
      autonomiaKm: r.autonomia_km != null ? Number(r.autonomia_km) : null,
      edadMin: r.edad_min != null ? Number(r.edad_min) : null,
      descripcion: String(r.descripcion ?? ""),
      especificaciones: (r.especificaciones as Record<string, string>) ?? {},
      imagenes: (r.imagenes as Producto["imagenes"]) ?? [],
      placeholder: r.estado === "borrador",
    }));
  } catch {
    return mockProductos;
  }
}
