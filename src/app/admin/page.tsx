import Link from "next/link";
import { isAdmin, adminConfigured } from "@/lib/auth/admin";
import { hasSupabase } from "@/lib/supabase/server";
import { getAdminProductos } from "@/lib/data/admin";
import { logoutAdmin } from "@/app/actions/admin";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { Badge } from "@/components/ui/Badge";
import { formatPrice } from "@/lib/utils/format";

export default async function AdminPage() {
  if (!(await isAdmin())) return <AdminLogin configured={adminConfigured()} />;

  const productos = await getAdminProductos();
  const supa = hasSupabase();

  return (
    <main className="mx-auto max-w-[1200px] px-6 py-12">
      <header className="flex items-center justify-between">
        <div>
          <p className="mm-eyebrow text-mm-cyan">// Panel</p>
          <h1 className="mm-display mt-2 text-3xl">Productos</h1>
        </div>
        <form action={logoutAdmin}>
          <button className="rounded-mm-pill border border-mm-line px-4 py-2 font-mono text-xs uppercase tracking-widest hover:bg-mm-ink-700">
            Salir
          </button>
        </form>
      </header>

      {!supa && (
        <p className="mt-6 rounded-mm-md border border-dashed border-mm-line p-4 text-sm text-mm-text-dim">
          Modo demo (sin Supabase configurado): listado de solo lectura. Conecta Supabase para
          editar y persistir.
        </p>
      )}

      <div className="mt-8 overflow-hidden rounded-mm-md border border-mm-line">
        <table className="w-full text-sm">
          <thead className="bg-mm-ink-800 font-mono text-[0.65rem] uppercase tracking-widest text-mm-text-mute">
            <tr>
              <th className="px-4 py-3 text-left">Nombre</th>
              <th className="px-4 py-3 text-left">Familia</th>
              <th className="px-4 py-3 text-left">Estado</th>
              <th className="px-4 py-3 text-right">Precio</th>
              <th className="px-4 py-3 text-right">Stock</th>
              <th className="px-4 py-3 text-right" />
            </tr>
          </thead>
          <tbody className="divide-y divide-mm-line">
            {productos.map((p) => (
              <tr key={p.id} className="hover:bg-white/[0.02]">
                <td className="px-4 py-3">{p.nombre}</td>
                <td className="px-4 py-3 text-mm-text-dim">{p.categoriaSlug}</td>
                <td className="px-4 py-3">
                  <Badge tone={p.estado === "agotado" ? "soldout" : p.estado === "oferta" ? "offer" : p.estado === "nuevo" ? "new" : "neutral"}>
                    {p.estado}
                  </Badge>
                </td>
                <td className="tnum px-4 py-3 text-right">{formatPrice(p.precioOferta ?? p.precio)}</td>
                <td className="tnum px-4 py-3 text-right">{p.stock}</td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/${p.slug}`} className="font-mono text-xs uppercase tracking-widest text-mm-cyan hover:underline">
                    Editar
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
