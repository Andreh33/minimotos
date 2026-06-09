import type { Metadata } from "next";
import { fontVariables } from "@/lib/fonts";
import "../globals.css";

export const metadata: Metadata = {
  title: "Admin · Mini Motos",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={fontVariables} suppressHydrationWarning>
      <body className="min-h-screen bg-mm-black text-mm-text antialiased">{children}</body>
    </html>
  );
}
