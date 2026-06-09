import "server-only";
import { hasSupabase, createClient } from "@/lib/supabase/server";
import { mockProductos, mockCategorias } from "./mock";
import type { Categoria, Producto, ProductFilters } from "./types";

/* ------------------------------------------------------------------ */
/* Mapeo fila Supabase (snake_case) → dominio (camelCase)             */
/* ------------------------------------------------------------------ */
type Row = Record<string, unknown>;

function mapProducto(r: Row): Producto {
  return {
    id: String(r.id),
    slug: String(r.slug),
    nombre: String(r.nombre),
    categoriaSlug: String(r.categoria_slug ?? ""),
    marca: (r.marca as string | null) ?? null,
    tipoEnergia: (r.tipo_energia as Producto["tipoEnergia"]) ?? "na",
    precio: Number(r.precio),
    precioOferta: r.precio_oferta != null ? Number(r.precio_oferta) : null,
    destacado: Boolean(r.destacado),
    estado: (r.estado as Producto["estado"]) ?? "publicado",
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
  };
}

const VISIBLE = new Set(["publicado", "nuevo", "oferta", "agotado"]);

/* ------------------------------------------------------------------ */
/* Filtro/orden común (se aplica también sobre mock)                  */
/* ------------------------------------------------------------------ */
function applyFilters(list: Producto[], f: ProductFilters = {}): Producto[] {
  let out = list.filter((x) => VISIBLE.has(x.estado));
  if (f.family) out = out.filter((x) => x.categoriaSlug === f.family);
  if (f.energy) out = out.filter((x) => x.tipoEnergia === f.energy);
  if (f.minPrice != null) out = out.filter((x) => (x.precioOferta ?? x.precio) >= f.minPrice!);
  if (f.maxPrice != null) out = out.filter((x) => (x.precioOferta ?? x.precio) <= f.maxPrice!);
  if (f.search) {
    const q = f.search.toLowerCase();
    out = out.filter((x) => x.nombre.toLowerCase().includes(q));
  }
  switch (f.sort) {
    case "price-asc":
      out = [...out].sort((a, b) => (a.precioOferta ?? a.precio) - (b.precioOferta ?? b.precio));
      break;
    case "price-desc":
      out = [...out].sort((a, b) => (b.precioOferta ?? b.precio) - (a.precioOferta ?? a.precio));
      break;
    case "newest":
      out = [...out].sort((a, b) => Number(b.estado === "nuevo") - Number(a.estado === "nuevo"));
      break;
    default:
      out = [...out].sort((a, b) => Number(b.destacado) - Number(a.destacado));
  }
  return out;
}

/* ------------------------------------------------------------------ */
/* API pública                                                        */
/* ------------------------------------------------------------------ */
export async function getProductos(f: ProductFilters = {}): Promise<Producto[]> {
  if (!hasSupabase()) return applyFilters(mockProductos, f);
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("productos")
      .select("*, categorias(slug)")
      .in("estado", [...VISIBLE]);
    if (error || !data) return applyFilters(mockProductos, f);
    const mapped = data.map((row: Row) => {
      const cat = (row.categorias as { slug?: string } | null)?.slug;
      return mapProducto({ ...row, categoria_slug: cat });
    });
    return applyFilters(mapped, f);
  } catch {
    return applyFilters(mockProductos, f);
  }
}

export async function getProducto(slug: string): Promise<Producto | null> {
  if (!hasSupabase()) return mockProductos.find((p) => p.slug === slug) ?? null;
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("productos")
      .select("*, categorias(slug)")
      .eq("slug", slug)
      .maybeSingle();
    if (!data) return mockProductos.find((p) => p.slug === slug) ?? null;
    const cat = (data.categorias as { slug?: string } | null)?.slug;
    return mapProducto({ ...data, categoria_slug: cat });
  } catch {
    return mockProductos.find((p) => p.slug === slug) ?? null;
  }
}

export async function getDestacados(limit = 6): Promise<Producto[]> {
  const all = await getProductos();
  return all.filter((p) => p.destacado).slice(0, limit);
}

export async function getRelacionados(slug: string, limit = 4): Promise<Producto[]> {
  const target = await getProducto(slug);
  if (!target) return [];
  const all = await getProductos({ family: target.categoriaSlug });
  return all.filter((p) => p.slug !== slug).slice(0, limit);
}

export async function getCategorias(): Promise<Categoria[]> {
  if (!hasSupabase()) return mockCategorias;
  try {
    const supabase = await createClient();
    const { data } = await supabase.from("categorias").select("*").order("orden");
    if (!data?.length) return mockCategorias;
    return data.map((r: Row) => ({
      slug: String(r.slug),
      nombre: String(r.nombre),
      descripcion: String(r.descripcion ?? ""),
      imagen: (r.imagen as string | null) ?? null,
      orden: Number(r.orden ?? 0),
    }));
  } catch {
    return mockCategorias;
  }
}
