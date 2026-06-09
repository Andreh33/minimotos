import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { families, site } from "@/lib/site";
import { Logo } from "./Logo";
import { Marquee } from "@/components/ui/Marquee";

export async function Footer() {
  const t = await getTranslations("footer");
  const tn = await getTranslations("nav");
  const tf = await getTranslations("families");

  const legal = [
    { href: "/aviso-legal", label: "Aviso legal" },
    { href: "/privacidad", label: "Privacidad" },
    { href: "/cookies", label: "Cookies" },
    { href: "/devoluciones", label: "Devoluciones" },
  ];
  const explore = [
    { href: "/tienda", label: tn("shop") },
    { href: "/servicios", label: tn("services") },
    { href: "/nosotros", label: tn("about") },
    { href: "/contacto", label: tn("contact") },
  ];

  return (
    <footer className="relative mt-24 overflow-hidden border-t border-mm-line bg-mm-ink-900">
      <div className="pointer-events-none select-none py-6 opacity-[0.07]">
        <Marquee text="MINI MOTOS ✦ CIUDAD REAL ✦" speed={40} />
      </div>

      <div className="mx-auto grid max-w-[1400px] gap-12 px-6 py-16 md:grid-cols-[1.5fr_1fr_1fr_1fr] md:px-12">
        <div>
          <Logo />
          <p className="mt-5 max-w-xs text-sm text-mm-text-dim">{t("tagline")}</p>
          <p className="mt-6 font-mono text-xs uppercase tracking-widest text-mm-text-mute">
            {site.address}
          </p>
        </div>

        <FooterCol title={t("explore")} links={explore} />
        <FooterCol title={t("legal")} links={legal} />

        <div>
          <h3 className="font-mono text-xs uppercase tracking-widest text-mm-text-mute">{t("contactTitle")}</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href={`mailto:${site.email}`} className="text-mm-text-dim hover:text-mm-cyan" data-cursor="link">
                {site.email}
              </a>
            </li>
            <li>
              <a href={site.tiktok} target="_blank" rel="noopener noreferrer" className="text-mm-text-dim hover:text-mm-magenta" data-cursor="link">
                {site.tiktokHandle}
              </a>
            </li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-x-3 gap-y-1">
            {families.slice(0, 4).map((f) => (
              <Link
                key={f.slug}
                href={{ pathname: "/tienda", query: { family: f.slug } }}
                className="font-mono text-[0.65rem] uppercase tracking-widest text-mm-text-mute hover:text-mm-text"
              >
                {tf(f.key)}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-3 border-t border-mm-line px-6 py-6 md:flex-row md:px-12">
        <p className="font-mono text-[0.65rem] uppercase tracking-widest text-mm-text-mute">
          © {site.name}. {t("rights")}.
        </p>
        <p className="mm-text-spectrum font-mono text-[0.65rem] uppercase tracking-widest">
          {t("madeIn")}
        </p>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <h3 className="font-mono text-xs uppercase tracking-widest text-mm-text-mute">{title}</h3>
      <ul className="mt-4 space-y-2 text-sm">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-mm-text-dim transition-colors hover:text-mm-text" data-cursor="link">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
