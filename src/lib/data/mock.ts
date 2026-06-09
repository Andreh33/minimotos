import type { Categoria, Producto } from "./types";

/**
 * DATOS DE DEMOSTRACIÓN — todos placeholder:true. NO son datos reales del cliente.
 * Nombres con "· DEMO". Precios/specs ilustrativos. Reemplazar vía Supabase/admin
 * cuando lleguen los datos reales. Sin marcas inventadas (marca: null).
 */

export const mockCategorias: Categoria[] = [
  { slug: "minimotos", nombre: "Minimotos", descripcion: "Deportivas en miniatura, de la primera a la de competición.", imagen: null, orden: 1 },
  { slug: "mini-quads", nombre: "Mini Quads", descripcion: "Cuatro ruedas, pura diversión todoterreno.", imagen: null, orden: 2 },
  { slug: "pit-bikes", nombre: "Pit Bikes", descripcion: "Para el circuito y el campo. Robustas y ágiles.", imagen: null, orden: 3 },
  { slug: "buggies", nombre: "Buggies", descripcion: "Adrenalina sobre cuatro ruedas anchas.", imagen: null, orden: 4 },
  { slug: "electricas", nombre: "Eléctricas", descripcion: "Cero ruido, cero humos, misma sonrisa.", imagen: null, orden: 5 },
  { slug: "equipacion", nombre: "Equipación", descripcion: "Cascos, protecciones y ropa cross.", imagen: null, orden: 6 },
  { slug: "recambios", nombre: "Recambios", descripcion: "Piezas para que no pares.", imagen: null, orden: 7 },
  { slug: "accesorios", nombre: "Accesorios", descripcion: "Los extras que marcan la diferencia.", imagen: null, orden: 8 },
];

function p(partial: Partial<Producto> & Pick<Producto, "slug" | "nombre" | "categoriaSlug" | "precio">): Producto {
  return {
    id: partial.slug,
    marca: null,
    tipoEnergia: "na",
    precioOferta: null,
    destacado: false,
    estado: "publicado",
    stock: 5,
    cilindradaCc: null,
    potenciaW: null,
    velocidadMax: null,
    autonomiaKm: null,
    edadMin: null,
    descripcion: "Producto de demostración. Ficha pendiente de datos reales del cliente.",
    especificaciones: {},
    imagenes: [],
    placeholder: true,
    ...partial,
  };
}

export const mockProductos: Producto[] = [
  p({ slug: "minimoto-cross-49-demo", nombre: "Minimoto Cross 49 · DEMO", categoriaSlug: "minimotos", precio: 399, tipoEnergia: "gasolina", cilindradaCc: 49, velocidadMax: 50, edadMin: 7, destacado: true, estado: "nuevo" }),
  p({ slug: "minimoto-gp-50-demo", nombre: "Minimoto GP 50 · DEMO", categoriaSlug: "minimotos", precio: 549, precioOferta: 469, tipoEnergia: "gasolina", cilindradaCc: 50, velocidadMax: 60, edadMin: 8, destacado: true, estado: "oferta" }),
  p({ slug: "mini-quad-49-demo", nombre: "Mini Quad 49 · DEMO", categoriaSlug: "mini-quads", precio: 459, tipoEnergia: "gasolina", cilindradaCc: 49, velocidadMax: 45, edadMin: 7, destacado: true, estado: "nuevo" }),
  p({ slug: "mini-quad-elec-800-demo", nombre: "Mini Quad Eléctrico 800W · DEMO", categoriaSlug: "mini-quads", precio: 629, tipoEnergia: "electrica", potenciaW: 800, velocidadMax: 35, autonomiaKm: 18, edadMin: 9 }),
  p({ slug: "pit-bike-110-demo", nombre: "Pit Bike 110 · DEMO", categoriaSlug: "pit-bikes", precio: 899, tipoEnergia: "gasolina", cilindradaCc: 110, velocidadMax: 70, edadMin: 12, destacado: true, estado: "nuevo" }),
  p({ slug: "pit-bike-125-demo", nombre: "Pit Bike 125 · DEMO", categoriaSlug: "pit-bikes", precio: 1099, tipoEnergia: "gasolina", cilindradaCc: 125, velocidadMax: 80, edadMin: 14 }),
  p({ slug: "buggy-200-demo", nombre: "Buggy 200 · DEMO", categoriaSlug: "buggies", precio: 2490, tipoEnergia: "gasolina", cilindradaCc: 200, velocidadMax: 65, edadMin: 16, destacado: true }),
  p({ slug: "buggy-elec-1500-demo", nombre: "Buggy Eléctrico 1500W · DEMO", categoriaSlug: "buggies", precio: 1990, tipoEnergia: "electrica", potenciaW: 1500, velocidadMax: 45, autonomiaKm: 25, edadMin: 14, estado: "agotado", stock: 0 }),
  p({ slug: "moto-elec-1000-demo", nombre: "Moto Eléctrica 1000W · DEMO", categoriaSlug: "electricas", precio: 749, tipoEnergia: "electrica", potenciaW: 1000, velocidadMax: 40, autonomiaKm: 22, edadMin: 10, destacado: true, estado: "nuevo" }),
  p({ slug: "quad-elec-500-demo", nombre: "Quad Eléctrico 500W · DEMO", categoriaSlug: "electricas", precio: 499, tipoEnergia: "electrica", potenciaW: 500, velocidadMax: 25, autonomiaKm: 15, edadMin: 6 }),
  p({ slug: "casco-cross-demo", nombre: "Casco Cross · DEMO", categoriaSlug: "equipacion", precio: 79, edadMin: 6 }),
  p({ slug: "guantes-cross-demo", nombre: "Guantes Cross · DEMO", categoriaSlug: "equipacion", precio: 19 }),
  p({ slug: "kit-piñon-cadena-demo", nombre: "Kit Piñón + Cadena · DEMO", categoriaSlug: "recambios", precio: 34 }),
  p({ slug: "bujia-competicion-demo", nombre: "Bujía Competición · DEMO", categoriaSlug: "recambios", precio: 9 }),
  p({ slug: "funda-cubre-moto-demo", nombre: "Funda Cubre-Moto · DEMO", categoriaSlug: "accesorios", precio: 24 }),
  p({ slug: "soporte-paddock-demo", nombre: "Soporte Paddock · DEMO", categoriaSlug: "accesorios", precio: 39, destacado: true }),
];
