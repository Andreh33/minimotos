import Link from "next/link";
import { redirect, notFound } from "next/navigation";
import { isAdmin } from "@/lib/auth/admin";
import { hasSupabase } from "@/lib/supabase/server";
import { getAdminProductos } from "@/lib/data/admin";
import { updateProducto } from "@/app/actions/admin";

export default async function EditProductoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  if (!(await isAdmin())) redirect("/admin");
  const { slug } = await params;
  const productos = await getAdminProductos();
  const p = productos.find((x) => x.slug === slug);
  if (!p) notFound();

  const supa = hasSupabase();

  return (
    <main className="mx-auto max-w-xl px-6 py-12">
      <Link href="/admin" className="font-mono text-xs uppercase tracking-widest text-mm-text-dim hover:text-mm-text">
        ← Volver
      </Link>
      <h1 className="mm-display mt-4 text-2xl">{p.nombre}</h1>

      {!supa && (
        <p className="mt-4 rounded-mm-md border border-dashed border-mm-line p-4 text-sm text-mm-text-dim">
          Sin Supabase: los cambios no se guardarán. Conéctalo para persistir.
        </p>
      )}

      <form action={updateProducto} className="mt-8 flex flex-col gap-5">
        <input type="hidden" name="slug" value={p.slug} />

        <label className="flex flex-col gap-1.5">
          <span className="font-mono text-[0.65rem] uppercase tracking-widest text-mm-text-mute">Estado</span>
          <select name="estado" defaultValue={p.estado} className="h-11 rounded-mm-sm border border-mm-line bg-mm-ink-800 px-3 text-sm">
            {["borrador", "publicado", "nuevo", "oferta", "agotado"].map((e) => (
              <option key={e} value={e}>{e}</option>
            ))}
          </select>
        </label>

        <div className="grid grid-cols-2 gap-4">
          <Field name="precio" label="Precio (€)" defaultValue={p.precio} />
          <Field name="precio_oferta" label="Precio oferta (€)" defaultValue={p.precioOferta ?? ""} />
        </div>
        <Field name="stock" label="Stock" defaultValue={p.stock} />

        <label className="flex items-center gap-3">
          <input type="checkbox" name="destacado" defaultChecked={p.destacado} className="h-4 w-4 accent-mm-cyan" />
          <span className="text-sm">Destacado en home</span>
        </label>

        <button
          type="submit"
          disabled={!supa}
          className="relative mt-2 h-12 w-fit overflow-hidden rounded-mm-pill px-8 font-mono text-xs uppercase tracking-widest text-black disabled:opacity-40"
        >
          <span aria-hidden className="absolute inset-0 -z-10" style={{ background: "var(--mm-spectrum)" }} />
          Guardar
        </button>
      </form>
    </main>
  );
}

function Field({ name, label, defaultValue }: { name: string; label: string; defaultValue: string | number }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-mono text-[0.65rem] uppercase tracking-widest text-mm-text-mute">{label}</span>
      <input
        name={name}
        type="number"
        step="0.01"
        defaultValue={defaultValue}
        className="h-11 rounded-mm-sm border border-mm-line bg-mm-ink-800 px-3 text-sm focus:border-mm-cyan/60 focus:outline-none"
      />
    </label>
  );
}
