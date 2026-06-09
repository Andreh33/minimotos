import { NextResponse } from "next/server";
import { z } from "zod";
import { getStripe } from "@/lib/stripe/server";

const bodySchema = z.object({
  items: z
    .array(
      z.object({
        nombre: z.string(),
        precio: z.number().positive(),
        qty: z.number().int().positive(),
      }),
    )
    .min(1),
});

/**
 * Crea una Checkout Session de Stripe. DESACTIVADO por defecto (Fase 0):
 * devuelve 501 mientras el flujo es WhatsApp. Listo para activar con STRIPE_ENABLED=true.
 */
export async function POST(req: Request) {
  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json(
      { error: "checkout_disabled", message: "Pagos online no activos. Tramita por WhatsApp." },
      { status: 501 },
    );
  }

  const parsed = bodySchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: parsed.data.items.map((i) => ({
      quantity: i.qty,
      price_data: {
        currency: "eur",
        unit_amount: Math.round(i.precio * 100),
        product_data: { name: i.nombre },
      },
    })),
    success_url: `${base}/carrito?status=ok`,
    cancel_url: `${base}/carrito?status=cancel`,
  });

  return NextResponse.json({ url: session.url });
}
