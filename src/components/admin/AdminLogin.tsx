"use client";

import { useActionState } from "react";
import { loginAdmin, type LoginState } from "@/app/actions/admin";

export function AdminLogin({ configured }: { configured: boolean }) {
  const [state, action, pending] = useActionState<LoginState, FormData>(loginAdmin, {});

  return (
    <main className="grid min-h-screen place-items-center px-6">
      <div className="w-full max-w-sm">
        <p className="mm-eyebrow text-mm-cyan">// Panel</p>
        <h1 className="mm-display mt-3 text-4xl">Admin</h1>

        {!configured ? (
          <p className="mt-6 rounded-mm-md border border-dashed border-mm-line p-4 text-sm text-mm-text-dim">
            Configura <code className="font-mono text-mm-amber">ADMIN_PASSWORD</code> en las
            variables de entorno para activar el panel.
          </p>
        ) : (
          <form action={action} className="mt-8 flex flex-col gap-3">
            <input
              type="password"
              name="password"
              required
              placeholder="Contraseña"
              autoFocus
              className="h-12 rounded-mm-sm border border-mm-line bg-mm-ink-800 px-4 text-sm focus:border-mm-cyan/60 focus:outline-none"
            />
            {state.error && <p className="font-mono text-xs text-mm-danger">Contraseña incorrecta.</p>}
            <button
              type="submit"
              disabled={pending}
              className="relative h-12 overflow-hidden rounded-mm-pill font-mono text-xs uppercase tracking-widest text-black disabled:opacity-60"
            >
              <span aria-hidden className="absolute inset-0 -z-10" style={{ background: "var(--mm-spectrum)" }} />
              Entrar
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
