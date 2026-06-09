import { cn } from "@/lib/utils/cn";

/**
 * Banda infinita ladeada (-3deg por defecto). CSS puro (transform animado),
 * no depende de JS — funciona aunque la capa motion no monte.
 */
export function Marquee({
  text,
  className,
  speed = 28,
  reverse = false,
  angle = -3,
  spectrum = false,
}: {
  text: string;
  className?: string;
  speed?: number;
  reverse?: boolean;
  angle?: number;
  spectrum?: boolean;
}) {
  const item = (
    <span
      className={cn(
        "mm-display whitespace-nowrap px-6 text-[clamp(1.5rem,4vw,3.25rem)]",
        spectrum && "mm-text-spectrum",
      )}
    >
      {text}
    </span>
  );

  return (
    <div
      className={cn("relative w-full overflow-hidden py-3", className)}
      style={{ transform: `rotate(${angle}deg) scale(1.06)` }}
      aria-hidden
    >
      <div
        className="flex w-max"
        style={{
          animation: `mm-marquee ${speed}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        <div className="flex shrink-0">{Array.from({ length: 4 }, (_, i) => <span key={i}>{item}</span>)}</div>
        <div className="flex shrink-0">{Array.from({ length: 4 }, (_, i) => <span key={`b${i}`}>{item}</span>)}</div>
      </div>
    </div>
  );
}
