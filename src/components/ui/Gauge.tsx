import { cn } from "@/lib/utils/cn";

/* Geometría: gauge de 270° (135° abajo-izq → 405°/45° abajo-dcha). */
const CX = 50;
const CY = 50;
const R = 40;
const START = 135;
const SWEEP = 270;

function pt(r: number, deg: number): [number, number] {
  const a = (deg * Math.PI) / 180;
  return [CX + r * Math.cos(a), CY + r * Math.sin(a)];
}

function arcPath(r: number, startDeg: number, endDeg: number) {
  const [x0, y0] = pt(r, startDeg);
  const [x1, y1] = pt(r, endDeg);
  const large = endDeg - startDeg > 180 ? 1 : 0;
  return `M ${x0.toFixed(3)} ${y0.toFixed(3)} A ${r} ${r} 0 ${large} 1 ${x1.toFixed(3)} ${y1.toFixed(3)}`;
}

/**
 * Velocímetro de marca. value ∈ [0,1]. Renderizable en servidor.
 * Para animar, controla `value` desde un wrapper cliente (ScrollGauge, preloader…).
 */
export function Gauge({
  value = 0,
  className,
  showNeedle = true,
  showTicks = true,
  strokeWidth = 4,
  id = "mm-gauge",
}: {
  value?: number;
  className?: string;
  showNeedle?: boolean;
  showTicks?: boolean;
  strokeWidth?: number;
  id?: string;
}) {
  const v = Math.max(0, Math.min(1, value));
  const angle = START + SWEEP * v;
  const redlineStart = START + SWEEP * 0.82;
  const ticks = Array.from({ length: 11 }, (_, i) => START + (SWEEP / 10) * i);

  return (
    <svg
      viewBox="0 0 100 100"
      className={cn("overflow-visible", className)}
      role="img"
      aria-label={`${Math.round(v * 100)}%`}
    >
      <defs>
        <linearGradient id={`${id}-spectrum`} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#00C2FF" />
          <stop offset="22%" stopColor="#1E7BFF" />
          <stop offset="44%" stopColor="#7A2BFF" />
          <stop offset="64%" stopColor="#FF1E8E" />
          <stop offset="82%" stopColor="#FFC400" />
          <stop offset="100%" stopColor="#2BFF6A" />
        </linearGradient>
      </defs>

      {/* Pista */}
      <path
        d={arcPath(R, START, START + SWEEP)}
        fill="none"
        stroke="rgba(255,255,255,0.10)"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />

      {/* Línea roja */}
      <path
        d={arcPath(R, redlineStart, START + SWEEP)}
        fill="none"
        stroke="#FF3B57"
        strokeOpacity={0.5}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />

      {/* Progreso (espectro) */}
      {v > 0.001 && (
        <path
          d={arcPath(R, START, angle)}
          fill="none"
          stroke={`url(#${id}-spectrum)`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
      )}

      {/* Ticks */}
      {showTicks &&
        ticks.map((t, i) => {
          const [x0, y0] = pt(R - strokeWidth - 1.5, t);
          const [x1, y1] = pt(R - strokeWidth - (i % 5 === 0 ? 6 : 3.5), t);
          return (
            <line
              key={t}
              x1={x0}
              y1={y0}
              x2={x1}
              y2={y1}
              stroke="rgba(255,255,255,0.28)"
              strokeWidth={i % 5 === 0 ? 1.2 : 0.7}
            />
          );
        })}

      {/* Aguja */}
      {showNeedle && (
        <g>
          <line
            x1={CX}
            y1={CY}
            x2={pt(R - 6, angle)[0]}
            y2={pt(R - 6, angle)[1]}
            stroke="#FF3B57"
            strokeWidth={1.6}
            strokeLinecap="round"
          />
          <circle cx={CX} cy={CY} r={3.4} fill="#0F1117" stroke="rgba(255,255,255,0.4)" strokeWidth={1} />
        </g>
      )}
    </svg>
  );
}
