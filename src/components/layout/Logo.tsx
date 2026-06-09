import { cn } from "@/lib/utils/cn";

/**
 * Marca placeholder (anillo de espectro + wordmark cromo/arcoíris).
 * TODO:DATO-REAL — sustituir el anillo por el logo real del cliente cuando lo pase
 * (navbar, preloader, footer, favicon, OG).
 */
export function Logo({
  className,
  withText = true,
}: {
  className?: string;
  withText?: boolean;
}) {
  const ringMask =
    "radial-gradient(circle, transparent 50%, #000 52%)";
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)} aria-label="Mini Motos">
      <span className="relative grid h-7 w-7 shrink-0 place-items-center">
        <span
          aria-hidden
          className="absolute inset-0 rounded-full mm-spectrum-ring"
          style={{ mask: ringMask, WebkitMask: ringMask }}
        />
        <span aria-hidden className="absolute inset-[30%] rounded-full bg-mm-black" />
        <span
          aria-hidden
          className="absolute left-1/2 top-1/2 h-[42%] w-[1.5px] origin-bottom -translate-x-1/2 -translate-y-full rounded-full bg-mm-danger"
          style={{ transform: "translate(-50%,-100%) rotate(38deg)" }}
        />
      </span>
      {withText && (
        <span className="mm-display text-lg leading-none tracking-tight">
          <span className="mm-text-chrome">Mini</span>
          <span className="mm-text-spectrum">motos</span>
        </span>
      )}
    </span>
  );
}
