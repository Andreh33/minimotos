import "server-only";
import Stripe from "stripe";

/** Flag de Fase 0: pagos online DESACTIVADOS (checkout vía WhatsApp). */
export const STRIPE_ENABLED = process.env.STRIPE_ENABLED === "true";

/** Devuelve cliente Stripe solo si está habilitado y configurado; si no, null. */
export function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!STRIPE_ENABLED || !key) return null;
  return new Stripe(key);
}
