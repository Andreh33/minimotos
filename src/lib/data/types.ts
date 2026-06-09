export type Energia = "gasolina" | "electrica" | "na";
export type Estado = "nuevo" | "oferta" | "agotado" | "publicado" | "borrador";

export interface ProductoImagen {
  url: string;
  alt: string;
  orden?: number;
}

export interface Producto {
  id: string;
  slug: string;
  nombre: string;
  categoriaSlug: string;
  marca: string | null;
  tipoEnergia: Energia;
  precio: number;
  precioOferta: number | null;
  destacado: boolean;
  estado: Estado;
  stock: number;
  cilindradaCc: number | null;
  potenciaW: number | null;
  velocidadMax: number | null;
  autonomiaKm: number | null;
  edadMin: number | null;
  descripcion: string;
  especificaciones: Record<string, string>;
  imagenes: ProductoImagen[];
  /** true = contenido de demostración, NO dato real del cliente. */
  placeholder: boolean;
}

export interface Categoria {
  slug: string;
  nombre: string;
  descripcion: string;
  imagen: string | null;
  orden: number;
}

export interface ProductFilters {
  family?: string;
  energy?: Energia;
  minPrice?: number;
  maxPrice?: number;
  sort?: "relevance" | "price-asc" | "price-desc" | "newest";
  search?: string;
}
