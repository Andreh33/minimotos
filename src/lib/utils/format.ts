export function formatPrice(value: number, locale = "es"): string {
  return new Intl.NumberFormat(locale === "es" ? "es-ES" : "en-IE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: value % 1 === 0 ? 0 : 2,
  }).format(value);
}

export function formatNumber(value: number, locale = "es"): string {
  return new Intl.NumberFormat(locale === "es" ? "es-ES" : "en-IE").format(value);
}
