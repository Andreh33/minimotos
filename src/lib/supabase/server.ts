import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const SERVICE = process.env.SUPABASE_SERVICE_ROLE_KEY;

/** ¿Hay credenciales Supabase? Si no, la app usa datos mock. */
export function hasSupabase(): boolean {
  return Boolean(URL && ANON);
}

/** Cliente para RSC/Server Actions (respeta sesión vía cookies). */
export async function createClient() {
  const cookieStore = await cookies();
  return createServerClient(URL!, ANON!, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (toSet) => {
        try {
          toSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          // RSC sin contexto de mutación: ignorable.
        }
      },
    },
  });
}

/** Cliente service-role (solo Server Actions / webhooks; nunca al cliente). */
export function createAdminClient() {
  if (!URL || !SERVICE) throw new Error("Supabase service role no configurado");
  return createServerClient(URL, SERVICE, {
    cookies: { getAll: () => [], setAll: () => {} },
  });
}
