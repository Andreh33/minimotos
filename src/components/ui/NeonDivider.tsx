import { cn } from "@/lib/utils/cn";

/** Tubo de neón glow como separador de secciones (motivo signature). */
export function NeonDivider({
  className,
  angle = -1.5,
  variant = "spectrum",
}: {
  className?: string;
  angle?: number;
  variant?: "spectrum" | "blue" | "magenta";
}) {
  const bg =
    variant === "spectrum"
      ? "var(--mm-spectrum)"
      : variant === "magenta"
        ? "var(--color-mm-magenta)"
        : "var(--color-mm-blue)";
  const glow =
    variant === "magenta"
      ? "0 0 16px 1px rgba(255,30,142,0.65)"
      : variant === "blue"
        ? "0 0 16px 1px rgba(30,123,255,0.65)"
        : "0 0 18px 1px rgba(122,43,255,0.5)";

  return (
    <div className={cn("relative w-full overflow-hidden py-10", className)} aria-hidden>
      <div className="origin-center" style={{ transform: `rotate(${angle}deg) scale(1.06)` }}>
        <div className="h-[2px] w-full" style={{ background: bg, boxShadow: glow }} />
      </div>
    </div>
  );
}
