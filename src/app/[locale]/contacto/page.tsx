import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Mail, MessageCircle } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";
import { Location } from "@/components/home/Location";
import { site, waLink } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return { title: t("title") };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");

  return (
    <main className="pt-24 md:pt-28">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <p className="mm-eyebrow text-mm-cyan">// {site.city}</p>
        <h1 className="mm-display mt-4 text-[length:var(--fs-h1)]">{t("title")}</h1>

        <div className="mt-12 grid gap-12 md:grid-cols-2">
          <ContactForm />
          <div className="flex flex-col gap-4">
            <a
              href={waLink(`¡Hola ${site.name}!`)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-mm-md border border-mm-line p-5 transition-colors hover:border-mm-green/40"
              data-cursor="link"
            >
              <MessageCircle className="h-5 w-5 text-mm-green" />
              <span className="font-mono text-sm">WhatsApp</span>
            </a>
            <a
              href={`mailto:${site.email}`}
              className="flex items-center gap-3 rounded-mm-md border border-mm-line p-5 transition-colors hover:border-mm-cyan/40"
              data-cursor="link"
            >
              <Mail className="h-5 w-5 text-mm-cyan" />
              <span className="font-mono text-sm">{site.email}</span>
            </a>
            <a
              href={site.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-mm-md border border-mm-line p-5 transition-colors hover:border-mm-magenta/40"
              data-cursor="link"
            >
              <span className="mm-text-spectrum font-mono text-sm">{site.tiktokHandle}</span>
            </a>
          </div>
        </div>
      </div>

      <Location />
    </main>
  );
}
