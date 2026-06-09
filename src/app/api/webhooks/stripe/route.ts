import { NextResponse } from "next/server";
import { getStripe, STRIPE_ENABLED } from "@/lib/stripe/server";

/**
 * Webhook de Stripe. Inerte mientras STRIPE_ENABLED=false.
 * Al activar: verifica firma y marca pedidos como pagados (service role).
 */
export async function POST(req: Request) {
  const stripe = getStripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!STRIPE_ENABLED || !stripe || !secret) {
    return NextResponse.json({ received: false, reason: "disabled" }, { status: 200 });
  }

  const sig = req.headers.get("stripe-signature");
  if (!sig) return NextResponse.json({ error: "no_signature" }, { status: 400 });

  let event;
  try {
    const raw = await req.text();
    event = stripe.webhooks.constructEvent(raw, sig, secret);
  } catch {
    return NextResponse.json({ error: "invalid_signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    // TODO: actualizar pedidos.estado='pagado' vía createAdminClient() con el session.id
  }

  return NextResponse.json({ received: true });
}
