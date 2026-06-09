"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  setAdminCookie,
  clearAdminCookie,
  isAdmin,
} from "@/lib/auth/admin";
import { hasSupabase, createAdminClient } from "@/lib/supabase/server";

export type LoginState = { error?: boolean };

export async function loginAdmin(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const pw = formData.get("password");
  if (process.env.ADMIN_PASSWORD && pw === process.env.ADMIN_PASSWORD) {
    await setAdminCookie();
    redirect("/admin");
  }
  return { error: true };
}

export async function logoutAdmin() {
  await clearAdminCookie();
  redirect("/admin");
}

export async function updateProducto(formData: FormData) {
  if (!(await isAdmin())) return;
  if (!hasSupabase()) return; // modo demo: solo lectura

  const slug = String(formData.get("slug"));
  const num = (k: string) => {
    const v = formData.get(k);
    return v === "" || v == null ? null : Number(v);
  };

  const update = {
    estado: String(formData.get("estado")),
    precio: num("precio") ?? 0,
    precio_oferta: num("precio_oferta"),
    stock: num("stock") ?? 0,
    destacado: formData.get("destacado") === "on",
  };

  try {
    const supabase = createAdminClient();
    await supabase.from("productos").update(update).eq("slug", slug);
  } catch {
    // sin permisos / sin conexión
  }

  revalidatePath("/admin");
  revalidatePath("/tienda");
  redirect("/admin");
}
