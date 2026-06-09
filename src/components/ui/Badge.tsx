import { cn } from "@/lib/utils/cn";

type Tone = "new" | "offer" | "soldout" | "neutral" | "energy";

const tones: Record<Tone, string> = {
  new: "bg-mm-green/15 text-mm-green border-mm-green/40",
  offer: "bg-mm-magenta/15 text-mm-magenta border-mm-magenta/40",
  soldout: "bg-mm-ink-600 text-mm-text-mute border-mm-line",
  neutral: "bg-white/5 text-mm-text-dim border-mm-line",
  energy: "bg-mm-cyan/15 text-mm-cyan border-mm-cyan/40",
};

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-mm-xs border px-2 py-0.5 font-mono text-[0.65rem] font-medium uppercase tracking-[0.14em]",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
