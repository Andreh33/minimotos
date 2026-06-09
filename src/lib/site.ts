/**
 * CONFIG CENTRAL DEL NEGOCIO — Mini Motos (Ciudad Real)
 *
 * ⚠️ Datos marcados TODO:DATO-REAL están pendientes de confirmación del cliente.
 * El horario está INVENTADO con autorización explícita del cliente (Fase 0) para
 * poder mostrar el badge abierto/cerrado. Cámbialo aquí en un solo sitio.
 */

export const site = {
  name: "Mini Motos",
  legalName: "Mini Motos Ciudad Real",
  city: "Ciudad Real",
  // Dirección real aportada por el cliente.
  address: "Avenida de Valdepeñas, 13004 Ciudad Real",
  // Coordenadas aproximadas de Avenida de Valdepeñas (Ciudad Real). TODO:DATO-REAL (afinar).
  geo: { lat: 38.9772, lng: -3.9123 },
  email: "minimotos26@icloud.com",
  // TODO:DATO-REAL — teléfono real del comercio.
  phone: "+34000000000",
  phoneDisplay: "TODO:DATO-REAL",
  // WhatsApp: usa el mismo número cuando se confirme. TODO:DATO-REAL.
  whatsapp: "34000000000",
  tiktok: "https://www.tiktok.com/@minimotos_ciudadreal",
  tiktokHandle: "@minimotos_ciudadreal",
  // TODO:DATO-REAL — año de apertura.
  since: null as number | null,
} as const;

/**
 * Horario INVENTADO (autorizado en Fase 0). TODO:DATO-REAL.
 * Formato 24h. day: 0=domingo … 6=sábado. Tramos para soportar pausa de mediodía.
 */
export type Tramo = { open: string; close: string };
export const horario: Record<number, Tramo[]> = {
  1: [{ open: "10:00", close: "14:00" }, { open: "17:00", close: "20:30" }], // Lun
  2: [{ open: "10:00", close: "14:00" }, { open: "17:00", close: "20:30" }], // Mar
  3: [{ open: "10:00", close: "14:00" }, { open: "17:00", close: "20:30" }], // Mié
  4: [{ open: "10:00", close: "14:00" }, { open: "17:00", close: "20:30" }], // Jue
  5: [{ open: "10:00", close: "14:00" }, { open: "17:00", close: "20:30" }], // Vie
  6: [{ open: "10:00", close: "14:00" }], // Sáb
  0: [], // Dom cerrado
};

export const horarioLabel = {
  es: [
    { d: "Lun – Vie", h: "10:00–14:00 · 17:00–20:30" },
    { d: "Sábado", h: "10:00–14:00" },
    { d: "Domingo", h: "Cerrado" },
  ],
  en: [
    { d: "Mon – Fri", h: "10:00–14:00 · 17:00–20:30" },
    { d: "Saturday", h: "10:00–14:00" },
    { d: "Sunday", h: "Closed" },
  ],
} as const;

/** ¿Abierto a una hora dada (Madrid)? Pasar Date ya en zona local del cliente. */
export function isOpenAt(date: Date): boolean {
  const tramos = horario[date.getDay()] ?? [];
  const mins = date.getHours() * 60 + date.getMinutes();
  return tramos.some(({ open, close }) => {
    const [oh, om] = open.split(":").map(Number);
    const [ch, cm] = close.split(":").map(Number);
    return mins >= oh * 60 + om && mins < ch * 60 + cm;
  });
}

/** Familias de producto (slug ↔ clave i18n ↔ energía aplicable). */
export const families = [
  { slug: "minimotos", key: "minimotos", energy: "gasolina" },
  { slug: "mini-quads", key: "miniquads", energy: "both" },
  { slug: "pit-bikes", key: "pitbikes", energy: "gasolina" },
  { slug: "buggies", key: "buggies", energy: "both" },
  { slug: "electricas", key: "electricas", energy: "electrica" },
  { slug: "equipacion", key: "equipacion", energy: "na" },
  { slug: "recambios", key: "recambios", energy: "na" },
  { slug: "accesorios", key: "accesorios", energy: "na" },
] as const;

export type FamilySlug = (typeof families)[number]["slug"];

/** Familias que se venden online (Stripe diferido) vs. consulta WhatsApp. */
export const VEHICLE_FAMILIES: FamilySlug[] = [
  "minimotos",
  "mini-quads",
  "pit-bikes",
  "buggies",
  "electricas",
];

/** Construye un enlace de WhatsApp con mensaje prerelleno. */
export function waLink(message: string): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
