import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import { Link } from "@/i18n/navigation";

type Variant = "primary" | "chrome" | "ghost" | "magenta";
type Size = "sm" | "md" | "lg";

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[0.7rem]",
  md: "h-12 px-6 text-xs",
  lg: "h-14 px-8 text-sm",
};

/** Estructura interna compartida (sweep del espectro + label). */
function Inner({
  children,
  variant,
}: {
  children: ReactNode;
  variant: Variant;
}) {
  return (
    <>
      {variant === "primary" && (
        <span
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{ background: "var(--mm-spectrum)" }}
        />
      )}
      {variant === "chrome" && (
        <span
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{ background: "var(--mm-chrome)" }}
        />
      )}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 translate-y-full bg-white/15 transition-transform duration-[var(--mm-dur)] ease-[var(--ease-power)] group-hover:translate-y-0"
      />
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
      </span>
    </>
  );
}

export function buttonClasses(variant: Variant = "primary", size: Size = "md") {
  const variants: Record<Variant, string> = {
    primary: "text-black",
    chrome: "text-black",
    magenta: "bg-mm-magenta text-white",
    ghost: "mm-edge text-mm-text hover:bg-mm-ink-700",
  };
  return cn(
    "group relative isolate inline-flex items-center justify-center overflow-hidden rounded-mm-pill font-mono font-medium uppercase tracking-[0.14em] transition-[color,background-color,box-shadow] duration-[var(--mm-dur-fast)] focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50",
    sizes[size],
    variants[variant],
  );
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className, children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonClasses(variant, size), className)}
      {...props}
    >
      <Inner variant={variant}>{children}</Inner>
    </button>
  ),
);
Button.displayName = "Button";

/** Enlace interno con estilo de botón (consciente del locale). */
export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  external,
  ...rest
}: {
  href: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  external?: boolean;
} & Record<string, unknown>) {
  const cls = cn(buttonClasses(variant, size), className);
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cls}
        {...rest}
      >
        <Inner variant={variant}>{children}</Inner>
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      <Inner variant={variant}>{children}</Inner>
    </Link>
  );
}
