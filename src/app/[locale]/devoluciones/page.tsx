import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { LegalShell } from "@/components/legal/LegalShell";
import { legalDocs } from "@/lib/legal";

export const metadata: Metadata = { title: legalDocs["devoluciones"].title };

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <LegalShell slug="devoluciones" />;
}
