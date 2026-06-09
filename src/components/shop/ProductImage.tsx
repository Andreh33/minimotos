import Image from "next/image";
import type { Producto } from "@/lib/data/types";
import { cn } from "@/lib/utils/cn";

const tint: Record<string, string> = {
  gasolina: "rgba(30,123,255,0.18)",
  electrica: "rgba(43,255,106,0.16)",
  na: "rgba(122,43,255,0.16)",
};

/**
 * Imagen de producto. Si hay foto real la muestra; si no, un placeholder
 * BRANDED honesto (no finge ser el producto real). Marca "DEMO" visible.
 */
export function ProductImage({
  producto,
  className,
  sizes = "(max-width:768px) 50vw, 25vw",
  priority,
}: {
  producto: Pick<Producto, "imagenes" | "tipoEnergia" | "placeholder" | "nombre">;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const img = producto.imagenes?.[0];

  if (img?.url) {
    return (
      <Image
        src={img.url}
        alt={img.alt || producto.nombre}
        fill
        sizes={sizes}
        priority={priority}
        className={cn("object-cover", className)}
      />
    );
  }

  return (
    <div
      aria-hidden
      className={cn("relative grid h-full w-full place-items-center overflow-hidden", className)}
      style={{
        background: `radial-gradient(120% 120% at 30% 20%, ${tint[producto.tipoEnergia] ?? tint.na}, transparent 60%), #0F1117`,
      }}
    >
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(115deg, rgba(255,255,255,0.03) 0 1px, transparent 1px 22px)",
        }}
      />
      <span className="mm-text-spectrum mm-display select-none text-5xl opacity-70">MM</span>
      {producto.placeholder && (
        <span className="absolute bottom-3 right-3 rounded-mm-xs border border-mm-line bg-mm-black/60 px-2 py-0.5 font-mono text-[0.55rem] uppercase tracking-widest text-mm-text-mute">
          demo
        </span>
      )}
    </div>
  );
}
