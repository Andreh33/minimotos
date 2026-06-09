import localFont from "next/font/local";
import { Geist, Geist_Mono } from "next/font/google";

/** Display: Clash Display variable (self-host, Fontshare) — titulares racing. */
export const clash = localFont({
  src: [
    {
      path: "../../../public/fonts/ClashDisplay-Variable.woff2",
      weight: "200 700",
      style: "normal",
    },
  ],
  variable: "--font-clash",
  display: "swap",
  preload: true,
  fallback: ["Arial Narrow", "system-ui", "sans-serif"],
  adjustFontFallback: false,
});

/** Cuerpo: Geist (self-host vía next/font/google). */
export const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

/** Datos / telemetría: Geist Mono. */
export const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const fontVariables = `${clash.variable} ${geist.variable} ${geistMono.variable}`;
