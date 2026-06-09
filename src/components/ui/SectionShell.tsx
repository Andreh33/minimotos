import { cn } from "@/lib/utils/cn";

type Slant = "none" | "top" | "bottom" | "both";

/**
 * Sección con corte diagonal (clip-path a --mm-slant) en la capa de fondo.
 * El contenido queda recto; el "ladeo" lo da el borde de la superficie.
 */
export function SectionShell({
  children,
  className,
  innerClassName,
  id,
  slant = "none",
  surface = false,
  as: Tag = "section",
}: {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  id?: string;
  slant?: Slant;
  surface?: boolean;
  as?: "section" | "div" | "footer";
}) {
  const clip = {
    none: undefined,
    top: "polygon(0 var(--mm-cut), 100% 0, 100% 100%, 0 100%)",
    bottom: "polygon(0 0, 100% 0, 100% calc(100% - var(--mm-cut)), 0 100%)",
    both: "polygon(0 var(--mm-cut), 100% 0, 100% calc(100% - var(--mm-cut)), 0 100%)",
  }[slant];

  return (
    <Tag id={id} className={cn("relative", className)}>
      {surface && (
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-mm-ink-900"
          style={
            {
              clipPath: clip,
              ["--mm-cut" as string]: "min(7vw, 90px)",
            } as React.CSSProperties
          }
        />
      )}
      <div className={cn("mx-auto w-full max-w-[1400px] px-6 md:px-12", innerClassName)}>
        {children}
      </div>
    </Tag>
  );
}
