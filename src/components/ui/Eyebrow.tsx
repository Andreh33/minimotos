import { cn } from "@/lib/utils/cn";

/** Etiqueta superior: mono, mayúsculas, tracking ancho, rotada -2deg. */
export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <span className={cn("mm-eyebrow", className)}>{children}</span>;
}
