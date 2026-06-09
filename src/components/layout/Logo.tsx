import { cn } from "@/lib/utils/cn";

/**
 * Wordmark Mini Motos — bold racing, con barra de velocidad en espectro.
 * Limpio y confiado (estilo bold condensado). TODO:DATO-REAL — sustituir por el
 * logo definitivo del cliente cuando lo pase (navbar, preloader, footer, favicon, OG).
 */
export function Logo({
  className,
  withText = true,
}: {
  className?: string;
  withText?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)} aria-label="Mini Motos">
      {/* Barra de velocidad (espectro), ladeada */}
      <span
        aria-hidden
        className="block h-5 w-[6px] -skew-x-[18deg] rounded-[1px]"
        style={{ background: "var(--mm-spectrum)", boxShadow: "0 0 12px rgba(30,123,255,0.55)" }}
      />
      {withText && (
        <span className="mm-display text-[1.15rem] font-bold uppercase leading-none tracking-[-0.02em] text-mm-text">
          Mini<span className="text-mm-text-dim">motos</span>
        </span>
      )}
    </span>
  );
}
