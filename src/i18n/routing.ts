import { defineRouting } from "next-intl/routing";

/** ES por defecto SIN prefijo · EN en /en (as-needed). */
export const routing = defineRouting({
  locales: ["es", "en"],
  defaultLocale: "es",
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];
