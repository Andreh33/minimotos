"use server";

import { z } from "zod";
import { hasSupabase, createClient } from "@/lib/supabase/server";

const schema = z.object({
  email: z.string().email(),
  locale: z.string().default("es"),
});

export type NewsletterState = { ok: boolean; error?: string };

export async function subscribeNewsletter(
  _prev: NewsletterState,
  formData: FormData,
): Promise<NewsletterState> {
  const parsed = schema.safeParse({
    email: formData.get("email"),
    locale: formData.get("locale") ?? "es",
  });
  if (!parsed.success) return { ok: false, error: "invalid" };

  if (hasSupabase()) {
    try {
      const supabase = await createClient();
      await supabase
        .from("newsletter")
        .upsert({ email: parsed.data.email, locale: parsed.data.locale }, { onConflict: "email" });
    } catch {
      // No bloquear al usuario por un fallo de almacenamiento.
    }
  }
  // Sin Supabase configurado: aceptamos el alta (se conectará al activar backend).
  return { ok: true };
}
