/**
 * Decisión Fase 0: NO respetamos prefers-reduced-motion (full estética).
 * Flag único para revertir si hiciera falta por normativa/conversión.
 */
export const MOTION_RESPECT_REDUCED = false;

export const LENIS_LERP = 0.085;

/** Easings espejo de los tokens CSS (para GSAP). */
export const EASE = {
  power: "expo.out",
  snap: "power4.inOut",
} as const;

export const DUR = {
  fast: 0.22,
  base: 0.42,
  slow: 0.9,
} as const;
