import { cn } from "@/lib/utils/cn";

type Tone = "red" | "amber" | "cyan" | "magenta" | "green" | "chrome";

const tones: Record<Tone, string> = {
  red: "bg-mm-danger text-white",
  amber: "bg-mm-amber text-black",
  cyan: "bg-mm-cyan text-black",
  magenta: "bg-mm-magenta text-white",
  green: "bg-mm-green text-black",
  chrome: "text-black",
};

/** Etiqueta tipo cinta/pegatina, ladeada (acento estilo editorial). */
export function Sticker({
  children,
  tone = "red",
  rotate = -4,
  className,
}: {
  children: React.ReactNode;
  tone?: Tone;
  rotate?: number;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-block select-none px-2.5 py-1 font-mono text-[0.6rem] font-bold uppercase tracking-[0.12em] shadow-[0_4px_14px_rgba(0,0,0,0.4)]",
        tones[tone],
        className,
      )}
      style={{
        transform: `rotate(${rotate}deg)`,
        ...(tone === "chrome" ? { background: "var(--mm-chrome)" } : {}),
      }}
    >
      {children}
    </span>
  );
}
