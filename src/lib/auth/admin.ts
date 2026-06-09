import "server-only";
import { cookies } from "next/headers";

const COOKIE = "mm_admin";

/** ¿Hay contraseña de admin configurada? */
export function adminConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD);
}

export async function isAdmin(): Promise<boolean> {
  const store = await cookies();
  const token = store.get(COOKIE)?.value;
  return Boolean(token && process.env.ADMIN_PASSWORD && token === hashToken());
}

/** Token de sesión derivado de la contraseña (suficiente para un panel simple). */
export function hashToken(): string {
  const pw = process.env.ADMIN_PASSWORD ?? "";
  let h = 0;
  for (let i = 0; i < pw.length; i++) h = (h * 31 + pw.charCodeAt(i)) >>> 0;
  return `mm.${h.toString(16)}`;
}

export async function setAdminCookie() {
  const store = await cookies();
  store.set(COOKIE, hashToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
}

export async function clearAdminCookie() {
  const store = await cookies();
  store.delete(COOKIE);
}
