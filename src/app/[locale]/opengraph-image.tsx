import { ImageResponse } from "next/og";
import { routing } from "@/i18n/routing";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Mini Motos · Ciudad Real";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#050507",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#9AA3B2",
          }}
        >
          // Ciudad Real · Venta + Taller
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 150,
              fontWeight: 800,
              color: "#F2F5F9",
              lineHeight: 1,
              letterSpacing: -4,
            }}
          >
            MINI MOTOS
          </div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 34, color: "#9AA3B2" }}>
            Minimotos · quads · pit bikes · buggies
          </div>
        </div>

        <div
          style={{
            display: "flex",
            height: 18,
            borderRadius: 999,
            background:
              "linear-gradient(100deg,#00C2FF 0%,#1E7BFF 22%,#7A2BFF 44%,#FF1E8E 64%,#FFC400 82%,#2BFF6A 100%)",
          }}
        />
      </div>
    ),
    size,
  );
}
