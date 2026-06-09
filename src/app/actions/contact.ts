"use server";

import { z } from "zod";
import { hasSupabase, createClient } from "@/lib/supabase/server";

const schema = z.object({
  nombre: z.string().min(2).max(120),
  email: z.string().email(),
  telefono: z.string().max(40).optional().or(z.literal("")),
  mensaje: z.string().min(5).max(2000),
});

export type ContactState = { ok: boolean; error?: string };

export async function sendContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const parsed = schema.safeParse({
    nombre: formData.get("nombre"),
    email: formData.get("email"),
    telefono: formData.get("telefono") ?? "",
    mensaje: formData.get("mensaje"),
  });
  if (!parsed.success) return { ok: false, error: "invalid" };

  if (hasSupabase()) {
    try {
      const supabase = await createClient();
      await supabase.from("pedidos").insert({
        estado: "consulta",
        metodo: "contacto",
        items: [],
        cliente: {
          nombre: parsed.data.nombre,
          email: parsed.data.email,
          telefono: parsed.data.telefono,
          mensaje: parsed.data.mensaje,
        },
      });
    } catch {
      // No bloquear: el usuario siempre tiene el fallback de WhatsApp/email.
    }
  }
  return { ok: true };
}
